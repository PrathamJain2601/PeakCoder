
import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

export type RunQueuePayload = {
  userId: string;
  problemId: string;
  languageId: number;
  code: string;
};

export const sendToRunQueue = async (payload: RunQueuePayload) => {
  try {
    if (!process.env.RABBITMQ_URL) {
      throw new Error('RabbitMQ URL is not defined in env');
    }

    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'runQueue';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
    });

    console.log(`Run task added to runQueue: ${JSON.stringify(payload)}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error publishing to runQueue:', error);
  }
};
