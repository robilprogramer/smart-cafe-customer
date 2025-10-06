"use client"
import React, { useState, useEffect } from "react"
import { ShoppingCart, Plus, X } from "lucide-react"
import { MenuItemWithImages } from "@/types/menu"
import { ImageCarousel } from "./ImageCarousel"
import { formatRupiah } from "@/lib/formatCurrency"

interface MenuDetailModalProps {
  item: MenuItemWithImages | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: MenuItemWithImages) => void
}

export function MenuDetailModal({ 
  item, 
  isOpen, 
  onClose,
  onAddToCart 
}: MenuDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  
  useEffect(() => {
    if (isOpen) {
      setQuantity(1)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  if (!isOpen || !item) return null
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(item)
    }
    onClose()
  }
  
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="relative">
          <ImageCarousel images={item.images} className="h-64 md:h-80" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg z-10 group"
          >
            <X className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
          </button>
        </div>
        
        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                {item.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{item.name}</h2>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
          
          {/* Price */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Harga</p>
            <p className="text-3xl font-bold text-green-600">Rp {formatRupiah(item.price)}</p>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
            <span className="font-semibold text-gray-700">Jumlah</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-green-400 transition-colors font-bold text-gray-600"
              >
                −
              </button>
              <span className="text-xl font-bold text-gray-800 w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-5 h-5" />
            Tambah ke Keranjang - Rp {formatRupiah(item.price * quantity)}
          </button>
        </div>
      </div>
      
      {/* eslint-disable-next-line */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(100%); 
          }
          to { 
            opacity: 1;
            transform: translateY(0); 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}} />
    </div>
  )
}