"use client"
import { Suspense, useEffect } from "react"
import ProblemList from "./components/problem-list"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

function Page() {
  const router = useRouter()
      const user = useSelector((state: RootState)=> state.user.user)
    useEffect(() => {
      if(user?.id == undefined || user?.isVerified == false || user?.id == null || user?.isVerified == null){
        router.push("/auth")
      }
    }, [user, router])
  
    if (!user) return null 
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