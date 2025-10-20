import { MenuItem, MenuItemFreeOption, MenuItemOption } from "@/store/cart"

// Extend MenuItem dengan images dan optional customization
export interface MenuItemWithImages extends MenuItem {
  images: string[]
  selectedSize?: MenuItemOption | null
  selectedAddOns?: MenuItemOption[] | null
  selectedFreeOptions?: Record<string, string> | null
  notes?: string
}
export interface Category {
  name: string
  icon: React.ComponentType<{ className?: string }>
}

export interface FlyingItem {
  id: string  // ← ubah dari number ke string
  name: string
  image: string
  startX: number
  startY: number
}
// Re-export untuk kemudahan
export type { MenuItemFreeOption }
