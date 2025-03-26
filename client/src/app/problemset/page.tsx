import { Suspense, useState } from "react"
import ProblemList from "./components/problem-list"
import SearchBar from "./components/search-bar"
import DifficultyFilter from "./components/difficulty-filter"
import StatusFilter from "./components/status-filter"
import TagsFilter from "./components/tags-filter"

function Page() {
  return (
    <div> 
      <h1 className="text-3xl font-bold mb-6">Problem Set</h1>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <SearchBar />
        <DifficultyFilter />
        <StatusFilter />
        <TagsFilter />
      </div>
      <Suspense fallback={<div>Loading problems...</div>}>
        <ProblemList />
      </Suspense>
    </div>
  )
}

export default Page