"use client"
import { Suspense } from "react"
import ProblemList from "./components/problem-list"

function Page() {

  return (
    <div className="p-4 md:p-8"> 
      <h1 className="text-3xl font-bold mb-6">Problem Set</h1>
      {/* <div className="mb-6 flex flex-col md:flex-row gap-4">
        <SearchBar />
        <DifficultyFilter />
        <StatusFilter />
        <TagsFilter />
      </div> */}
      <Suspense fallback={<div>Loading problems...</div>}>
        <ProblemList />
      </Suspense>
    </div>
  )
}

export default Page