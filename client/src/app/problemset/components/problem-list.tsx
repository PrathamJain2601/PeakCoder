"use client"

import React, { useState, useMemo } from "react"
import type { Problem, Difficulty } from "@/types/problem"
import ProblemRow from "./problem-row"

// Mock data
const mockProblems: Problem[] = [
  {
    id: 1,
    name: "Two Sum",
    difficulty: "Easy",
    acceptanceRate: 47.5,
    tags: ["Array", "Hash Table"],
    status: "Solved",
  },
  {
    id: 2,
    name: "Add Two Numbers",
    difficulty: "Medium",
    acceptanceRate: 35.8,
    tags: ["Linked List", "Math"],
    status: "Attempted",
  },
  {
    id: 3,
    name: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptanceRate: 32.1,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    status: "Not Attempted",
  },
  // Add more mock problems here...
]

const ProblemList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">("All")

  const filteredProblems = useMemo(() => {
    return mockProblems.filter((problem) => {
      const matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter
      return matchesSearch && matchesDifficulty
    })
  }, [searchTerm, difficultyFilter])

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 text-left">Problem</th>
            <th className="p-3 text-left">Difficulty</th>
            <th className="p-3 text-left">Acceptance</th>
            <th className="p-3 text-left">Tags</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map((problem, index) => (
            <ProblemRow key={problem.id} problem={problem} isEven={index % 2 === 0} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default React.memo(ProblemList)

