import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { responseCodes } from "../../utils/response-codes.util"; // adjust if needed

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // Step 1: Group ACCEPTED submissions by userId and problemId
    const grouped = await prisma.submission.groupBy({
      by: ["userId", "problemId"],
      where: { status: "ACCEPTED" },
    });

    // Step 2: Count unique problems per user
    const userProblemMap: Record<string, Set<string>> = {};

    for (const row of grouped) {
      if (!userProblemMap[row.userId]) {
        userProblemMap[row.userId] = new Set();
      }
      userProblemMap[row.userId].add(row.problemId);
    }

    // Step 3: Prepare leaderboard array with counts
    let leaderboard = Object.entries(userProblemMap).map(([userId, problems]) => ({
      userId,
      problemsSolved: problems.size,
    }));

    // Step 4: Sort by problems solved (desc) and pick top 50
    leaderboard = leaderboard.sort((a, b) => b.problemsSolved - a.problemsSolved).slice(0, 50);

    const userIds = leaderboard.map((u) => u.userId);

    // Step 5: Fetch user info
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true
      },
    });

    // Step 6: Merge data
    const final = leaderboard.map((entry, index) => {
      const user = users.find((u) => u.id === entry.userId);
      return {
        id: user?.id,
        name: user?.name,
        username: user?.username,
        problemsSolved: entry.problemsSolved,
        avatar: user?.avatar,
        rank: index + 1
      };
    });
    return responseCodes.success.ok(res, final);
  } catch (error) {
    console.error("Leaderboard error:", error);
    return responseCodes.serverError.internalServerError(res, "Could not fetch leaderboard.");
  }
};
