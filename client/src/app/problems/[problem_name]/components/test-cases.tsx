"use client"

import { useEffect, useState } from "react"
import { LoadedTestCase } from "../page"
import RunButton from "./run-button"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import SubmitButton from "./submit-button"
import { verdictToText } from "@/lib/utilityFunction"
interface TestCasesProps {
  loadedTestCases: LoadedTestCase[]
}

export default function TestCases({ loadedTestCases }: TestCasesProps) {
  const [activeTab, setActiveTab] = useState<string>("")
  const run = useSelector((state: RootState) => state.code.run);
  const [verdict, setVerdict] = useState<string>("");
  const [runPending, setRunPending] = useState<boolean> (false);

  useEffect(()=> {
    setRunPending(false);
    console.log("entered");
    console.log("testcaseLength", loadedTestCases.length);
    console.log(run); 
    console.log("runLength", run.length);
    if(run.length != loadedTestCases.length){
      setVerdict("");
      return;
    }
    const check = run.find((e)=> e.verdict != "ACCEPTED");
    if(check){
      setVerdict(verdictToText(check.verdict));
    }
    else{
      setVerdict("Accepted");
    }
  }, [run, loadedTestCases]);


  useEffect(() => {
    if (loadedTestCases.length > 0) {
      setActiveTab(loadedTestCases[0].id);
    }
  }, [loadedTestCases]);

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="flex border-b border-gray-700 px-4 py-2">
        <h1
          className={`text-xl font-bold ${
            verdict === "Accepted" ? "text-green-400" : "text-red-400"
          }`}
        >
          {verdict}
        </h1>
      </div>
      <div className="flex border-b border-gray-700">
        {loadedTestCases.map((testCase, index) => (
          <button
            key={testCase.id}
            className={`px-4 py-2 ${activeTab === testCase.id ? "bg-gray-700 text-white" : "text-gray-400"}`}
            onClick={() => setActiveTab(testCase.id)}
          >
            Test {index + 1}
          </button>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <h3 className="text-lg font-semibold mb-2">Input:</h3>
        <pre className="bg-gray-900 p-2 rounded mb-4">{loadedTestCases.find((tc) => tc.id === activeTab)?.input}</pre>
        <h3 className="text-lg font-semibold mb-2">Expected Output:</h3>
        <pre className="bg-gray-900 p-2 rounded mb-4">{loadedTestCases.find((tc) => tc.id === activeTab)?.output}</pre>
        <h3 className="text-lg font-semibold mb-2">Output:</h3>
        <pre className="bg-gray-900 p-2 rounded">{run.find((tc)=> tc.testcaseId
         === activeTab)?.stdout || run.find((tc)=> tc.testcaseId === activeTab)?.stderr}</pre>
      </div>
      <div className="flex justify-end p-4 border-t border-gray-700">
        <RunButton runPending={runPending} setRunPending={setRunPending} />
        <SubmitButton />
      </div>
    </div>
  )
}

