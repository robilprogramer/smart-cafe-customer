"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Phone,
  ChefHat,
  Bell,
  CheckCircle,
  Package,
  Coffee,
  LucideIcon,
  MessageCircle,
  Send,
} from "lucide-react";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image: string;
}

interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  cafeName: string;
  items: OrderItem[];
  address: string;
  totalPrice: number;
  tax: number;
  orderTime: string;
  estimatedTime: string;
  orderDate: string;
  pickupType: string;
}

interface StatusStep {
  id: "confirmed" | "preparing" | "ready" | "completed";
  label: string;
  icon: LucideIcon;
  color: string;
  desc: string;
}

export default function CafeOrderMonitoring() {
  const [orderStatus, setOrderStatus] = useState<StatusStep["id"]>("confirmed");

  const [orderData] = useState<OrderData>({
    orderId: "CAFE-2024-0152",
    customerName: "Budi Santoso",
    phone: "081234567890",
    cafeName: "Kafe Nusantara",
    items: [
      { name: "Cappuccino", qty: 2, price: 32000, image: "☕" },
      { name: "Caffe Latte", qty: 1, price: 35000, image: "☕" },
      { name: "Croissant", qty: 2, price: 28000, image: "🥐" },
      { name: "Cheesecake", qty: 1, price: 35000, image: "🍰" },
    ],
    address: "Jl. Sudirman No. 45, Jakarta Pusat",
    totalPrice: 162000,
    tax: 16200,
    orderTime: "14:30",
    estimatedTime: "14:50",
    orderDate: "29 Sep 2024",
    pickupType: "Ambil di Tempat",
  });

  const statusSteps: StatusStep[] = [
    {
      id: "confirmed",
      label: "Pesanan Dikonfirmasi",
      icon: CheckCircle,
      color: "bg-green-500",
      desc: "Pesanan Anda telah diterima",
    },
    {
      id: "preparing",
      label: "Sedang Disiapkan",
      icon: ChefHat,
      color: "bg-green-400",
      desc: "Barista sedang membuat pesanan",
    },
    {
      id: "ready",
      label: "Siap Diambil",
      icon: Bell,
      color: "bg-green-600",
      desc: "Pesanan sudah siap!",
    },
    {
      id: "completed",
      label: "Selesai",
      icon: Package,
      color: "bg-green-700",
      desc: "Terima kasih atas pesanan Anda",
    },
  ];

  const getCurrentStepIndex = () =>
    statusSteps.findIndex((step) => step.id === orderStatus);

  const getCurrentStep = () =>
    statusSteps.find((step) => step.id === orderStatus);

  const totalAmount = orderData.totalPrice + orderData.tax;

  // 👉 Chat bot
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessages = [...chatMessages, `👤 ${chatInput}`];
    setChatMessages(newMessages);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        "🤖 Terima kasih, pesan Anda sudah kami terima!",
      ]);
    }, 1000);
  };

  // 👉 Status otomatis (berhenti di completed)
  useEffect(() => {
    if (orderStatus === "completed") return;

    const interval = setInterval(() => {
      setOrderStatus((prev) => {
        const currentIndex = statusSteps.findIndex((s) => s.id === prev);
        const nextIndex = currentIndex + 1;
        return statusSteps[nextIndex]?.id || prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [orderStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-2xl mx-auto pb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white p-6 rounded-b-3xl shadow-2xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Coffee className="w-6 h-6" />
                <h1 className="text-2xl font-bold">{orderData.cafeName}</h1>
              </div>
              <p className="text-green-100 text-sm">Status Pesanan Anda</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
              <p className="text-xs text-green-100">Order ID</p>
              <p className="font-bold text-sm">{orderData.orderId}</p>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-4">
          {/* Status Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-amber-100">
            <div className="text-center mb-6">
              <div
                className={`w-20 h-20 ${
                  getCurrentStep()?.color
                } rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse`}
              >
                {getCurrentStep()?.icon &&
                  React.createElement(getCurrentStep()!.icon, {
                    className: "w-10 h-10 text-white",
                  })}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {getCurrentStep()?.label}
              </h2>
              <p className="text-gray-600">{getCurrentStep()?.desc}</p>
            </div>

            {/* Progress Timeline */}
            <div className="relative mt-8 mb-6">
              <div className="absolute top-5 left-0 w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-700 rounded-full transition-all duration-700 ease-in-out"
                  style={{
                    width: `${
                      (getCurrentStepIndex() / (statusSteps.length - 1)) * 100
                    }%`,
                  }}
                />
              </div>

              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index <= getCurrentStepIndex();
                  const isCurrent = step.id === orderStatus;

                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center"
                      style={{ width: "25%" }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                          isActive ? step.color : "bg-gray-300"
                        } ${isCurrent ? "ring-4 ring-green-300 scale-125" : "scale-100"}`}
                      >
                        <StepIcon className="w-5 h-5 text-white" />
                      </div>
                      <p
                        className={`text-xs mt-3 text-center font-semibold transition-colors ${
                          isActive ? "text-gray-800" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detail Pesanan */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-amber-100">
            <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-amber-100">
              <h3 className="text-lg font-bold text-gray-800">Detail Pesanan</h3>
              <div className="bg-amber-100 px-3 py-1 rounded-full">
                <p className="text-xs font-semibold text-amber-700">
                  {orderData.orderDate}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {orderData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Jumlah: {item.qty}x
                    </p>
                  </div>
                  <p className="font-bold text-amber-600 text-lg">
                    Rp {(item.price * item.qty).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t-2 border-amber-100 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">
                  Rp {orderData.totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Pajak (10%)</span>
                <span className="font-semibold">
                  Rp {orderData.tax.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t">
                <span>Total</span>
                <span className="text-amber-600">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Info Pengambilan */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-amber-100">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-amber-600" />
              Informasi Pengambilan
            </h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
                <p className="text-sm text-gray-600 mb-1">Tipe Pesanan</p>
                <p className="font-bold text-gray-800 text-lg">
                  {orderData.pickupType}
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Lokasi Kafe</p>
                <p className="font-bold text-gray-800">{orderData.cafeName}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {orderData.address}
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Nama Pemesan</p>
                <p className="font-bold text-gray-800 mb-2">
                  {orderData.customerName}
                </p>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{orderData.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="space-y-3">
            <a
              href={`tel:${orderData.phone}`}
              className="block w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              📞 Hubungi Kafe
            </a>
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-full border-2 border-green-300 text-green-700 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Bantuan</span>
            </button>
          </div>

          {/* Tombol ke history muncul di bawah */}
          {orderStatus === "completed" && (
            <div className="mt-6">
              <a
                href="/history"
                className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all text-center"
              >
                📜 Lanjut ke History
              </a>
            </div>
          )}

          {/* Demo Control (hanya muncul kalau belum selesai) */}
          {orderStatus !== "completed" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-dashed border-green-300">
              <p className="text-sm text-gray-500 mb-4 text-center font-semibold">
                🎮 Demo: Ubah Status Pesanan
              </p>
              <div className="grid grid-cols-2 gap-3">
                {statusSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setOrderStatus(step.id)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                      orderStatus === step.id
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Chatbot */}
      <div className="fixed bottom-5 right-5">
        {!showChat && (
          <button
            onClick={() => setShowChat(true)}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {showChat && (
          <div className="w-80 h-96 bg-white rounded-xl shadow-2xl border border-green-200 flex flex-col">
            <div className="bg-green-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
              <p className="font-bold">🤖 Chat Bot</p>
              <button onClick={() => setShowChat(false)}>✖</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {chatMessages.length === 0 && (
                <p className="text-sm text-gray-500 text-center">
                  Halo! Ada yang bisa saya bantu?
                </p>
              )}
              {chatMessages.map((msg, idx) => (
                <p
                  key={idx}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    msg.startsWith("👤")
                      ? "bg-green-100 text-gray-800 self-end"
                      : "bg-green-500 text-white self-start"
                  }`}
                >
                  {msg}
                </p>
              ))}
            </div>
            <div className="p-2 border-t flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border border-green-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Tulis pesan..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
