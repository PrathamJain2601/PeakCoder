"use client"

import { useFetchLeaderboard } from "@/mutations/leaderboardQuery"

export default function LeaderboardTable() {

  const {data: users} = useFetchLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-2xl font-bold text-yellow-900">#{rank}</span>
      case 2:
        return <span className="text-2xl font-bold text-gray-600">#{rank}</span>
      case 3:
        return <span className="text-2xl font-bold text-amber-900">#{rank}</span>
      default:
        return <span className="text-2xl font-bold text-gray-400">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900"
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100"
      default:
        return ""
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getAvatarColor = () => {
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
    const index = Math.floor(Math.random() * colors.length);
    return colors[index]
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="bg-gray-750 px-6 py-4 border-b border-gray-700">
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
            <div className="col-span-2">Rank</div>
            <div className="col-span-1">Avatar</div>
            <div className="col-span-3">Username</div>
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Problems Solved</div>
          </div>
        </div>

        <div className="divide-y divide-gray-700">
          {users?.map((user) => (
            <div
              key={user.username}
              className={`px-6 py-4 hover:bg-gray-750 transition-colors ${
                user.rank <= 3 ? `${getRankBadge(user.rank)} hover:opacity-90` : ""
              }`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Rank */}
                <div className="col-span-2 flex items-center space-x-2">
                  {getRankIcon(user.rank)}
                  {/* {user.rank <= 3 && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        user.rank === 1 ? "text-yellow-900" : user.rank === 2 ? "text-gray-900" : "text-amber-100"
                      }`}
                    >
                      {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
                    </span>
                  )} */}
                </div>

                {/* Avatar */}
                <div className="col-span-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor()}`}
                  >
                    {getInitials(user.name)}
                  </div>
                </div>

                {/* Username */}
                <div className="col-span-3">
                  <span
                    className={`font-medium ${
                      user.rank <= 3
                        ? user.rank === 1
                          ? "text-yellow-900"
                          : user.rank === 2
                            ? "text-gray-900"
                            : "text-amber-100"
                        : "text-blue-400 hover:text-blue-300"
                    }`}
                  >
                    @{user.username}
                  </span>
                </div>

                {/* Name */}
                <div className="col-span-4">
                  <span
                    className={`${
                      user.rank <= 3
                        ? user.rank === 1
                          ? "text-yellow-900"
                          : user.rank === 2
                            ? "text-gray-900"
                            : "text-amber-100"
                        : "text-gray-200"
                    }`}
                  >
                    {user.name}
                  </span>
                </div>

                {/* Problems Solved */}
                <div className="col-span-2">
                  <span
                    className={`text-lg font-bold ${
                      user.rank <= 3
                        ? user.rank === 1
                          ? "text-yellow-900"
                          : user.rank === 2
                            ? "text-gray-900"
                            : "text-amber-100"
                        : "text-green-400"
                    }`}
                  >
                    {user.problemsSolved.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {users?.map((user) => (
          <div
            key={user.username}
            className={`p-4 rounded-lg border border-gray-700 ${
              user.rank <= 3 ? `${getRankBadge(user.rank)}` : "bg-gray-750"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              {/* <div className="flex items-center space-x-3">
                {user.rank <= 3 && (
                  <span className="text-lg">{user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}</span>
                )}
              </div> */}
              <span
                className={`text-xl font-bold ${
                  user.rank <= 3
                    ? user.rank === 1
                      ? "text-yellow-900"
                      : user.rank === 2
                        ? "text-gray-900"
                        : "text-amber-100"
                    : "text-green-400"
                }`}
              >
                {user.problemsSolved.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor()}`}
              >
                {getInitials(user.name)}
              </div>
              <div>
                <div
                  className={`font-medium ${
                    user.rank <= 3
                      ? user.rank === 1
                        ? "text-yellow-900"
                        : user.rank === 2
                          ? "text-gray-900"
                          : "text-amber-100"
                      : "text-blue-400"
                  }`}
                >
                  @{user.username}
                </div>
                <div
                  className={`text-sm ${
                    user.rank <= 3
                      ? user.rank === 1
                        ? "text-yellow-800"
                        : user.rank === 2
                          ? "text-gray-800"
                          : "text-amber-200"
                      : "text-gray-400"
                  }`}
                >
                  {user.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
