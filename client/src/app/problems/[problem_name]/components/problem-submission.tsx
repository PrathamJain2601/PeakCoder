"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Clock, Cpu, HardDrive } from "lucide-react"
import { Submission } from "@/types/problem"
import {timeAgo, languageIdToName, getVerdictColor, getVerdictBg, verdictToText} from "@/lib/utilityFunction"

type submissionProp = {
    submissions?: Submission[] 
}

export default function ProblemSubmission({submissions}: submissionProp) {
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null)
  const [loadingCode, setLoadingCode] = useState<string | null>(null)

  const handleSubmissionClick = async (submissionId: string) => {
    if (expandedSubmission === submissionId) {
      setExpandedSubmission(null)
      return
    }

    setLoadingCode(null)
    setExpandedSubmission(submissionId)
  }

  if(!submissions || submissions.length === 0){ 
        return (<div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No submissions yet</div>
          <div className="text-gray-500 text-sm">Submit your solution to see your submission history here.</div>
        </div>)
    }

    const sortedSubmissions = [...submissions].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Your Submissions</h2>

      <div className="space-y-3">
        {sortedSubmissions.map((submission) => (
          <div key={submission.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div
              className={`p-4 cursor-pointer hover:bg-gray-750 transition-colors ${getVerdictBg(submission.status)} border-l-4`}
              onClick={() => handleSubmissionClick(submission.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {expandedSubmission === submission.id ? (
                      <ChevronDown size={16} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-400" />
                    )}
                  </div>

                  <div className={`font-semibold ${getVerdictColor(submission.status)}`}>{verdictToText(submission.status)}</div>

                  <div className="text-gray-300 font-medium">{languageIdToName(submission.languageId)}</div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{timeAgo(submission.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {expandedSubmission === submission.id && (
              <div className="border-t border-gray-700 bg-gray-900">
                
                <div className="p-4">
                    <div className="flex items-center gap-x-2">
                        <Cpu size={14} />
                        Runtime
                        <span>{submission.executionTime}s</span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <HardDrive size={14} />
                        Memory
                        <span>{submission.memoryUsed}mb</span>
                    </div>
                  <h4 className="text-sm font-medium text-gray-300 my-3">Submitted Code:</h4>
                  {loadingCode === submission.id ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300"></div>
                        <span className="text-sm">Loading code...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                        <code>{submission.sourceCodeFileUrl}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
