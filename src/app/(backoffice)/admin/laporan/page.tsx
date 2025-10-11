"use client";

import React, { useState, useMemo } from "react";
import {
  Download,
  Home,
  Users,
  FileText,
  Package,
  BarChart3,
  Mail,
  Gift,
  Settings,
  Menu,
  X,
  Search,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import LaporanStatsCards from "@/components/admin/laporan/LaporanStatsCards";
import LaporanOverview from "@/components/admin/laporan/LaporanOverview";
import LaporanPembayaran from "@/components/admin/laporan/LaporanPembayaran";
import LaporanKategori from "@/components/admin/laporan/LaporanKategori";
import LaporanDetail from "@/components/admin/laporan/LaporanDetail";

export default function LaporanPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("bulan");

  // Data dummy trend
  const allTrendData: { [key: string]: { month: string; value: number }[] } = {
    hari: [
      { month: "Sen", value: 45000 },
      { month: "Sel", value: 52000 },
      { month: "Rab", value: 48000 },
      { month: "Kam", value: 61000 },
      { month: "Jum", value: 75000 },
      { month: "Sab", value: 89000 },
      { month: "Min", value: 82000 },
    ],
    minggu: [
      { month: "Minggu 1", value: 280000 },
      { month: "Minggu 2", value: 350000 },
      { month: "Minggu 3", value: 420000 },
      { month: "Minggu 4", value: 380000 },
    ],
    bulan: [
      { month: "Jan", value: 280000 },
      { month: "Feb", value: 350000 },
      { month: "Mar", value: 450000 },
      { month: "Apr", value: 320000 },
      { month: "May", value: 520000 },
      { month: "Jun", value: 410000 },
      { month: "Jul", value: 380000 },
      { month: "Aug", value: 420000 },
      { month: "Sep", value: 580000 },
    ],
    tahun: [
      { month: "2020", value: 2800000 },
      { month: "2021", value: 3500000 },
      { month: "2022", value: 4200000 },
      { month: "2023", value: 5100000 },
      { month: "2024", value: 5800000 },
    ],
  };

  const trendData = allTrendData[dateFilter] || allTrendData.bulan;

  // Filter dummy
  const filteredStats = useMemo(() => {
    if (!searchQuery) {
      return {
        totalRevenue: "Rp 2870K",
        totalCustomers: 149,
        totalItems: 182,
      };
    }

    const query = searchQuery.toLowerCase();
    if (query.includes("revenue") || query.includes("pendapatan")) {
      return {
        totalRevenue: "Rp 2870K",
        totalCustomers: 0,
        totalItems: 0,
      };
    }

    return {
      totalRevenue: "Rp 2870K",
      totalCustomers: 149,
      totalItems: 182,
    };
  }, [searchQuery]);

  const handleExport = (type: string) => {
    const currentDate = new Date().toLocaleDateString("id-ID");

    if (type === "PDF") {
      window.print();
    } else if (type === "Excel") {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Laporan Penjualan Smart Cafe\n";
      csvContent += `Tanggal: ${currentDate}\n\n`;
      csvContent += "Total Pendapatan,Rp 2870K\n";
      csvContent += "Total Pelanggan,149\n";
      csvContent += "Total Item,182\n\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `laporan_${currentDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (type === "Word") {
      const content = document.querySelector(".p-6")?.innerHTML || "";
      const blob = new Blob(
        [
          `<html><head><meta charset="utf-8"><title>Laporan Smart Cafe</title></head><body>${content}</body></html>`,
        ],
        { type: "application/msword" }
      );

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `laporan_${currentDate}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-6 flex-1 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Laporan & Analitik
              </h2>
              <p className="text-sm text-gray-500">
                Dashboard penjualan Smart Cafe
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleExport("PDF")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
              <button
                onClick={() => handleExport("Excel")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Excel
              </button>
              <button
                onClick={() => handleExport("Word")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Word
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari laporan berdasarkan periode, kategori, atau metrik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <LaporanStatsCards
            totalRevenue={filteredStats.totalRevenue}
            totalCustomers={filteredStats.totalCustomers}
            totalItems={filteredStats.totalItems}
          />

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-2 flex gap-2">
            {[
              ["overview", "📊 Overview"],
              ["pembayaran", "💳 Pembayaran"],
              ["kategori", "🍔 Kategori"],
              ["detail", "📋 Detail"],
            ].map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === tab
                    ? "bg-green-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Filter Periode */}
          {activeTab === "overview" && (
            <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Filter Periode</h3>
                <div className="flex gap-2">
                  {["hari", "minggu", "bulan", "tahun"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setDateFilter(f)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        dateFilter === f
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Konten Tab */}
          {activeTab === "overview" && <LaporanOverview trendData={trendData} />}
          {activeTab === "pembayaran" && <LaporanPembayaran />}
          {activeTab === "kategori" && <LaporanKategori />}
          {activeTab === "detail" && <LaporanDetail />}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
