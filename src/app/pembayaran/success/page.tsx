import Link from "next/link"

export default function SuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Pembayaran Berhasil 🎉
      </h1>
      <p className="mb-6">Terima kasih, pesanan Anda sedang diproses.</p>

      <Link
        href="/monitoring"
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Lihat Monitoring Pesanan
      </Link>
    </main>
  )
}
