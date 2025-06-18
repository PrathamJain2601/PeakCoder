import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import os from "os"; 
  
export const runCodeInDocker = async ({
  code,
  input,
  languageExtension,
  timeLimit = 2,
}: {
  code: string;
  input: string;
  languageExtension: string;
  timeLimit?: number;
}): Promise<{
  stdout: string;
  stderr: string;
  time: number;
  memory: number;
}> => {
  const id = uuidv4();
  const tempDir = path.join(os.tmpdir(), id);
  const codeFile = `Main.${languageExtension}`;
  const inputFile = "input.txt";

  try {
    console.log(tempDir);
    console.log(timeLimit);
    console.log(codeFile);
    await fs.mkdir(tempDir);
    await fs.writeFile(path.join(tempDir, codeFile), code);
    await fs.writeFile(path.join(tempDir, inputFile), input);

    const dockerCommand = `
      docker run --rm -v ${tempDir}:/app sandbox:latest \
      timeout ${timeLimit}s sh -c "cd /app && ./run.sh ${codeFile} input.txt"
    `;

    const start = Date.now();

    return new Promise((resolve) => {
      exec(dockerCommand, { timeout: timeLimit * 1000 }, async (error, stdout, stderr) => {
        const end = Date.now();
        await fs.rm(tempDir, { recursive: true, force: true });

        resolve({
          stdout,
          stderr,
          time: (end - start) / 1000,
          memory: 0, // optional, hard to capture accurately here
        });
      });
    });
  } catch (err) {
    await fs.rm(tempDir, { recursive: true, force: true });
    throw err;
  }
};
