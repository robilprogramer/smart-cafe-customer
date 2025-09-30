"use client"

import { useCartStore } from "@/store/cart"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Wallet, User, Receipt, ShoppingBag } from "lucide-react"

export default function CashPage() {
  const { items, clearCart } = useCartStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Dummy data (bisa nanti dari API/order nyata)
  const CUSTOMER_ID = "CUST-12345"
  const CUSTOMER_NAME = "John Doe"
  const TABLE_ID = "MEJA-08"
  const ORDER_ID = "ORD-12345"

  useEffect(() => setMounted(true), [])

  const formatRupiah = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleBayar = () => {
    const currentHistory = JSON.parse(localStorage.getItem("history") || "[]")
    const newHistory = [
      ...currentHistory,
      ...items.map((i) => ({
        id: crypto.randomUUID(),
        name: i.name,
        qty: i.qty,
        price: i.price,
        date: new Date().toLocaleString(),
        metode: "Cash",
        customerId: CUSTOMER_ID,
        tableId: TABLE_ID,
      })),
    ]
    localStorage.setItem("history", JSON.stringify(newHistory))
    clearCart()
    router.push("/pembayaran/success")
  }

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
        <p className="text-orange-600">Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-6 px-4 flex items-center">
      <div className="max-w-md mx-auto w-full space-y-5">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-lg p-5 text-center text-white">
          <div className="flex justify-center mb-2">
            <div className="bg-white/20 rounded-full p-3">
              <Wallet className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-xl font-bold">Pembayaran Tunai</h1>
          <p className="text-sm opacity-90">Bayar langsung ke kasir sesuai pesanan</p>
        </div>

        {/* Info Customer */}
        <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
          <div className="flex items-center gap-2 text-orange-700">
            <User className="w-4 h-4" />
            <p className="text-xs font-semibold">Informasi Customer</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Customer ID</p>
              <p className="font-bold">{CUSTOMER_ID}</p>
            </div>
            <div>
              <p className="text-gray-500">Nama</p>
              <p className="font-bold">{CUSTOMER_NAME}</p>
            </div>
            <div>
              <p className="text-gray-500">Meja</p>
              <p className="font-bold">{TABLE_ID}</p>
            </div>
            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-bold">{ORDER_ID}</p>
            </div>
          </div>
        </div>

        {/* Detail Pesanan */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 text-orange-700 mb-2">
            <ShoppingBag className="w-4 h-4" />
            <p className="text-xs font-semibold">Detail Pesanan</p>
          </div>
          <div className="divide-y divide-gray-200 mb-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between py-1 text-sm">
                <span>
                  {item.name}{" "}
                  <span className="text-orange-600 font-medium">x{item.qty}</span>
                </span>
                <span className="font-semibold text-orange-700">
                  Rp {formatRupiah(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-sm font-bold text-gray-700">Total</span>
            <span className="text-lg font-bold text-orange-600">
              Rp {formatRupiah(totalPrice)}
            </span>
          </div>
        </div>

        {/* Instruksi */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-sm p-4 space-y-2">
          <div className="flex items-center gap-2 text-orange-700">
            <Receipt className="w-4 h-4" />
            <p className="text-xs font-semibold">Cara Pembayaran</p>
          </div>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li>Tunjukkan nomor meja Anda ke kasir</li>
            <li>Sebutkan Order ID <span className="font-bold">{ORDER_ID}</span></li>
            <li>Bayar sesuai dengan total yang tertera</li>
            <li>Kasir akan memverifikasi pesanan Anda</li>
          </ol>
        </div>

        {/* Tombol Konfirmasi */}
        <button
          onClick={handleBayar}
          className="w-full py-3 bg-gradient-to-r from-orange-600 to-yellow-500 text-white font-bold text-sm rounded-xl shadow-lg hover:from-orange-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          ✓ Konfirmasi Pembayaran
        </button>

        <p className="text-xs text-center text-gray-500">
          Pastikan Anda sudah membayar ke kasir sebelum menekan konfirmasi
        </p>
      </div>
    </main>
  )
}
