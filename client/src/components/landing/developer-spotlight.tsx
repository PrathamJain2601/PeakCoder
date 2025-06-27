"use client"

import { Github, Linkedin, ExternalLink, Code, Database, Globe } from "lucide-react"

const techStack = [
  { name: "Next", color: "bg-blue-500" },
  { name: "TypeScript", color: "bg-blue-600" },
  { name: "Node.js", color: "bg-green-600" },
  { name: "PostgreSQL", color: "bg-blue-700" },
  { name: "Docker", color: "bg-blue-800" },
  { name: "RabbitMQ", color: "bg-cyan-500" },
]

export default function DeveloperSpotlight() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Built with Passion by a Fellow Coder
            </span>
          </h2>
          <p className="text-xl text-gray-400">
           {"Hi, I'm Pratham Jain — I built PeakCoder to help coders like you grow faster."}
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Photo */}
            <div className="relative">
              <div className="relative z-10">
                {/* Profile Image Placeholder */}
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                  PJ
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute -top-4 -right-4 bg-blue-500 p-3 rounded-xl shadow-lg animate-bounce">
                  <Code size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-purple-500 p-3 rounded-xl shadow-lg animate-bounce delay-1000">
                  <Database size={24} className="text-white" />
                </div>
                <div className="absolute top-1/2 -left-8 bg-green-500 p-3 rounded-xl shadow-lg animate-bounce delay-500">
                  <Globe size={24} className="text-white" />
                </div>
              </div>

              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">👋{"Hey! I'm Pratham Jain"}</h3>
                <p className="text-blue-400 text-lg font-semibold">
                  B.Tech Student at IIIT Allahabad & Full-Stack Developer
                </p>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  {"I created PeakCoder because I've been in your shoes - practicing problems, grinding contests, and craving a better platform to track my growth and compete."}
                </p>
                <p>
                  PeakCoder is my vision for a faster, smarter, and more personalized way to grow as a competitive
                  programmer.
                </p>
                <p>
                  I built everything from scratch - frontend, backend, Dockerized judge, leaderboards, real-time code
                  execution - just to make your experience seamless.
                </p>
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-300 italic text-lg">
                  {`"Coding isn't just a skill, it's a sport - and PeakCoder is your arena."`}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Built with:</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span key={index} className={`${tech.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex space-x-4">
                <a
                  target="_blank"
                  href="https://github.com/PrathamJain2601/PeakCoder"
                  className="group flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Github size={20} className="text-gray-400 group-hover:text-white" />
                  <span className="text-gray-400 group-hover:text-white">GitHub</span>
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/pratham-jain-a8b01b2a3/"
                  className="group flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Linkedin size={20} className="text-gray-400 group-hover:text-white" />
                  <span className="text-gray-400 group-hover:text-white">LinkedIn</span>
                </a>
                <a
                  target="_blank"
                  href="https://portfolio-az2g-628hd2q87-pratham-jains-projects-51c9e783.vercel.app/"
                  className="group flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <ExternalLink size={20} className="text-gray-400 group-hover:text-white" />
                  <span className="text-gray-400 group-hover:text-white">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
