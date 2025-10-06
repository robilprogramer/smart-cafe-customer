'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
} from 'recharts';
import { Users, FileText, Eye, DollarSign, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface User {
  name: string;
  email: string;
  role: string;
}

// ========================================
// BAGIAN BARU: Data untuk Slider Banner dengan Gambar
// ========================================
const bannerSlides = [
  {
    title: "Selamat Datang di Dashboard",
    description: "Ringkasan aktivitas dan statistik sistem",
    gradient: "from-green-500 to-green-700",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Kelola Pengguna Anda",
    description: "Monitor dan tingkatkan engagement pengguna",
    gradient: "from-blue-500 to-blue-700",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    title: "Analisis Performa Real-time",
    description: "Data terkini untuk keputusan yang lebih baik",
    gradient: "from-purple-500 to-purple-700",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Tingkatkan Pendapatan",
    description: "Optimasi strategi bisnis Anda",
    gradient: "from-orange-500 to-orange-700",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  },
];
// ========================================

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // ========================================
  // BAGIAN BARU: State untuk tracking slide
  // ========================================
  const [currentSlide, setCurrentSlide] = useState(0);
  // ========================================

  const checkLoginStatus = () => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);
  };

  useEffect(() => {
    checkLoginStatus();

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) setUsers(JSON.parse(storedUsers));

    window.addEventListener('storage', checkLoginStatus);

    const interval = setInterval(() => {
      checkLoginStatus();
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) setUsers(JSON.parse(storedUsers));
    }, 500);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(interval);
    };
  }, []);

  // ========================================
  // BAGIAN BARU: Auto-play slider setiap 5 detik
  // ========================================
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);
  // ========================================

  // ========================================
  // BAGIAN BARU: Fungsi navigasi slider
  // ========================================
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  // ========================================

  const stats = [
    { 
      label: 'Total Pengguna', 
      value: users.length, 
      color: '#3B82F6',
      bgColor: 'bg-blue-50',
      icon: Users,
      iconColor: 'text-blue-600',
      change: '+12%',
      isPositive: true
    },
    { 
      label: 'Konten Aktif', 
      value: 567, 
      color: '#10B981',
      bgColor: 'bg-green-50',
      icon: FileText,
      iconColor: 'text-green-600',
      change: '+8%',
      isPositive: true
    },
    { 
      label: 'Kunjungan Hari Ini', 
      value: 8901, 
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
      icon: Eye,
      iconColor: 'text-purple-600',
      change: '+23%',
      isPositive: true
    },
    { 
      label: 'Pendapatan', 
      value: 45600000, 
      color: '#F97316',
      bgColor: 'bg-orange-50',
      icon: DollarSign,
      iconColor: 'text-orange-600',
      change: '+15%',
      isPositive: true
    },
  ];

  const barChartData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 61 },
    { month: 'Mei', value: 55 },
    { month: 'Jun', value: 67 },
    { month: 'Jul', value: users.length },
  ];

  const lineChartData = [
    { month: 'Jan', konten: 420, kunjungan: 7200, pendapatan: 38000 },
    { month: 'Feb', konten: 465, kunjungan: 6850, pendapatan: 40500 },
    { month: 'Mar', konten: 445, kunjungan: 7500, pendapatan: 39500 },
    { month: 'Apr', konten: 510, kunjungan: 8200, pendapatan: 43000 },
    { month: 'Mei', konten: 490, kunjungan: 7650, pendapatan: 42000 },
    { month: 'Jun', konten: 545, kunjungan: 8600, pendapatan: 44500 },
    { month: 'Jul', konten: 567, kunjungan: 8901, pendapatan: 45600 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ======================================== */}
        {/* BAGIAN BARU: Banner Slider dengan Gambar */}
        {/* ======================================== */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg h-80">
          {/* Container untuk semua slide */}
          <div 
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerSlides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full h-full relative"
              >
                {/* Background Image dengan Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-85`}></div>
                </div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-center p-8 text-white">
                  <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">{slide.title}</h2>
                  <p className="text-white/95 text-xl drop-shadow-md max-w-2xl">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Navigasi Kiri */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Tombol Navigasi Kanan */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75 w-2'
                }`}
              />
            ))}
          </div>
        </div>
        {/* ======================================== */}
        {/* AKHIR Banner Slider */}
        {/* ======================================== */}

        {isLoggedIn ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown;
                
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${stat.bgColor} p-3 rounded-xl`}>
                        <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <TrendIcon className="w-3 h-3" />
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.label === 'Pendapatan'
                        ? `Rp ${(stat.value / 1000).toLocaleString('id-ID')}K`
                        : stat.value.toLocaleString('id-ID')}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diagram Batang - Total Pengguna */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Total Pengguna</h3>
                    <p className="text-sm text-gray-500 mt-1">Pertumbuhan user bulanan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                    <p className="text-xs text-green-600 font-medium">+12% bulan ini</p>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '12px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value: number) => [value + ' users', 'Total']}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {barChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === barChartData.length - 1 ? '#3B82F6' : '#93C5FD'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line Chart - Metrics Lainnya */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Tren Performa</h3>
                    <p className="text-sm text-gray-500 mt-1">Statistik 7 bulan terakhir</p>
                  </div>
                  <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>7 Bulan</option>
                    <option>6 Bulan</option>
                    <option>3 Bulan</option>
                  </select>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '12px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value: number, name: string) => {
                          if (name === 'pendapatan') return [`Rp ${(value / 1000).toFixed(0)}K`, 'Pendapatan'];
                          if (name === 'kunjungan') return [value.toLocaleString('id-ID'), 'Kunjungan'];
                          return [value, 'Konten'];
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        formatter={(value) => {
                          if (value === 'konten') return 'Konten Aktif';
                          if (value === 'kunjungan') return 'Kunjungan';
                          if (value === 'pendapatan') return 'Pendapatan (K)';
                          return value;
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="konten" 
                        stroke="#10B981" 
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5 }}
                        isAnimationActive={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="kunjungan" 
                        stroke="#8B5CF6" 
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5 }}
                        isAnimationActive={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pendapatan" 
                        stroke="#F97316" 
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5 }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Aktivitas Terbaru - Full Width */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h3>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Lihat Semua
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {users.length > 0 ? (
                  users.slice(-4).reverse().map((user, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                        <span className="text-white font-bold text-lg">
                          {user.name ? user.name[0].toUpperCase() : 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <p className="text-xs text-gray-400 mt-1">Baru mendaftar</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">Belum ada aktivitas terbaru</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Akses Terbatas</h3>
            <p className="text-gray-600 mb-6">Silakan login terlebih dahulu untuk mengakses dashboard</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}