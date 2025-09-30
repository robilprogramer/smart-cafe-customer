'use client'

import { useState } from 'react';
import { Package, Search, Filter, Calendar, ShoppingBag, Clock, CheckCircle, Truck, CreditCard, Download } from 'lucide-react';

// Definisi tipe data
interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  paymentMethod: string;
  paymentDate: string;
  invoiceNumber: string;
  trackingNumber: string;
  address: string;
}

interface StatusConfig {
  label: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Data dummy pesanan yang sudah dibayar
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2025-001',
      date: '2025-09-25',
      items: [
        { name: 'iPhone 15 Pro Max', qty: 1, price: 19999000 },
        { name: 'AirPods Pro Gen 2', qty: 1, price: 3999000 }
      ],
      total: 23998000,
      status: 'delivered',
      paymentMethod: 'BCA Virtual Account',
      paymentDate: '2025-09-25 14:30',
      invoiceNumber: 'INV-2025-001',
      trackingNumber: 'JNE123456789',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan'
    },
    {
      id: 'ORD-2025-002',
      date: '2025-09-27',
      items: [
        { name: 'MacBook Pro M3', qty: 1, price: 32999000 }
      ],
      total: 32999000,
      status: 'shipped',
      paymentMethod: 'GoPay',
      paymentDate: '2025-09-27 10:15',
      invoiceNumber: 'INV-2025-002',
      trackingNumber: 'SICEPAT987654321',
      address: 'Jl. Gatot Subroto No. 45, Jakarta Pusat'
    },
    {
      id: 'ORD-2025-003',
      date: '2025-09-28',
      items: [
        { name: 'Samsung Galaxy S24 Ultra', qty: 1, price: 18999000 },
        { name: 'Galaxy Watch 6', qty: 1, price: 4999000 }
      ],
      total: 23998000,
      status: 'processing',
      paymentMethod: 'OVO',
      paymentDate: '2025-09-28 09:45',
      invoiceNumber: 'INV-2025-003',
      trackingNumber: '-',
      address: 'Jl. Thamrin No. 78, Jakarta Pusat'
    },
    {
      id: 'ORD-2025-004',
      date: '2025-09-26',
      items: [
        { name: 'Sony WH-1000XM5', qty: 1, price: 5999000 },
        { name: 'PlayStation 5', qty: 1, price: 7999000 }
      ],
      total: 13998000,
      status: 'delivered',
      paymentMethod: 'Mandiri Virtual Account',
      paymentDate: '2025-09-26 16:20',
      invoiceNumber: 'INV-2025-004',
      trackingNumber: 'JNT456789123',
      address: 'Jl. Kuningan No. 12, Jakarta Selatan'
    },
    {
      id: 'ORD-2025-005',
      date: '2025-09-29',
      items: [
        { name: 'iPad Pro M2 11 inch', qty: 1, price: 15999000 },
        { name: 'Apple Pencil Gen 2', qty: 1, price: 1999000 }
      ],
      total: 17998000,
      status: 'processing',
      paymentMethod: 'ShopeePay',
      paymentDate: '2025-09-29 08:10',
      invoiceNumber: 'INV-2025-005',
      trackingNumber: '-',
      address: 'Jl. Rasuna Said No. 90, Jakarta Selatan'
    }
  ]);

  const statusConfig: Record<'processing' | 'shipped' | 'delivered', StatusConfig> = {
    processing: { label: 'Diproses', color: 'bg-blue-100 text-blue-700', icon: Clock },
    shipped: { label: 'Dikirim', color: 'bg-purple-100 text-purple-700', icon: Truck },
    delivered: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: CheckCircle }
  };

  const filteredOrders = orders.filter((order: Order) => {
    const matchSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       order.items.some((item: OrderItem) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDownloadInvoice = (invoiceNumber: string): void => {
    alert(`Mengunduh Invoice: ${invoiceNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Histori Pembayaran</h1>
          </div>
          <p className="text-gray-600">Semua pesanan yang sudah dibayar dan sedang diproses</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari pesanan, invoice, atau produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Filter Status */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white cursor-pointer"
              >
                <option value="all">Semua Status</option>
                <option value="processing">Diproses</option>
                <option value="shipped">Dikirim</option>
                <option value="delivered">Selesai</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid gap-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada pesanan ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          ) : (
            filteredOrders.map((order: Order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-start gap-4 mb-3 md:mb-0">
                        <div className="bg-indigo-100 p-3 rounded-xl">
                          <Package className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{order.id}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.date)}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Invoice: {order.invoiceNumber}
                          </div>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[order.status].color} font-semibold`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[order.status].label}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item: OrderItem, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">Jumlah: {item.qty}</p>
                          </div>
                          <p className="font-semibold text-gray-800">{formatCurrency(item.price)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Payment Information */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4 border border-green-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Pembayaran Berhasil</h4>
                          <p className="text-xs text-gray-600">Pesanan sudah dibayar dan diproses</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600 text-xs mb-1">Metode Pembayaran</p>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-indigo-600" />
                            <p className="font-semibold text-gray-800">{order.paymentMethod}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs mb-1">Tanggal & Waktu Bayar</p>
                          <p className="font-semibold text-gray-800">{formatDateTime(order.paymentDate)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs mb-1">Total Dibayar</p>
                          <p className="font-bold text-green-600 text-lg">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="text-sm text-gray-600 mb-4">
                      <p className="font-medium text-gray-800 mb-1">Alamat Pengiriman:</p>
                      <p className="text-gray-600">{order.address}</p>
                      {order.trackingNumber !== '-' && (
                        <div className="mt-2 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-indigo-600" />
                          <span className="font-medium text-gray-800">No. Resi:</span> 
                          <span className="text-indigo-600 font-semibold">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownloadInvoice(order.invoiceNumber)}
                        className="flex-1 bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-4 rounded-xl border-2 border-indigo-600 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Invoice
                      </button>
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200">
                        Lihat Detail
                      </button>
                      {order.status === 'delivered' && (
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200">
                          Beli Lagi
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{orders.length}</div>
            <div className="text-sm text-gray-600">Total Transaksi</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatCurrency(orders.reduce((sum: number, order: Order) => sum + order.total, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Pembayaran</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {orders.filter((o: Order) => o.status === 'shipped').length}
            </div>
            <div className="text-sm text-gray-600">Sedang Dikirim</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {orders.filter((o: Order) => o.status === 'processing').length}
            </div>
            <div className="text-sm text-gray-600">Diproses</div>
          </div>
        </div>
      </div>
    </div>
  );
}