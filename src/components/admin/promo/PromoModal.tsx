// components/admin/promo/PromoModal.tsx

import React, { useEffect } from 'react';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const PromoModal: React.FC<PromoModalProps> = ({ isOpen, onClose, title, children }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    animation: 'fadeIn 0.2s ease-out'
  };

  const containerStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    animation: 'slideUp 0.3s ease-out'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    flexShrink: 0
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#111827'
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '8px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    transition: 'all 0.2s'
  };

  const bodyStyle: React.CSSProperties = {
    padding: '24px',
    overflowY: 'auto',
    flex: 1
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .modal-close-btn:hover {
            background-color: #f3f4f6 !important;
            color: #111827 !important;
          }
          .modal-close-btn:active {
            background-color: #e5e7eb !important;
          }
          .modal-body-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .modal-body-scroll::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 4px;
          }
          .modal-body-scroll::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 4px;
          }
          .modal-body-scroll::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
          @media (max-width: 640px) {
            .modal-overlay-responsive {
              padding: 0 !important;
            }
            .modal-container-responsive {
              max-width: 100% !important;
              max-height: 100vh !important;
              border-radius: 0 !important;
              height: 100vh !important;
            }
            .modal-header-responsive {
              padding: 20px !important;
            }
            .modal-header-responsive h2 {
              font-size: 1.25rem !important;
            }
            .modal-body-responsive {
              padding: 20px !important;
            }
          }
        `}
      </style>
      <div 
        className="modal-overlay-responsive" 
        style={overlayStyle} 
        onClick={onClose}
      >
        <div 
          className="modal-container-responsive" 
          style={containerStyle} 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header-responsive" style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <button
              className="modal-close-btn"
              style={closeButtonStyle}
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div 
            className="modal-body-scroll modal-body-responsive" 
            style={bodyStyle}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoModal;