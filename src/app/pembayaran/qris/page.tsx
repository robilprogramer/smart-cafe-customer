"use client"

import { useCartStore } from "@/store/cart"
import { useRouter } from "next/navigation"

export default function QrisPage() {
  const { items, clearCart } = useCartStore()
  const router = useRouter()

  const handleBayar = () => {
    // ambil history lama
    const currentHistory = JSON.parse(localStorage.getItem("history") || "[]")

    // tambah pesanan baru
    const newHistory = [
      ...currentHistory,
      ...items.map((i) => ({
        id: crypto.randomUUID(),
        name: i.name,
        qty: i.qty,
        price: i.price,
        date: new Date().toLocaleString(),
        metode: "QRIS",
      })),
    ]

    // simpan ke localStorage
    localStorage.setItem("history", JSON.stringify(newHistory))

    // bersihkan cart
    clearCart()

    // redirect ke success
    router.push("/pembayaran/success")
  }

  return (
    <main className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Pembayaran QRIS</h1>
      <p className="mb-6">Silakan scan QR code untuk membayar.</p>

      {/* contoh tombol konfirmasi */}
      <button
        onClick={handleBayar}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Konfirmasi Pembayaran
      </button>
    </main>
  )
}
