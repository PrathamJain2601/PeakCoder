"use client"

import { useState } from "react"
import { Clock, Cpu, HardDrive, ExternalLink, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFetchRecentSubmissions } from "@/mutations/recentSubmissionsQuery"
import { Verdict } from "@/types/problem"
import { getVerdictColorProfile, timeAgo, verdictToText } from "@/lib/utilityFunction"

interface Submission {
  id: string
  problemName: string
  problemUrl: string
  verdict: Verdict
  language: string
  runtime: number
  memory: number
  submissionTime: string
  isRecent?: boolean
}

export default function RecentSubmissions() {
  const [filter, setFilter] = useState<string>("all")
  const router = useRouter()
  const { data, isLoading } = useFetchRecentSubmissions()

  const submissions: Submission[] = Array.isArray(data)
    ? data.map((e) => ({
        id: e.id,
        problemName: e.problem?.title || "Untitled",
        problemUrl: `/problems/${e.problem.id}`,
        verdict: e.status,
        language: e.language?.name || "unknown",
        runtime: e.executionTime,
        memory: e.memoryUsed,
        submissionTime: new Date(e.createdAt).toLocaleString(),
      }))
    : []

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === "all") return true
    return submission.verdict === filter
  })

  const handleViewSubmission = (submissionId: string) => {
    router.push(`/submission/${submissionId}`)
  }

  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case "c":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "python":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "java":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "c++":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  if (isLoading) {
    return <div>Loading recent submissions...</div>
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Recent Submissions</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Submissions</option>
          <option value="Accepted">Accepted</option>
          <option value="Wrong Answer">Wrong Answer</option>
          <option value="Time Limit Exceeded">Time Limit Exceeded</option>
          <option value="Runtime Error">Runtime Error</option>
        </select>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="bg-gray-750 px-6 py-3 border-b border-gray-700">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
            <div className="col-span-2">Status</div>
            <div className="col-span-3">Problem</div>
            <div className="col-span-2">Language</div>
            <div className="col-span-1">Runtime</div>
            <div className="col-span-1">Memory</div>
            <div className="col-span-2">Submitted</div>
            <div className="col-span-1">Action</div>
          </div>
        </div>

        <div className="divide-y divide-gray-700">
          {filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className={`px-6 py-4 hover:bg-gray-750 transition-colors ${
                submission.isRecent ? "bg-blue-500/5 border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="grid grid-cols-12 gap-4 items-center text-sm">
                <div className="col-span-2">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getVerdictColorProfile(submission.verdict)}`}
                  >
                    {verdictToText(submission.verdict)}
                  </div>
                </div>

                <div className="col-span-3">
                  <a
                    href={submission.problemUrl}
                    className="text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1 group"
                  >
                    <span>{submission.problemName}</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="col-span-2">
                  <div
                    className={`px-2 py-1 rounded border text-xs font-medium ${getLanguageColor(submission.language)}`}
                  >
                    {submission.language}
                  </div>
                </div>

                <div className="col-span-1">
                  {submission.verdict === "ACCEPTED" ? (
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Cpu size={12} />
                      <span>{submission.runtime}s</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                <div className="col-span-1">
                  {submission.verdict === "ACCEPTED" ? (
                    <div className="flex items-center space-x-1 text-gray-300">
                      <HardDrive size={12} />
                      <span>{submission.memory}mb</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                <div className="col-span-2">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock size={12} />
                    <span>{timeAgo(submission.submissionTime)}</span>
                  </div>
                </div>

                <div className="col-span-1">
                  <button
                    onClick={() => handleViewSubmission(submission.id)}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                    title="View submission details"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <div className="text-gray-400 text-lg mb-2">No submissions found</div>
          <div className="text-gray-500 text-sm">Try adjusting your filter or submit some solutions!</div>
        </div>
      )}
    </div>
  )
}
