"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useCartStore, MenuItem } from "@/store/cart"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const menuData: MenuItem[] = [
  { id: 1, name: "Nasi Goreng", description: "Nasi goreng spesial dengan telur dan ayam.", price: 25000, category: "Makanan" },
  { id: 2, name: "Mie Ayam", description: "Mie ayam dengan topping pangsit dan sayur.", price: 20000, category: "Makanan" },
  { id: 3, name: "Es Teh Manis", description: "Teh manis dingin segar.", price: 8000, category: "Minuman" },
  { id: 4, name: "Kopi Hitam", description: "Kopi hitam panas tanpa gula.", price: 12000, category: "Minuman" },
  { id: 5, name: "Keripik Kentang", description: "Keripik kentang renyah.", price: 10000, category: "Lainnya" },
  { id: 6, name: "Puding Coklat", description: "Puding coklat lembut dengan saus vanila.", price: 15000, category: "Lainnya" },
]

const categories = ["Makanan", "Minuman", "Lainnya"] as const

export default function MenuPage() {
  const { items, addItem, removeItem, clearCart } = useCartStore()

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)

  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Cafe</h1>

        {/* Cart Drawer */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="text-sm bg-red-500 text-white px-2 rounded-full">
                  {items.reduce((acc, i) => acc + i.qty, 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Keranjang</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {items.length === 0 && <p className="text-gray-500">Keranjang kosong</p>}
              {items.map((i) => (
                <div key={i.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-gray-500">Rp {i.price.toLocaleString()} x {i.qty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => removeItem(i.id)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => addItem(i)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {items.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="font-bold">Total: Rp {total.toLocaleString()}</p>
                  <div className="flex gap-2 mt-2">
                    <Button className="w-full">Checkout</Button>
                    <Button className="w-full" variant="destructive" onClick={clearCart}>
                      Hapus Semua
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {categories.map((cat) => (
        <section key={cat} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{cat}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {menuData
              .filter((item) => item.category === cat)
              .map((item) => (
                <Card key={item.id} className="shadow-sm">
                  <CardContent className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="mt-2 font-medium">Rp {item.price.toLocaleString()}</p>
                    </div>
                    <Button onClick={() => addItem(item)} className="mt-3 w-full flex gap-2">
                      <Plus className="w-4 h-4" /> Tambah
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      ))}
    </main>
  )
}
