import React from 'react';
import { Promo } from './types';

interface PromoListProps {
  promos: Promo[];
  onEdit: (promo: Promo) => void;
  onDelete: (id: number) => void;
}

const PromoList: React.FC<PromoListProps> = ({ promos, onEdit, onDelete }) => {
  return (
    <>
      <div className="promo-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Diskon</th>
              <th>Berlaku</th>
              <th>Kode Promo</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((promo) => (
              <tr key={promo.id}>
                <td>{promo.id}</td>
                <td>{promo.judul}</td>
                <td>{promo.deskripsi}</td>
                <td>{promo.diskon}</td>
                <td>{promo.berlaku}</td>
                <td>
                  <span className="badge">
                    {promo.kode}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => onEdit(promo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => onDelete(promo.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .promo-list {
          overflow-x: auto;
          width: 100%;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          font-size: 14px;
        }

        .table thead {
          background-color: #f8f9fa;
          border-bottom: 2px solid #dee2e6;
        }

        .table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #212529;
          font-size: 13px;
          white-space: nowrap;
          border: 1px solid #dee2e6;
        }

        .table tbody tr {
          border-bottom: 1px solid #dee2e6;
          transition: background-color 0.2s;
        }

        .table tbody tr:hover {
          background-color: #f8f9fa;
        }

        .table td {
          padding: 12px 16px;
          color: #212529;
          vertical-align: middle;
          border: 1px solid #dee2e6;
        }

        .table td:nth-child(1) {
          width: 60px;
          text-align: center;
          font-weight: 600;
        }

        .table td:nth-child(2) {
          width: 200px;
          font-weight: 600;
        }

        .table td:nth-child(3) {
          min-width: 300px;
          max-width: 400px;
          color: #6c757d;
          line-height: 1.5;
        }

        .table td:nth-child(4) {
          width: 100px;
          text-align: center;
          font-weight: 600;
          color: #198754;
        }

        .table td:nth-child(5) {
          width: 180px;
        }

        .table td:nth-child(6) {
          width: 130px;
        }

        .table td:nth-child(7) {
          width: 180px;
          white-space: nowrap;
        }

        .badge {
          display: inline-block;
          padding: 5px 10px;
          background-color: #e9ecef;
          color: #495057;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid #ced4da;
        }

        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-block;
        }

        .btn-sm {
          padding: 5px 10px;
          font-size: 12px;
        }

        .btn-warning {
          background-color: #ffc107;
          color: #000;
        }

        .btn-warning:hover {
          background-color: #e0a800;
        }

        .btn-danger {
          background-color: #dc3545;
          color: white;
        }

        .btn-danger:hover {
          background-color: #c82333;
        }

        .ml-2 {
          margin-left: 8px;
        }

        @media (max-width: 1400px) {
          .table {
            font-size: 13px;
          }

          .table th,
          .table td {
            padding: 10px 12px;
          }

          .table td:nth-child(3) {
            min-width: 250px;
          }
        }
      `}</style>
    </>
  );
};

export default PromoList;