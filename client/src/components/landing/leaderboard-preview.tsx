"use client"

import { Trophy, Medal, Award, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const topUsers = [
  { rank: 1, username: "alexcode", name: "Alex Johnson", problems: 847, avatar: "AJ" },
  { rank: 2, username: "sarahdev", name: "Sarah Chen", problems: 823, avatar: "SC" },
  { rank: 3, username: "mikecoder", name: "Michael Rodriguez", problems: 791, avatar: "MR" },
  { rank: 4, username: "emilyalgo", name: "Emily Davis", problems: 756, avatar: "ED" },
  { rank: 5, username: "davidtech", name: "David Kim", problems: 734, avatar: "DK" },
  { rank: 6, username: "jessicajs", name: "Jessica Wang", problems: 712, avatar: "JW" },
  { rank: 7, username: "ryanpython", name: "Ryan Thompson", problems: 698, avatar: "RT" },
  { rank: 8, username: "lisacpp", name: "Lisa Zhang", problems: 675, avatar: "LZ" },
]

export default function LeaderboardPreview() {
  const router = useRouter();
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" size={20} />
      case 2:
        return <Medal className="text-gray-300" size={20} />
      case 3:
        return <Award className="text-amber-600" size={20} />
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>
    }
  }

  const getAvatarColor = (username: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ]
    return colors[username.length % colors.length]
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {"Who's Leading Today?"}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See where you stand among the top competitive programmers
          </p>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-white">
                <div className="col-span-2">Rank</div>
                <div className="col-span-1">Avatar</div>
                <div className="col-span-4">Username</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Problems</div>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-700">
              {topUsers.map((user) => (
                <div
                  key={user.username}
                  className={`px-6 py-4 hover:bg-gray-750 transition-colors ${
                    user.rank <= 3 ? "bg-gradient-to-r from-yellow-500/5 to-orange-500/5" : ""
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-2 flex items-center space-x-2">
                      {getRankIcon(user.rank)}
                      {user.rank <= 3 && (
                        <span className="text-sm">{user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}</span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="col-span-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(user.username)}`}
                      >
                        {user.avatar}
                      </div>
                    </div>

                    {/* Username */}
                    <div className="col-span-4">
                      <span className="text-blue-400 font-medium">@{user.username}</span>
                    </div>

                    {/* Name */}
                    <div className="col-span-3">
                      <span className="text-gray-200">{user.name}</span>
                    </div>

                    {/* Problems */}
                    <div className="col-span-2">
                      <span className="text-green-400 font-bold text-lg">{user.problems}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <button 
            onClick={()=> {router.push('/leaderboard')}}
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center space-x-2">
                <span>View Full Leaderboard</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
