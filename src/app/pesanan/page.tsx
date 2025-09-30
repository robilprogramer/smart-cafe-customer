"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Loader2 } from "lucide-react"
import Link from "next/link"

type Status = "menunggu" | "diproses" | "selesai"

export default function PesananPage() {
  const [status, setStatus] = useState<Status>("menunggu")

  useEffect(() => {
    // simulasi perubahan status
    const timers = [
      setTimeout(() => setStatus("diproses"), 4000),
      setTimeout(() => setStatus("selesai"), 8000),
    ]

    return () => timers.forEach((t) => clearTimeout(t))
  }, [])

  const steps: { key: Status; label: string; icon: React.ReactNode }[] = [
    { key: "menunggu", label: "Menunggu Konfirmasi", icon: <Clock className="w-6 h-6" /> },
    { key: "diproses", label: "Sedang Diproses", icon: <Loader2 className="w-6 h-6 animate-spin" /> },
    { key: "selesai", label: "Pesanan Selesai", icon: <CheckCircle className="w-6 h-6 text-green-600" /> },
  ]

  return (
    <main className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Monitoring Pesanan</h1>

      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.key}
            className={`flex items-center justify-between p-4 border rounded-lg ${
              status === step.key ? "bg-green-50 border-green-500" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {step.icon}
              <span className="font-medium">{step.label}</span>
            </div>
            {status === step.key && (
              <span className="text-sm text-green-600 font-semibold">Aktif</span>
            )}
          </div>
        ))}
      </div>

      {status === "selesai" && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-green-600 font-semibold">
            ✅ Pesanan Anda sudah selesai. Silakan nikmati!
          </p>
          <Link
            href="/history"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Lihat History Pesanan
          </Link>
        </div>
      )}
    </main>
  )
}
