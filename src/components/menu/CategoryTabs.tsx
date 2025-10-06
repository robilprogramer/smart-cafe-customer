"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Category } from "@/types/menu"

interface CategoryTabsProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function CategoryTabs({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryTabsProps) {
  return (
    <div className="mb-6 -mx-6">
      <div
        className="flex gap-3 px-6 overflow-x-scroll pb-3 category-scroll"
        style={{
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map((cat) => {
          const Icon = cat.icon
         
          return (
            <Button
              key={cat.name}
              variant={selectedCategory === cat.name ? "default" : "outline"}
              className={`whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                selectedCategory === cat.name
                  ? "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 shadow-lg"
                  : "hover:shadow-md"
              }`}
              onClick={() => onSelectCategory(cat.name)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {cat.name}
            </Button>
          )
        })}
      </div>
      
      {/* eslint-disable-next-line */}
      <style dangerouslySetInnerHTML={{__html: `
        .category-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .category-scroll::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 10px;
          margin: 0 24px;
        }
        .category-scroll::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 10px;
        }
        .category-scroll::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }
        .category-scroll {
          scrollbar-width: thin;
          scrollbar-color: #22c55e #e5e7eb;
        }
      `}} />
    </div>
  )
}