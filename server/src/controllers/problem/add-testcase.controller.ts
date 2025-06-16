import { Request, Response } from "express";
import { prisma } from "../../config/db.config.js";
import { uploadTestcaseToS3 } from "../../utils/s3.util.js";
import { responseCodes } from "../../utils/response-codes.util";

export const addTestCase = async (req: Request, res: Response) => {
  try {
    const { problemId } = req.params;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const inputFile = files?.["inputFile"]?.[0];
    const outputFile = files?.["outputFile"]?.[0];
    const { isSample, explanation } = req.body;

    if (!inputFile || !outputFile) {
      return responseCodes.clientError.badRequest(res, null, "Both input and output files are required");
    }

    const problem = await prisma.problem.findUnique({ where: { id: problemId } });
    if (!problem) {
      return responseCodes.clientError.notFound(res, "Problem not found");
    }

    const [inputKey, outputKey] = await Promise.all([
      uploadTestcaseToS3(inputFile.buffer, inputFile.originalname, inputFile.mimetype),
      uploadTestcaseToS3(outputFile.buffer, outputFile.originalname, outputFile.mimetype),
    ]);

    const testCase = await prisma.testCase.create({
      data: {
        problemId,
        inputFileUrl: inputKey, // now storing just the S3 key
        outputFileUrl: outputKey,
        isSample: isSample === "true",
        explanation: explanation || null,
      },
    });

    return responseCodes.success.created(res, testCase, "Test case added successfully");
  } catch (error) {
    console.error(error);
    return responseCodes.serverError.internalServerError(res, "Failed to add test case");
  }
};
