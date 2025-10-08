"use client";

import React, { useState } from "react";

interface Produk {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
  fotos?: string[];
}

// Component untuk menampilkan galeri foto yang bisa di-swipe di tabel
function ProductImageGallery({ fotos, nama }: { fotos: string[]; nama: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  if (!fotos || fotos.length === 0) {
    return (
      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative w-32 h-32 group">
        <img
          src={fotos[currentIndex]}
          alt={`${nama} - ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow"
          onClick={() => setShowFullscreen(true)}
        />
        
        {fotos.length > 1 && (
          <>
            {/* Tombol Previous */}
            <button
              onClick={handlePrev}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 hover:scale-110"
              title="Foto sebelumnya"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Tombol Next */}
            <button
              onClick={handleNext}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 hover:scale-110"
              title="Foto selanjutnya"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Indikator Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {fotos.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-white w-4" : "bg-white/60 hover:bg-white/80"
                  }`}
                  title={`Foto ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Counter */}
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-medium">
              {currentIndex + 1}/{fotos.length}
            </div>
          </>
        )}

        {/* Icon untuk memperbesar */}
        <div className="absolute top-2 left-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Main Image */}
            <img
              src={fotos[currentIndex]}
              alt={`${nama} - ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Navigation */}
            {fotos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Close Button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              {currentIndex + 1} / {fotos.length}
            </div>
            
            {/* Thumbnails */}
            {fotos.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4 py-2">
                {fotos.map((foto, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex ? "border-white scale-110" : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <img
                      src={foto}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Component untuk preview foto modal yang bisa di-swipe
function ModalImageGallery({ fotos, onRemove }: { fotos: string[]; onRemove: (index: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (fotos.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-3 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
      {/* Main Preview */}
      <div className="relative w-full h-64 bg-white rounded-lg overflow-hidden mb-3 shadow-inner">
        <img
          src={fotos[currentIndex]}
          alt={`Preview ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
        
        {fotos.length > 1 && (
          <>
            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-all hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-all hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Counter */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {fotos.length}
        </div>
        
        {/* Delete Button */}
        <button
          type="button"
          onClick={() => {
            onRemove(currentIndex);
            if (currentIndex >= fotos.length - 1 && currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
            }
          }}
          className="absolute top-3 left-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all hover:scale-110 shadow-lg"
          title="Hapus foto ini"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {fotos.map((foto, index) => (
          <div key={index} className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? "border-blue-500 ring-2 ring-blue-200 scale-105" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <img
                src={foto}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
            {/* Remove button on thumbnail */}
            <button
              type="button"
              onClick={() => {
                onRemove(index);
                if (currentIndex >= fotos.length - 1 && currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                } else if (currentIndex === index && index > 0) {
                  setCurrentIndex(index - 1);
                }
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              title="Hapus"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-600 mt-2 text-center">
        {fotos.length} foto dipilih
      </p>
    </div>
  );
}

export default function ProductsPage() {
  const [produkList, setProdukList] = useState<Produk[]>([
    { id: 1, nama: "Kopi Hitam", kategori: "Minuman", harga: 15000, stok: 50, fotos: [] },
    { id: 2, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, stok: 30, fotos: [] },
    { id: 3, nama: "Teh Manis", kategori: "Minuman", harga: 12000, stok: 70, fotos: [] },
    { id: 4, nama: "Roti Bakar", kategori: "Snack", harga: 18000, stok: 20, fotos: [] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Makanan");
  const [harga, setHarga] = useState<number>(0);
  const [hargaInput, setHargaInput] = useState("");
  const [stok, setStok] = useState<number | "">("");
  const [fotos, setFotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!nama.trim()) newErrors.nama = "Nama produk wajib diisi";
    if (harga <= 0) newErrors.harga = "Harga harus lebih dari 0";
    if (stok === "" || stok < 0) newErrors.stok = "Stok tidak boleh kosong atau negatif";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleEditProduk = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || editingId === null) {
      return;
    }
    
    setProdukList(
      produkList.map(p => 
        p.id === editingId 
          ? { ...p, nama, kategori, harga, stok: Number(stok) || 0, fotos }
          : p
      )
    );
    
    closeModal();
  };

  const handleDeleteProduk = () => {
    if (deleteId !== null) {
      setProdukList(produkList.filter(p => p.id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const openEditModal = (produk: Produk) => {
    setModalMode("edit");
    setEditingId(produk.id);
    setNama(produk.nama);
    setKategori(produk.kategori);
    setHarga(produk.harga);
    setHargaInput(
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(produk.harga)
    );
    setStok(produk.stok);
    setFotos(produk.fotos || []);
    setShowModal(true);
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode("add");
    setEditingId(null);
    setNama("");
    setKategori("Makanan");
    setHarga(0);
    setHargaInput("");
    setStok("");
    setFotos([]);
    setErrors({});
  };

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

  const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNama(e.target.value);
    if (errors.nama) setErrors({ ...errors, nama: "" });
  };

  const handleStokChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const numVal = val === "" ? "" : Number(val);
    setStok(numVal);
    if (errors.stok) setErrors({ ...errors, stok: "" });
  };

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

  const handleRemoveFoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Manajemen Produk</h2>

        <button
          onClick={openAddModal}
          className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Produk
        </button>

        {/* Tabel daftar produk */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 border-b-2 border-gray-200 font-semibold text-gray-700">ID</th>
                <th className="py-4 px-6 border-b-2 border-gray-200 font-semibold text-gray-700">Foto</th>
                <th className="py-4 px-6 border-b-2 border-gray-200 font-semibold text-gray-700">Nama</th>
                <th className="py-4 px-6 border-b-2 border-gray-200 font-semibold text-gray-700">Kategori</th>
                <th className="py-4 px-6 border-b-2 border-gray-200 font-semibold text-gray-700">Harga</th>
                <th className="py-4 px-6 border-b-2 border-gray-200 font-semibold text-gray-700">Stok</th>
                <th className="py-4 px-6 border-b-2 border-gray-200 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produkList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="font-medium">Belum ada produk</p>
                    <p className="text-sm mt-1">Klik tombol "Tambah Produk" untuk menambahkan produk baru</p>
                  </td>
                </tr>
              ) : (
                produkList.map((produk) => (
                  <tr
                    key={produk.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 border-b border-gray-200 font-medium text-gray-700">{produk.id}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      <ProductImageGallery fotos={produk.fotos || []} nama={produk.nama} />
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 font-medium text-gray-800">{produk.nama}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {produk.kategori}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 font-medium text-gray-700">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(produk.harga)}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        produk.stok > 20 ? "bg-green-100 text-green-700" : 
                        produk.stok > 0 ? "bg-yellow-100 text-yellow-700" : 
                        "bg-red-100 text-red-700"
                      }`}>
                        {produk.stok} unit
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(produk)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit Produk"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteModal(produk.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Hapus Produk"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal tambah/edit produk */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {modalMode === "add" ? "Tambah Produk Baru" : "Edit Produk"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={modalMode === "add" ? handleTambahProduk : handleEditProduk} className="space-y-5">
              {/* Nama Produk */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700" htmlFor="nama">
                  Nama Produk <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  value={nama}
                  onChange={handleNamaChange}
                  placeholder="Masukkan nama produk"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all ${errors.nama ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.nama && (
                  <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.nama}
                  </p>
                )}
              </div>

              {/* Kategori */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700" htmlFor="kategori">
                  Kategori
                </label>
                <select
                  id="kategori"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Harga */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700" htmlFor="harga">
                    Harga <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="harga"
                    value={hargaInput}
                    onChange={handleHargaChange}
                    placeholder="Rp 0"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all ${errors.harga ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                  />
                  {errors.harga && (
                    <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.harga}
                    </p>
                  )}
                </div>

                {/* Stok */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700" htmlFor="stok">
                    Stok <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    id="stok"
                    min={0}
                    value={stok === "" ? "" : stok}
                    onChange={handleStokChange}
                    placeholder="0"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all ${errors.stok ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                  />
                  {errors.stok && (
                    <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.stok}
                    </p>
                  )}
                </div>
              </div>

              {/* Upload Foto */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700" htmlFor="foto">
                  Foto Produk
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="foto"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="foto"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-600 font-medium">Klik untuk upload foto</p>
                    <p className="text-gray-400 text-sm mt-1">atau drag and drop file di sini</p>
                    <p className="text-gray-400 text-xs mt-2">PNG, JPG, JPEG (max. 5MB per file)</p>
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">💡 Anda dapat memilih beberapa foto sekaligus</p>
                
                <ModalImageGallery fotos={fotos} onRemove={handleRemoveFoto} />
              </div>

              {/* Tombol aksi */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  {modalMode === "add" ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Tambah Produk
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Produk
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Konfirmasi Hapus</h3>
                  <p className="text-red-100 text-sm mt-0.5">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-700 text-center mb-2 font-medium">
                Apakah Anda yakin ingin menghapus produk ini?
              </p>
              <p className="text-gray-500 text-sm text-center">
                Data yang dihapus tidak dapat dikembalikan.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteProduk}
                className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Ya, Hapus
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}