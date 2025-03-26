"use client"

import { useState } from "react"
import { Play, Send } from "lucide-react"

interface TestCasesProps {
  output: string
  onRun: () => void
  onSubmit: () => void
}

export default function TestCases({ output, onRun, onSubmit }: TestCasesProps) {
  const [activeTab, setActiveTab] = useState("testcase1")

  const testCases = [
    { id: "testcase1", input: "nums = [2,7,11,15], target = 9" },
    { id: "testcase2", input: "nums = [3,2,4], target = 6" },
    { id: "testcase3", input: "nums = [3,3], target = 6" },
  ]

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="flex border-b border-gray-700">
        {testCases.map((testCase) => (
          <button
            key={testCase.id}
            className={`px-4 py-2 ${activeTab === testCase.id ? "bg-gray-700 text-white" : "text-gray-400"}`}
            onClick={() => setActiveTab(testCase.id)}
          >
            {testCase.id}
          </button>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <h3 className="text-lg font-semibold mb-2">Input:</h3>
        <pre className="bg-gray-900 p-2 rounded mb-4">{testCases.find((tc) => tc.id === activeTab)?.input}</pre>
        <h3 className="text-lg font-semibold mb-2">Output:</h3>
        <pre className="bg-gray-900 p-2 rounded">{output}</pre>
      </div>
      <div className="flex justify-end p-4 border-t border-gray-700">
        <button
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
          onClick={onRun}
        >
          <Play size={16} className="mr-2" />
          Run
        </button>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={onSubmit}
        >
          <Send size={16} className="mr-2" />
          Submit
        </button>
      </div>
    </div>
  )
}

