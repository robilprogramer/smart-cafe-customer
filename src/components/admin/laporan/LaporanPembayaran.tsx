import React from 'react';

export default function LaporanPembayaran() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Metode Pembayaran</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="text-sm text-blue-600 font-medium mb-1">💳 Kartu Debit/Kredit</div>
            <div className="text-2xl font-bold text-blue-700">Rp 1,250K</div>
            <div className="text-xs text-blue-500 mt-1">43.6% dari total</div>
          </div>
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <div className="text-sm text-green-600 font-medium mb-1">💵 Tunai</div>
            <div className="text-2xl font-bold text-green-700">Rp 980K</div>
            <div className="text-xs text-green-500 mt-1">34.1% dari total</div>
          </div>
          <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="text-sm text-purple-600 font-medium mb-1">📱 E-Wallet</div>
            <div className="text-2xl font-bold text-purple-700">Rp 640K</div>
            <div className="text-xs text-purple-500 mt-1">22.3% dari total</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik Pembayaran</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">149</div>
            <div className="text-sm text-gray-500 mt-1">Total Transaksi</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">Rp 19K</div>
            <div className="text-sm text-gray-500 mt-1">Rata-rata/Transaksi</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">Rp 65K</div>
            <div className="text-sm text-gray-500 mt-1">Transaksi Tertinggi</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">Rp 8K</div>
            <div className="text-sm text-gray-500 mt-1">Transaksi Terendah</div>
          </div>
        </div>
      </div>
    </div>
  );
}