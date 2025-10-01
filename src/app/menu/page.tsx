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
  ChevronLeft,
  ChevronRight,
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

// ✅ Menu data with images
interface MenuItemWithImages extends MenuItem {
  images: string[]
}

const menuData: MenuItemWithImages[] = [
  {
    id: 1,
    name: "Espresso",
    description: "Kopi hitam pekat dengan rasa yang kuat",
    price: 18000,
    category: "Minuman",
    images: [
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Espresso dengan susu dan foam lembut",
    price: 25000,
    category: "Minuman",
    images: [
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 3,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan ayam, udang, dan telur",
    price: 45000,
    category: "Makanan",
    images: [
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 4,
    name: "French Fries",
    description: "Kentang goreng renyah",
    price: 20000,
    category: "Lainnya",
    images: [
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 5,
    name: "Caffe Latte",
    description: "Espresso dengan susu steamed yang creamy",
    price: 28000,
    category: "Minuman",
    images: [
      "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 6,
    name: "Spaghetti Carbonara",
    description: "Pasta dengan saus creamy dan bacon crispy",
    price: 55000,
    category: "Makanan",
    images: [
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 7,
    name: "Chicken Wings",
    description: "Sayap ayam crispy dengan saus pilihan",
    price: 38000,
    category: "Makanan",
    images: [
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 8,
    name: "Ice Cream Sundae",
    description: "Es krim vanilla dengan topping cokelat dan kacang",
    price: 32000,
    category: "Lainnya",
    images: [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop"
    ]
  },
]

// ✅ Categories
const categories = [
  { name: "Semua", icon: UtensilsCrossed },
  { name: "Makanan", icon: UtensilsCrossed },
  { name: "Minuman", icon: Coffee },
  { name: "Lainnya", icon: IceCream },
]

// Component untuk Image Carousel
function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative bg-gray-100 rounded-lg h-32 mb-3 overflow-hidden group">
      <img 
        src={images[currentIndex]} 
        alt="Menu item" 
        className="w-full h-full object-cover"
      />
      
      {images.length > 1 && (
        <>
          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function SmartCafeMenu() {
  const { items, addItem, removeItem, clearCart } = useCartStore()
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")
  const [tableNumber, setTableNumber] = useState("A7")
  const [flyingItem, setFlyingItem] = useState<{x: number, y: number, name: string} | null>(null)
  const router = useRouter()

  // Get table number from URL
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const table = params.get('table')
      if (table) {
        // Extract only the number: meja_1 -> 1, MEJA-05 -> 05
        const number = table.replace(/[^0-9]/g, '')
        setTableNumber(number || 'A7')
      }
    }
  }, [])

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

  // Handle add to cart with animation
  const handleAddToCart = (item: MenuItemWithImages, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    
    // Set flying item position
    setFlyingItem({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      name: item.name
    })
    
    // Add item to cart
    addItem(item)
    
    // Remove flying item after animation
    setTimeout(() => {
      setFlyingItem(null)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-green-50 relative">
      {/* Flying Item Animation */}
      {flyingItem && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: flyingItem.x,
            top: flyingItem.y,
            animation: 'flyToCart 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards'
          }}
        >
          <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm whitespace-nowrap">
            +1 {flyingItem.name}
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flyToCart {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(0.8) translateY(-100px);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.3) translate(${typeof window !== 'undefined' ? window.innerWidth - 100 : 300}px, -${typeof window !== 'undefined' ? window.innerHeight - 100 : 500}px);
            opacity: 0;
          }
        }
        
        .cart-bounce {
          animation: cartBounce 0.5s ease-in-out;
        }
        
        @keyframes cartBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}} />
      
      {/* Header */}
      <header className="bg-green-400 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Coffee className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Smart Cafe</h1>
              </div>
              <p className="text-sm opacity-90">Meja: {tableNumber}</p>
            </div>

            {/* Cart */}
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
              {/* ✅ SheetContent dengan padding yang lebih baik */}
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
                            <p className="text-sm text-green-600 font-semibold mt-1">
                              Rp {item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 bg-white rounded-full shadow-sm px-2 py-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                              onClick={() => removeItem(item.id)}
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
                              onClick={() => addItem(item)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Subtotal</p>
                            <p className="font-bold text-green-600">
                              Rp {(item.price * item.qty).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {items.length > 0 && (
                  <div className="pt-4 border-t border-gray-200 space-y-3 mt-auto">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Jumlah Item</span>
                        <span className="font-semibold text-gray-800">{totalItems} item</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Total Pembayaran</span>
                        <span className="text-2xl font-bold text-green-600">
                          Rp {total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white h-14 text-lg font-bold shadow-lg rounded-xl transition-all hover:shadow-xl"
                      onClick={() => router.push("/pembayaran")}
                    >
                      Lanjut ke Pembayaran
                    </Button>
                    
                    <Button
                      className="w-full border-2 border-red-200 text-red-500 hover:bg-red-50 h-12 rounded-xl font-medium"
                      variant="outline"
                      onClick={clearCart}
                    >
                      Kosongkan Keranjang
                    </Button>
                  </div>
                )}
                
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
        {/* Quick Info Banner - Ganti Dine In/Takeaway */}
        <div className="mb-6 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">Menu Tersedia</p>
                <p className="text-xl font-bold">{menuData.length} Item</p>
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

        {/* Category Tabs - Scrollable horizontal dengan scrollbar visible */}
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
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {cat.name}
                </Button>
              )
            })}
          </div>
        </div>
        
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

        {/* Menu Grid - 2 kolom di mobile, 3 kolom di tablet, 4 kolom di desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMenu.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              <CardContent className="p-4">
                <ImageCarousel images={item.images} />
                <h3 className="font-bold text-base md:text-lg mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Harga</p>
                    <p className="font-bold text-green-400 text-sm md:text-lg">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    className="bg-green-400 hover:bg-green-500 rounded-full w-10 h-10 transition-transform hover:scale-110 active:scale-95"
                    onClick={(e) => handleAddToCart(item, e)}
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