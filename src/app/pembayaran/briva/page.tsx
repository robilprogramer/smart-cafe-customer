"use client"

import { useCartStore } from "@/store/cart"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BrivaPage() {
  const { items, clearCart } = useCartStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15) // 5 menit = 300 detik
  const [copied, setCopied] = useState(false)

  // Hardcoded data
  const CUSTOMER_ID = "CUST-12345"
  const CUSTOMER_NAME = "John Doe"
  const TABLE_ID = "MEJA-08"
  const ORDER_ID = "ORD-12345"
  const VA_NUMBER = "88810123456789012"
  const BANK_NAME = "BRI"

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

  // Format waktu ke MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Format rupiah
  const formatRupiah = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Hitung persentase waktu tersisa untuk progress bar
  const timePercentage = (timeLeft / 300) * 100

  // Hitung total
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleCopy = () => {
    navigator.clipboard.writeText(VA_NUMBER)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        metode: "BRIVA",
        customerId: CUSTOMER_ID,
        tableId: TABLE_ID,
      })),
    ]

    // simpan ke localStorage
    localStorage.setItem("history", JSON.stringify(newHistory))

    // bersihkan cart
    clearCart()

    // redirect ke success
    router.push("/pembayaran/success")
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-blue-600">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-2 px-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="inline-block p-2 bg-blue-600 rounded-full mb-1">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-blue-800 mb-0.5">Pembayaran BRI Virtual Account</h1>
          <p className="text-xs text-blue-600">Transfer ke nomor VA di bawah ini</p>
        </div>

        {/* Timer Countdown */}
        <div className="bg-white rounded-lg shadow-lg p-2 mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-600">Waktu tersisa:</span>
            </div>
            <span className={`text-lg font-bold ${timeLeft <= 60 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${timeLeft <= 60 ? 'bg-red-500' : 'bg-blue-600'}`}
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
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-blue-50 rounded p-1.5">
              <p className="text-xs text-blue-600 font-medium">Customer</p>
              <p className="text-xs font-bold text-blue-800">{CUSTOMER_ID}</p>
            </div>
            <div className="bg-blue-50 rounded p-1.5">
              <p className="text-xs text-blue-600 font-medium">Meja</p>
              <p className="text-xs font-bold text-blue-800">{TABLE_ID}</p>
            </div>
            <div className="bg-blue-50 rounded p-1.5">
              <p className="text-xs text-blue-600 font-medium">Nama</p>
              <p className="text-xs font-bold text-blue-800">{CUSTOMER_NAME}</p>
            </div>
          </div>

          {/* VA Number Container */}
          <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded-lg p-4 mb-3">
            <div className="text-center mb-3">
              <p className="text-xs text-blue-700 font-medium mb-1">Nomor Virtual Account</p>
              <div className="bg-white rounded-lg p-3 mb-2 shadow-md">
                <p className="text-2xl font-bold text-blue-800 tracking-wider">{VA_NUMBER}</p>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-all"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tersalin!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Salin Nomor
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                BRI
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Bank</p>
                <p className="text-xs font-bold text-blue-800">{BANK_NAME}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="text-xs font-bold text-blue-800">{ORDER_ID}</p>
              </div>
            </div>
          </div>

          {/* Detail Pesanan */}
          <div className="border-t border-blue-100 pt-2 mb-3">
            <h3 className="text-xs font-semibold text-blue-800 mb-1.5">Detail Pesanan:</h3>
            <div className="space-y-1 mb-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-gray-700">
                    {item.name} <span className="text-blue-600 font-medium">x{item.qty}</span>
                  </span>
                  <span className="font-semibold text-blue-700">
                    Rp {formatRupiah(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-blue-200 pt-1.5 flex justify-between items-center">
              <span className="text-sm font-bold text-blue-800">Total Pembayaran</span>
              <span className="text-lg font-bold text-blue-600">
                Rp {formatRupiah(totalPrice)}
              </span>
            </div>
          </div>

          {/* Instruksi */}
          <div className="bg-blue-50 rounded-lg p-2 mb-3">
            <h4 className="text-xs font-semibold text-blue-800 mb-1">Cara Pembayaran:</h4>
            <ol className="text-xs text-blue-700 space-y-0.5 list-decimal list-inside">
              <li>Buka aplikasi BRI Mobile atau ATM BRI</li>
              <li>Pilih menu Transfer / Pembayaran</li>
              <li>Pilih Virtual Account</li>
              <li>Masukkan nomor VA di atas</li>
              <li>Periksa detail & konfirmasi pembayaran</li>
            </ol>
          </div>

          {/* Button Konfirmasi */}
          <button
            onClick={handleBayar}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
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