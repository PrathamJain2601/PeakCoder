import { Verdict, Language, Problem } from "./problem"

export type registerPayload = {
    username: string,
    name: string,
    email: string,
    password: string
}

export type loginPayload = {
    emailOrUsername: string,
    password: string
}

export type userType = {
    avatar: string,
    company: string,
    createdAt: string,
    email: string,
    id: string,
    isVerified: boolean,
    name: string,
    password?: string,
    role: string,
    updatedAt: string,
    username: string
}

export type Statistics = {
    totalSubmissions: number,
    problemsSolved: number,
    acceptanceRate: number,
    rank: number,
    easy: number,
    medium: number,
    hard: number
}

export type Leaderboard = {
    name: string,
    username: string,
    problemsSolved: number,
    id: string,
    rank: number,
    avatar: string
}

export type RecentSubmissions = {
    id: string,
    status: Verdict,
    executionTime: number,
    memoryUsed: number, 
    createdAt: string, 
    sourceCodeFileUrl: string,
    problem: Pick<Problem, "id" | "title" | "difficulty">;
    language: Pick<Language, "name">;
}