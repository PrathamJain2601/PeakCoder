import React from 'react'
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Problem Set",
  description: "showcasing coding problems",
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8'>
        {children}
    </div>
  )
}

export default Layout