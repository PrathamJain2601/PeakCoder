"use client"

import { Search, Code, Send, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: <Search size={32} />,
    title: "Explore Problems",
    description: "Solve from hundreds of curated challenges across DSA.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Code size={32} />,
    title: "Write & Run Code",
    description: "Use our blazing-fast code editor with real-time execution feedback.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Send size={32} />,
    title: "Submit & Compete",
    description: "Test against all cases, view verdicts, and climb the leaderboard.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Track Your Progress",
    description: "Visualize your growth through detailed stats and solved history.",
    color: "from-orange-500 to-red-500",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-8 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How PeakCoder Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started in minutes and begin your journey to coding excellence
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent z-0"></div>
              )}

              {/* Card */}
              <div className="relative bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:scale-105 z-10">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
