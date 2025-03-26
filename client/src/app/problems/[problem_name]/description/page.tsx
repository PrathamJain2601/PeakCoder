"use client"

import { useState } from "react"
import ProblemDescription from "../components/problem-desctiption"
import CodeEditor from "../components/code-editor"
import TestCases from "../components/test-cases"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

function Page() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [output, setOutput] = useState("")

  const handleRunCode = () => {
    // Implement code execution logic here
    setOutput("Code execution result will be displayed here.")
  }

  const handleSubmitCode = () => {
    // Implement code submission logic here
    setOutput("Code submission result will be displayed here.")
  }

  return (
    <div className="bg-gray-900 h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border flex h-full bg-gray-900 text-white"
      >
        <ResizablePanel defaultSize={25}>
          <ProblemDescription />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={65}>
              <CodeEditor code={code} language={language} onChange={setCode} onLanguageChange={setLanguage} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35}>
              <TestCases output={output} onRun={handleRunCode} onSubmit={handleSubmitCode} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Page;
