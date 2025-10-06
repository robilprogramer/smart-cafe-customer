"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface Promo {
  id: number;
  judul: string;
  deskripsi: string;
  diskon: number;
  berlaku: string;
  kode: string;
}

export default function PromoPage() {
  const promoList: Promo[] = [
    {
      id: 1,
      judul: "Diskon Spesial Kopi",
      deskripsi: "Nikmati kopi favoritmu dengan potongan harga 30%.",
      diskon: 30,
      berlaku: "1 - 15 Oktober 2025",
      kode: "KOPI30",
    },
    {
      id: 2,
      judul: "Gratis Dessert",
      deskripsi: "Setiap pembelian minimal Rp100.000 dapat gratis dessert.",
      diskon: 100,
      berlaku: "5 - 20 Oktober 2025",
      kode: "SWEET100",
    },
    {
      id: 3,
      judul: "Paket Hemat Keluarga",
      deskripsi: "Pesan 3 menu utama, gratis 1 minuman spesial.",
      diskon: 25,
      berlaku: "1 - 31 Oktober 2025",
      kode: "FAMILY25",
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Manajemen Promo</h2>
              <p className="text-gray-600 mt-1">
                Kelola daftar promo yang tersedia di sistem
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow">
              + Tambah Promo
            </button>
          </div>

          {/* Tabel Promo */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Daftar Promo</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      ID
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Judul
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Deskripsi
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Diskon
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Berlaku
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Kode Promo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {promoList.map((promo) => (
                    <tr key={promo.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm">{promo.id}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{promo.judul}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{promo.deskripsi}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-semibold text-indigo-600">
                        -{promo.diskon}%
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{promo.berlaku}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {promo.kode}
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
    </ProtectedRoute>
  );
}
