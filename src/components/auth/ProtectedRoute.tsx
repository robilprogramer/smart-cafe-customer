// components/auth/ProtectedRoute.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAccess = () => {
      const currentUser = localStorage.getItem("currentUser");
      
      if (!currentUser) {
        // Redirect ke halaman login
        router.replace('/admin');
        return;
      }
      
      // User terverifikasi
      setIsVerified(true);
      setIsChecking(false);
    };

    // Jalankan verifikasi
    verifyAccess();
  }, [router]);

  // Tampilkan loading saat checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  // Jika belum terverifikasi, tampilkan pesan akses ditolak
  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Akses Terbatas</h2>
          <p className="text-gray-600 mb-6">
            Silakan login terlebih dahulu untuk mengakses halaman ini
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  // Render children hanya jika sudah terverifikasi
  return <>{children}</>;
}