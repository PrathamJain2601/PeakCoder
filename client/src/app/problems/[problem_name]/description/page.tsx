"use client"

import { useEffect, useState } from "react"
import ProblemDescription from "../components/problem-desctiption"
import CodeEditor from "../components/code-editor"
import TestCases from "../components/test-cases"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useParams } from "next/navigation"
import { useFetchProblem } from "@/mutations/problemQuery"
import { useFetchTestcase } from "@/mutations/testcaseQuery"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { TestCase } from "@/types/problem"

export interface LoadedTestCase {
  id: string
  input: string
  output: string 
  explanation?: string | null;
}

function Page() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [output, setOutput] = useState("")
  const { problem_name: id } = useParams();

  const problemId = Array.isArray(id) ? id[0] : id;

  const { data: problem, isLoading, error } = useFetchProblem(problemId);
  const { mutateAsync: fetchTestcases } = useFetchTestcase();
  const sampleTestcases = useSelector((state: RootState) => state.problem.selectedTestcase);
  const [loadedTestCases, setLoadedTestCases] = useState<LoadedTestCase[]>([])

  useEffect(() => {
    const loadTestCases = async () => {
      try {
        if(sampleTestcases == null || sampleTestcases.length === 0) return;
        const cases: LoadedTestCase[] = await Promise.all(
          sampleTestcases.map(async (tc: TestCase) => {
            const [inputRes, outputRes] = await Promise.all([
              fetch(tc.inputFileUrl),
              fetch(tc.outputFileUrl),
            ])
            const input = await inputRes.text()
            const output = await outputRes.text()
            return {
              id: tc.id,
              input,
              output,
              explanation: tc.explanation || null,
            }
          })
        )
        setLoadedTestCases(cases)
      } catch (err) {
        console.error("Failed to load testcases:", err)
      }
    }

    loadTestCases()
  }, [sampleTestcases])

  useEffect(() => {
    if (problem?.id) {
      fetchTestcases(problem.id);
    }
  }, [problem?.id]);

  if (isLoading) return <div>Loading problem...</div>
  if (error) return <div>Error: {(error as Error).message}</div>
  if (!problem) return <div>No problem found</div>

  const handleRunCode = () => {
    setOutput("Code execution result will be displayed here.")
  }

  const handleSubmitCode = () => {
    setOutput("Code submission result will be displayed here.")
  }

  return (
    <div className="bg-gray-900 h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border flex h-full bg-gray-900 text-white"
      >
        <ResizablePanel defaultSize={25}>
          <ProblemDescription problem={problem} loadedTestCases={loadedTestCases} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={65}>
              <CodeEditor
                code={code}
                language={language}
                onChange={setCode}
                onLanguageChange={setLanguage}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35}>
              <TestCases loadedTestCases={loadedTestCases} output={output} onRun={handleRunCode} onSubmit={handleSubmitCode} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Page
