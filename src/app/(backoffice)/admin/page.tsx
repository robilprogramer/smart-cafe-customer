'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

interface User {
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fungsi untuk cek status login
  const checkLoginStatus = () => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);
  };

  useEffect(() => {
    // Cek status login saat pertama kali load
    checkLoginStatus();

    // Ambil data users dari localStorage
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Listen untuk perubahan localStorage (untuk cross-tab sync)
    window.addEventListener('storage', checkLoginStatus);

    // Interval check untuk memastikan selalu update
    const interval = setInterval(() => {
      checkLoginStatus();
      
      // Update users juga
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { label: 'Total Pengguna', value: users.length.toString(), change: '+12%', color: 'blue' },
    { label: 'Konten Aktif', value: '567', change: '+8%', color: 'green' },
    { label: 'Kunjungan Hari Ini', value: '8,901', change: '+23%', color: 'purple' },
    { label: 'Pendapatan', value: 'Rp 45,6JT', change: '+15%', color: 'orange' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Selamat Datang di Dashboard</h2>
          <p className="text-gray-600 mt-1">Ringkasan aktivitas dan statistik sistem</p>
        </div>

        {isLoggedIn ? (
          <>
            {/* Stats Grid - Hanya tampil jika sudah login */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      stat.color === 'blue' ? 'text-blue-600 bg-blue-50' :
                      stat.color === 'green' ? 'text-green-600 bg-green-50' :
                      stat.color === 'purple' ? 'text-purple-600 bg-purple-50' :
                      'text-orange-600 bg-orange-50'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity - Hanya tampil jika sudah login */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
                <div className="space-y-4">
                  {users.length > 0 ? (
                    users.slice(-4).reverse().map((user, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {user.name ? user.name[0].toUpperCase() : "U"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {user.name} baru mendaftar
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Belum ada aktivitas terbaru</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Statistik</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-400">Grafik akan ditampilkan di sini</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Tampilan jika belum login
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="w-10 h-10 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Data Terlindungi
              </h3>
              <p className="text-gray-600 mb-6">
                Silakan login terlebih dahulu untuk mengakses statistik dan data sensitif dashboard.
              </p>
              <p className="text-sm text-gray-500">
                Data seperti Total Pengguna, Konten Aktif, Kunjungan Hari Ini, dan Pendapatan hanya dapat diakses oleh pengguna yang sudah terautentikasi.
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}