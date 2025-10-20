"use client"
import React, { useState, useEffect } from "react"
import { useCartStore } from "@/store/cart"
import { MenuItemWithImages } from "@/types/menu"
import { menuData, categories } from "@/data/menuData"
import { MenuHeader } from "@/components/menu/MenuHeader"
import { QuickInfoBanner } from "@/components/menu/QuickInfoBanner"
import { CategoryTabs } from "@/components/menu/CategoryTabs"
import { MenuCard } from "@/components/menu/MenuCard"
import { MenuDetailModal } from "@/components/menu/MenuDetailModal"
import { CartSheet } from "@/components/menu/CartSheet"
import { FlyingItemAnimation } from "@/components/menu/FlyingItemAnimation"
import { PromoTab } from "@/components/menu/PromoTab"

type SortOption = "default" | "price-asc" | "price-desc" | "name" | "popular"

export default function SmartCafeMenu() {
  const { items, addItem, removeItem, clearCart } = useCartStore()
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")
  const [tableNumber, setTableNumber] = useState("A7")
  const [flyingItem, setFlyingItem] = useState<{
    id: string
    name: string
    image: string
    startX: number
    startY: number
  } | null>(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemWithImages | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"menu" | "promo">("menu")
  const [sortBy, setSortBy] = useState<SortOption>("default")

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const table = params.get("table")
      if (table) {
        const number = table.replace(/[^0-9]/g, "")
        setTableNumber(number || "A7")
      }
    }
  }, [])

  const filteredMenu = menuData.filter((item) => {
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedMenu = [...filteredMenu].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "popular":
        return (b.rating || 0) - (a.rating || 0)
      default:
        return 0
    }
  })

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const totalItems = items.reduce((acc, i) => acc + i.qty, 0)

  // ✅ Show notification for unavailable items only
  const showNotification = (message: string, type: "success" | "error" = "success") => {
    if (type === "error") {
      setNotification({ message, type })
    }
  }

  const handleQuickAdd = (item: MenuItemWithImages, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (item.availability === false) {
      showNotification("Menu sedang tidak tersedia", "error")
      return
    }

    if (event) {
      event.stopPropagation()
      
      // ✅ Trigger animasi terbang ke keranjang
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      
      setFlyingItem({
        id: item.id.toString(),
        name: item.name,
        image: item.images[0],
        startX: rect.left + rect.width / 2,
        startY: rect.top + rect.height / 2,
      })
    }

    addItem(item)

    setTimeout(() => {
      setFlyingItem(null)
    }, 1000)
  }

  const handleAddToCart = (item: MenuItemWithImages, quantity: number = 1) => {
    if (item.availability === false) {
      showNotification("Menu sedang tidak tersedia", "error")
      return
    }

    for (let i = 0; i < quantity; i++) addItem(item)
    
    // ✅ Trigger animasi dari modal (tengah layar)
    setFlyingItem({
      id: item.id.toString(),
      name: `${quantity}x ${item.name}`,
      image: item.images[0],
      startX: window.innerWidth / 2,
      startY: window.innerHeight / 2,
    })
    
    setTimeout(() => {
      setFlyingItem(null)
    }, 1000)
  }

  const handleMenuClick = (item: MenuItemWithImages, event?: React.MouseEvent) => {
    if (item.availability === false) {
      showNotification(`${item.name} sedang tidak tersedia`, "error")
      return
    }
    if (event) event.stopPropagation()
    setSelectedMenuItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMenuItem(null), 300)
  }

  return (
    <div className="min-h-screen bg-green-50 relative">

      {/* Error Notification */}
      {notification && notification.type === "error" && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[10000] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-white text-xs sm:text-sm font-medium shadow-lg transition-all duration-300 bg-red-500"
          style={{
            width: "calc(100% - 2rem)",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          {notification.message}
        </div>
      )}

      <FlyingItemAnimation flyingItem={flyingItem} />

      <MenuHeader
        tableNumber={tableNumber}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartButton={
          <CartSheet
            items={items}
            tableNumber={tableNumber}
            totalItems={totalItems}
            total={total}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 py-6">
        <QuickInfoBanner totalMenuItems={menuData.length} tableNumber={tableNumber} />

        <div className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-sm">
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === "menu"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            🍽️ Menu
          </button>
          <button
            onClick={() => setActiveTab("promo")}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === "promo"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            🎉 Promo
          </button>
        </div>

        {activeTab === "menu" ? (
          <>
            <div className="mb-4 flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="default">Default</option>
                  <option value="popular">⭐ Terpopuler</option>
                  <option value="name">🔤 Nama (A-Z)</option>
                  <option value="price-asc">💰 Harga Terendah</option>
                  <option value="price-desc">💰 Harga Tertinggi</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-green-600">{sortedMenu.length}</span> menu ditemukan
              </div>
            </div>

            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {sortedMenu.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Menu tidak ditemukan</h3>
                <p className="text-gray-500">Coba kata kunci lain atau pilih kategori berbeda</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedMenu.map((item, index) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    index={index}
                    onMenuClick={handleMenuClick}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <PromoTab />
        )}
      </div>

      <MenuDetailModal
        item={selectedMenuItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}