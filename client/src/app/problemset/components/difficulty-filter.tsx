"use client"

import React, { useState } from "react"
import { ChevronDown } from 'lucide-react';
import type { Difficulty } from "@/types/problem"

const DifficultyFilter = () => {
  const [toggle, setToggle] = useState(false);
  
  return (
    <div className="relative">
      <div className="w-full py-2 px-4 bg-gray-800 text-gray-100 focus:outline-none  appearance-none">
        <div className="cursor-pointer flex justify-between gap-2" onClick={()=> setToggle(!toggle)}>Difficulty <ChevronDown className={toggle ? `inline rotate-180 transition-transform duration-300` : `transition-transform duration-300`} /></div>
      </div>
        {toggle && 
            <div className="absolute bg-gray-800 py-1 px-1 shadow-sm shadow-black rounded-md mt-1 w-32 z-10">
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-green-400">Easy</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-yellow-400">Medium</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-red-400">Hard</div>
            </div>
        }
    </div>
  )
}

export default React.memo(DifficultyFilter)

