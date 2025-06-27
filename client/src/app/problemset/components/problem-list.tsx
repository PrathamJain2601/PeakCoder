"use client"

import React, { useMemo } from "react"
import ProblemRow from "./problem-row"
import { useFetchProblems } from "@/mutations/problemsQuery"

const ProblemList: React.FC = () => {
  const { data: problems = [], isLoading } = useFetchProblems()
  
  if (isLoading) {
    return <div className="text-center text-gray-500">Loading problems...</div>
  }
  
  console.log(problems);
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left">Problem</th>
            <th className="p-3 text-left">Difficulty</th>
            <th className="p-3 text-left">Tags</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <ProblemRow key={problem.id} problem={problem} isEven={index % 2 === 0} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default React.memo(ProblemList)
