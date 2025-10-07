import { create } from "zustand"



export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  category: "Makanan" | "Minuman" | "Lainnya"
}


export type CartItem = MenuItem & { qty: number }

type CartState = {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
  setItems: (items: CartItem[]) => void   // ✅ tambahan
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
  setItems: (items) => set({ items }),   // ✅ tambahan untuk load dari localStorage
}))
