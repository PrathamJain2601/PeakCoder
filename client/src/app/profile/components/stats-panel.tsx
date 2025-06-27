import type React from "react"
import { BookOpen, Send, CheckCircle, Trophy } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { lazy, Suspense } from "react";
import { useFetchStatistics } from "@/mutations/statisticsQuery";
const UserCard = lazy(() => import("./user-card"));

interface StatCard {
  title: string
  value ?: number | string
  icon: React.ReactNode
  color: string 
  bgColor: string
}

interface DifficultyData {
  name: string
  value?: number
  color: string
}

const statsData: StatCard[] = [
  {
    title: "Problems Solved",
    icon: <BookOpen size={20} />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Total Submissions",
    icon: <Send size={20} />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Acceptance Rate",
    icon: <CheckCircle size={20} />,
    color: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/20",
  },
  {
    title: "LeaderBoard Rank",
    icon: <Trophy size={20} />,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/20",
  },
]

export default function StatsPanel() {

  const { data: statistics = null, isLoading } = useFetchStatistics();

  if(isLoading) return (<>Loading Statistics...</>)
  const chartData: DifficultyData[] = [
      { name: "Easy", value: statistics?.easy || 0, color: "#10B981" },
      { name: "Medium", value: statistics?.medium || 0, color: "#F59E0B" },
      { name: "Hard", value: statistics?.hard || 0, color: "#EF4444" },
    ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Stats Cards */}
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="text-gray-400 mb-4">Loading profile...</div>}>
            <UserCard />
          </Suspense>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard title={statsData[0].title} value={statistics?.problemsSolved} icon={statsData[0].icon} color={statsData[0].color} bgColor={statsData[0].bgColor} />
            <StatCard title={statsData[1].title} value={statistics?.totalSubmissions} icon={statsData[1].icon} color={statsData[1].color} bgColor={statsData[1].bgColor} />
            <StatCard title={statsData[2].title} value={statistics?.acceptanceRate + "%"} icon={statsData[2].icon} color={statsData[2].color} bgColor={statsData[2].bgColor} />
            <StatCard title={statsData[3].title} value={"#"+statistics?.rank} icon={statsData[3].icon} color={statsData[3].color} bgColor={statsData[3].bgColor} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-100">Problems by Difficulty</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                   {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend className="text-white"
                  wrapperStyle={{
                    fontSize: "14px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color, bgColor }: StatCard) {
  return (
    <div
      className={`p-4 rounded-lg border ${bgColor} cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`${color} group-hover:scale-110 transition-transform duration-200`}>{icon}</div>
      </div>
    </div>
  )
}
