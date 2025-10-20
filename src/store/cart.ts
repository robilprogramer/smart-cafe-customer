import { create } from "zustand"

// Interface untuk options
export interface MenuItemOption {
  name: string
  price: number
}

export interface MenuItemFreeOption {
  label: string
  options: string[]
}

export interface MenuItemOptions {
  sizes?: MenuItemOption[]
  addOns?: MenuItemOption[]
  freeOptions?: MenuItemFreeOption[] // Tambahan untuk level pedas, es batu, dll
}

// Update MenuItem dengan properti baru
export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  category: "Makanan" | "Minuman" | "Lainnya"
  
  // Properti baru - TAMBAHAN
  isPopular?: boolean
  isNew?: boolean
  availability?: boolean
  rating?: number
  reviewCount?: number
  spicyLevel?: 0 | 1 | 2 | 3
  dietary?: string[]
  calories?: number
  prepTime?: string
  options?: MenuItemOptions
}

export type CartItem = MenuItem & { 
  qty: number
  notes?: string
  selectedSize?: MenuItemOption
  selectedAddOns?: MenuItemOption[]
  selectedFreeOptions?: Record<string, string>
}

type CartState = {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
  setItems: (items: CartItem[]) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id)
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...item, qty: 1 }] }
    }),
  removeItem: (id) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === id)
      if (!exists) return state
      if (exists.qty === 1) {
        return { items: state.items.filter((i) => i.id !== id) }
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        ),
      }
    }),
  clearCart: () => set({ items: [] }),
  setItems: (items) => set({ items }),
}))