import amqp from "amqplib";
import dotenv from "dotenv";
import { prisma } from "../config/db.config";
import { downloadFromS3 } from "../utils/download.util";
import { runCodeInDocker } from "../utils/docker.util";
import { sendRunResult } from "../utils/ws.util";
import { Verdict } from "@prisma/client";

dotenv.config();

export const startRunConsumer = async () => {
  try {
    if (!process.env.RABBITMQ_URL) throw new Error("RabbitMQ URL not defined");

    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = "runQueue";
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (!msg) return;
      const payload = JSON.parse(msg.content.toString());
      const { userId, problemId, languageId, code } = payload;

      try {
        const [language, testcases, problem] = await Promise.all([
          prisma.language.findUnique({ where: { id: languageId } }),
          prisma.testCase.findMany({
            where: { problemId, isSample: true },
            orderBy: { id: "asc" },
          }),
          prisma.problem.findUnique({ where: { id: problemId } }),
        ]);

        const timeLimit = problem?.timeLimit ?? 2;

        if (!language || testcases.length === 0) throw new Error("Language/Testcases not found");

        const results = [];

        for (const testcase of testcases) {
          try {
            const [input, expectedOutput] = await Promise.all([
              downloadFromS3(testcase.inputFileUrl),
              downloadFromS3(testcase.outputFileUrl),
            ]);

            const result = await runCodeInDocker({
              code,
              input,
              languageExtension: language.extension,
              timeLimit
            });

            const passed = result.stdout.trim() === expectedOutput.trim();
            console.log(result.stdout.trim());
            console.log(expectedOutput.trim());
            
            results.push({
              testcaseId: testcase.id,
              verdict: passed ? Verdict.ACCEPTED : Verdict.WRONG_ANSWER,
              stdout: result.stdout,
              stderr: result.stderr,
              time: result.time,
              memory: result.memory,
            });
          } catch (err: any) {
            // Handle specific execution failure
            let verdict: Verdict = Verdict.RUNTIME_ERROR;

            if (err.message?.includes("compilation")) {
              verdict = Verdict.COMPILATION_ERROR;
            } else if (err.message?.includes("timeout")) {
              verdict = Verdict.TIME_LIMIT_EXCEEDED;
            }

            results.push({
              testcaseId: testcase.id,
              verdict,
              stdout: "",
              stderr: err.message || "Error during execution",
              time: 0,
              memory: 0,
            });
          }
        }
        console.log(results);
        sendRunResult(userId, { results });

        channel.ack(msg);
      } catch (err) {
        console.error("Run consumer error:", err);
        channel.ack(msg);
      }
    });

    console.log("✅ Run consumer is running");
  } catch (error) {
    console.error("❌ Error in runQueue consumer:", error);
  }
};
