"use client";

import AdminLayout from "@/components/admin/AdminLayout";


interface Produk {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
}

export default function ProdukPage() {
  const produkList: Produk[] = [
    { id: 1, nama: "Kopi Hitam", kategori: "Minuman", harga: 15000, stok: 50 },
    { id: 2, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, stok: 30 },
    { id: 3, nama: "Teh Manis", kategori: "Minuman", harga: 12000, stok: 70 },
    { id: 4, nama: "Roti Bakar", kategori: "Snack", harga: 18000, stok: 20 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Produk</h2>
            <p className="text-gray-600 mt-1">
              Kelola daftar produk yang tersedia di sistem
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow">
            + Tambah Produk
          </button>
        </div>

        {/* Tabel Produk */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Daftar Produk
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    ID
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Nama
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Kategori
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Harga
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Stok
                  </th>
                </tr>
              </thead>
              <tbody>
                {produkList.map((produk) => (
                  <tr key={produk.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {produk.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {produk.nama}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {produk.kategori}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      Rp {produk.harga.toLocaleString("id-ID")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          produk.stok > 20
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {produk.stok}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
