'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Search, Filter, Calendar, ShoppingBag, Clock, CheckCircle, Truck, CreditCard, Download, Star, X, TrendingUp, Eye, Home, RefreshCw, FileText, Printer } from 'lucide-react';

type OrderItem = { name: string; qty: number; price: number; };
type Order = { id: string; date: string; items: OrderItem[]; total: number; status: 'processing' | 'shipped' | 'delivered'; paymentMethod: string; paymentDate: string; invoiceNumber: string; trackingNumber: string; address: string; };
type Review = { rating: number; comment: string; };

export default function OrderHistory() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Record<string, Review>>({});

  const orders: Order[] = [
    { id: 'ORD-2025-001', date: '2025-09-25', items: [{ name: 'iPhone 15 Pro Max', qty: 1, price: 19999000 }, { name: 'AirPods Pro Gen 2', qty: 1, price: 3999000 }], total: 23998000, status: 'delivered', paymentMethod: 'BCA Virtual Account', paymentDate: '2025-09-25 14:30', invoiceNumber: 'INV-2025-001', trackingNumber: 'JNE123456789', address: 'Jl. Sudirman No. 123, Jakarta Selatan' },
    { id: 'ORD-2025-002', date: '2025-09-27', items: [{ name: 'MacBook Pro M3', qty: 1, price: 32999000 }], total: 32999000, status: 'shipped', paymentMethod: 'GoPay', paymentDate: '2025-09-27 10:15', invoiceNumber: 'INV-2025-002', trackingNumber: 'SICEPAT987654321', address: 'Jl. Gatot Subroto No. 45, Jakarta Pusat' },
    { id: 'ORD-2025-003', date: '2025-09-28', items: [{ name: 'Samsung Galaxy S24 Ultra', qty: 1, price: 18999000 }, { name: 'Galaxy Watch 6', qty: 1, price: 4999000 }], total: 23998000, status: 'processing', paymentMethod: 'OVO', paymentDate: '2025-09-28 09:45', invoiceNumber: 'INV-2025-003', trackingNumber: '-', address: 'Jl. Thamrin No. 78, Jakarta Pusat' }
  ];

  const statusConfig = { processing: { label: 'Diproses', color: 'text-blue-700', bg: 'from-blue-100 to-blue-200', icon: Clock }, shipped: { label: 'Dikirim', color: 'text-purple-700', bg: 'from-purple-100 to-purple-200', icon: Truck }, delivered: { label: 'Selesai', color: 'text-green-700', bg: 'from-green-100 to-emerald-200', icon: CheckCircle } };

  const filteredOrders = orders.filter(order => (order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))) && (filterStatus === 'all' || order.status === filterStatus));

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const notify = (message: string, type: 'success' | 'info' = 'success') => {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-blue-500'} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2`;
    notification.innerHTML = `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg><span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const generateInvoiceHTML = (order: Order) => {
    const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Invoice ${order.invoiceNumber}</title>
<style>
body{font-family:Arial,sans-serif;margin:40px;color:#333;line-height:1.6}
.header{text-align:center;margin-bottom:40px;border-bottom:3px solid #10b981;padding-bottom:20px}
.header h1{color:#10b981;margin:0;font-size:32px}
.info-section{margin-bottom:30px}
.info-section h2{color:#10b981;border-bottom:2px solid #10b981;padding-bottom:5px;font-size:20px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:10px}
.info-item{margin-bottom:10px;padding:10px;background-color:#f9f9f9;border-radius:5px}
.info-label{font-weight:bold;color:#666;display:block;margin-bottom:5px}
.items-table{width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1)}
.items-table th,.items-table td{border:1px solid #ddd;padding:12px;text-align:left}
.items-table th{background-color:#10b981;color:white;font-weight:bold}
.items-table tr:nth-child(even){background-color:#f9f9f9}
.total-section{text-align:right;margin-top:20px;padding:15px;background-color:#f0fdf4;border-radius:5px;border:2px solid #10b981}
.total-row{font-size:24px;font-weight:bold;color:#10b981}
.footer{margin-top:40px;text-align:center;color:#666;font-size:12px;border-top:1px solid #ddd;padding-top:20px}
.status-badge{display:inline-block;padding:5px 10px;border-radius:20px;font-size:12px;font-weight:bold;text-transform:uppercase}
.status-delivered{background-color:#10b981;color:white}
.status-shipped{background-color:#8b5cf6;color:white}
.status-processing{background-color:#3b82f6;color:white}
@media print{body{margin:20px}.no-print{display:none}.header{page-break-after:always}.info-section{page-break-inside:avoid}.items-table{page-break-inside:avoid}}
</style>
</head>
<body>
<div class="header">
<h1>INVOICE</h1>
<p>${order.invoiceNumber}</p>
<p style="font-size:14px;color:#999">Tanggal Cetak: ${new Date().toLocaleString('id-ID')}</p>
</div>
<div class="info-section">
<h2>Informasi Pesanan</h2>
<div class="info-grid">
<div class="info-item"><span class="info-label">Nomor Pesanan:</span> ${order.id}</div>
<div class="info-item"><span class="info-label">Tanggal Pesanan:</span> ${formatDate(order.date)}</div>
<div class="info-item"><span class="info-label">Status:</span> <span class="status-badge status-${order.status}">${statusConfig[order.status].label}</span></div>
<div class="info-item"><span class="info-label">No. Resi:</span> ${order.trackingNumber || '-'}</div>
</div>
</div>
<div class="info-section">
<h2>Informasi Pembayaran</h2>
<div class="info-grid">
<div class="info-item"><span class="info-label">Metode Pembayaran:</span> ${order.paymentMethod}</div>
<div class="info-item"><span class="info-label">Tanggal Pembayaran:</span> ${order.paymentDate}</div>
</div>
</div>
<div class="info-section">
<h2>Detail Produk</h2>
<table class="items-table">
<thead>
<tr><th style="width:50px">No</th><th>Nama Produk</th><th style="width:80px">Jumlah</th><th style="width:150px">Harga</th><th style="width:150px">Subtotal</th></tr>
</thead>
<tbody>
 ${order.items.map((item, idx) => `<tr><td style="text-align:center">${idx + 1}</td><td>${item.name}</td><td style="text-align:center">${item.qty}</td><td style="text-align:right">${formatCurrency(item.price)}</td><td style="text-align:right;font-weight:bold">${formatCurrency(item.price * item.qty)}</td></tr>`).join('')}
</tbody>
</table>
<div class="total-section"><div class="total-row">Total Pembayaran: ${formatCurrency(order.total)}</div></div>
</div>
<div class="info-section">
<h2>Informasi Pengiriman</h2>
<div class="info-item" style="grid-column:1/-1"><span class="info-label">Alamat Pengiriman:</span><br>${order.address}</div>
</div>
<div class="footer">
<p><strong>Terima kasih atas kepercayaan Anda berbelanja dengan kami!</strong></p>
<p>Invoice ini adalah bukti pembayaran yang sah.</p>
<p>Hubungi kami jika ada pertanyaan: support@tokoku.com | +62 21 1234 5678</p>
</div>
</body>
</html>`;
  };

  const handleDownload = (order: Order, type: 'html' | 'pdf') => {
    if (type === 'html') {
      const blob = new Blob([generateInvoiceHTML(order)], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${order.invoiceNumber}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      notify(`Invoice ${order.invoiceNumber} berhasil diunduh (HTML)`);
    } else {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(generateInvoiceHTML(order));
        printWindow.document.close();
        printWindow.onload = () => setTimeout(() => { printWindow.print(); setTimeout(() => printWindow.close(), 1000); }, 500);
        notify(`Invoice ${order.invoiceNumber} siap dicetak sebagai PDF`);
      } else {
        notify('Gagal membuka jendela cetak. Pastikan popup tidak diblokir.', 'info');
      }
    }
  };

  const handleAction = (action: string, data: any, order?: Order) => {
    switch(action) {
      case 'track': if (data !== '-') notify(`Melacak pesanan dengan nomor ${data}`, 'info'); break;
      case 'buyAgain': notify('Mengarahkan ke menu...'); setTimeout(() => router.push('/menu'), 1000); break;
      case 'refresh': notify('Data berhasil diperbarui'); break;
    }
  };

  const ReviewForm = ({ orderId, itemName }: { orderId: string; itemName: string }) => {
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const key = `${orderId}_${itemName}`;
    const existingReview = reviews[key];

    if (existingReview) return (
      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
        <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-green-600" /><span className="text-sm font-bold text-green-700">Review Terkirim</span></div>
        <div className="flex items-center gap-2 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < existingReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}<span className="text-sm font-bold text-gray-700 ml-1">{existingReview.rating}/5</span></div>
        <p className="text-sm text-gray-700 italic">"{existingReview.comment}"</p>
      </div>
    );

    if (!showForm) return (
      <button onClick={() => setShowForm(true)} className="w-full flex items-center justify-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium py-2 px-3 bg-green-50 hover:bg-green-100 rounded-lg transition-all">
        <Star className="w-4 h-4" /> Beri Penilaian
      </button>
    );

    return (
      <div className="space-y-3 bg-white p-4 rounded-lg border-2 border-green-200">
        <div className="flex items-center justify-center gap-2">{[1, 2, 3, 4, 5].map((star) => <button key={star} onClick={() => setRating(star)} className="transition-all hover:scale-125"><Star className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} /></button>)}</div>
        {rating > 0 && <p className="text-center text-sm font-semibold text-green-600">{rating} dari 5 bintang</p>}
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Bagikan pengalaman Anda..." className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" rows={3} />
        <div className="flex gap-2">
          <button onClick={() => { if (rating && comment) { setReviews(prev => ({ ...prev, [key]: { rating, comment } })); notify('Review berhasil dikirim'); setRating(0); setComment(''); setShowForm(false); } else alert('Lengkapi rating dan komentar'); }} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-all">Kirim</button>
          <button onClick={() => { setShowForm(false); setRating(0); setComment(''); }} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all">Batal</button>
        </div>
      </div>
    );
  };

  const StatusIcon = ({ iconName, className }: { iconName: any; className: string }) => {
    const Icon = iconName;
    return <Icon className={className} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-end mb-6">
            <div className="flex items-center gap-2">
              <button onClick={() => handleAction('refresh', null)} className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                <RefreshCw className="w-5 h-5" /> <span className="hidden md:inline">Refresh</span>
              </button>
              <button onClick={() => router.push('/')} className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                <Home className="w-5 h-5" /> <span className="hidden md:inline">Beranda</span>
              </button>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3 bg-white px-6 py-3 rounded-full shadow-lg">
              <ShoppingBag className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Histori Pembayaran</h1>
            </div>
            <p className="text-gray-600 text-lg">Semua pesanan yang sudah dibayar dan sedang diproses</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Cari pesanan, invoice, atau produk..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white">
                <option value="all">Semua Status</option><option value="processing">Diproses</option><option value="shipped">Dikirim</option><option value="delivered">Selesai</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"><Package className="w-12 h-12 text-gray-400" /></div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Tidak ada pesanan ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          ) : (
            filteredOrders.map(order => {
              const StatusIconComp = statusConfig[order.status].icon;
              return (
                <div key={order.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b-2 border-gray-100">
                      <div className="flex items-start gap-4 mb-3 md:mb-0">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg"><Package className="w-7 h-7 text-white" /></div>
                        <div>
                          <h3 className="font-black text-xl text-gray-800">{order.id}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1.5"><Calendar className="w-4 h-4" /> <span>{formatDate(order.date)}</span></div>
                          <div className="text-xs text-gray-400 mt-1">Invoice: <span className="text-green-600">{order.invoiceNumber}</span></div>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${statusConfig[order.status].bg} font-bold`}>
                        <StatusIcon iconName={StatusIconComp} className={`w-5 h-5 ${statusConfig[order.status].color}`} />
                        <span className={statusConfig[order.status].color}>{statusConfig[order.status].label}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-2xl p-4">
                          <div><p className="font-bold text-gray-800">{item.name}</p><p className="text-sm text-gray-500 mt-1">Jumlah: <span className="font-semibold">{item.qty}</span></p></div>
                          <p className="font-black text-lg text-green-600">{formatCurrency(item.price)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-50 rounded-2xl p-5 mb-6 border-2 border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500 p-3 rounded-xl"><CheckCircle className="w-6 h-6 text-white" /></div>
                        <div><h4 className="font-black text-gray-800">Pembayaran Berhasil</h4><p className="text-sm text-gray-600">Pesanan sudah dibayar dan diproses</p></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white rounded-xl p-3"><p className="text-gray-500 text-xs mb-1">Metode Pembayaran</p><div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-green-600" /><p className="font-bold text-gray-800">{order.paymentMethod}</p></div></div>
                        <div className="bg-white rounded-xl p-3"><p className="text-gray-500 text-xs mb-1">Tanggal Bayar</p><p className="font-bold text-gray-800">{order.paymentDate}</p></div>
                        <div className="bg-white rounded-xl p-3"><p className="text-gray-500 text-xs mb-1">Total Dibayar</p><p className="font-black text-green-600 text-xl">{formatCurrency(order.total)}</p></div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-6 bg-gray-50 rounded-2xl p-4">
                      <p className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Truck className="w-4 h-4 text-green-600" /> Alamat Pengiriman</p>
                      <p className="text-gray-600 mb-2">{order.address}</p>
                      {order.trackingNumber !== '-' && (
                        <div className="mt-3 flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                          <span className="font-semibold text-gray-700">No. Resi:</span><span className="text-green-600 font-black">{order.trackingNumber}</span>
                          <button onClick={() => handleAction('track', order.trackingNumber)} className="ml-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-1"><Eye className="w-4 h-4" /> Lacak</button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="relative group">
                        <button className="bg-white hover:bg-gray-50 text-green-600 font-bold py-3 px-4 rounded-xl border-2 border-green-600 transition-all flex items-center justify-center gap-2 w-full">
                          <Download className="w-4 h-4" /> <span className="hidden md:inline">Download</span>
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                          <button onClick={() => handleDownload(order, 'html')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm"><Download className="w-4 h-4" /> Download HTML</button>
                          <button onClick={() => handleDownload(order, 'pdf')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm border-t"><Printer className="w-4 h-4" /> Cetak PDF</button>
                        </div>
                      </div>
                      <button onClick={() => setShowDetailModal(order.id)} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"><FileText className="w-4 h-4" /> Detail</button>
                      {order.status === 'delivered' && (
                        <>
                          <button onClick={() => setShowReviewModal(showReviewModal === order.id ? null : order.id)} className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"><Star className="w-4 h-4" /> Nilai</button>
                          <button onClick={() => handleAction('buyAgain', null, order)} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"><ShoppingBag className="w-4 h-4" /> Beli Lagi</button>
                        </>
                      )}
                    </div>
                  </div>

                  {showReviewModal === order.id && (
                    <div className="border-t-2 border-gray-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-black text-xl text-gray-800 flex items-center gap-3">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg"><Star className="w-6 h-6 text-white" /></div>
                          Berikan Penilaian Produk
                        </h4>
                        <button onClick={() => setShowReviewModal(null)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-lg"><X className="w-6 h-6" /></button>
                      </div>
                      <div className="space-y-4">{order.items.map((item, idx) => <div key={idx} className="bg-white rounded-2xl p-5 shadow-lg"><p className="font-bold text-gray-800 mb-3">{item.name}</p><ReviewForm orderId={order.id} itemName={item.name} /></div>)}</div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: ShoppingBag, label: 'Total Transaksi', value: orders.length },
            { icon: TrendingUp, label: 'Total Pembayaran', value: formatCurrency(orders.reduce((sum, order) => sum + order.total, 0)) },
            { icon: Truck, label: 'Sedang Dikirim', value: orders.filter(o => o.status === 'shipped').length },
            { icon: Clock, label: 'Diproses', value: orders.filter(o => o.status === 'processing').length }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-green-100">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"><stat.icon className="w-8 h-8 text-white" /></div>
              <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Detail Pesanan</h2>
                <button onClick={() => setShowDetailModal(null)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-lg transition-all"><X className="w-6 h-6" /></button>
              </div>
              {filteredOrders.filter(order => order.id === showDetailModal).map(order => (
                <div key={order.id} className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Informasi Pesanan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><p className="text-sm text-gray-500 mb-1">Nomor Pesanan</p><p className="font-bold text-gray-800">{order.id}</p></div>
                      <div><p className="text-sm text-gray-500 mb-1">Tanggal Pesanan</p><p className="font-bold text-gray-800">{formatDate(order.date)}</p></div>
                      <div><p className="text-sm text-gray-500 mb-1">Nomor Invoice</p><p className="font-bold text-gray-800">{order.invoiceNumber}</p></div>
                      <div><p className="text-sm text-gray-500 mb-1">Status</p><div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${statusConfig[order.status].bg} font-bold`}><StatusIcon iconName={statusConfig[order.status].icon} className={`w-4 h-4 ${statusConfig[order.status].color}`} /><span className={statusConfig[order.status].color}>{statusConfig[order.status].label}</span></div></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Produk</h3>
                    <div className="space-y-3">{order.items.map((item, idx) => <div key={idx} className="flex justify-between items-center bg-white rounded-xl p-4"><div><p className="font-bold text-gray-800">{item.name}</p><p className="text-sm text-gray-500">Jumlah: {item.qty}</p></div><p className="font-bold text-lg text-green-600">{formatCurrency(item.price)}</p></div>)}</div>
                    <div className="mt-4 pt-4 border-t-2 border-gray-200"><div className="flex justify-between items-center"><p className="font-bold text-lg text-gray-800">Total</p><p className="font-black text-xl text-green-600">{formatCurrency(order.total)}</p></div></div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Informasi Pembayaran</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><p className="text-sm text-gray-500 mb-1">Metode Pembayaran</p><p className="font-bold text-gray-800">{order.paymentMethod}</p></div><div><p className="text-sm text-gray-500 mb-1">Tanggal Pembayaran</p><p className="font-bold text-gray-800">{order.paymentDate}</p></div></div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Informasi Pengiriman</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><p className="text-sm text-gray-500 mb-1">Alamat Pengiriman</p><p className="font-bold text-gray-800">{order.address}</p></div><div><p className="text-sm text-gray-500 mb-1">Nomor Resi</p><p className="font-bold text-gray-800">{order.trackingNumber !== '-' ? <span className="flex items-center gap-2">{order.trackingNumber}<button onClick={() => handleAction('track', order.trackingNumber)} className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"><Eye className="w-4 h-4" /> Lacak</button></span> : '-'}</p></div></div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative group flex-1">
                      <button className="w-full bg-white hover:bg-gray-50 text-green-600 font-bold py-3 px-4 rounded-xl border-2 border-green-600 transition-all flex items-center justify-center gap-2"><Download className="w-5 h-5" /> Download Invoice</button>
                      <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                        <button onClick={() => handleDownload(order, 'html')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm"><Download className="w-4 h-4" /> Download HTML</button>
                        <button onClick={() => handleDownload(order, 'pdf')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm border-t"><Printer className="w-4 h-4" /> Cetak PDF</button>
                      </div>
                    </div>
                    {order.status === 'delivered' && (
                      <>
                        <button onClick={() => { setShowDetailModal(null); setShowReviewModal(order.id); }} className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"><Star className="w-5 h-5" /> Beri Penilaian</button>
                        <button onClick={() => handleAction('buyAgain', null, order)} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"><ShoppingBag className="w-5 h-5" /> Beli Lagi</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}