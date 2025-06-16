import { Request, Response } from "express";
import { prisma } from "../../config/db.config.js";
import { responseCodes } from "../../utils/response-codes.util";

export const createProblem = async (req: Request, res: Response) => {
    try {
        const {
            title,
            titleSlug,
            statement,
            constraints,
            hints,
            difficulty,
            timeLimit,
            memoryLimit,
            tags,
        } = req.body;

        // Required fields check
        if (
            !title || !titleSlug || !statement || !difficulty ||
            !timeLimit || !memoryLimit || !Array.isArray(tags)
        ) {
            return responseCodes.clientError.badRequest(res, null, "Missing required fields");
        }

        // Create tags if they don't exist already
        const tagRecords = await Promise.all(tags.map(async (tagName: string) => {
            const existingTag = await prisma.tag.findUnique({ where: { name: tagName } });
            if (existingTag) return existingTag;
            return await prisma.tag.create({ data: { name: tagName } });
        }));

        const problem = await prisma.problem.create({
            data: {
                title,
                titleSlug,
                statement,
                constraints,
                hints,
                difficulty,
                timeLimit: parseFloat(timeLimit),
                memoryLimit: parseInt(memoryLimit),
                tags: {
                    connect: tagRecords.map(tag => ({ id: tag.id }))
                }
            },
            include: {
                tags: true
            }
        });

        return responseCodes.success.created(res, problem, "Problem created successfully");
    } catch (error: any) {
        console.error(error);

        if (error.code === 'P2002') {
            return responseCodes.clientError.badRequest(res, null, "Title slug must be unique");
        }

        return responseCodes.serverError.internalServerError(res, "Failed to create problem");
    }
};




// {
//   "title": "Two Sum",
//   "titleSlug": "two-sum",
//   "statement": "Given an array of integers...",
//   "constraints": "1 ≤ n ≤ 10^5",
//   "hints": ["Use a hashmap", "Brute force is too slow"],
//   "difficulty": "EASY",
//   "timeLimit": 1.0,
//   "memoryLimit": 256,
//   "tags": ["arrays", "hashmap"]
// }
