"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Alex Johnson",
    username: "@alexcode",
    avatar: "AJ",
    text: "PeakCoder helped me land an internship by improving my speed and accuracy in coding interviews! The real-time feedback is incredible.",
    rating: 5,
    color: "bg-blue-500",
  },
  {
    name: "Sarah Chen",
    username: "@sarahdev",
    avatar: "SC",
    text: "The problem diversity and quality is outstanding. I've grown so much as a programmer since joining PeakCoder.",
    rating: 5,
    color: "bg-purple-500",
  },
  {
    name: "Michael Rodriguez",
    username: "@mikecoder",
    avatar: "MR",
    text: "Love the competitive aspect! The leaderboards keep me motivated to solve more problems every day.",
    rating: 5,
    color: "bg-green-500",
  },
  {
    name: "Emily Davis",
    username: "@emilyalgo",
    avatar: "ED",
    text: "Clean interface, fast judge, and excellent analytics. PeakCoder is everything I wanted in a coding platform.",
    rating: 5,
    color: "bg-red-500",
  },
  {
    name: "David Kim",
    username: "@davidtech",
    avatar: "DK",
    text: "The detailed progress tracking helps me identify my weak areas and improve systematically.",
    rating: 5,
    color: "bg-yellow-500",
  },
  {
    name: "Jessica Wang",
    username: "@jessicajs",
    avatar: "JW",
    text: "Perfect for contest preparation! The problems are well-curated and the platform is super reliable.",
    rating: 5,
    color: "bg-pink-500",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-8 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {"Join thousands of satisfied coders who've elevated their skills with PeakCoder"}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 h-full hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Quote size={16} className="text-white" />
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 leading-relaxed mb-6 italic">{`"`+testimonial.text+`"`}</p>

                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${testimonial.color}`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.username}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
