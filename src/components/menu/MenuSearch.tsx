"use client"
import React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface MenuSearchProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function MenuSearch({ searchQuery, onSearchChange }: MenuSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="Cari menu..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 h-12 bg-white border-0 text-gray-700 placeholder:text-green-300"
      />
    </div>
  )
}