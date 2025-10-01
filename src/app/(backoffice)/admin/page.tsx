'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

interface User {
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const stats = [
    { label: 'Total Pengguna', value: users.length, color: '#2563EB' },   // blue
    { label: 'Konten Aktif', value: 567, color: '#16A34A' },              // green
    { label: 'Kunjungan Hari Ini', value: 8901, color: '#7C3AED' },      // purple
    { label: 'Pendapatan', value: 45600000, color: '#F97316' },          // orange
  ];

  const chartData = stats.map(stat => ({
    name: stat.label,
    value: stat.value,
    color: stat.color,
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Selamat Datang di Dashboard</h2>
          <p className="text-gray-600 mt-1">Ringkasan aktivitas dan statistik sistem</p>
        </div>

        {isLoggedIn ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.label === 'Pendapatan'
                        ? `Rp ${Math.floor(stat.value / 1000).toLocaleString()}K`
                        : stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity + Grafik */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Aktivitas Terbaru */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
                <div className="space-y-4">
                  {users.length > 0 ? (
                    users.slice(-4).reverse().map((user, idx) => (
                      <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{user.name} baru mendaftar</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Belum ada aktivitas terbaru</p>
                  )}
                </div>
              </div>

              {/* Grafik Statistik */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Statistik</h3>
                <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={chartData.map(item => ({
      ...item,
      displayValue: item.name === "Pendapatan" ? item.value / 1000 : item.value, // normalize Pendapatan
    }))}
    margin={{ top: 20, right: 20, left: 0, bottom: 50 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="name"
      interval={0}
      tick={{ fontSize: 12 }}
      angle={-30}
      textAnchor="end"
    />
    <YAxis />
    <Tooltip
      formatter={(value: number, name, props) => {
        if (props.payload.name === "Pendapatan") return `Rp ${(value * 1000 / 1000000).toFixed(1)}JT`;
        return value.toLocaleString();
      }}
    />
    <Bar dataKey="displayValue">
      {chartData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>


                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p>Silakan login terlebih dahulu untuk mengakses dashboard</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
