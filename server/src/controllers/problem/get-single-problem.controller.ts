import { Request, Response } from "express";
import { prisma } from "../../config/db.config.js";
import { responseCodes } from "../../utils/response-codes.util";
import { downloadFromS3 } from "../../utils/download.util.js";

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
                },     
            }
        });

        if (!problem) {
            return responseCodes.clientError.notFound(res, "Problem not found");
        }
        if(problem.submissions.length > 0){
            await Promise.all(
                problem.submissions.map(async (submission)=> {
                    let temp = await downloadFromS3(submission.sourceCodeFileUrl);
                    console.log(temp);
                    submission.sourceCodeFileUrl = temp;
                })
            )
        }

        return responseCodes.success.ok(res, problem, "Problem fetched successfully");
    } catch (error) {
        console.error(error);
        return responseCodes.serverError.internalServerError(res, "Failed to fetch problem");
    }
};
