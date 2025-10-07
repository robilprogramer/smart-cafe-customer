"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface Produk {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
  fotos?: string[];
}

export default function ProductsPage() {
  const [produkList, setProdukList] = useState<Produk[]>([
    { id: 1, nama: "Kopi Hitam", kategori: "Minuman", harga: 15000, stok: 50, fotos: [] },
    { id: 2, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, stok: 30, fotos: [] },
    { id: 3, nama: "Teh Manis", kategori: "Minuman", harga: 12000, stok: 70, fotos: [] },
    { id: 4, nama: "Roti Bakar", kategori: "Snack", harga: 18000, stok: 20, fotos: [] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Makanan");
  const [harga, setHarga] = useState<number>(0);
  const [hargaInput, setHargaInput] = useState("");
  const [stok, setStok] = useState<number | "">("");
  const [fotos, setFotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validasi form tambah produk
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!nama.trim()) newErrors.nama = "Nama produk wajib diisi";
    if (harga <= 0) newErrors.harga = "Harga harus lebih dari 0";
    if (stok === "" || stok < 0) newErrors.stok = "Stok tidak boleh kosong atau negatif";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit tambah produk
  const handleTambahProduk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProduk: Produk = {
      id: produkList.length > 0 ? Math.max(...produkList.map(p => p.id)) + 1 : 1,
      nama,
      kategori,
      harga,
      stok: Number(stok) || 0,
      fotos: fotos,
    };

    setProdukList([...produkList, newProduk]);
    closeModal();
  };

  // Reset dan tutup modal
  const closeModal = () => {
    setShowModal(false);
    setNama("");
    setKategori("Makanan");
    setHarga(0);
    setHargaInput("");
    setStok("");
    setFotos([]);
    setErrors({});
  };

  // Format dan simpan harga saat input berubah
  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const numberValue = Number(value);
    setHarga(numberValue);
    setHargaInput(
      value
        ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(numberValue)
        : ""
    );
    if (errors.harga) setErrors({ ...errors, harga: "" });
  };

  // Update nama dan hilangkan error jika ada
  const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNama(e.target.value);
    if (errors.nama) setErrors({ ...errors, nama: "" });
  };

  // Update stok dan hilangkan error jika ada
  const handleStokChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const numVal = val === "" ? "" : Number(val);
    setStok(numVal);
    if (errors.stok) setErrors({ ...errors, stok: "" });
  };

  // Handle upload foto dan convert ke base64 untuk preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const readers = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(results => {
        setFotos([...fotos, ...results]);
      });
    }
  };

  // Hapus foto dari preview
  const handleRemoveFoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 relative">
          <h2 className="text-3xl font-semibold mb-6">Manajemen Produk</h2>

          <button
            onClick={() => setShowModal(true)}
            className="mb-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Tambah Produk
          </button>

          {/* Tabel daftar produk */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-green-100">
                <tr>
                  <th className="py-3 px-4 border-b border-green-300">ID</th>
                  <th className="py-3 px-4 border-b border-green-300">Nama</th>
                  <th className="py-3 px-4 border-b border-green-300">Kategori</th>
                  <th className="py-3 px-4 border-b border-green-300">Harga</th>
                  <th className="py-3 px-4 border-b border-green-300">Stok</th>
                  <th className="py-3 px-4 border-b border-green-300">Foto</th>
                </tr>
              </thead>
              <tbody>
                {produkList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-4 text-gray-500">
                      Belum ada produk
                    </td>
                  </tr>
                ) : (
                  produkList.map((produk) => (
                    <tr
                      key={produk.id}
                      className="even:bg-green-50 hover:bg-green-100 transition"
                    >
                      <td className="py-2 px-4 border-b border-green-200">{produk.id}</td>
                      <td className="py-2 px-4 border-b border-green-200">{produk.nama}</td>
                      <td className="py-2 px-4 border-b border-green-200">{produk.kategori}</td>
                      <td className="py-2 px-4 border-b border-green-200">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(produk.harga)}
                      </td>
                      <td className="py-2 px-4 border-b border-green-200">{produk.stok}</td>
                      <td className="py-2 px-4 border-b border-green-200">
                        {produk.fotos && produk.fotos.length > 0 ? (
                          <img
                            src={produk.fotos[0]}
                            alt={produk.nama}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-gray-400 italic">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal tambah produk */}
          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={closeModal}
            >
              <div
                className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold mb-4">Tambah Produk Baru</h3>

                <form onSubmit={handleTambahProduk} className="space-y-4">
                  {/* Nama Produk */}
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="nama">
                      Nama Produk <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama"
                      value={nama}
                      onChange={handleNamaChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.nama ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                        }`}
                    />
                    {errors.nama && (
                      <p className="text-red-600 mt-1 text-sm">{errors.nama}</p>
                    )}
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="kategori">
                      Kategori
                    </label>
                    <select
                      id="kategori"
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Makanan">Makanan</option>
                      <option value="Minuman">Minuman</option>
                      <option value="Snack">Snack</option>
                    </select>
                  </div>

                  {/* Harga */}
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="harga">
                      Harga <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="harga"
                      value={hargaInput}
                      onChange={handleHargaChange}
                      placeholder="Rp0"
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.harga ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                        }`}
                    />
                    {errors.harga && (
                      <p className="text-red-600 mt-1 text-sm">{errors.harga}</p>
                    )}
                  </div>

                  {/* Stok */}
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="stok">
                      Stok <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="stok"
                      min={0}
                      value={stok === "" ? "" : stok}
                      onChange={handleStokChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.stok ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                        }`}
                    />
                    {errors.stok && (
                      <p className="text-red-600 mt-1 text-sm">{errors.stok}</p>
                    )}
                  </div>

                  {/* Upload Foto */}
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="foto">
                      Foto Produk
                    </label>
                    <input
                      type="file"
                      id="foto"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="w-full"
                    />
                    {fotos.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-3 max-h-40 overflow-auto border rounded p-2">
                        {fotos.map((foto, index) => (
                          <div key={index} className="relative w-20 h-20 rounded overflow-hidden border">
                            <img
                              src={foto}
                              alt={`Foto ${index + 1}`}

                              className="object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFoto(index)}
                              className="absolute top-0 right-0 bg-red-600 text-white rounded-bl px-1 text-sm hover:bg-red-700"
                              title="Hapus foto"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tombol aksi */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      Tambah
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}