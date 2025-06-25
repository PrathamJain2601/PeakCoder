export type Difficulty = "EASY" | "MEDIUM" | "HARD"

export type Verdict = "PENDING" | "ACCEPTED" | "WRONG_ANSWER" | "TIME_LIMIT_EXCEEDED" | "MEMORY_LIMIT_EXCEEDED" | "RUNTIME_ERROR" | "COMPILATION_ERROR"

export interface Problem {
  id: string;
  title: string;
  titleSlug: string;
  statement: string;
  constraints?: string;
  hints: string[];
  difficulty: Difficulty
  timeLimit: number;
  memoryLimit: number;
  createdAt: string; 
  updatedAt: string; 
  tags: Tag[];
  testcase?: TestCase[]; 
  submissions?: Submission[]; 
}

export interface Tag {
  id: string;
  name: string;
}

export interface TestCase {
  id: string;
  inputFileUrl: string;
  outputFileUrl: string;
  isSample: boolean;
  explanation?: string | null; 
}
export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  languageId: number;
  language: Language;
  sourceCodeFileUrl: string;
  status: Verdict;
  executionTime?: number;
  memoryUsed?: number;
  stdoutFileUrl?: string;
  stderrFileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Language {
  languageId: number;
  name: string;
  boilerplate: string;
  value: string;
}

export interface runPayload {
  code: string;
  problemId: string;
  languageId: number;
}

export interface runResult{
  testcaseId: string;
    verdict: string;
    stdout: string;
    stderr: string;
    time: number;
    memory: number;
}
