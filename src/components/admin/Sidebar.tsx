'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Users, FileText, Settings, BarChart3, LogOut, Package, Mail } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // state untuk dialog
  const router = useRouter();
  const pathname = usePathname();

  const checkLoginStatus = () => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    const interval = setInterval(checkLoginStatus, 500);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    // Hapus currentUser dari localStorage
    localStorage.removeItem("currentUser");
    
    // Update state
    setIsLoggedIn(false);
    setLogoutDialogOpen(false);
    
    // Redirect ke /admin
    router.push("/admin");
    
    // Reload halaman untuk memastikan semua state ter-reset
    window.location.reload();
  };

  const allMenuItems: MenuItem[] = [
    { icon: Home, label: 'Beranda', href: '/admin' },
    { icon: Users, label: 'Pengguna', href: '/admin/users' },
    { icon: FileText, label: 'Konten', href: '/admin/content' },
    { icon: Package, label: 'Produk', href: '/admin/products' },
    { icon: BarChart3, label: 'Laporan', href: '/admin/laporan' },
    { icon: Mail, label: 'Pesan', href: '/admin/pesan' },
    { icon: Package, label: 'Promo', href: '/admin/promo' },
    { icon: Settings, label: 'Pengaturan', href: '/admin/settings' },
  ];

  const menuItems = isLoggedIn ? allMenuItems : [allMenuItems[0]];

  return (
    <>
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
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                 isActive
                   ? 'bg-gradient-to-r from-green-500 to-green-700 text-white'
                   : 'text-gray-300 hover:bg-gray-800'

                }`}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          {isLoggedIn && (
            <div className="pt-4 mt-4 border-t border-gray-700">
              <Button
                variant="ghost"
                className="flex items-center gap-3 w-full text-gray-300 hover:bg-red-600 hover:text-white"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut size={20} />
                <span className="font-medium">Keluar</span>
              </Button>
            </div>
          )}
        </nav>
      </aside>

      {/* Dialog Logout */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Logout</DialogTitle>
          </DialogHeader>
          <p className="py-2 text-gray-700">Apakah Anda yakin ingin keluar dari akun?</p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleLogout}>Keluar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
