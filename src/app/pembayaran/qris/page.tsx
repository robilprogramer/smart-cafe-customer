"use client"

import { useCartStore } from "@/store/cart"
import { useRouter } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useState } from "react"

export default function QrisPage() {
  const { items, clearCart } = useCartStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15) // 15 detik untuk testing

  // Hardcoded data
  const CUSTOMER_ID = "CUST-12345"
  const CUSTOMER_NAME = "John Doe"
  const CUSTOMER_PHONE = "0812-3456-7890"
  const TABLE_ID = "MEJA-08"
  const ORDER_ID = "ORD-12345"
  const TIMESTAMP = "2025-09-30T10:00:00.000Z"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Timer countdown
  useEffect(() => {
    if (!mounted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  // Redirect saat waktu habis
  useEffect(() => {
    if (timeLeft === 0) {
      router.push("/pembayaran")
    }
  }, [timeLeft, router])

  // Format rupiah
  const formatRupiah = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Format waktu ke MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Hitung persentase waktu tersisa untuk progress bar
  const timePercentage = (timeLeft / 300) * 100

  // Hitung total
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  // Data untuk QR Code - SEMUA DATA STATIC
  const qrData = {
    customerId: CUSTOMER_ID,
    customerName: CUSTOMER_NAME,
    customerPhone: CUSTOMER_PHONE,
    tableId: TABLE_ID,
    orderId: ORDER_ID,
    items: items.map(i => ({
      name: i.name,
      qty: i.qty,
      price: i.price
    })),
    total: totalPrice,
    timestamp: TIMESTAMP,
    paymentMethod: "QRIS"
  }

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
        metode: "QRIS",
        customerId: CUSTOMER_ID,
        customerPhone: CUSTOMER_PHONE,
        tableId: TABLE_ID,
      })),
    ]

    localStorage.setItem("history", JSON.stringify(newHistory))
    clearCart()
    router.push("/pembayaran/success")
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-green-600">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-2 px-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="inline-block p-2 bg-green-600 rounded-full mb-1">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-green-800 mb-0.5">Pembayaran QRIS</h1>
          <p className="text-xs text-green-600">Scan QR Code untuk melanjutkan pembayaran</p>
        </div>

        {/* Timer Countdown */}
        <div className="bg-white rounded-lg shadow-lg p-2 mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-600">Waktu tersisa:</span>
            </div>
            <span className={`text-lg font-bold ${timeLeft <= 60 ? 'text-red-600' : 'text-green-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${timeLeft <= 60 ? 'bg-red-500' : 'bg-green-600'}`}
              style={{ width: `${timePercentage}%` }}
            />
          </div>
          {timeLeft <= 60 && (
            <p className="text-xs text-red-600 mt-1 text-center font-medium">
              ⚠️ Waktu hampir habis!
            </p>
          )}
        </div>

        {/* Card Info Customer */}
        <div className="bg-white rounded-lg shadow-lg p-3">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-green-50 rounded p-1.5">
              <p className="text-xs text-green-600 font-medium">Customer</p>
              <p className="text-xs font-bold text-green-800">{CUSTOMER_ID}</p>
            </div>
            <div className="bg-green-50 rounded p-1.5">
              <p className="text-xs text-green-600 font-medium">Nama</p>
              <p className="text-xs font-bold text-green-800">{CUSTOMER_NAME}</p>
            </div>
            <div className="bg-green-50 rounded p-1.5">
              <p className="text-xs text-green-600 font-medium">No. Telepon</p>
              <p className="text-xs font-bold text-green-800">{CUSTOMER_PHONE}</p>
            </div>
            <div className="bg-green-50 rounded p-1.5">
              <p className="text-xs text-green-600 font-medium">Meja</p>
              <p className="text-xs font-bold text-green-800">{TABLE_ID}</p>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-50 rounded-lg p-3 mb-3">
            <div className="flex justify-center mb-1">
              <div className="bg-white rounded-lg p-2 shadow-md">
                <QRCodeSVG
                  value={JSON.stringify(qrData)}
                  size={140}
                  level="H"
                  includeMargin={true}
                  fgColor="#059669"
                  bgColor="#ffffff"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-green-700 font-medium">Order ID: {ORDER_ID}</p>
            </div>
          </div>

          {/* Detail Pesanan */}
          <div className="border-t border-green-100 pt-2 mb-3">
            <h3 className="text-xs font-semibold text-green-800 mb-1.5">Detail Pesanan:</h3>
            <div className="space-y-1 mb-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-gray-700">
                    {item.name} <span className="text-green-600 font-medium">x{item.qty}</span>
                  </span>
                  <span className="font-semibold text-green-700">
                    Rp {formatRupiah(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-green-200 pt-1.5 flex justify-between items-center">
              <span className="text-sm font-bold text-green-800">Total</span>
              <span className="text-lg font-bold text-green-600">
                Rp {formatRupiah(totalPrice)}
              </span>
            </div>
          </div>

          {/* Button Konfirmasi */}
          <button
            onClick={handleBayar}
            className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold rounded-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            ✓ Konfirmasi Pembayaran
          </button>

          <p className="text-xs text-center text-gray-500 mt-2">
            Pastikan pembayaran sudah berhasil sebelum konfirmasi
          </p>
        </div>
      </div>
    </main>
  )
}
