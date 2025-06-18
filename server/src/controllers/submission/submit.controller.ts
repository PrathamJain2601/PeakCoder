import { Request, Response } from "express";
import { responseCodes } from "../../utils/response-codes.util";
import { sendToSubmissionQueue } from "../../utils/submission.util";
import { uploadSubmissionSourceToS3 } from "../../utils/s3.util";
import { prisma } from "../../config/db.config";

export const submitTestCase = async (req: Request, res: Response) => {
  try {
    console.log("submitTestCase triggered");
    const userId = req.body.id;
    const { problemId, languageId, code } = req.body;

    if (!userId || !problemId || !languageId || !code) {
      return responseCodes.clientError.badRequest(res, null, "Missing required fields");
    }

    // Step 1: Validate that problem and language exist
    const [problem, language] = await Promise.all([
      prisma.problem.findUnique({ where: { id: problemId } }),
      prisma.language.findUnique({ where: { id: languageId } }),
    ]);

    if (!problem) {
      return responseCodes.clientError.notFound(res, "Problem not found");
    }

    if (!language) {
      return responseCodes.clientError.badRequest(res, null, "Invalid language ID");
    }

    console.log(`Submitting code for problem ${problemId} in ${language.name}`);
    // Step 2: Upload code to S3
    const key = await uploadSubmissionSourceToS3(code, language.extension);
    const sourceCodeFileUrl = key;


    // Step 3: Create submission record
    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        languageId,
        sourceCodeFileUrl,
        status: "PENDING",
      },
    });

    // Step 4: Push submission to queue
    await sendToSubmissionQueue({
      submissionId: submission.id,
      sourceCodeFileUrl,
      languageId,
      problemId,
    });

    return responseCodes.success.ok(res, { submissionId: submission.id }, "Submission received successfully");
  } catch (error) {
    console.error("Error in submitTestCase controller:", error);
    return responseCodes.serverError.internalServerError(res);
  }
};
