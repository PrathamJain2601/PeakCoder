"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Play, Code, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
      <div className="absolute inset-0 px-4 sm:px-6 lg:px-12">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto py-20 relative z-10 px-8 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
  
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm">
              <Zap size={16} className="text-blue-400" />
              <span className="text-blue-300">New: Real-time Code Execution</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Master
              </span>
              <br />
              <span className="text-white">Competitive</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Programming
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Elevate Your Coding Skills with PeakCoder. Join thousands of coders improving their algorithmic thinking,
              speed, and problem-solving with our intuitive, real-time coding platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
              onClick={()=> {router.push('/auth')}}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="flex items-center space-x-2">
                  <span>{"Get Started — It's Free"}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
              onClick={()=>{router.push('/problemset')}}
              className="group border-2 border-gray-600 hover:border-blue-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-blue-500/10">
                <span className="flex items-center space-x-2">
                  <Play size={20} />
                  <span>Explore Problemset</span>
                </span>
              </button>
            </div>

            <div className="flex space-x-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-blue-400">1000+</div>
                <div className="text-gray-400">Problems</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">50K+</div>
                <div className="text-gray-400">Submissions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-400">5K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                    <div className="flex space-x-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="text-purple-400">
                        function <span className="text-blue-400">twoSum</span>(
                        <span className="text-orange-400">nums, target</span>) {"{"}
                      </div>
                      <div className="text-gray-400 ml-4">const map = new Map();</div>
                      <div className="text-gray-400 ml-4">
                        for (let i = 0; i {"<"} nums.length; i++) {"{"}
                      </div>
                      <div className="text-green-400 ml-8">// Solution logic here</div>
                      <div className="text-gray-400 ml-4">{"}"}</div>
                      <div className="text-purple-400">{"}"}</div>
                    </div>
                  </div>

                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-semibold">Accepted</span>
                      <span className="text-gray-400">• Runtime: 68ms</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-blue-500 p-3 rounded-xl shadow-lg animate-bounce">
                <Code size={24} className="text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-500 p-3 rounded-xl shadow-lg animate-bounce delay-1000">
                <Zap size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
