import React from 'react';

interface Transaction {
  id: string;
  date: string;
  customer: string;
  items: string;
  payment: string;
  total: string;
  status: string;
}

export default function LaporanDetail() {
  const transactions: Transaction[] = [
    { id: '#TRX-001', date: '07 Okt 2025, 14:30', customer: 'Ahmad Rizki', items: 'Cappuccino x2, Cheesecake x1', payment: 'Kartu Kredit', total: 'Rp 65,000', status: 'Selesai' },
    { id: '#TRX-002', date: '07 Okt 2025, 13:15', customer: 'Siti Nurhaliza', items: 'Latte x1, Croissant x2', payment: 'E-Wallet', total: 'Rp 52,000', status: 'Selesai' },
    { id: '#TRX-003', date: '07 Okt 2025, 12:45', customer: 'Budi Santoso', items: 'Americano x1', payment: 'Tunai', total: 'Rp 18,000', status: 'Selesai' },
    { id: '#TRX-004', date: '07 Okt 2025, 11:20', customer: 'Dewi Lestari', items: 'Espresso x2, Tiramisu x1', payment: 'Kartu Debit', total: 'Rp 48,000', status: 'Selesai' },
    { id: '#TRX-005', date: '07 Okt 2025, 10:50', customer: 'Rudi Hartono', items: 'Latte x3, Cake x2', payment: 'E-Wallet', total: 'Rp 85,000', status: 'Selesai' },
    { id: '#TRX-006', date: '07 Okt 2025, 09:30', customer: 'Linda Wijaya', items: 'Cappuccino x1, Cookie x3', payment: 'Tunai', total: 'Rp 35,000', status: 'Selesai' },
    { id: '#TRX-007', date: '06 Okt 2025, 16:45', customer: 'Andi Pratama', items: 'Juice x2', payment: 'Kartu Kredit', total: 'Rp 28,000', status: 'Selesai' },
    { id: '#TRX-008', date: '06 Okt 2025, 15:20', customer: 'Maya Sari', items: 'Latte x1, Sandwich x1', payment: 'E-Wallet', total: 'Rp 42,000', status: 'Selesai' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Detail Transaksi Terbaru</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Pelanggan</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Pembayaran</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-blue-600">{transaction.id}</td>
                <td className="py-3 px-4 text-gray-600 text-sm">{transaction.date}</td>
                <td className="py-3 px-4 text-gray-800">{transaction.customer}</td>
                <td className="py-3 px-4 text-gray-600 text-sm">{transaction.items}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {transaction.payment}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-gray-800">{transaction.total}</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}