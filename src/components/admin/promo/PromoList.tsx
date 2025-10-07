import React, { useState, useMemo, useEffect } from 'react';
import { Promo } from './types';

interface PromoListProps {
  promos: Promo[];
  onEdit: (promo: Promo) => void;
  onDelete: (id: number) => void;
}

const PromoList: React.FC<PromoListProps> = ({ promos, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  // Filter promos berdasarkan search query
  const filteredPromos = useMemo(() => {
    if (!searchQuery.trim()) return promos;
    
    const query = searchQuery.toLowerCase();
    return promos.filter(promo => 
      promo.judul.toLowerCase().includes(query) ||
      promo.deskripsi.toLowerCase().includes(query) ||
      promo.kode.toLowerCase().includes(query) ||
      promo.berlaku.toLowerCase().includes(query)
    );
  }, [promos, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPromos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPromos = filteredPromos.slice(startIndex, endIndex);

  // Reset to page 1 when search changes or promos change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, promos.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  };

  const thStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #e5e7eb',
    fontWeight: 600,
    color: '#374151',
    backgroundColor: '#f9fafb'
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    color: '#6b7280'
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    backgroundColor: '#dbeafe',
    color: '#1e40af'
  };

  const actionButtonStyle: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    marginRight: '8px',
    transition: 'all 0.2s'
  };

  const editButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    backgroundColor: '#fef3c7',
    color: '#92400e'
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    marginRight: '0'
  };

  const paginationStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '16px 0',
    borderTop: '1px solid #e5e7eb'
  };

  const paginationButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  };

  const pageButtonStyle = (active: boolean = false): React.CSSProperties => ({
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: active ? '#2563eb' : 'white',
    color: active ? 'white' : '#374151',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s',
    minWidth: '40px',
    textAlign: 'center'
  });

  const disabledButtonStyle: React.CSSProperties = {
    opacity: 0.5,
    cursor: 'not-allowed'
  };

  const searchContainerStyle: React.CSSProperties = {
    marginBottom: '20px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const searchInputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: '300px',
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  };

  const searchInfoStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '6px 12px',
    borderRadius: '6px',
    fontWeight: 500
  };

  const clearButtonStyle: React.CSSProperties = {
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  return (
    <>
      <style>
        {`
          .promo-table tbody tr:hover {
            background-color: #f9fafb;
          }
          .edit-btn:hover {
            background-color: #fde68a !important;
          }
          .delete-btn:hover {
            background-color: #fecaca !important;
          }
          .page-btn:hover:not(:disabled) {
            background-color: #f3f4f6 !important;
            border-color: #9ca3af !important;
          }
          .page-btn.active:hover {
            background-color: #1d4ed8 !important;
          }
          .search-input:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
          .clear-btn:hover {
            background-color: #f9fafb !important;
            border-color: #9ca3af !important;
          }
        `}
      </style>

      {/* Search Bar */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="🔍 Cari promo berdasarkan judul, deskripsi, kode, atau periode..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
          className="search-input"
        />
        {searchQuery && (
          <>
            <span style={searchInfoStyle}>
              {filteredPromos.length} hasil ditemukan
            </span>
            <button
              onClick={() => setSearchQuery('')}
              style={clearButtonStyle}
              className="clear-btn"
            >
              ✕ Clear
            </button>
          </>
        )}
      </div>

      {/* Table */}
      {currentPromos.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px', 
          color: '#9ca3af',
          fontSize: '14px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <div style={{ fontSize: '16px', fontWeight: 500, color: '#6b7280', marginBottom: '8px' }}>
            {searchQuery ? 'Tidak ada promo yang ditemukan' : 'Belum ada data promo'}
          </div>
          <div style={{ fontSize: '14px' }}>
            {searchQuery ? 'Coba kata kunci pencarian lain' : 'Klik tombol "Tambah Promo" untuk membuat promo baru'}
          </div>
        </div>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle} className="promo-table">
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: '50px' }}>ID</th>
                  <th style={thStyle}>Judul</th>
                  <th style={thStyle}>Deskripsi</th>
                  <th style={{ ...thStyle, width: '100px' }}>Diskon</th>
                  <th style={{ ...thStyle, width: '180px' }}>Berlaku</th>
                  <th style={{ ...thStyle, width: '120px' }}>Kode Promo</th>
                  <th style={{ ...thStyle, width: '150px', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentPromos.map((promo) => (
                  <tr key={promo.id}>
                    <td style={tdStyle}>{promo.id}</td>
                    <td style={{ ...tdStyle, fontWeight: 500, color: '#111827' }}>
                      {promo.judul}
                    </td>
                    <td style={tdStyle}>{promo.deskripsi}</td>
                    <td style={tdStyle}>
                      <span style={badgeStyle}>{promo.diskon}</span>
                    </td>
                    <td style={tdStyle}>{promo.berlaku}</td>
                    <td style={tdStyle}>
                      <code style={{
                        padding: '2px 6px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontFamily: 'monospace'
                      }}>
                        {promo.kode}
                      </code>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <button
                        onClick={() => onEdit(promo)}
                        style={editButtonStyle}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(promo.id)}
                        style={deleteButtonStyle}
                        className="delete-btn"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={paginationStyle}>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Menampilkan <strong>{startIndex + 1}</strong> - <strong>{Math.min(endIndex, filteredPromos.length)}</strong> dari <strong>{filteredPromos.length}</strong> promo
              </div>
              
              <div style={paginationButtonsStyle}>
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  style={{
                    ...pageButtonStyle(false),
                    ...(currentPage === 1 ? disabledButtonStyle : {})
                  }}
                  className="page-btn"
                >
                  ← Sebelumnya
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = page === 1 || 
                                   page === totalPages || 
                                   (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  if (!showPage) {
                    // Show ellipsis
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} style={{ padding: '0 4px', color: '#9ca3af' }}>...</span>;
                    }
                    return null;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      style={pageButtonStyle(currentPage === page)}
                      className={`page-btn ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  style={{
                    ...pageButtonStyle(false),
                    ...(currentPage === totalPages ? disabledButtonStyle : {})
                  }}
                  className="page-btn"
                >
                  Berikutnya →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PromoList;