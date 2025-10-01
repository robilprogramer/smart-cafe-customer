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

  useEffect(() => {
    // Ambil data dari localStorage
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <span
                  className={`text-sm font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-4">
              {users.length > 0 ? (
                users.slice(-4).map((user, idx) => (
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
      </div>
    </AdminLayout>
  );
}
