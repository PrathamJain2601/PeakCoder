import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

export type SubmissionMessage = {
  submissionId: string;
  sourceCodeFileUrl: string;
  languageId: number;
  problemId: string;
}

export const sendToSubmissionQueue = async (submissionData: SubmissionMessage) => {
  try {
    if (!process.env.RABBITMQ_URL) {
      throw new Error('RabbitMQ URL is not defined in env');
    }

    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'submissionQueue';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(submissionData)), { persistent: true });
    
    console.log(`Submission added to queue: ${JSON.stringify(submissionData)}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error publishing submission:', error);
  }
};
