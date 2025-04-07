import { Request, Response } from "express";
import { prisma } from "../../config/db.config";

export const getProblems = async (req: Request, res: Response) => {
  try {
    const { difficulty, tags, limit = 10, offset = 0 } = req.query;

    const whereClause: any = {};
    if (difficulty) whereClause.difficulty = difficulty;
    if (tags) whereClause.tags = { hasSome: (tags as string).split(",") };

    const problems = await prisma.problem.findMany({
      where: whereClause,
      take: Number(limit),
      skip: Number(offset),
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: problems });
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
