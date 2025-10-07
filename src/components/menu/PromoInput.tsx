import React, { useState } from 'react';
import { Promo } from '@/components/admin/promo/types';
import { promoList } from '@/data/promoData'


interface PromoInputProps {
  onApplyPromo: (promo: Promo, discountAmount: number) => void;
  onRemovePromo: () => void;
  appliedPromo: Promo | null;
  subtotal: number;
}

export const PromoInput: React.FC<PromoInputProps> = ({
  onApplyPromo,
  onRemovePromo,
  appliedPromo,
  subtotal
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setError('Masukkan kode promo')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const promo = promoList.find(
        p => p.kode.toUpperCase() === promoCode.trim().toUpperCase()
      )

      if (!promo) {
        throw new Error('Promo tidak valid')
      }

      const discountPercent = parseInt(promo.diskon.replace('-', '').replace('%', ''))
      const discountAmount = (subtotal * discountPercent) / 100

      onApplyPromo(promo, discountAmount)
      setPromoCode('')
      setError('')
    } catch (err) {
      setError('Kode promo tidak valid atau gagal digunakan')
    } finally {
      setIsLoading(false)
    }
  }
  const handleRemovePromo = () => {
    onRemovePromo();
    setPromoCode('');
    setError('');
  };

  const containerStyle: React.CSSProperties = {
    marginTop: '16px',
    marginBottom: '16px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '8px',
    display: 'block'
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px'
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    textTransform: 'uppercase'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '80px'
  };

  const errorStyle: React.CSSProperties = {
    color: '#dc2626',
    fontSize: '12px',
    marginTop: '4px'
  };

  const appliedPromoStyle: React.CSSProperties = {
    backgroundColor: '#dcfce7',
    border: '1px solid #86efac',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const promoInfoStyle: React.CSSProperties = {
    flex: 1
  };

  const promoTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#166534',
    marginBottom: '2px'
  };

  const promoCodeStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#15803d',
    fontFamily: 'monospace'
  };

  const removeButtonStyle: React.CSSProperties = {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    color: '#dc2626',
    border: '1px solid #dc2626',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  return (
    <>
      <style>
        {`
          .promo-input:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
          .promo-input.error {
            border-color: #dc2626 !important;
          }
          .apply-btn:hover:not(:disabled) {
            background-color: #1d4ed8 !important;
          }
          .apply-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          .remove-btn:hover {
            background-color: #fee2e2 !important;
            color: #991b1b !important;
          }
        `}
      </style>

      <div style={containerStyle}>
        {!appliedPromo ? (
          <>
            <label style={labelStyle}>🎫 Punya Kode Promo?</label>
            <div style={inputGroupStyle}>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                placeholder="Masukkan kode promo"
                style={inputStyle}
                className={`promo-input ${error ? 'error' : ''}`}
                disabled={isLoading}
              />
              <button
                onClick={handleApplyPromo}
                disabled={isLoading || !promoCode.trim()}
                style={buttonStyle}
                className="apply-btn"
              >
                {isLoading ? '...' : 'Pakai'}
              </button>
            </div>
            {error && <div style={errorStyle}>{error}</div>}
          </>
        ) : (
          <div style={appliedPromoStyle}>
            <div style={promoInfoStyle}>
              <div style={promoTitleStyle}>
                ✓ Promo Diterapkan: {appliedPromo.judul}
              </div>
              <div style={promoCodeStyle}>
                Kode: {appliedPromo.kode} • {appliedPromo.diskon}
              </div>
            </div>
            <button
              onClick={handleRemovePromo}
              style={removeButtonStyle}
              className="remove-btn"
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    </>
  );
};
