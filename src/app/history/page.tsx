"use client"

import { useEffect, useState } from "react"

type HistoryItem = {
  id: string
  name: string
  qty: number
  price: number
  date: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("history")
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">History Pesanan</h1>

      {history.length === 0 ? (
        <p className="text-gray-500">Belum ada pesanan selesai.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((h) => (
            <li
              key={h.id}
              className="border p-4 rounded-lg flex justify-between items-center bg-white shadow-sm"
            >
              <div>
                <p className="font-medium">
                  {h.name} x {h.qty}
                </p>
                <p className="text-sm text-gray-500">{h.date}</p>
              </div>
              <span className="font-bold">
                Rp {(h.price * h.qty).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
