"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus } from "lucide-react"
import { formatRupiah } from "@/lib/formatCurrency"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { CartItem } from "@/store/cart"

interface CartSheetProps {
  items: CartItem[]
  tableNumber: string
  totalItems: number
  total: number
  onAddItem: (item: CartItem) => void
  onRemoveItem: (id: number) => void
  onClearCart: () => void
}

export function CartSheet({ 
  items, 
  tableNumber, 
  totalItems, 
  total, 
  onAddItem, 
  onRemoveItem, 
  onClearCart 
}: CartSheetProps) {
  const router = useRouter()
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative bg-white text-green-400 hover:bg-green-50 rounded-full w-14 h-14 transition-transform"
          id="cart-button"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[420px] md:w-[450px] flex flex-col">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-2xl font-bold">Keranjang Belanja</SheetTitle>
          <p className="text-sm text-gray-500">Meja {tableNumber}</p>
        </SheetHeader>
       
        <div className="flex-1 overflow-y-auto px-2">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-green-50 rounded-full p-6 mb-4">
                <ShoppingCart className="w-16 h-16 text-green-300" />
              </div>
              <p className="text-gray-400 text-center font-medium">Keranjang masih kosong</p>
              <p className="text-gray-400 text-center text-sm mt-1">Yuk, pilih menu favoritmu!</p>
            </div>
          )}
         
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-white to-green-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-green-100"
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="font-bold text-green-600 text-base md:text-lg">
                        Rp {formatRupiah(item.price)}
                    </p>
                  </div>
                </div>
               
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 bg-white rounded-full shadow-sm px-2 py-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <span className="text-lg font-bold">−</span>
                    </Button>
                    <span className="font-bold w-8 text-center text-gray-700">
                      {item.qty}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                      onClick={() => onAddItem(item)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                 
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Subtotal</p>
                    <p className="font-bold text-green-600">
                      Rp {formatRupiah(item.price * item.qty)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
       
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 space-y-4 mt-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Jumlah Item</span>
                <span className="font-semibold text-gray-800">{totalItems} item</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total Pembayaran</span>
                <span className="text-2xl font-bold text-green-600">
                  Rp {formatRupiah(total)}
                </span>
              </div>
            </div>
           
            <Button
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white h-14 text-lg font-bold shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:from-green-600 hover:to-emerald-600 active:scale-95 transform"
              onClick={() => router.push("/pembayaran")}
            >
              Lanjut ke Pembayaran
            </Button>
           
            <Button
              className="w-full border-2 border-red-200 text-red-500 h-12 rounded-xl font-medium transition-all duration-300 ease-in-out hover:bg-red-50 hover:border-red-400 hover:text-red-600 active:scale-95 active:bg-red-100 transform"
              variant="outline"
              onClick={onClearCart}
            >
              Kosongkan Keranjang
            </Button>
          </div>
        )}
       
        {/* eslint-disable-next-line */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}} />
      </SheetContent>
    </Sheet>
  )
}