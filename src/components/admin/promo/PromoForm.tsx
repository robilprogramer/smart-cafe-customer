import React, { useState, useEffect } from 'react';
import { Promo } from './types';

interface PromoFormProps {
  promo?: Promo | null;
  onSubmit: (promo: Omit<Promo, 'id'>) => void;
  onCancel: () => void;
}

const PromoForm: React.FC<PromoFormProps> = ({ promo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    diskon: '',
    berlaku: '',
    kode: ''
  });

  useEffect(() => {
    if (promo) {
      setFormData({
        judul: promo.judul,
        deskripsi: promo.deskripsi,
        diskon: promo.diskon,
        berlaku: promo.berlaku,
        kode: promo.kode
      });
    } else {
      setFormData({
        judul: '',
        deskripsi: '',
        diskon: '',
        berlaku: '',
        kode: ''
      });
    }
  }, [promo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="promo-form">
        <div className="form-group">
          <label htmlFor="judul">Judul Promo <span className="required">*</span></label>
          <input
            type="text"
            id="judul"
            name="judul"
            className="form-control"
            placeholder="Masukkan judul promo"
            value={formData.judul}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deskripsi">Deskripsi <span className="required">*</span></label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            className="form-control"
            rows={4}
            placeholder="Masukkan deskripsi promo"
            value={formData.deskripsi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="diskon">Diskon <span className="required">*</span></label>
            <input
              type="text"
              id="diskon"
              name="diskon"
              className="form-control"
              placeholder="Contoh: -30%"
              value={formData.diskon}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="kode">Kode Promo <span className="required">*</span></label>
            <input
              type="text"
              id="kode"
              name="kode"
              className="form-control"
              placeholder="Contoh: KOPI30"
              value={formData.kode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="berlaku">Periode Berlaku <span className="required">*</span></label>
          <input
            type="text"
            id="berlaku"
            name="berlaku"
            className="form-control"
            placeholder="Contoh: 1 - 15 Oktober 2025"
            value={formData.berlaku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Batal
          </button>
          <button type="submit" className="btn btn-submit">
            {promo ? 'Update Promo' : 'Simpan Promo'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .promo-form {
          width: 100%;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .required {
          color: #dc2626;
        }

        .form-control {
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          transition: all 0.2s;
          font-family: inherit;
        }

        .form-control:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-control::placeholder {
          color: #9ca3af;
        }

        textarea.form-control {
          resize: vertical;
          min-height: 100px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .btn {
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel {
          background-color: #f3f4f6;
          color: #374151;
        }

        .btn-cancel:hover {
          background-color: #e5e7eb;
        }

        .btn-submit {
          background-color: #2563eb;
          color: white;
          min-width: 140px;
        }

        .btn-submit:hover {
          background-color: #1d4ed8;
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column-reverse;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default PromoForm;