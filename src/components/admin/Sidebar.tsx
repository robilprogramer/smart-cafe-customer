'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Users, FileText, Settings, BarChart3, LogOut, Package, Mail } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Fungsi untuk cek status login
  const checkLoginStatus = () => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);
  };

  useEffect(() => {
    // Cek status login saat komponen dimount
    checkLoginStatus();

    // Listen untuk perubahan localStorage (untuk cross-tab sync)
    window.addEventListener('storage', checkLoginStatus);

    // Interval check untuk memastikan selalu update
    const interval = setInterval(checkLoginStatus, 500);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      // Hapus currentUser dari localStorage
      localStorage.removeItem("currentUser");
      
      // Update state
      setIsLoggedIn(false);
      
      // Redirect ke /admin
      router.push("/admin");
      
      // Reload halaman untuk memastikan semua state ter-reset
      window.location.reload();
    }
  };

  const allMenuItems: MenuItem[] = [
    { icon: Home, label: 'Beranda', href: '/admin' },
    { icon: Users, label: 'Pengguna', href: '/admin/users' },
    { icon: FileText, label: 'Konten', href: '/admin/konten' },
    { icon: Package, label: 'Produk', href: '/admin/products' },
    { icon: BarChart3, label: 'Laporan', href: '/admin/laporan' },
    { icon: Mail, label: 'Pesan', href: '/admin/pesan' },
    { icon: Settings, label: 'Pengaturan', href: '/admin/settings' },
  ];

  // Jika belum login, hanya tampilkan Beranda
  const menuItems = isLoggedIn ? allMenuItems : [allMenuItems[0]];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900 text-white transition-transform duration-300 z-20 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <nav className="p-4 space-y-2">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
              Menu Utama
            </p>
          </div>
          
          {menuItems.map((item, index) => {
            // Cek apakah menu ini yang sedang aktif
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Tombol Keluar hanya muncul jika sudah login */}
          {isLoggedIn && (
            <div className="pt-4 mt-4 border-t border-gray-700">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors w-full"
              >
                <LogOut size={20} />
                <span className="font-medium">Keluar</span>
              </button>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}