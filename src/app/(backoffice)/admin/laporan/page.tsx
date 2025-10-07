"use client";

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Users, Coffee, Calendar, Download, Filter } from 'lucide-react';


const SmartCafeReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const [selectedReport, setSelectedReport] = useState<'overview' | 'products' | 'payment' | 'customers'>('overview');

  // Data untuk berbagai periode
  const dataByPeriod: Record<string, any> = {
    today: {
      sales: [
        { time: '08:00', penjualan: 850000, transaksi: 12 },
        { time: '10:00', penjualan: 1200000, transaksi: 18 },
        { time: '12:00', penjualan: 2100000, transaksi: 28 },
        { time: '14:00', penjualan: 1800000, transaksi: 22 },
        { time: '16:00', penjualan: 2400000, transaksi: 32 },
        { time: '18:00', penjualan: 2800000, transaksi: 38 },
        { time: '20:00', penjualan: 1500000, transaksi: 20 }
      ],
      stats: { total: 'Rp 18.8 Jt', transaksi: '170', pelanggan: '156', avgBill: 'Rp 110K' }
    },
    week: {
      sales: [
        { time: 'Sen', penjualan: 15000000, transaksi: 145 },
        { time: 'Sel', penjualan: 17000000, transaksi: 158 },
        { time: 'Rab', penjualan: 19000000, transaksi: 172 },
        { time: 'Kam', penjualan: 18500000, transaksi: 168 },
        { time: 'Jum', penjualan: 22000000, transaksi: 195 },
        { time: 'Sab', penjualan: 25000000, transaksi: 220 },
        { time: 'Min', penjualan: 21000000, transaksi: 185 }
      ],
      stats: { total: 'Rp 137.5 Jt', transaksi: '1,243', pelanggan: '1,089', avgBill: 'Rp 111K' }
    },
    month: {
      sales: [
        { time: 'Week 1', penjualan: 125000000, transaksi: 1100 },
        { time: 'Week 2', penjualan: 138000000, transaksi: 1250 },
        { time: 'Week 3', penjualan: 142000000, transaksi: 1280 },
        { time: 'Week 4', penjualan: 155000000, transaksi: 1400 }
      ],
      stats: { total: 'Rp 560 Jt', transaksi: '5,030', pelanggan: '4,527', avgBill: 'Rp 111K' }
    },
    year: {
      sales: [
        { time: 'Jan', penjualan: 480000000, transaksi: 4200 },
        { time: 'Feb', penjualan: 520000000, transaksi: 4600 },
        { time: 'Mar', penjualan: 550000000, transaksi: 4900 },
        { time: 'Apr', penjualan: 530000000, transaksi: 4700 },
        { time: 'Mei', penjualan: 580000000, transaksi: 5100 },
        { time: 'Jun', penjualan: 620000000, transaksi: 5500 },
        { time: 'Jul', penjualan: 610000000, transaksi: 5400 },
        { time: 'Agu', penjualan: 590000000, transaksi: 5200 },
        { time: 'Sep', penjualan: 600000000, transaksi: 5300 },
        { time: 'Okt', penjualan: 560000000, transaksi: 4950 }
      ],
      stats: { total: 'Rp 5.64 M', transaksi: '49,850', pelanggan: '44,865', avgBill: 'Rp 113K' }
    }
  };

  const currentData = dataByPeriod[selectedPeriod];
  const salesData = currentData.sales;

  // Data berdasarkan tab yang dipilih
  const reportData: Record<string, any> = {
    overview: {
      products: [
        { name: 'Espresso', sold: 145, revenue: 5075000 },
        { name: 'Cappuccino', sold: 132, revenue: 5280000 },
        { name: 'Latte', sold: 128, revenue: 5632000 },
        { name: 'Americano', sold: 98, revenue: 3430000 },
        { name: 'Croissant', sold: 87, revenue: 2175000 }
      ],
      category: [
        { name: 'Kopi', value: 45, color: '#166534' },
        { name: 'Non-Kopi', value: 25, color: '#16a34a' },
        { name: 'Makanan', value: 20, color: '#22c55e' },
        { name: 'Dessert', value: 10, color: '#86efac' }
      ],
      payment: [
        { method: 'QRIS', amount: 8500000, percentage: 45 },
        { method: 'E-Wallet', amount: 6200000, percentage: 33 },
        { method: 'Tunai', amount: 4100000, percentage: 22 }
      ]
    },
    products: {
      products: [
        { name: 'Espresso', sold: 145, revenue: 5075000 },
        { name: 'Cappuccino', sold: 132, revenue: 5280000 },
        { name: 'Latte', sold: 128, revenue: 5632000 },
        { name: 'Americano', sold: 98, revenue: 3430000 },
        { name: 'Croissant', sold: 87, revenue: 2175000 },
        { name: 'Macchiato', sold: 76, revenue: 2660000 },
        { name: 'Affogato', sold: 65, revenue: 2925000 },
        { name: 'Sandwich', sold: 54, revenue: 2160000 }
      ],
      category: [
        { name: 'Kopi', value: 45, color: '#166534' },
        { name: 'Non-Kopi', value: 25, color: '#16a34a' },
        { name: 'Makanan', value: 20, color: '#22c55e' },
        { name: 'Dessert', value: 10, color: '#86efac' }
      ]
    },
    payment: {
      payment: [
        { method: 'QRIS', amount: 8500000, percentage: 45, transactions: 85 },
        { method: 'E-Wallet (GoPay)', amount: 3200000, percentage: 17, transactions: 42 },
        { method: 'E-Wallet (OVO)', amount: 2100000, percentage: 11, transactions: 28 },
        { method: 'E-Wallet (DANA)', amount: 900000, percentage: 5, transactions: 15 },
        { method: 'Tunai', amount: 4100000, percentage: 22, transactions: 45 }
      ]
    },
    customers: {
      customerStats: [
        { type: 'Pelanggan Baru', count: 45, percentage: 28.8, color: '#16a34a' },
        { type: 'Pelanggan Lama', count: 111, percentage: 71.2, color: '#22c55e' }
      ],
      peakHours: [
        { hour: '07:00-09:00', customers: 28, percentage: 18 },
        { hour: '12:00-14:00', customers: 52, percentage: 33 },
        { hour: '16:00-18:00', customers: 48, percentage: 31 },
        { hour: '19:00-21:00', customers: 28, percentage: 18 }
      ]
    }
  };

  const topProducts = reportData[selectedReport]?.products || reportData.overview.products;
  const categoryData = reportData[selectedReport]?.category || reportData.overview.category;
  const paymentData = reportData[selectedReport]?.payment || reportData.overview.payment;

  // Fungsi export PDF
  const handleExportPDF = () => {
    alert('🎉 Laporan sedang disiapkan untuk diunduh!\n\nFitur ini akan menghasilkan PDF lengkap dengan:\n✓ Grafik penjualan\n✓ Data produk terlaris\n✓ Analitik pembayaran\n✓ Statistik pelanggan\n\nDalam implementasi nyata, gunakan library seperti jsPDF atau html2pdf.');
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          <div className="flex items-center mt-2">
            <TrendingUp className={`w-4 h-4 ${change > 0 ? 'text-green-500' : 'text-red-500'} mr-1`} />
            <span className={`text-sm font-semibold ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-gray-400 text-xs ml-2">vs kemarin</span>
          </div>
        </div>
        <div className={`p-4 ${color} rounded-full`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
                <Coffee className="w-10 h-10 text-green-600 mr-3" />
                Smart Cafe Dashboard
              </h1>
              <p className="text-gray-600">Laporan Penjualan & Analitik Real-time</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-4 py-2 bg-white border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
              >
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="year">Tahun Ini</option>
              </select>
              <button 
                onClick={handleExportPDF}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Download className="w-5 h-5" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={DollarSign}
            title="Total Penjualan"
            value={currentData.stats.total}
            change={15.3}
            color="bg-gradient-to-br from-green-500 to-emerald-600"
          />
          <StatCard 
            icon={ShoppingCart}
            title="Total Transaksi"
            value={currentData.stats.transaksi}
            change={8.2}
            color="bg-gradient-to-br from-teal-500 to-cyan-600"
          />
          <StatCard 
            icon={Users}
            title="Total Pelanggan"
            value={currentData.stats.pelanggan}
            change={12.5}
            color="bg-gradient-to-br from-lime-500 to-green-600"
          />
          <StatCard 
            icon={Coffee}
            title="Rata-rata Bill"
            value={currentData.stats.avgBill}
            change={5.8}
            color="bg-gradient-to-br from-emerald-500 to-teal-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-6">
          <div className="flex gap-2">
            {(['overview', 'products', 'payment', 'customers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedReport(tab)}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedReport === tab
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'products' && 'Produk'}
                {tab === 'payment' && 'Pembayaran'}
                {tab === 'customers' && 'Pelanggan'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
              Grafik Penjualan {selectedPeriod === 'today' ? 'Hari Ini' : selectedPeriod === 'week' ? 'Minggu Ini' : selectedPeriod === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #22c55e', borderRadius: '8px' }}
                  formatter={(value: any) => 'Rp ' + value.toLocaleString('id-ID')}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="penjualan" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 5 }}
                  activeDot={{ r: 8 }}
                  name="Penjualan (Rp)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart or Customer Stats based on tab */}
          {selectedReport === 'customers' ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Tipe Pelanggan</h2>
              <div className="space-y-4">
                {reportData.customers.customerStats.map((stat: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold" style={{ color: stat.color }}>{stat.type}</span>
                      <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.count}</span>
                    </div>
                    <div className="text-sm text-gray-600">{stat.percentage}% dari total</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-3">Jam Sibuk</h3>
                {reportData.customers.peakHours.map((peak: any, idx: number) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{peak.hour}</span>
                      <span>{peak.customers} pelanggan</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${peak.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Kategori Produk</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }: any) => `${name} ${value}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Coffee className="w-6 h-6 text-green-600 mr-2" />
              {selectedReport === 'products' ? 'Top 8 Produk Terlaris' : 'Top 5 Produk Terlaris'}
            </h2>
            <div className="space-y-4">
              {topProducts.slice(0, selectedReport === 'products' ? 8 : 5).map((product: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sold} terjual</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">Rp {(product.revenue / 1000).toFixed(0)}K</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {selectedReport === 'payment' ? 'Detail Metode Pembayaran' : 'Metode Pembayaran'}
            </h2>
            <div className="space-y-4">
              {paymentData.map((payment: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">{payment.method}</span>
                    <div className="text-right">
                      <span className="text-gray-600">Rp {(payment.amount / 1000000).toFixed(1)} Jt ({payment.percentage}%)</span>
                      {payment.transactions && (
                        <div className="text-sm text-gray-500">{payment.transactions} transaksi</div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${payment.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Terakhir diperbarui: {new Date().toLocaleString('id-ID')}</span>
            </div>
            <span>Smart Cafe Management System v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCafeReport;