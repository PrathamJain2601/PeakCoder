import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { responseCodes } from "../../utils/response-codes.util";
import { downloadFromS3 } from "../../utils/download.util";

export const recentSubmissions = async (req: Request, res: Response) => {
  const userId = req.body.id;
  if (!userId) {
    return responseCodes.clientError.badRequest(res, "User ID is required");
  }

  try {
    const submissions = await prisma.submission.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            status: true,
            executionTime: true,
            memoryUsed: true,
            createdAt: true,
            sourceCodeFileUrl: true,
            problem: {
                select: {
                    id: true,
                    title: true,
                    difficulty: true,
                },
            },
            language: {
                select: {
                    name: true,
                },
            },
        },
    });

    await Promise.all(
        submissions.map(async (submission)=> {
            let temp = await downloadFromS3(submission.sourceCodeFileUrl);
            submission.sourceCodeFileUrl = temp;
        })
    )

    return responseCodes.success.ok(res, submissions, "Recent submissions fetched");
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return responseCodes.serverError.internalServerError(res, "Failed to fetch recent submissions");
  }
};
