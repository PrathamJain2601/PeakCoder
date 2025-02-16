"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl">
              PeakCoder
              {/* <Image src="/logo-dark.svg" alt="Logo" width={120} height={40} className="h-8 w-auto" /> */}
            </Link>
          </div>
          <div className="ml-6 flex items-center">
            <Button
              onClick={() => router.push("/auth")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Login / Signup
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

