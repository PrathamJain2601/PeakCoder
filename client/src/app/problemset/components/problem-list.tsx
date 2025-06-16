"use client"

import React, { useState, useMemo, useEffect } from "react"
import type { Problem, Difficulty } from "@/types/problem"
import ProblemRow from "./problem-row"
import { useFetchProblems } from "@/mutations/problemsQuery"
import toast from "react-hot-toast"

const ProblemList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">("All")

  let { data: problems = [], isLoading, error } = useFetchProblems();

  const filteredProblems = () => {
    return problems.filter((problem: Problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter
      return matchesSearch && matchesDifficulty
    })
  }

  console.log("Filtered Problems:", filteredProblems());

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading problems...</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 text-left">Problem</th>
            <th className="p-3 text-left">Difficulty</th>
            <th className="p-3 text-left">Tags</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems().map((problem, index) => (
            <ProblemRow key={problem.id} problem={problem} isEven={index % 2 === 0} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default React.memo(ProblemList)

