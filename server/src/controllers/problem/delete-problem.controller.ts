import { Request, Response } from "express";
import { prisma } from "../../config/db.config.js";
import { responseCodes } from "../../utils/response-codes.util";

export const deleteProblem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existingProblem = await prisma.problem.findUnique({ where: { id } });
        if (!existingProblem) {
            return responseCodes.clientError.notFound(res, "Problem not found");
        }

        await prisma.problem.delete({ where: { id } });

        return responseCodes.success.ok(res, null, "Problem deleted successfully");
    } catch (error) {
        console.error(error);
        return responseCodes.serverError.internalServerError(res, "Failed to delete problem");
    }
};
