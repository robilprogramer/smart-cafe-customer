"use client"

import { useCartStore } from "@/store/cart"
import { useRouter } from "next/navigation"
import { CreditCard, QrCode, Banknote } from "lucide-react"

export default function PembayaranPage() {
  const { items } = useCartStore()
  const router = useRouter()

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto p-6 text-center">
        <p>Keranjang kosong</p>
      </main>
    )
  }

  const pilihMetode = (metode: string) => {
    router.push(`/pembayaran/${metode}`)
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pilih Metode Pembayaran</h1>

      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between">
            <span>{i.name} x {i.qty}</span>
            <span>Rp {(i.price * i.qty).toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold">Total: Rp {total.toLocaleString()}</p>

      <div className="mt-6 grid gap-4">
        <button
          onClick={() => pilihMetode("cash")}
          className="flex items-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          <Banknote className="w-5 h-5" /> Bayar Cash
        </button>
        <button
          onClick={() => pilihMetode("qris")}
          className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <QrCode className="w-5 h-5" /> Bayar QRIS
        </button>
        <button
          onClick={() => pilihMetode("briva")}
          className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <CreditCard className="w-5 h-5" /> Bayar BRIVA
        </button>
      </div>
    </main>
  )
}
