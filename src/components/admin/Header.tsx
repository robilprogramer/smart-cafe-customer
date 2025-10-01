'use client';

import { Menu, X, Bell, Search } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-30 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
          
          {/* Notification */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-800">Admin User</p>
              <p className="text-gray-500 text-xs">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}