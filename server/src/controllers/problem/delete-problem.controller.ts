import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { responseCodes } from "../../utils/response-codes.util";

export const deleteProblem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the problem exists
    const existingProblem = await prisma.problem.findUnique({ where: { id } });
    if (!existingProblem) {
      return responseCodes.clientError.notFound(res, "Problem not found");
    }

    // Delete the problem
    await prisma.problem.delete({ where: { id } });

    return responseCodes.success.ok(res, null, "Problem deleted successfully");
  } catch (error) {
    console.error("Error deleting problem:", error);
    return responseCodes.serverError.internalServerError(res);
  }
};
