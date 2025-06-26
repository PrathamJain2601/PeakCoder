import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { responseCodes } from "../../utils/response-codes.util";

export const profileStats = async (req: Request, res: Response) => {
  const id = req.body.id;
  if (!id) {
    return responseCodes.clientError.badRequest(res, "User ID is required");
  }

  try {
    // Get all accepted submissions grouped by user and problem
    const grouped = await prisma.submission.groupBy({
      by: ["userId", "problemId"],
      where: { status: "ACCEPTED" },
    });

    // Count problems solved per user
    const userProblemMap: Record<string, Set<string>> = {};
    for (const row of grouped) {
      if (!userProblemMap[row.userId]) {
        userProblemMap[row.userId] = new Set();
      }
      userProblemMap[row.userId].add(row.problemId);
    }

    // Generate leaderboard
    const leaderboard = Object.entries(userProblemMap)
      .map(([userId, problems]) => ({
        userId,
        problemsSolved: problems.size,
      }))
      .sort((a, b) => b.problemsSolved - a.problemsSolved);

    // Find rank of current user
    let rank = 0;
    for (let i = 0; i < leaderboard.length; i++) {
      if (leaderboard[i].userId === id) {
        rank = i + 1;
        break;
      }
    }

    // Get user submissions with problem difficulty
    const submissions = await prisma.submission.findMany({
      where: { userId: id },
      include: {
        problem: {
          select: { difficulty: true, id: true },
        },
      },
    });

    const totalSubmissions = submissions.length;
    const accepted = submissions.filter((s) => s.status === "ACCEPTED");

    const solvedProblems = new Set<string>();
    const difficultyMap = {
      EASY: new Set<string>(),
      MEDIUM: new Set<string>(),
      HARD: new Set<string>(),
    };

    for (const sub of accepted) {
      const pid = sub.problemId;
      solvedProblems.add(pid);
      difficultyMap[sub.problem.difficulty].add(pid);
    }

    const problemsSolved = solvedProblems.size;
    const acceptanceRate =
      totalSubmissions > 0 ? parseFloat(((problemsSolved / totalSubmissions) * 100).toFixed(2)) : 0;

    const easy = difficultyMap.EASY.size;
    const medium = difficultyMap.MEDIUM.size;
    const hard = difficultyMap.HARD.size;

    return responseCodes.success.ok(
      res,
      {
        totalSubmissions,
        problemsSolved,
        acceptanceRate,
        rank,
        easy,
        medium,
        hard,
      },
      "Profile stats fetched successfully"
    );
  } catch (e) {
    console.error("Error fetching profile stats:", e);
    return responseCodes.serverError.internalServerError(res, "Failed to fetch profile stats");
  }
};
