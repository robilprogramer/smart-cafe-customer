"use client"
import React, { useState, useEffect } from "react"
import { useCartStore } from "@/store/cart"
import { MenuItemWithImages, FlyingItem } from "@/types/menu"
import { menuData, categories } from "@/data/menuData"
import { MenuHeader } from "@/components/menu/MenuHeader"
import { QuickInfoBanner } from "@/components/menu/QuickInfoBanner"
import { CategoryTabs } from "@/components/menu/CategoryTabs"
import { MenuCard } from "@/components/menu/MenuCard"
import { MenuDetailModal } from "@/components/menu/MenuDetailModal"
import { CartSheet } from "@/components/menu/CartSheet"
import { FlyingItemAnimation } from "@/components/menu/FlyingItemAnimation"
import { PromoTab } from "@/components/menu/PromoTab"

export default function SmartCafeMenu() {
  const { items, addItem, removeItem, clearCart } = useCartStore()
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")
  const [tableNumber, setTableNumber] = useState("A7")
  const [flyingItem, setFlyingItem] = useState<FlyingItem | null>(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemWithImages | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"menu" | "promo">("menu")

  // Get table number from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const table = params.get('table')
      if (table) {
        const number = table.replace(/[^0-9]/g, '')
        setTableNumber(number || 'A7')
      }
    }
  }, [])

  // Filter menu
  const filteredMenu = menuData.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Calculate totals
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const totalItems = items.reduce((acc, i) => acc + i.qty, 0)

  // Handle add to cart with animation
  const handleAddToCart = (item: MenuItemWithImages, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()

      setFlyingItem({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        name: item.name
      })
    }

    addItem(item)

    setTimeout(() => {
      setFlyingItem(null)
    }, 800)
  }

  // Handle open menu detail
  const handleMenuClick = (item: MenuItemWithImages) => {
    setSelectedMenuItem(item)
    setIsModalOpen(true)
  }

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMenuItem(null), 300)
  }

  return (
    <div className="min-h-screen bg-green-50 relative">
      {/* Flying Item Animation */}
      <FlyingItemAnimation flyingItem={flyingItem} />

      {/* Header with Cart */}
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
        {/* Quick Info Banner */}
        <QuickInfoBanner totalMenuItems={menuData.length} tableNumber={tableNumber} />

        {/* Tab Switcher */}
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

        {/* Content berdasarkan tab aktif */}
        {activeTab === "menu" ? (
          <>
            {/* Category Tabs */}
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Menu Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMenu.map((item, index) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  index={index}
                  onMenuClick={handleMenuClick}
                  onQuickAdd={handleAddToCart}
                />
              ))}
            </div>
          </>
        ) : (
          <PromoTab />
        )}
      </div>

      {/* Menu Detail Modal */}
      <MenuDetailModal
        item={selectedMenuItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}
