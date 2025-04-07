import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { responseCodes } from "../../utils/response-codes.util";

export const updateProblem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, statement, difficulty, tags, timeLimit, memoryLimit } = req.body;

    // Check if at least one field is provided
    if (!title && !statement && !difficulty && !tags && !timeLimit && !memoryLimit) {
      return responseCodes.clientError.badRequest(res, null, "No fields provided for update");
    }

    // Validate difficulty if provided
    if (difficulty && !["easy", "medium", "hard"].includes(difficulty)) {
      return responseCodes.clientError.badRequest(res, null, "Invalid difficulty level");
    }

    // Check if problem exists
    const existingProblem = await prisma.problem.findUnique({ where: { id } });
    if (!existingProblem) {
      return responseCodes.clientError.notFound(res, "Problem not found");
    }

    // Prepare update data with only provided fields
    const updateData: any = {};
    if (title) updateData.title = title;
    if (statement) updateData.statement = statement;
    if (difficulty) updateData.difficulty = difficulty;
    if (tags) updateData.tags = tags;
    if (timeLimit) updateData.timeLimit = timeLimit;
    if (memoryLimit) updateData.memoryLimit = memoryLimit;

    // Update problem
    const updatedProblem = await prisma.problem.update({
      where: { id },
      data: updateData,
    });

    return responseCodes.success.ok(res, updatedProblem, "Problem updated successfully");
  } catch (error) {
    console.error("Error updating problem:", error);
    return responseCodes.serverError.internalServerError(res);
  }
};
