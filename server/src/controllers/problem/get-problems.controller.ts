import { Request, Response } from "express";
import { prisma } from "../../config/db.config.js";
import { responseCodes } from "../../utils/response-codes.util";

export const getProblems = async (req: Request, res: Response) => {
    try {
        const problems = await prisma.problem.findMany({
            orderBy: {
                createdAt: "desc",
            },
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
            },
        });

        return responseCodes.success.ok(res, problems, "Problems fetched successfully");
    } catch (error) {
        console.error(error);
        return responseCodes.serverError.internalServerError(res, "Failed to fetch problems");
    }
};
