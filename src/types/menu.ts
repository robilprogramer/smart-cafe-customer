import { MenuItem } from "@/store/cart"

export interface MenuItemWithImages extends MenuItem {
  images: string[]
}

export interface Category {
  name: string
  icon: React.ComponentType<{ className?: string }>
}

export interface FlyingItem {
  x: number
  y: number
  name: string
}