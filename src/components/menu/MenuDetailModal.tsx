"use client"
import React, { useState, useEffect } from "react"
import { ShoppingCart, Plus, Minus, X, Star, Clock, Flame } from "lucide-react"
import { MenuItemWithImages } from "@/types/menu"
import { MenuItemOption } from "@/store/cart"
import { ImageCarousel } from "./ImageCarousel"
import { formatRupiah } from "@/lib/formatCurrency"

interface MenuDetailModalProps {
  item: MenuItemWithImages | null
  isOpen: boolean
  onClose: () => void
  // sekarang menerima quantity agar parent yang menambahkan berkali-kali
  onAddToCart: (item: MenuItemWithImages, quantity: number) => void
}


export function MenuDetailModal({ 
  item, 
  isOpen, 
  onClose,
  onAddToCart 
}: MenuDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<MenuItemOption | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<MenuItemOption[]>([])
  const [selectedFreeOptions, setSelectedFreeOptions] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState("")
  
  // Reset state when modal opens with new item
  useEffect(() => {
    if (item && isOpen) {
      setQuantity(1)
      setSelectedSize(item.options?.sizes?.[0] || null)
      setSelectedAddOns([])
      setSelectedFreeOptions({})
      setNotes("")
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [item, isOpen])
  
  if (!isOpen || !item) return null

  // Calculate total price
  const basePrice = item.price + (selectedSize?.price || 0)
  const addOnsPrice = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)
  const totalPrice = (basePrice + addOnsPrice) * quantity

  // Handle add-on toggle
  const toggleAddOn = (addon: MenuItemOption) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(a => a.name === addon.name)
      if (exists) {
        return prev.filter(a => a.name !== addon.name)
      } else {
        return [...prev, addon]
      }
    })
  }

  // Handle free option selection
  const handleFreeOptionChange = (label: string, value: string) => {
    setSelectedFreeOptions(prev => ({
      ...prev,
      [label]: value
    }))
  }

  // Handle add to cart
  const handleAddToCart = () => {
    // Create customized item
    const customizedItem: MenuItemWithImages = {
      ...item,
      selectedSize,
      selectedAddOns,
      selectedFreeOptions,
      notes: notes.trim(),
      // Update price with customizations
      price: basePrice + addOnsPrice
    }

    // Add to cart multiple times based on quantity
    onAddToCart(customizedItem, quantity)
    
    

    onClose()
  }

  // Spicy level indicator
  const getSpicyLevel = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame
        key={i}
        className={`w-4 h-4 ${i < level ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
      />
    ))
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
        <div className="p-6 space-y-5">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                {item.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{item.name}</h2>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mt-3 text-sm">
              {item.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{item.rating}</span>
                  <span className="text-gray-500">({item.reviewCount})</span>
                </div>
              )}
              {item.prepTime && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{item.prepTime}</span>
                </div>
              )}
              {item.spicyLevel && item.spicyLevel > 0 && (
                <div className="flex items-center gap-1">
                  {getSpicyLevel(item.spicyLevel)}
                </div>
              )}
            </div>

            {/* Dietary Tags */}
            {item.dietary && item.dietary.length > 0 && (
              <div className="flex gap-2 mt-3">
                {item.dietary.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Price */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Harga Dasar</p>
            <p className="text-3xl font-bold text-green-600">Rp {formatRupiah(item.price)}</p>
          </div>

          {/* Size Options */}
          {item.options?.sizes && item.options.sizes.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Pilih Ukuran</h3>
              <div className="grid grid-cols-2 gap-3">
                {item.options.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSize?.name === size.name
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{size.name}</div>
                    {size.price > 0 && (
                      <div className="text-sm text-green-600 font-medium">+Rp {formatRupiah(size.price)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Free Options */}
          {item.options?.freeOptions && item.options.freeOptions.length > 0 && (
            <div className="space-y-4">
              {item.options.freeOptions.map((freeOption) => (
                <div key={freeOption.label}>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                    {freeOption.label}
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-normal">
                      Gratis
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {freeOption.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleFreeOptionChange(freeOption.label, option)}
                        className={`p-3 rounded-xl border-2 transition-all text-sm ${
                          selectedFreeOptions[freeOption.label] === option
                            ? 'border-green-500 bg-green-50 text-green-700 font-semibold shadow-md'
                            : 'border-gray-200 hover:border-green-300 text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add-ons */}
          {item.options?.addOns && item.options.addOns.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Tambahan (Opsional)</h3>
              <div className="space-y-2">
                {item.options.addOns.map((addon) => (
                  <label
                    key={addon.name}
                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-green-300 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAddOns.some(a => a.name === addon.name)}
                        onChange={() => toggleAddOn(addon)}
                        className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="font-medium text-gray-900">{addon.name}</span>
                    </div>
                    <span className="text-green-600 font-semibold">+Rp {formatRupiah(addon.price)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Catatan (Opsional)</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Tidak pakai bawang, pedas sedang, dll"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none"
              rows={3}
            />
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
            Tambah ke Keranjang - Rp {formatRupiah(totalPrice)}
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