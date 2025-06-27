"use client"

import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Clock,
  Cpu,
  HardDrive
} from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useFetchRecentSubmissions } from "@/mutations/recentSubmissionsQuery"
import { RecentSubmissions } from "@/types/user"
import { getVerdictColorProfile, getVerdictIcon } from "@/lib/utilityFunction"

export default function SubmissionDetailsPage() {
  const params = useParams()
  const router = useRouter()
      const user = useSelector((state: RootState)=> state.user.user?.id)
    useEffect(() => {
      if (!user) {
        router.push("/auth")
      }
    }, [user, router])
  
    const submissionId = params.id as string
    
    const storedSubmissions = useSelector(
      (state: RootState) => state.user.recentSubmissions
    )
    const [submission, setSubmission] = useState<RecentSubmissions | null>(null)
  const { data, isLoading } = useFetchRecentSubmissions()
  
  useEffect(() => {
    if (storedSubmissions && storedSubmissions.length > 0) {
      const found = storedSubmissions.find((s) => s.id === submissionId)
      if (found) {
        setSubmission(found)
        return
      }
    }
    // fallback if not found in redux
    if (!isLoading && data) {
      const found = data.find((s) => s.id === submissionId)
      if (found) {
        setSubmission(found)
      }
    }
  }, [storedSubmissions, data, isLoading, submissionId])
  
  
  const getLanguageExtension = (language: string) => {
    switch (language.toLowerCase()) {
      case "javascript":
        return "javascript"
      case "python":
        return "python"
        case "java":
          return "java"
          case "c++":
            return "cpp"
            default:
              return "text"
            }
          }
          
          if (!user) return null 
          if (!submission) {
            return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Submission Not Found</h1>
          <p className="text-gray-400 mb-4">{"The submission you're looking for doesn't exist."}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mr-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">Submission Details</h1>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              {getVerdictIcon(submission.status)}
              <div>
                <h2 className="text-xl font-semibold">{submission.problem.title}</h2>
                <div
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getVerdictColorProfile(submission.status)}`}
                >
                  {submission.status}
                </div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{new Date(submission.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-750 rounded-lg p-4">
              <div className="text-gray-400 text-sm">Language</div>
              <div className="text-white font-semibold">{submission.language.name}</div>
            </div>

            <div className="bg-gray-750 rounded-lg p-4">
              <div className="text-gray-400 text-sm flex items-center space-x-1">
                <Cpu size={14} />
                <span>Runtime</span>
              </div>
              <div className="text-white font-semibold">
                {submission.status === "ACCEPTED" ? submission.executionTime + " ms" : "N/A"}
              </div>
            </div>

            <div className="bg-gray-750 rounded-lg p-4">
              <div className="text-gray-400 text-sm flex items-center space-x-1">
                <HardDrive size={14} />
                <span>Memory</span>
              </div>
              <div className="text-white font-semibold">
                {submission.status === "ACCEPTED" ? submission.memoryUsed + " KB" : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-750 px-6 py-3 border-b border-gray-700">
            <h3 className="text-lg font-semibold">Source Code</h3>
          </div>
          <div className="p-0">
            <SyntaxHighlighter
              language={getLanguageExtension(submission.language.name)}
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
                backgroundColor: "transparent",
              }}
              showLineNumbers={true}
            >

              {`// Source code not loaded. Fetch from:\n${submission.sourceCodeFileUrl}`}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  )
}
