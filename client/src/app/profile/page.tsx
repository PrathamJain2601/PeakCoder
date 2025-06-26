"use client";

import Navbar from "@/components/navbar";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
const StatsPanel = lazy(() => import("./components/stats-panel"));
const RecentSubmissions = lazy(() => import("./components/recent-submissions"));

export default function ProfilePage() {
   const router = useRouter()
      const user = useSelector((state: RootState)=> state.user.user?.id)
    useEffect(() => {
      if (!user) {
        router.push("/auth")
      }
    }, [user, router])
  
    if (!user) return null 
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Suspense fallback={<div className="text-gray-400 mb-4">Loading statistics...</div>}>
          <StatsPanel />
        </Suspense>
        <Suspense fallback={<div className="text-gray-400 mb-4">Loading submissions...</div>}>
          <RecentSubmissions />
        </Suspense>
      </div>
    </div>
  );
}
