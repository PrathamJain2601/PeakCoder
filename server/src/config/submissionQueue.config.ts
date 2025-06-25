import amqp from "amqplib";
import dotenv from "dotenv";
import { prisma } from "../config/db.config";
import { downloadFromS3 } from "../utils/download.util";
import { executeWithJudge0 } from "../utils/judge0.util";
import { Verdict } from "@prisma/client";
import { uploadStdoutToS3, uploadStderrToS3 } from "../utils/s3.util";
import { sendSubmissionResult } from "../utils/ws.util";

dotenv.config();

export const startSubmissionConsumer = async () => {
  try {
    if (!process.env.RABBITMQ_URL) throw new Error("RabbitMQ URL not defined");

    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = "submissionQueue";
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (!msg) return;

      const data = JSON.parse(msg.content.toString());
      const { submissionId, sourceCodeFileUrl, languageId, problemId } = data;

      try {
        const [testcases, language, problem, submission] = await Promise.all([
          prisma.testCase.findMany({ where: { problemId } }),
          prisma.language.findUnique({ where: { id: languageId } }),
          prisma.problem.findUnique({ where: { id: problemId } }),
          prisma.submission.findUnique({ where: { id: submissionId } }), // get userId
        ]);

        if (!language || !problem || !submission) throw new Error("Missing required data");

        const code = await downloadFromS3(sourceCodeFileUrl);
        let verdict: Verdict = Verdict.ACCEPTED;
        let maxTime = 0;
        let maxMemory = 0;

        for (const test of testcases) {
          const [input, expectedOutput] = await Promise.all([
            downloadFromS3(test.inputFileUrl),
            downloadFromS3(test.outputFileUrl),
          ]);

          const result = await executeWithJudge0(
            code,
            input,
            language.judge0Id,
            problem.timeLimit,
            problem.memoryLimit
          );

          const actualOutput = result.stdout.trim();
          const expected = expectedOutput.trim();

          if (result.status !== "Accepted") {
            if (result.status.includes("Time")) verdict = Verdict.TIME_LIMIT_EXCEEDED;
            else if (result.status.includes("Memory")) verdict = Verdict.MEMORY_LIMIT_EXCEEDED;
            else if (result.status.includes("compilation")) verdict = Verdict.COMPILATION_ERROR;
            else verdict = Verdict.RUNTIME_ERROR;
            break;
          }

          if (actualOutput !== expected) {
            verdict = Verdict.WRONG_ANSWER;
            break;
          }

          maxTime = Math.max(maxTime, result.time);
          maxMemory = Math.max(maxMemory, result.memory);
        }

        const [stdoutFileUrl, stderrFileUrl] = await Promise.all([
          uploadStdoutToS3("Execution finished."),
          uploadStderrToS3(verdict === Verdict.ACCEPTED ? "No error" : verdict),
        ]);

        const result = await prisma.submission.update({
          where: { id: submissionId },
          data: {
            status: verdict,
            executionTime: maxTime,
            memoryUsed: maxMemory,
            stdoutFileUrl,
            stderrFileUrl,
          }
        });

        // ✅ Emit WebSocket event with verdict
        console.log(result);
        
        sendSubmissionResult(submission.userId, result);

        channel.ack(msg);
      } catch (error) {
        console.error("Error processing submission:", error);
        channel.ack(msg);
      }
    });

    console.log("✅ Submission consumer is running");
  } catch (error) {
    console.error("❌ Error in submission consumer:", error);
  }
};
