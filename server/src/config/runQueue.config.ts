import amqp from "amqplib";
import dotenv from "dotenv";
import { prisma } from "../config/db.config";
import { downloadFromS3 } from "../utils/download.util";
import { executeWithJudge0 } from "../utils/judge0.util";
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

        if (!language) throw new Error("Language not found");
        if(!problem) throw new Error("Problem not found");
        if(testcases.length == 0) throw new Error("Testcases not found");

        const results = [];

        for (const testcase of testcases) {
          try {
            const [input, expectedOutput] = await Promise.all([
              downloadFromS3(testcase.inputFileUrl),
              downloadFromS3(testcase.outputFileUrl),
            ]);

            const result = await executeWithJudge0(code, input, language.judge0Id, problem.timeLimit, problem.memoryLimit); // assume you store this ID in your `Language` table

            let verdict: Verdict;

            if (result.status === "Accepted") {
              verdict =
                result.stdout.trim() === expectedOutput.trim()
                  ? Verdict.ACCEPTED
                  : Verdict.WRONG_ANSWER;
            } else if (result.status.includes("Time Limit")) {
              verdict = Verdict.TIME_LIMIT_EXCEEDED;
            } else if (result.status.includes("Compilation")) {
              verdict = Verdict.COMPILATION_ERROR;
            } else {
              verdict = Verdict.RUNTIME_ERROR;
            }

            results.push({
              testcaseId: testcase.id,
              verdict,
              stdout: result.stdout,
              stderr: result.stderr,
              time: result.time,
              memory: result.memory,
            });
          } catch (err: any) {
            results.push({
              testcaseId: testcase.id,
              verdict: Verdict.RUNTIME_ERROR,
              stdout: "",
              stderr: err.message ?? "Unknown error",
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
