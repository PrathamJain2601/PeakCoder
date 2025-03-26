"use client"

import React, { useState } from "react"
import { ChevronDown } from 'lucide-react';
import type { Tag } from "@/types/problem"

const TagFilter = () => {
  const [toggle, setToggle] = useState(false);
  
  return (
    <div className="relative">
      <div className="w-full py-2 px-4 bg-gray-800 text-gray-100 focus:outline-none  appearance-none">
        <div className="cursor-pointer flex justify-between gap-2" onClick={()=> setToggle(!toggle)}>Tags<ChevronDown className={toggle ? `inline rotate-180 transition-transform duration-300` : `transition-transform duration-300`} /></div>
      </div>
      {toggle && 
            <div className="absolute bg-gray-800 py-1 px-1 shadow-sm shadow-black rounded-md mt-1 w-48 z-10">
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-gray-400">Array</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-gray-400">Hash Table</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-gray-400">Linked List</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-gray-400">Math</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-gray-400">Binary Search</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-gray-400">Divide and Conquer</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-gray-400">Dynamic Programming</div>
                <div className="hover:bg-gray-700 px-2 py-1 cursor-pointer text-gray-400">Graphs</div>
            </div>
        }
    </div>
  )
}

export default React.memo(TagFilter)

