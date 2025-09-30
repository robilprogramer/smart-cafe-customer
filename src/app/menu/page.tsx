"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Plus, Search, Coffee, UtensilsCrossed, IceCream, MapPin, Croissant, Sandwich, Salad, Cake, Wine, Droplets } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  popular?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

interface CartItem extends MenuItem {
  qty: number
}

const menuData: MenuItem[] = [
  { id: 1, name: "Espresso", description: "Kopi hitam pekat dengan rasa yang kuat", price: 18000, category: "Kopi", icon: Coffee },
  { id: 2, name: "Cappuccino", description: "Espresso dengan susu dan foam yang lembut", price: 25000, category: "Kopi", popular: true, icon: Coffee },
  { id: 3, name: "Caffe Latte", description: "Espresso dengan susu hangat", price: 28000, category: "Kopi", icon: Coffee },
  { id: 4, name: "Mocha", description: "Espresso dengan cokelat dan susu", price: 30000, category: "Kopi", icon: Coffee },
  { id: 5, name: "Americano", description: "Espresso dengan air panas", price: 20000, category: "Kopi", icon: Coffee },
  { id: 6, name: "Croissant", description: "Pastry mentega berlapis yang renyah", price: 22000, category: "Makanan", popular: true, icon: Croissant },
  { id: 7, name: "Club Sandwich", description: "Sandwich tiga lapis dengan ayam dan sayuran", price: 35000, category: "Makanan", icon: Sandwich },
  { id: 8, name: "Caesar Salad", description: "Salad segar dengan dressing caesar", price: 32000, category: "Makanan", icon: Salad },
  { id: 9, name: "Cheesecake", description: "Kue keju lembut dengan topping buah", price: 28000, category: "Dessert", icon: Cake },
  { id: 10, name: "Tiramisu", description: "Dessert Italia dengan kopi dan mascarpone", price: 32000, category: "Dessert", icon: IceCream },
  { id: 11, name: "Orange Juice", description: "Jus jeruk segar tanpa gula", price: 18000, category: "Minuman", icon: Wine },
  { id: 12, name: "Iced Tea", description: "Teh manis dingin segar", price: 12000, category: "Minuman", icon: Droplets },
]

const categories = [
  { name: "Semua", icon: UtensilsCrossed },
  { name: "Kopi", icon: Coffee },
  { name: "Makanan", icon: UtensilsCrossed },
  { name: "Dessert", icon: IceCream },
  { name: "Minuman", icon: Coffee },
]

export default function SmartCafeMenu() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")
  const [orderType, setOrderType] = useState<"Dine In" | "Takeaway" | "Delivery">("Dine In")

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const updateQty = (id: number, change: number) => {
    setCart(prev => {
      const updated = prev.map(i => 
        i.id === id ? { ...i, qty: Math.max(0, i.qty + change) } : i
      ).filter(i => i.qty > 0)
      return updated
    })
  }

  const clearCart = () => setCart([])

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0)
  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0)

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-400 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Coffee className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Smart Cafe</h1>
              </div>
              <p className="text-sm opacity-90">Meja: A7</p>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative bg-white text-green-500 hover:bg-green-50 rounded-full w-14 h-14">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Keranjang</SheetTitle>
                </SheetHeader>
                <div className="xl-6 space-y-4">
                  {cart.length === 0 && <p className="text-gray-500 text-center py-8">Keranjang kosong</p>}
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-3">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Rp {item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => updateQty(item.id, -1)}>
                          <span className="text-lg">-</span>
                        </Button>
                        <span className="font-medium w-8 text-center">{item.qty}</span>
                        <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-green-400 text-white border-green-400 hover:bg-green-500" onClick={() => updateQty(item.id, 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {cart.length > 0 && (
                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>Rp {total.toLocaleString()}</span>
                      </div>
                      <Button className="w-full bg-green-400 hover:bg-green-500 h-12">
                        Checkout
                      </Button>
                      <Button className="w-full" variant="outline" onClick={clearCart}>
                        Hapus Semua
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 h-12 bg-white border-0 text-gray-700 placeholder:text-green-300"
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Order Type Selection */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button
            variant={orderType === "Dine In" ? "default" : "outline"}
            className={`h-16 ${orderType === "Dine In" ? "bg-green-400 hover:bg-green-500" : ""}`}
            onClick={() => setOrderType("Dine In")}
          >
            <UtensilsCrossed className="w-5 h-5 mr-2" />
            Dine In
          </Button>
          <Button
            variant={orderType === "Takeaway" ? "default" : "outline"}
            className={`h-16 ${orderType === "Takeaway" ? "bg-green-400 hover:bg-green-500" : ""}`}
            onClick={() => setOrderType("Takeaway")}
          >
            <Coffee className="w-5 h-5 mr-2" />
            Takeaway
          </Button>
          <Button
            variant={orderType === "Delivery" ? "default" : "outline"}
            className={`h-16 ${orderType === "Delivery" ? "bg-green-400 hover:bg-green-500" : ""}`}
            onClick={() => setOrderType("Delivery")}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Delivery
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                className={`whitespace-nowrap ${selectedCategory === cat.name ? "bg-green-400 hover:bg-green-500" : ""}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {cat.name}
              </Button>
            )
          })}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMenu.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
              {item.popular && (
                <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  🔥 Populer
                </div>
              )}
              <CardContent className="p-4">
                <div className="bg-gray-100 rounded-lg h-32 mb-3 flex items-center justify-center">
                  {item.icon && <item.icon className="w-16 h-16 text-green-400" />}
                </div>
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Harga</p>
                    <p className="font-bold text-green-500 text-lg">Rp {item.price.toLocaleString()}</p>
                  </div>
                  <Button
                    size="icon"
                    className="bg-green-400 hover:bg-green-500 rounded-full w-10 h-10"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}