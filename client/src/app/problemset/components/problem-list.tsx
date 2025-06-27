"use client"

import React from "react"
import type { Problem } from "@/types/problem"
import ProblemRow from "./problem-row"
import { useFetchProblems } from "@/mutations/problemsQuery"

const ProblemList: React.FC = () => {
   
  // const [searchTerm, setSearchTerm] = useState("")
  // const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">("All")

  const { data: problems = [], isLoading } = useFetchProblems();

  const filteredProblems = () => {
    return problems.filter((problem: Problem) => {
      console.log(problem)
      // const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase())
      // const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter
      // return matchesSearch && matchesDifficulty
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

