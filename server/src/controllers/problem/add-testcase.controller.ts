import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { responseCodes } from "../../utils/response-codes.util";
import AWS from "aws-sdk";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Multer configuration (stores file in memory before upload)
const upload = multer({ storage: multer.memoryStorage() }).fields([
    { name: "inputFile", maxCount: 1 },
    { name: "outputFile", maxCount: 1 },
]);

export const addTestCase = async (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        if (err){
            console.log(err);
            return responseCodes.clientError.badRequest(res, null, "File upload error");
        }
        try {
            const { problemId } = req.params;
            const { isSample } = req.body;
            if (!req.files || !problemId) return responseCodes.clientError.badRequest(res, null, "Missing required fields");

            const inputFile = (req.files as any)["inputFile"]?.[0];
            const outputFile = (req.files as any)["outputFile"]?.[0];

            if (!inputFile || !outputFile) return responseCodes.clientError.badRequest(res, null, "Both input and output files are required");

            // Upload files to S3
            const uploadFileToS3 = async (file: Express.Multer.File, type: string) => {
                const fileKey = `testcases/${problemId}/${uuidv4()}${path.extname(file.originalname)}`;
                const uploadParams = {
                    Bucket: process.env.S3_BUCKET_NAME!,
                    Key: fileKey,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    ACL: "public-read",
                };
                const uploadResult = await s3.upload(uploadParams).promise();
                return uploadResult.Location;
            };

            const inputFileUrl = await uploadFileToS3(inputFile, "input");
            const outputFileUrl = await uploadFileToS3(outputFile, "output");

            // Store in DB
            const testCase = await prisma.testCase.create({
                data: { problemId, inputFileUrl, outputFileUrl, isSample: isSample === "true" },
            });

            return responseCodes.success.created(res, testCase, "Test case added successfully");
        } catch (error) {
            console.error("Error adding test case:", error);
            return responseCodes.serverError.internalServerError(res);
        }
    });
};
