'use client';

import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';

const ScanPage = () => {
  const router = useRouter();

  const handleScan = () => {
    // logika untuk scan barcode nanti masuk sini
    console.log("Mulai scan barcode...");
    router.push("/menu"); // contoh redirect ke halaman menu
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Scan Barcode Meja</h1>
      <p className="text-gray-600 mb-8 text-center">
        Silakan scan barcode pada meja Anda untuk memulai pemesanan.
      </p>

      {/* Tombol Scan */}
      <button
        onClick={handleScan}
        className="group relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95"
      >
        <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        Mulai Scan
        <span className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:opacity-20 transition duration-300"></span>
      </button>
    </div>
  );
};

export default ScanPage;
