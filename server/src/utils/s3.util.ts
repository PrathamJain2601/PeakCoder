// utils/s3.util.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

if(!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_BUCKET_NAME) {
    // console.log(process.env.AWS_REGION, process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_BUCKET_NAME);
    throw new Error("AWS environment variables are not set properly");
}

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadTestcaseToS3 = async (fileBuffer: Buffer, fileName: string, mimetype: string): Promise<string> => {
  const key = `testcases/${uuidv4()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: fileBuffer,
    ContentType: mimetype,
  });   

  await s3.send(command);

  return key; 
};

export const uploadSubmissionSourceToS3 = async (
  code: string,
  extension: string = "txt"
): Promise<string> => {
  const key = `submissions/${uuidv4()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: code,
    ContentType: "text/plain",
  });

  await s3.send(command);

  return key;
};

export const uploadStdoutToS3 = async (
  stdout: string,
): Promise<string> => {
  const key = `submissions/stdout/${uuidv4()}.txt`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: stdout,
    ContentType: "text/plain",
  });

  await s3.send(command);
  return key;
};

export const uploadStderrToS3 = async (
  stderr: string,
): Promise<string> => {
  const key = `submissions/stderr/${uuidv4()}.txt`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: stderr,
    ContentType: "text/plain",
  });

  await s3.send(command);
  return key;
};


export const getS3SignedUrl = async (key: string, expiresInSeconds = 180): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
};
  
