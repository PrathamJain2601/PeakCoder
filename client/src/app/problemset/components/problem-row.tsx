"use client"

import React from "react"
import type { Problem } from "@/types/problem"

interface ProblemRowProps {
  problem: Problem
  isEven: boolean
}

const ProblemRow: React.FC<ProblemRowProps> = React.memo(({ problem, isEven }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "Hard":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Solved":
        return "text-green-400"
      case "Attempted":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <tr className={`${isEven ? "bg-gray-700" : "bg-gray-800"} transition-colors`}>
      <td className="p-3">
        <a href={`/problem/${problem.id}`} className="text-white hover:underline hover:text-blue-400">
          {problem.name}
        </a>
      </td>
      <td className={`p-3 ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</td>
      <td className="p-3">{problem.acceptanceRate.toFixed(1)}%</td>
      <td className="p-3">
        {problem.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-700 rounded-full px-2 py-1 text-xs mr-2 mb-2">
            {tag}
          </span>
        ))}
      </td>
      <td className={`p-3 ${getStatusColor(problem.status)}`}>{problem.status}</td>
    </tr>
  )
})

ProblemRow.displayName = "ProblemRow"

export default ProblemRow

