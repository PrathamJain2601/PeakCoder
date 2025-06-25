"use client"

import { useEffect, useState } from "react"
import ProblemDescription from "./components/problem-desctiption"
import ProblemSubmission from "./components/problem-submission"
import CodeEditor from "./components/code-editor"
import TestCases from "./components/test-cases"
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
import { connectSocket, getSocket } from "@/lib/socket"

export interface LoadedTestCase {
  id: string
  input: string
  output: string 
  explanation?: string | null;
}

function Page() {
  const { problem_name: id } = useParams();

  const problemId = Array.isArray(id) ? id[0] : id;

  const { data: problem, isLoading, error } = useFetchProblem(problemId);
  const { mutateAsync: fetchTestcases } = useFetchTestcase();
  const sampleTestcases = useSelector((state: RootState) => state.problem.selectedTestcase);
  const submissions = useSelector((state: RootState) => state.problem.selectedProblem?.submissions)
  const [submitPending, setSubmitPending] = useState<boolean> (false);
  const [loadedTestCases, setLoadedTestCases] = useState<LoadedTestCase[]>([])
  const [activeTab, setActiveTab] = useState<string>("description");
  const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
      console.log("came here", user.user?.id);
      console.log("socket", getSocket());
  
      if (user.user?.id && (!getSocket() || !getSocket()?.connected)
      ) {
        console.log("🔌 Reconnecting socket after page load...");
        connectSocket(user.user?.id);
      }
    }, [user]);
  
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

  useEffect(()=> {
    setSubmitPending(true);
    setActiveTab("submissions");
  }, [submissions])

  useEffect(() => {
    if (problem?.id) {
      fetchTestcases(problem.id);
    }
  }, [problem?.id]);

  useEffect(()=>{
    console.log("Loaded Test Cases:", loadedTestCases)
  }, [loadedTestCases])

  if (isLoading) return <div>Loading problem...</div>
  if (error) return <div>Error: {(error as Error).message}</div>
  if (!problem) return <div>No problem found</div>

  const handleRunCode = () => {
    console.log("Running code with:")
  }

  const handleSubmitCode = () => {
    console.log("Submitting code with:")
  }

  return (
    <div className="bg-gray-900 h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border flex h-full bg-gray-900 text-white"
      >
        <ResizablePanel defaultSize={35} className="pb-10">
          <div className="flex border-b border-gray-700 bg-gray-800">
            <button
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "description"
                  ? "text-white border-b-2 border-blue-500 bg-gray-700"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "submissions"
                  ? "text-white border-b-2 border-blue-500 bg-gray-700"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("submissions")}
            >
              Submissions
            </button>
          </div>
            {activeTab === "description" ? 
            <ProblemDescription problem={problem} loadedTestCases={loadedTestCases} /> : 
            <ProblemSubmission submissions={submissions} />}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={65}>
              <CodeEditor />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35}>
              <TestCases loadedTestCases={loadedTestCases} onRun={handleRunCode} onSubmit={handleSubmitCode} submitPending={submitPending} setSubmitPending={setSubmitPending} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Page
