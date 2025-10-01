'use client';

import { Home, Users, FileText, Settings, BarChart3, LogOut, Package, Mail } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Beranda', href: '#', active: true },
    { icon: Users, label: 'Pengguna', href: '/admin/users', active: false },
    { icon: FileText, label: 'Konten', href: '#', active: false },
    { icon: Package, label: 'Produk', href: '/admin/products', active: false },
    { icon: BarChart3, label: 'Laporan', href: '#', active: false },
    { icon: Mail, label: 'Pesan', href: '#', active: false },
    { icon: Settings, label: 'Pengaturan', href: '#', active: false },
  ];

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
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-gray-700">
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors w-full">
              <LogOut size={20} />
              <span className="font-medium">Keluar</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}