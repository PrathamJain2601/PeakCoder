"use client"

import CallToAction from "@/components/landing/call-to-action";
import DeveloperSpotlight from "@/components/landing/developer-spotlight";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import LeaderboardPreview from "@/components/landing/leaderboard-preview";
import Testimonials from "@/components/landing/testimonials";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <Features />
      <LeaderboardPreview />
      <Testimonials />
      <DeveloperSpotlight />
      <CallToAction />
      <Footer />
    </div>
  );
}
