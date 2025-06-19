import axios from "axios";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;

if (!RAPIDAPI_KEY) {
  throw new Error("❌ RAPIDAPI_KEY is not defined in environment variables.");
}

export async function executeWithJudge0(
  sourceCode: string,
  input: string,
  languageId: number,
  timeLimit?: number,
  memoryLimit?: number
): Promise<{
  stdout: string;
  stderr: string;
  time: number;
  memory: number;
  status: string;
}> {
  try {
    const response = await axios.post(
      JUDGE0_URL,
      {
        source_code: sourceCode,
        stdin: input,
        language_id: languageId,
        cpu_time_limit: timeLimit ?? 2,           // optional fallback
        memory_limit: memoryLimit ? memoryLimit * 1024 : 128000, // KB
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": RAPIDAPI_HOST,
          "X-RapidAPI-Key": RAPIDAPI_KEY,
        },
      }
    );

    const { stdout, stderr, time, memory, status } = response.data;

    return {
      stdout: stdout ?? "",
      stderr: stderr ?? "",
      time: parseFloat(time ?? "0"),
      memory: memory ?? 0,
      status: status?.description ?? "Unknown",
    };
  } catch (error: any) {
    console.error("❌ Judge0 Execution Failed:", error.response?.data || error.message);
    throw new Error("Judge0 execution failed");
  }
}
