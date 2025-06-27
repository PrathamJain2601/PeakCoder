"use client"
import Navbar from "@/components/navbar"
import LeaderboardTable from "./leaderboard-table"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">Top 50 Coders Ranked by Problems Solved</p>
        </div>
        <LeaderboardTable />
      </main>
    </div>
  )
}
