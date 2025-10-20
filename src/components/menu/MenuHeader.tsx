"use client"
import React, { useState, useEffect } from "react"
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Jika scroll lebih dari 20px, set isScrolled = true
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 bg-green-400 text-white transition-all duration-300 ${
        isScrolled 
          ? "shadow-xl py-3" 
          : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Coffee className={`transition-all duration-300 ${
                isScrolled ? "w-6 h-6" : "w-8 h-8"
              }`} />
              <h1 className={`font-bold transition-all duration-300 ${
                isScrolled ? "text-xl" : "text-3xl"
              }`}>
                Smart Cafe
              </h1>
            </div>
            <p className={`text-sm opacity-90 transition-all duration-300 ${
              isScrolled ? "text-xs" : ""
            }`}>
              Meja: {tableNumber}
            </p>
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