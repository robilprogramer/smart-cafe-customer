"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShoppingCart,
  Plus,
  Search,
  Coffee,
  UtensilsCrossed,
  IceCream,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useCartStore, MenuItem } from "@/store/cart"

// ✅ Menu data
const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Espresso",
    description: "Kopi hitam pekat dengan rasa yang kuat",
    price: 18000,
    category: "Minuman",
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Espresso dengan susu dan foam lembut",
    price: 25000,
    category: "Minuman",
  },
  {
    id: 3,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan ayam, udang, dan telur",
    price: 45000,
    category: "Makanan",
  },
  {
    id: 4,
    name: "French Fries",
    description: "Kentang goreng renyah",
    price: 20000,
    category: "Lainnya",
  },
]

// ✅ Categories
const categories = [
  { name: "Semua", icon: UtensilsCrossed },
  { name: "Makanan", icon: UtensilsCrossed },
  { name: "Minuman", icon: Coffee },
  { name: "Lainnya", icon: IceCream },
]

export default function SmartCafeMenu() {
  const { items, addItem, removeItem, clearCart } = useCartStore()
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")
  const [orderType, setOrderType] = useState<"Dine In" | "Takeaway">("Dine In")
  const router = useRouter()

  const filteredMenu = menuData.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const totalItems = items.reduce((acc, i) => acc + i.qty, 0)

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

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-white text-green-400 hover:bg-green-50 rounded-full w-14 h-14"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              {/* ✅ SheetContent dengan padding yang lebih baik */}
              <SheetContent className="w-[420px] sm:w-[450px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>Keranjang</SheetTitle>
                </SheetHeader>
                <div className="px-2 space-y-4">
                  {items.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      Keranjang kosong
                    </p>
                  )}
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Rp {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => removeItem(item.id)}
                        >
                          <span className="text-lg">-</span>
                        </Button>
                        <span className="font-medium w-8 text-center">
                          {item.qty}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full bg-green-600 text-white border-green-400 hover:bg-green-500"
                          onClick={() => addItem(item)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {items.length > 0 && (
                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>Rp {total.toLocaleString()}</span>
                      </div>
                      <Button
                        className="w-full bg-green-400 hover:bg-green-500 h-12"
                        onClick={() => router.push("/pembayaran")}
                      >
                        Checkout
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={clearCart}
                      >
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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
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
        {/* Order Type */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant={orderType === "Dine In" ? "default" : "outline"}
            className={`h-16 ${
              orderType === "Dine In" ? "bg-green-400 hover:bg-green-500" : ""
            }`}
            onClick={() => setOrderType("Dine In")}
          >
            Dine In
          </Button>
          <Button
            variant={orderType === "Takeaway" ? "default" : "outline"}
            className={`h-16 ${
              orderType === "Takeaway" ? "bg-green-400 hover:bg-green-500" : ""
            }`}
            onClick={() => setOrderType("Takeaway")}
          >
            Takeaway
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
                className={`whitespace-nowrap ${
                  selectedCategory === cat.name
                    ? "bg-green-400 hover:bg-green-500"
                    : ""
                }`}
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
            <Card
              key={item.id}
              className="hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="bg-gray-100 rounded-lg h-32 mb-3 flex items-center justify-center">
                  <Coffee className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Harga</p>
                    <p className="font-bold text-green-400 text-lg">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    className="bg-green-400 hover:bg-green-500 rounded-full w-10 h-10"
                    onClick={() => addItem(item)}
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