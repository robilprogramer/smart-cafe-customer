"use client"
import React from "react"
import { Coffee } from "lucide-react"
import { MenuSearch } from "./MenuSearch"

interface MenuHeaderProps {
  tableNumber: string
  searchQuery: string
  onSearchChange: (value: string) => void
  cartButton: React.ReactNode
}

export function MenuHeader({ 
  tableNumber, 
  searchQuery, 
  onSearchChange, 
  cartButton 
}: MenuHeaderProps) {
  return (
    <header className="bg-green-400 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Coffee className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Smart Cafe</h1>
            </div>
            <p className="text-sm opacity-90">Meja: {tableNumber}</p>
          </div>
          {cartButton}
        </div>
        
        <MenuSearch 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
      </div>
    </header>
  )
}