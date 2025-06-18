import { Request, Response } from "express";
import { responseCodes } from "../../utils/response-codes.util";
import { sendToRunQueue } from "../../utils/run.util";
import { prisma } from "../../config/db.config";

export const runTestCase = async (req: Request, res: Response) => {
  try {
    const userId = req.body.id;
    const { problemId, languageId, code } = req.body;

    if (!userId || !problemId || !languageId || !code) {
      return responseCodes.clientError.badRequest(res, null, "Missing required fields");
    }

    // Optional: Validate that problem and language exist
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

    await sendToRunQueue({ userId, problemId, languageId, code });

    return responseCodes.success.ok(res, null, "Run request submitted successfully");
  } catch (error) {
    console.error("Error in runCode route:", error);
    return responseCodes.serverError.internalServerError(res);
  }
};
