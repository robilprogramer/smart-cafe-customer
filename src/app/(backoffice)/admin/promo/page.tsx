"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PromoList from '../../../../components/admin/promo/PromoList';
import PromoForm from '@/components/admin/promo/PromoForm';
import PromoModal from '@/components/admin/promo/PromoModal';
import { PromoService } from '@/components/admin/promo/PromoService';
import { Promo } from '@/components/admin/promo/types';

const PromoPage: React.FC = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [selectedPromo, setSelectedPromo] = useState<Promo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial data (seperti di screenshot Anda)
  const initialPromos: Promo[] = [
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
      diskon: "-100%",
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
    }
  ];

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    try {
      setLoading(true);
      // Uncomment untuk menggunakan API
      // const data = await PromoService.getAll();
      // setPromos(data);
      
      // Sementara menggunakan data dummy
      setPromos(initialPromos);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data promo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPromo = () => {
    setSelectedPromo(null);
    setShowModal(true);
  };

  const handleEditPromo = (promo: Promo) => {
    setSelectedPromo(promo);
    setShowModal(true);
  };

  const handleDeletePromo = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus promo ini?')) {
      return;
    }

    try {
      // Uncomment untuk menggunakan API
      // await PromoService.delete(id);
      
      // Sementara update state langsung
      setPromos(promos.filter(p => p.id !== id));
      alert('Promo berhasil dihapus');
    } catch (err) {
      alert('Gagal menghapus promo');
      console.error(err);
    }
  };

  const handleSubmitPromo = async (promoData: Omit<Promo, 'id'>) => {
    try {
      if (selectedPromo) {
        // Update existing promo
        // Uncomment untuk menggunakan API
        // const updated = await PromoService.update(selectedPromo.id, promoData);
        
        // Sementara update state langsung
        const updated = { ...promoData, id: selectedPromo.id };
        setPromos(promos.map(p => p.id === selectedPromo.id ? updated : p));
        alert('Promo berhasil diupdate');
      } else {
        // Create new promo
        // Uncomment untuk menggunakan API
        // const newPromo = await PromoService.create(promoData);
        
        // Sementara update state langsung
        const newId = Math.max(...promos.map(p => p.id), 0) + 1;
        const newPromo = { ...promoData, id: newId };
        setPromos([...promos, newPromo]);
        alert('Promo berhasil ditambahkan');
      }
      
      setShowModal(false);
      setSelectedPromo(null);
    } catch (err) {
      alert('Gagal menyimpan promo');
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPromo(null);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="promo-page">
          <div className="page-header">
            <div>
              <h1>Manajemen Promo</h1>
              <p>Kelola daftar promo yang tersedia di sistem</p>
            </div>
            <button className="btn btn-primary" onClick={handleAddPromo}>
              + Tambah Promo
            </button>
          </div>

          {loading && <div className="loading">Memuat data...</div>}
          
          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && (
            <div className="promo-content">
              <h2>Daftar Promo</h2>
              <PromoList
                promos={promos}
                onEdit={handleEditPromo}
                onDelete={handleDeletePromo}
              />
            </div>
          )}

          <PromoModal
            isOpen={showModal}
            onClose={handleCloseModal}
            title={selectedPromo ? 'Edit Promo' : 'Tambah Promo Baru'}
          >
            <PromoForm
              promo={selectedPromo}
              onSubmit={handleSubmitPromo}
              onCancel={handleCloseModal}
            />
          </PromoModal>
        </div>

        <style jsx>{`
          .promo-page {
            padding: 20px;
          }

          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
          }

          .page-header h1 {
            font-size: 2rem;
            font-weight: 600;
            margin: 0 0 5px 0;
          }

          .page-header p {
            color: #6b7280;
            margin: 0;
          }

          .promo-content {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .promo-content h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 20px;
          }

          .loading {
            text-align: center;
            padding: 40px;
            color: #6b7280;
          }

          .alert {
            padding: 12px 16px;
            border-radius: 6px;
            margin-bottom: 20px;
          }

          .alert-danger {
            background-color: #fee;
            color: #c00;
            border: 1px solid #fcc;
          }

          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
          }

          .btn-primary {
            background-color: #2563eb;
            color: white;
          }

          .btn-primary:hover {
            background-color: #1d4ed8;
          }
        `}</style>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default PromoPage;