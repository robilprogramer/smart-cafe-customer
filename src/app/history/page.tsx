'use client'

import { useState } from 'react';
import { Package, Search, Filter, Calendar, ShoppingBag, Clock, CheckCircle, Truck, CreditCard, Download, Star, X, TrendingUp, QrCode } from 'lucide-react';

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
  bgGradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Review {
  rating: number;
  comment: string;
}

/* Komponen form review - versi dengan tombol */
function ReviewForm({ onSubmit }: { onSubmit: (rating: number, comment: string) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Silakan berikan rating terlebih dahulu');
      return;
    }
    if (comment.trim() === '') {
      alert('Silakan tulis komentar Anda');
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full flex items-center justify-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium py-2 px-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-200"
      >
        <Star className="w-4 h-4" />
        Beri Penilaian
      </button>
    );
  }

  return (
    <div className="space-y-3 bg-white p-4 rounded-lg border-2 border-indigo-200">
      {/* Rating Stars */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-all duration-200 hover:scale-125"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-lg'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <p className="text-center text-sm font-semibold text-indigo-600">
          {rating} dari 5 bintang
        </p>
      )}

      {/* Comment Input */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Bagikan pengalaman Anda dengan produk ini..."
        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        rows={3}
      />

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Kirim Review
        </button>
        <button
          onClick={() => {
            setShowForm(false);
            setRating(0);
            setComment('');
          }}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200"
        >
          Batal
        </button>
      </div>
    </div>
  );
}

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showReviewModal, setShowReviewModal] = useState<string | null>(null);

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

  // state untuk menyimpan review
  const [reviews, setReviews] = useState<Record<string, Review>>({});

  const statusConfig: Record<'processing' | 'shipped' | 'delivered', StatusConfig> = {
    processing: { 
      label: 'Diproses', 
      color: 'text-blue-700', 
      bgGradient: 'bg-gradient-to-r from-blue-100 to-blue-200',
      icon: Clock 
    },
    shipped: { 
      label: 'Dikirim', 
      color: 'text-purple-700', 
      bgGradient: 'bg-gradient-to-r from-purple-100 to-purple-200',
      icon: Truck 
    },
    delivered: { 
      label: 'Selesai', 
      color: 'text-green-700', 
      bgGradient: 'bg-gradient-to-r from-green-100 to-emerald-200',
      icon: CheckCircle 
    }
  };

  const filteredOrders = orders.filter((order: Order) => {
    const matchSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       order.items.some((item: OrderItem) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

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

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleDownloadInvoice = (invoiceNumber: string): void => {
    alert(`Mengunduh Invoice: ${invoiceNumber}`);
  };

  // fungsi untuk menyimpan review
  const handleReviewSubmit = (orderId: string, itemName: string, rating: number, comment: string) => {
    const key = `${orderId}_${itemName}`;
    setReviews((prev) => ({
      ...prev,
      [key]: { rating, comment }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-3 bg-white px-6 py-3 rounded-full shadow-lg">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Histori Pembayaran
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Semua pesanan yang sudah dibayar dan sedang diproses</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Cari pesanan, invoice, atau produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Filter Status */}
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white cursor-pointer font-medium transition-all"
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
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Tidak ada pesanan ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          ) : (
            filteredOrders.map((order: Order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
                >
                  <div className="p-6 md:p-8">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b-2 border-gray-100">
                      <div className="flex items-start gap-4 mb-3 md:mb-0">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                          <Package className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-black text-xl text-gray-800">{order.id}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.date)}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1 font-medium">
                            Invoice: <span className="text-indigo-600">{order.invoiceNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${statusConfig[order.status].bgGradient} font-bold shadow-md`}>
                        <StatusIcon className={`w-5 h-5 ${statusConfig[order.status].color}`} />
                        <span className={statusConfig[order.status].color}>{statusConfig[order.status].label}</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-6">
                      {order.items.map((item: OrderItem, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 hover:shadow-md transition-all">
                          <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500 mt-1">Jumlah: <span className="font-semibold">{item.qty}</span></p>
                          </div>
                          <p className="font-black text-lg text-indigo-600">{formatCurrency(item.price)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Payment Information */}
                    <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-5 mb-6 border-2 border-green-200 shadow-md">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500 p-3 rounded-xl shadow-md">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-800 text-lg">Pembayaran Berhasil</h4>
                          <p className="text-sm text-gray-600">Pesanan sudah dibayar dan diproses</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-gray-500 text-xs mb-1.5 font-medium">Metode Pembayaran</p>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-indigo-600" />
                            <p className="font-bold text-gray-800">{order.paymentMethod}</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-gray-500 text-xs mb-1.5 font-medium">Tanggal & Waktu Bayar</p>
                          <p className="font-bold text-gray-800 text-sm">{formatDateTime(order.paymentDate)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-gray-500 text-xs mb-1.5 font-medium">Total Dibayar</p>
                          <p className="font-black text-green-600 text-xl">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="text-sm text-gray-600 mb-6 bg-gray-50 rounded-2xl p-4">
                      <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-indigo-600" />
                        Alamat Pengiriman
                      </p>
                      <p className="text-gray-600 mb-2">{order.address}</p>
                      {order.trackingNumber !== '-' && (
                        <div className="mt-3 flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg">
                          <span className="font-semibold text-gray-700">No. Resi:</span> 
                          <span className="text-indigo-600 font-black">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button
                        onClick={() => handleDownloadInvoice(order.invoiceNumber)}
                        className="bg-white hover:bg-gray-50 text-indigo-600 font-bold py-3 px-4 rounded-xl border-2 border-indigo-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden md:inline">Download</span>
                        <span className="md:hidden">Invoice</span>
                      </button>
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                        Detail
                      </button>
                      {order.status === 'delivered' && (
                        <>
                          <button 
                            onClick={() => setShowReviewModal(showReviewModal === order.id ? null : order.id)}
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                          >
                            <Star className="w-4 h-4" />
                            Nilai
                          </button>
                          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                            Beli Lagi
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Review Modal */}
                  {showReviewModal === order.id && (
                    <div className="border-t-2 border-gray-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-8 animate-in slide-in-from-top duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-black text-xl text-gray-800 flex items-center gap-3">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          Berikan Penilaian Produk
                        </h4>
                        <button
                          onClick={() => setShowReviewModal(null)}
                          className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-lg transition-all"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        {order.items.map((item: OrderItem, idx: number) => {
                          const key = `${order.id}_${item.name}`;
                          const existingReview = reviews[key];

                          return (
                            <div key={idx} className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                                  <Package className="w-5 h-5 text-white" />
                                </div>
                                <p className="font-bold text-gray-800 text-lg">{item.name}</p>
                              </div>
                              {existingReview ? (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-bold text-green-700">Review Terkirim</span>
                                  </div>
                                  <div className="flex items-center gap-2 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                          i < existingReview.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                    <span className="text-sm font-bold text-gray-700 ml-1">
                                      {existingReview.rating}/5
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 italic">"{existingReview.comment}"</p>
                                </div>
                              ) : (
                                <ReviewForm
                                  onSubmit={(rating, comment) =>
                                    handleReviewSubmit(order.id, item.name, rating, comment)
                                  }
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {orders.length}
            </div>
            <div className="text-sm text-gray-600 font-semibold">Total Transaksi</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {formatCurrency(orders.reduce((sum: number, order: Order) => sum + order.total, 0))}
            </div>
            <div className="text-sm text-gray-600 font-semibold">Total Pembayaran</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {orders.filter((o: Order) => o.status === 'shipped').length}
            </div>
            <div className="text-sm text-gray-600 font-semibold">Sedang Dikirim</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {orders.filter((o: Order) => o.status === 'processing').length}
            </div>
            <div className="text-sm text-gray-600 font-semibold">Diproses</div>
          </div>
        </div>
      </div>
    </div>
  );  
}