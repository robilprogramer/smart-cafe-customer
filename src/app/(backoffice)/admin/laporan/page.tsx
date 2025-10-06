"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface Laporan {
  id: number;
  tanggal: string;
  totalTransaksi: number;
  jumlahItem: number;
}

export default function LaporanPage() {
  const laporanList: Laporan[] = [
    { id: 1, tanggal: "2025-09-28", totalTransaksi: 250000, jumlahItem: 15 },
    { id: 2, tanggal: "2025-09-29", totalTransaksi: 450000, jumlahItem: 27 },
    { id: 3, tanggal: "2025-09-30", totalTransaksi: 320000, jumlahItem: 19 },
    { id: 4, tanggal: "2025-10-01", totalTransaksi: 500000, jumlahItem: 34 },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Laporan Penjualan</h2>
              <p className="text-gray-600 mt-1">
                Ringkasan transaksi harian Smart Cafe
              </p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow">
              📊 Export Laporan
            </button>
          </div>

          {/* Tabel Laporan */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Daftar Laporan
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      ID
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Tanggal
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Jumlah Item
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Total Transaksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {laporanList.map((laporan) => (
                    <tr key={laporan.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        {laporan.id}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        {laporan.tanggal}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        {laporan.jumlahItem} item
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-semibold text-blue-700">
                        Rp {laporan.totalTransaksi.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}