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

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button 
              className="modal-close" 
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
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
          padding: 20px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-container {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                      0 10px 10px -5px rgba(0, 0, 0, 0.04);
          animation: slideUp 0.3s ease-out;
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

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background-color: #f3f4f6;
          color: #111827;
        }

        .modal-close:active {
          background-color: #e5e7eb;
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }

        /* Custom scrollbar */
        .modal-body::-webkit-scrollbar {
          width: 8px;
        }

        .modal-body::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }

        .modal-body::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        .modal-body::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        @media (max-width: 640px) {
          .modal-overlay {
            padding: 0;
          }

          .modal-container {
            max-width: 100%;
            max-height: 100vh;
            border-radius: 0;
            height: 100vh;
          }

          .modal-header {
            padding: 20px;
          }

          .modal-header h2 {
            font-size: 1.25rem;
          }

          .modal-body {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default PromoModal;