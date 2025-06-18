// ✅ Corrected: consumers/submissionConsumer.ts
import amqp from "amqplib";
import dotenv from "dotenv";
import { prisma } from "../config/db.config";
import { downloadFromS3 } from "../utils/download.util";
import { runCodeInDocker } from "../utils/docker.util";
import { Verdict } from "@prisma/client";
import { uploadStdoutToS3, uploadStderrToS3 } from "../utils/s3.util";
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
        const [testcases, language] = await Promise.all([
          prisma.testCase.findMany({ where: { problemId } }),
          prisma.language.findUnique({ where: { id: languageId } }),
        ]);

        if (!language) throw new Error("Language not found");

        const code = await downloadFromS3(sourceCodeFileUrl);
        let verdict: Verdict = Verdict.ACCEPTED;
        let maxTime = 0;
        let maxMemory = 0;

        for (const test of testcases) {
          const input = await downloadFromS3(test.inputFileUrl);
          const expectedOutput = await downloadFromS3(test.outputFileUrl);

          const result = await runCodeInDocker({
            code,
            input,
            languageExtension: language.extension,
          });

          if (result.stdout.trim() !== expectedOutput.trim()) {
            verdict = Verdict.WRONG_ANSWER;
            break;
          }

          maxTime = Math.max(maxTime, result.time);
          maxMemory = Math.max(maxMemory, result.memory);
        }

        const [stdoutFileUrl, stderrFileUrl] = await Promise.all([
          uploadStdoutToS3("Execution finished."),
          uploadStderrToS3("No error"),
        ]);

        await prisma.submission.update({
          where: { id: submissionId },
          data: {
            status: verdict,
            executionTime: maxTime,
            memoryUsed: maxMemory,
            stdoutFileUrl,
            stderrFileUrl,
          },
        });

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


