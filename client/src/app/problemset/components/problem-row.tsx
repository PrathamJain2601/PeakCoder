"use client"

import React from "react"
import type { Problem } from "@/types/problem"
import Link from "next/link"

interface ProblemRowProps {
  problem: Problem
  isEven: boolean
}

const ProblemRow: React.FC<ProblemRowProps> = React.memo(({ problem, isEven }) => {
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
    const hasAccepted = problem.submissions.some((s) => s.status === "ACCEPTED");
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
        return "text-gray-400"; // Not Attempted
    }
  };

  return (
    <tr className={`${isEven ? "bg-gray-700" : "bg-gray-800"} transition-colors`}>
      <td className="p-3">
        <Link
          href={`/problems/${problem.id}/description`}
          className="text-white hover:underline hover:text-blue-400"
        >
          {problem.title}
        </Link>
      </td>
      <td className={`p-3 ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</td>
      <td className="p-3">
        {problem.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-700 rounded-full px-2 py-1 text-xs mr-2 mb-2">
            {tag.name}
          </span>
        ))}
      </td>
      <td className={`p-3 ${getStatusColor(status)}`}>{status}</td>
    </tr>
  )
})

ProblemRow.displayName = "ProblemRow"

export default ProblemRow

