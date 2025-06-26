"use client"

import { Code, Zap, TestTube, BarChart3, Trophy, BookOpen } from "lucide-react"

const features = [
  {
    icon: <Code size={32} />,
    title: "Code in Multiple Languages",
    description: "Python, C++, Java, and more. No need for setup.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Zap size={32} />,
    title: "Fast, Accurate Judge",
    description: "Submissions processed in real-time with accurate verdicts.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <TestTube size={32} />,
    title: "Rich Test Cases",
    description: "Hidden and sample test cases for every problem.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Detailed Analytics",
    description: "Track your acceptance rate, strengths, and improvement.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Trophy size={32} />,
    title: "Competitive Leaderboards",
    description: "Climb ranks and earn badges among top coders.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: <BookOpen size={32} />,
    title: "Diverse Problem Bank",
    description: "From basic loops to advanced DP and graphs.",
    color: "from-indigo-500 to-purple-500",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-8 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Why Choose PeakCoder?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to excel in competitive programming
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 h-full hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
