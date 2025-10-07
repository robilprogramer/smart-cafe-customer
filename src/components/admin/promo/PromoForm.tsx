// components/admin/promo/PromoForm.tsx

import React, { useState, useEffect } from 'react';
import { Promo } from './types';

interface PromoFormProps {
  promo: Promo | null;
  onSubmit: (promo: Omit<Promo, 'id'>) => void;
  onCancel: () => void;
}

const PromoForm: React.FC<PromoFormProps> = ({ promo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    diskon: '',
    startDate: '',
    endDate: '',
    kode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (promo) {
      // Parse tanggal dari format "1 - 15 Oktober 2025"
      const dateMatch = promo.berlaku.match(/(\d+)\s*-\s*(\d+)\s+(\w+)\s+(\d+)/);
      let startDate = '';
      let endDate = '';
      
      if (dateMatch) {
        const [, start, end, month, year] = dateMatch;
        const monthMap: Record<string, string> = {
          'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
          'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
          'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
        };
        const monthNum = monthMap[month] || '01';
        startDate = `${year}-${monthNum}-${start.padStart(2, '0')}`;
        endDate = `${year}-${monthNum}-${end.padStart(2, '0')}`;
      }

      setFormData({
        judul: promo.judul,
        deskripsi: promo.deskripsi,
        diskon: promo.diskon.replace('-', '').replace('%', ''),
        startDate,
        endDate,
        kode: promo.kode
      });
    }
  }, [promo]);

  const handleDiskonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Hanya angka
    if (value === '' || parseInt(value) <= 100) {
      setFormData({ ...formData, diskon: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi
    const newErrors: Record<string, string> = {};
    if (!formData.judul.trim()) newErrors.judul = 'Judul promo wajib diisi';
    if (!formData.deskripsi.trim()) newErrors.deskripsi = 'Deskripsi wajib diisi';
    if (!formData.diskon) newErrors.diskon = 'Diskon wajib diisi';
    if (!formData.startDate) newErrors.startDate = 'Tanggal mulai wajib diisi';
    if (!formData.endDate) newErrors.endDate = 'Tanggal selesai wajib diisi';
    if (!formData.kode.trim()) newErrors.kode = 'Kode promo wajib diisi';

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'Tanggal selesai harus setelah tanggal mulai';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format tanggal ke format Indonesia
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const berlaku = startDate.getDate() === endDate.getDate() && 
                    startDate.getMonth() === endDate.getMonth() &&
                    startDate.getFullYear() === endDate.getFullYear()
      ? `${startDate.getDate()} ${monthNames[startDate.getMonth()]} ${startDate.getFullYear()}`
      : `${startDate.getDate()} - ${endDate.getDate()} ${monthNames[endDate.getMonth()]} ${endDate.getFullYear()}`;

    onSubmit({
      judul: formData.judul,
      deskripsi: formData.deskripsi,
      diskon: `-${formData.diskon}%`,
      berlaku,
      kode: formData.kode.toUpperCase()
    });
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const formGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151'
  };

  const requiredStyle: React.CSSProperties = {
    color: '#ef4444'
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const errorStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px'
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '8px'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 24px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
    color: 'white'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151'
  };

  return (
    <>
      <style>
        {`
          .promo-form input:focus,
          .promo-form textarea:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
          .promo-form input.error,
          .promo-form textarea.error {
            border-color: #ef4444 !important;
          }
          .btn-primary:hover {
            background-color: #1d4ed8 !important;
          }
          .btn-secondary:hover {
            background-color: #e5e7eb !important;
          }
        `}
      </style>
      <form onSubmit={handleSubmit} style={formStyle} className="promo-form">
        <div style={formGroupStyle}>
          <label style={labelStyle}>
            Judul Promo <span style={requiredStyle}>*</span>
          </label>
          <input
            type="text"
            value={formData.judul}
            onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
            style={inputStyle}
            className={errors.judul ? 'error' : ''}
            placeholder="Masukkan judul promo"
          />
          {errors.judul && <span style={errorStyle}>{errors.judul}</span>}
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>
            Deskripsi <span style={requiredStyle}>*</span>
          </label>
          <textarea
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
            style={textareaStyle}
            className={errors.deskripsi ? 'error' : ''}
            placeholder="Masukkan deskripsi promo"
          />
          {errors.deskripsi && <span style={errorStyle}>{errors.deskripsi}</span>}
        </div>

        <div style={rowStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>
              Diskon <span style={requiredStyle}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={formData.diskon}
                onChange={handleDiskonChange}
                style={{ ...inputStyle, paddingRight: '32px' }}
                className={errors.diskon ? 'error' : ''}
                placeholder="0"
                maxLength={3}
              />
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280',
                fontSize: '14px',
                pointerEvents: 'none'
              }}>
                %
              </span>
            </div>
            {errors.diskon && <span style={errorStyle}>{errors.diskon}</span>}
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>
              Kode Promo <span style={requiredStyle}>*</span>
            </label>
            <input
              type="text"
              value={formData.kode}
              onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
              style={inputStyle}
              className={errors.kode ? 'error' : ''}
              placeholder="KODE123"
              maxLength={20}
            />
            {errors.kode && <span style={errorStyle}>{errors.kode}</span>}
          </div>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>
            Periode Berlaku <span style={requiredStyle}>*</span>
          </label>
          <div style={rowStyle}>
            <div>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                style={inputStyle}
                className={errors.startDate ? 'error' : ''}
              />
              {errors.startDate && <span style={errorStyle}>{errors.startDate}</span>}
            </div>
            <div>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                style={inputStyle}
                className={errors.endDate ? 'error' : ''}
                min={formData.startDate}
              />
              {errors.endDate && <span style={errorStyle}>{errors.endDate}</span>}
            </div>
          </div>
        </div>

        <div style={buttonGroupStyle}>
          <button
            type="button"
            onClick={onCancel}
            style={secondaryButtonStyle}
            className="btn-secondary"
          >
            Batal
          </button>
          <button
            type="submit"
            style={primaryButtonStyle}
            className="btn-primary"
          >
            {promo ? 'Update Promo' : 'Tambah Promo'}
          </button>
        </div>
      </form>
    </>
  );
};

export default PromoForm;