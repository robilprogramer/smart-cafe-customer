"use client"
import React from "react"
import { UtensilsCrossed, Coffee } from "lucide-react"

interface QuickInfoBannerProps {
  totalMenuItems: number
  tableNumber: string
}

export function QuickInfoBanner({ totalMenuItems, tableNumber }: QuickInfoBannerProps) {
  return (
    <div className="mb-6 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">Menu Tersedia</p>
            <p className="text-xl font-bold">{totalMenuItems} Item</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium opacity-90">Dine In</p>
            <p className="text-xl font-bold">Meja {tableNumber}</p>
          </div>
        </div>
      </div>
    </div>
  )
}