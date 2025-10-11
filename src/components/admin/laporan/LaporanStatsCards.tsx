import React from 'react';
import { TrendingUp, Users, Package } from 'lucide-react';

interface StatsCardsProps {
  totalRevenue: string;
  totalCustomers: number;
  totalItems: number;
}

export default function LaporanStatsCards({ 
  totalRevenue = 'Rp 2870K', 
  totalCustomers = 149, 
  totalItems = 182 
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-green-100">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">Total Pendapatan</span>
        </div>
        <div className="text-4xl font-bold">{totalRevenue}</div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-green-100">
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">Total Pelanggan</span>
        </div>
        <div className="text-4xl font-bold">{totalCustomers}</div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-green-100">
          <Package className="w-5 h-5" />
          <span className="text-sm font-medium">Total Item</span>
        </div>
        <div className="text-4xl font-bold">{totalItems}</div>
      </div>
    </div>
  );
}