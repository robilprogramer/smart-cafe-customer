"use client"
import React, { useState, useEffect } from 'react';
import { Promo } from '@/components/admin/promo/types';

export const PromoTab: React.FC = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState<Promo | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Data dummy - nanti ganti dengan API call
  const dummyPromos: Promo[] = [
    {
      id: 1,
      judul: "Diskon Spesial Kopi",
      deskripsi: "Nikmati kopi favoritmu dengan potongan harga 30%.",
      diskon: "-30%",
      berlaku: "1 - 15 Oktober 2025",
      kode: "KOPI30"
    },
    {
      id: 2,
      judul: "Gratis Dessert",
      deskripsi: "Setiap pembelian minimal Rp100,000 dapat gratis dessert.",
      diskon: "-10%",
      berlaku: "5 - 20 Oktober 2025",
      kode: "SWEET100"
    },
    {
      id: 3,
      judul: "Paket Hemat Keluarga",
      deskripsi: "Pesan 3 menu utama, gratis 1 minuman spesial.",
      diskon: "-25%",
      berlaku: "1 - 31 Oktober 2025",
      kode: "FAMILY25"
    },
    {
      id: 4,
      judul: "Diskon Weekend",
      deskripsi: "Khusus Sabtu-Minggu, dapatkan diskon 20% untuk semua menu.",
      diskon: "-20%",
      berlaku: "4 - 26 Oktober 2025",
      kode: "WEEKEND20"
    },
    {
      id: 5,
      judul: "Promo Lunch Time",
      deskripsi: "Diskon 15% untuk pembelian pada jam makan siang 11:00-14:00.",
      diskon: "-15%",
      berlaku: "1 - 30 Oktober 2025",
      kode: "LUNCH15"
    },
    {
      id: 6,
      judul: "Buy 1 Get 1 Free",
      deskripsi: "Beli 1 minuman ukuran besar, gratis 1 minuman ukuran regular.",
      diskon: "-50%",
      berlaku: "10 - 25 Oktober 2025",
      kode: "BUY1GET1"
    }
  ];

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    try {
      setLoading(true);
      // TODO: Ganti dengan API call
      // const response = await fetch('/api/promo');
      // const data = await response.json();
      // setPromos(data);
      
      // Simulasi loading
      setTimeout(() => {
        setPromos(dummyPromos);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCopyCode = (kode: string) => {
    navigator.clipboard.writeText(kode);
    setCopiedCode(kode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎉</span>
          <h2 className="text-xl font-bold text-gray-800">Promo Hari Ini</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : promos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-5xl mb-3">😔</div>
            <p className="text-gray-500 font-medium">Belum ada promo tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promos.map((promo, index) => (
              <div
                key={promo.id}
                className="relative bg-gradient-to-br from-white to-green-50 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all border border-green-100 cursor-pointer overflow-hidden"
                onClick={() => setSelectedPromo(promo)}
                style={{
                  animation: `slideUp 0.4s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                  {promo.diskon}
                </div>

                {/* Content */}
                <div className="pr-20">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">
                    {promo.judul}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {promo.deskripsi}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span>📅</span>
                    <span>{promo.berlaku}</span>
                  </div>

                  {/* Code Display */}
                  <div className="bg-white border-2 border-dashed border-green-300 rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Kode:</span>
                      <code className="font-bold text-green-600 text-sm tracking-wider">
                        {promo.kode}
                      </code>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode(promo.kode);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-600 transition-colors"
                    >
                      {copiedCode === promo.kode ? '✓ Disalin' : 'Salin'}
                    </button>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-20"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail Promo */}
      {selectedPromo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPromo(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'modalSlideUp 0.3s ease-out' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPromo(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-400 text-xl">✕</span>
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedPromo.judul}
              </h2>
              <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-xl font-bold mb-4">
                {selectedPromo.diskon}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {selectedPromo.deskripsi}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                <span>📅</span>
                <span>Berlaku: {selectedPromo.berlaku}</span>
              </div>

              {/* Kode Promo */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2 font-medium">Kode Promo:</p>
                <code className="text-3xl font-bold text-green-600 tracking-widest block mb-3">
                  {selectedPromo.kode}
                </code>
                <button
                  onClick={() => handleCopyCode(selectedPromo.kode)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    copiedCode === selectedPromo.kode
                      ? 'bg-green-600 text-white'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {copiedCode === selectedPromo.kode ? '✓ Kode Disalin!' : '📋 Salin Kode'}
                </button>
              </div>

              <p className="text-xs text-gray-400">
                * Gunakan kode ini saat checkout untuk mendapatkan diskon
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};