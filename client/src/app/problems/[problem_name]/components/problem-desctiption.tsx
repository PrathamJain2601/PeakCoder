import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Problem } from "@/types/problem";
import { LoadedTestCase } from "../description/page";

interface ProblemDescriptionProps {
  problem: Problem;
  loadedTestCases: LoadedTestCase[];
}

export default function ProblemDescription( { problem, loadedTestCases }: ProblemDescriptionProps) {
  // console.log("Problem Description Rendered", problem);
  const [activeTopics, setActiveTopics] = useState<string | null>(null)
  const [activeHints, setActiveHints] = useState<string | null>(null)

  console.log(problem);
  const toggleTopics = (section: string) => {
    setActiveTopics(activeTopics === section ? null : section)
  }
  const toggleHints = (section: string) => {
    setActiveHints(activeHints === section ? null : section)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "text-green-400"
      case "MEDIUM":
        return "text-yellow-400"
      case "HARD":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusFromSubmissions = () => {
    if (!problem.submissions || problem.submissions.length === 0) {
      return "Not Attempted";
    }
    const hasAccepted = problem.submissions.some((s) => s.verdict === "ACCEPTED");
    return hasAccepted ? "Accepted" : "Attempted";
  };

  const status = getStatusFromSubmissions();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "text-green-400";
      case "Attempted":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const tags = problem.tags.map(tag => tag.name); 

  return (
    <div className="h-full overflow-y-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
      <div className="mb-2 flex justify-between">
        <p className={`${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()}
        </p>
        <p className={`${getStatusColor(status)}`}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </p>
      </div>
      <div className="prose prose-invert">
        <p>
          {problem.statement}
        </p>
        {
          loadedTestCases.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Sample Test Cases</h2>
              <ul className="list-disc list-inside">
                {loadedTestCases.map((tc, index) => (
                  <li key={tc.id} className="mb-2">
                    <strong>Test Case {index + 1}:</strong>
                    <div className="mt-1">
                      <pre className="bg-gray-800 p-2 rounded mb-1">Input:<br />{tc.input}<br />Expected Output:<br />{tc.output}</pre>
                      {tc.explanation && (
                        <p className="text-gray-400 mt-1">Explanation: {tc.explanation}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
        {problem.constraints && 
          <>
            <h2 className="text-xl font-semibold mt-4 mb-2">Constraints:</h2>
            <pre>
              {problem.constraints}              
            </pre>        
          </>
        }        
            <pre>
              <b>Memory Limit:</b> {problem.memoryLimit}Kb
            </pre>
            <pre>
              <b>Time Limit:</b> {problem.timeLimit}s
            </pre>
      </div>
      <div className="mt-6">
        <Accordion
          title="Topics"
          content={tags || []}
          isOpen={activeTopics === "topics"}
          onClick={() => toggleTopics("topics")}
        />
        <Accordion
          title="Hints"
          content={problem.hints || []}
          isOpen={activeHints === "hints"}
          onClick={() => toggleHints("hints")}
        />
      </div>
    </div>
  )
}

function Accordion({
  title,
  content,
  isOpen,
  onClick,
}: {
  title: string
  content: string[]
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="mb-4">
      <button className="flex items-center justify-between w-full p-2 bg-gray-800 rounded" onClick={onClick}>
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="mt-2 p-2 bg-gray-800 rounded">
          <ol className="list-decimal list-inside">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

