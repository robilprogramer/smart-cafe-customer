"use client"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, ChevronRight } from "lucide-react"
import { MenuItemWithImages } from "@/types/menu"
import { ImageCarousel } from "./ImageCarousel"
import { formatRupiah } from "@/lib/formatCurrency"

interface MenuCardProps {
  item: MenuItemWithImages
  index: number
  onMenuClick: (item: MenuItemWithImages) => void
  onQuickAdd: (item: MenuItemWithImages, event: React.MouseEvent<HTMLButtonElement>) => void
}

export function MenuCard({ item, index, onMenuClick, onQuickAdd }: MenuCardProps) {
  return (
    <Card
      className="hover:shadow-xl transition-all cursor-pointer relative overflow-hidden group border-2 border-transparent hover:border-green-200"
      onClick={() => onMenuClick(item)}
      style={{
        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
      }}
    >
      <CardContent className="p-0">
        {/* Image with hover effect */}
        <div className="relative overflow-hidden">
          <ImageCarousel images={item.images} className="h-36 md:h-40" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          
          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onQuickAdd(item, e)
            }}
            className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-green-500 hover:text-white shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
              {item.category}
            </span>
          </div>
        </div>
        
        {/* Info Section */}
        <div className="p-3">
          <h3 className="font-bold text-sm md:text-base mb-2 line-clamp-2 text-gray-800 group-hover:text-green-600 transition-colors">
            {item.name}
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Mulai dari</p>
              <p className="font-bold text-green-600 text-base md:text-lg">
                Rp {formatRupiah(item.price)}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-all">
              <ChevronRight className="w-4 h-4 text-green-600 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* eslint-disable-next-line */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </Card>
  )
}