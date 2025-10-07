import { MenuItemWithImages, Category } from "@/types/menu"
import { UtensilsCrossed, Coffee, IceCream } from "lucide-react"

export const menuData: MenuItemWithImages[] = [
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

export const categories: Category[] = [
  { name: "Semua", icon: UtensilsCrossed },
  { name: "Makanan", icon: UtensilsCrossed },
  { name: "Minuman", icon: Coffee },
  { name: "Lainnya", icon: IceCream },
]