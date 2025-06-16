import { Request, Response } from "express";
import { prisma } from "../../config/db.config.js";
import { responseCodes } from "../../utils/response-codes.util";

export const getSingleProblem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return responseCodes.clientError.badRequest(res, null, "Problem ID is required");
        }

        const problem = await prisma.problem.findUnique({
            where: { id },
            include: {
                tags: true,
                submissions: {
                    where: {
                        userId: req.body.id,
                    },
                    select: {
                        status: true,
                    },
                },     
            }
        });

        if (!problem) {
            return responseCodes.clientError.notFound(res, "Problem not found");
        }

        return responseCodes.success.ok(res, problem, "Problem fetched successfully");
    } catch (error) {
        console.error(error);
        return responseCodes.serverError.internalServerError(res, "Failed to fetch problem");
    }
};
