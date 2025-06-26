"use client"

import { ArrowRight, Play } from "lucide-react"
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const router = useRouter();
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">Ready to Level Up Your Coding?</h2>

          {/* Subtext */}
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
            Join now and start your journey toward coding excellence.
            <br />
            Thousands of problems await, and your next breakthrough is just one submission away.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white">1000+</div>
              <div className="text-blue-200">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white">50K+</div>
              <div className="text-blue-200">Submissions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white">5K+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
            onClick={()=>{router.push("/auth")}}
            className="group bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            {/* <button className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
              <span className="flex items-center space-x-2">
                <Play size={20} />
                <span>Try a Demo Problem</span>
              </span>
            </button> */}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-blue-200">
            <p className="text-sm">✨ Free to start • 🚀 No setup required • 💯 Trusted by 5,000+ coders</p>
          </div>
        </div>
      </div>
    </section>
  )
}
