"use client"

import React, { useState } from "react"
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    console.log("Searching for:", e.target.value)
  }

  return (
    <div className="relative flex items-center justify-between gap-2 bg-gray-800 p-2">
        <Search size={20} className="text-gray-400"/>
      <input
        type="text"
        placeholder="Search problems..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full bg-gray-800 text-gray-100 outline-none"
      />
    </div>
  )
}

export default React.memo(SearchBar)

