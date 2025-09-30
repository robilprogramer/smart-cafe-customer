"use client"

import { useEffect } from "react"
import { useCartStore } from "@/store/cart"
import { useRouter } from "next/navigation"
import { CreditCard, QrCode, Banknote, ShoppingBag } from "lucide-react"

export default function PembayaranPage() {
  const { items, setItems } = useCartStore()
  const router = useRouter()

  // Ambil cart dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart-storage")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (err) {
        console.error("Gagal parsing cart dari localStorage", err)
      }
    }
  }, [setItems])

  // Simpan ke localStorage
  useEffect(() => {
    localStorage.setItem("cart-storage", JSON.stringify(items))
  }, [items])

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow">
          <ShoppingBag className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">Keranjang masih kosong</p>
        </div>
      </main>
    )
  }

  const pilihMetode = (metode: string) => {
    router.push(`/pembayaran/${metode}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-md mx-auto space-y-5">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Metode Pembayaran</h1>
          <p className="text-sm text-gray-500 mt-1">Pilih cara pembayaran yang tersedia</p>
        </div>

        {/* Ringkasan Pesanan */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Pesanan Anda</h2>
          <div className="divide-y divide-gray-200">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between py-1 text-sm">
                <span>{i.name} <span className="text-gray-500">x{i.qty}</span></span>
                <span className="font-medium">Rp {(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-2">
            <span className="font-bold text-gray-800">Total</span>
            <span className="text-lg font-bold text-blue-600">
              Rp {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Pilih Metode */}
        <div className="grid gap-3">
          <button
            onClick={() => pilihMetode("cash")}
            className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl shadow hover:opacity-90 transition"
          >
            <Banknote className="w-6 h-6" />
            <span className="font-semibold">Bayar Tunai</span>
          </button>
          <button
            onClick={() => pilihMetode("qris")}
            className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow hover:opacity-90 transition"
          >
            <QrCode className="w-6 h-6" />
            <span className="font-semibold">Bayar QRIS</span>
          </button>
          <button
            onClick={() => pilihMetode("briva")}
            className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:opacity-90 transition"
          >
            <CreditCard className="w-6 h-6" />
            <span className="font-semibold">Bayar BRIVA</span>
          </button>
        </div>
      </div>
    </main>
  )
}
