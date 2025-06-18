import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { responseCodes } from "../../utils/response-codes.util";
import { getS3SignedUrl } from "../../utils/s3.util";

export const getSampleTestcases = async (req: Request, res: Response) => {
  try {
    const { id: problemId } = req.params;

    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      select: { id: true },
    });

    if (!problem) {
      return responseCodes.clientError.notFound(res, "Problem not found");
    }

    const testcases = await prisma.testCase.findMany({
      where: { problemId, isSample: true },
      select: { id: true, inputFileUrl: true, outputFileUrl: true, explanation: true },
    });

    const signedTestcases = await Promise.all(
      testcases.map(async (testcase) => {
        const [inputUrl, outputUrl] = await Promise.all([
          getS3SignedUrl(testcase.inputFileUrl),
          getS3SignedUrl(testcase.outputFileUrl),
        ]);
        return {
          id: testcase.id,
          inputFileUrl: inputUrl,
          outputFileUrl: outputUrl,
          explanation: testcase.explanation || null,
        };
      })
    );

    return responseCodes.success.ok(res, signedTestcases, "Sample testcases fetched");
  } catch (error) {
    console.error(error);
    return responseCodes.serverError.internalServerError(res, "Failed to fetch sample testcases");
  }
};
