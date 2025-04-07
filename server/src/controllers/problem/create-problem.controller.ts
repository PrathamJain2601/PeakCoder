import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { responseCodes } from "../../utils/response-codes.util";

export const createProblem = async (req: Request, res: Response) => {
  try {
    const { title, statement, difficulty, tags, timeLimit, memoryLimit } = req.body;

    // Validate required fields
    if (!title || !statement || !difficulty || !timeLimit || !memoryLimit) {
      return responseCodes.clientError.badRequest(res, null, "Missing required fields");
    }

    // Validate difficulty
    if (!["easy", "medium", "hard"].includes(difficulty)) {
      return responseCodes.clientError.badRequest(res, null, "Invalid difficulty level");
    }

    const newProblem = await prisma.problem.create({
      data: { title, statement, difficulty, tags, timeLimit, memoryLimit },
    });

    return responseCodes.success.created(res, newProblem, "Problem created successfully");
  } catch (error) {
    console.error("Error creating problem:", error);
    return responseCodes.serverError.internalServerError(res);
  }
};
