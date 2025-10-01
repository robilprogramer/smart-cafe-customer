'use client';

import { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'lg:ml-64' : 'ml-0'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      
      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
}