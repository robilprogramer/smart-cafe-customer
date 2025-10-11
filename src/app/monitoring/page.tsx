'use client'

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
  customerId: string;
  tableId: string;
  paymentMethod: string;
}

interface StatusStep {
  id: "confirmed" | "preparing" | "ready" | "completed";
  label: string;
  icon: any;
  color: string;
  desc: string;
}

// Emoji mapping untuk item
const getItemEmoji = (itemName: string): string => {
  const name = itemName.toLowerCase();
  if (name.includes("coffee") || name.includes("cappuccino") || name.includes("latte") || name.includes("espresso")) return "☕";
  if (name.includes("croissant") || name.includes("roti")) return "🥐";
  if (name.includes("cake") || name.includes("kue")) return "🍰";
  if (name.includes("sandwich")) return "🥪";
  if (name.includes("tea") || name.includes("teh")) return "🍵";
  if (name.includes("juice") || name.includes("jus")) return "🧃";
  if (name.includes("donut")) return "🍩";
  if (name.includes("cookie")) return "🍪";
  return "🍽️";
};

export default function CafeOrderMonitoring() {
  const [orderStatus, setOrderStatus] = useState<StatusStep["id"]>("confirmed");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);

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

  // Load data dari localStorage saat component mount
  useEffect(() => {
    const loadOrderData = () => {
      try {
        // Ambil data cart dari cart-storage (sama seperti di pembayaran)
        const cartStorage = window.localStorage.getItem("cart-storage");
        const cartItems = cartStorage ? JSON.parse(cartStorage) : [];
        
        // Ambil history untuk info customer
        const history = JSON.parse(window.localStorage.getItem("history") || "[]");
        
        if (cartItems.length === 0 && history.length === 0) {
          // Jika tidak ada data sama sekali
          setOrderData(null);
          setLoading(false);
          return;
        }

        // Jika ada cart items, gunakan cart sebagai sumber data pesanan
        let orderItems: OrderItem[] = [];
        
        if (cartItems.length > 0) {
          // Ambil dari cart (data terbaru)
          orderItems = cartItems.map((item: any) => ({
            name: item.name,
            qty: item.qty,
            price: item.price,
            image: getItemEmoji(item.name),
          }));
        } else if (history.length > 0) {
          // Fallback: ambil dari history jika cart kosong
          orderItems = history.reduce((acc: OrderItem[], item: any) => {
            const existing = acc.find((i: OrderItem) => i.name === item.name);
            if (existing) {
              existing.qty += item.qty;
            } else {
              acc.push({
                name: item.name,
                qty: item.qty,
                price: item.price,
                image: getItemEmoji(item.name),
              });
            }
            return acc;
          }, [] as OrderItem[]);
        }

        // Hitung total dari order items
        const subtotal = orderItems.reduce((sum: number, item: OrderItem) => sum + item.price * item.qty, 0);
        const tax = Math.round(subtotal * 0.1);

        // Ambil info customer dari history terakhir (jika ada)
        const lastOrder = history.length > 0 ? history[history.length - 1] : null;
        
        // Parse tanggal
        const now = new Date();
        const orderTime = now.toLocaleTimeString("id-ID", { 
          hour: "2-digit", 
          minute: "2-digit" 
        });
        const estimatedDateTime = new Date(now.getTime() + 20 * 60000);
        const estimatedTime = estimatedDateTime.toLocaleTimeString("id-ID", { 
          hour: "2-digit", 
          minute: "2-digit" 
        });
        const orderDate = now.toLocaleDateString("id-ID", { 
          day: "2-digit", 
          month: "short", 
          year: "numeric" 
        });

        setOrderData({
          orderId: lastOrder?.customerId?.replace("CUST", "ORD") || "ORD-" + Date.now().toString().slice(-5),
          customerName: lastOrder?.customerName || "Customer",
          phone: lastOrder?.customerPhone || lastOrder?.phone || "08xxxxxxxxxx",
          customerId: lastOrder?.customerId || "CUST-" + Date.now().toString().slice(-5),
          tableId: lastOrder?.tableId || "MEJA-08",
          cafeName: "Kafe Nusantara",
          items: orderItems,
          address: "Jl. Sudirman No. 45, Jakarta Pusat",
          totalPrice: subtotal,
          tax: tax,
          orderTime: orderTime,
          estimatedTime: estimatedTime,
          orderDate: orderDate,
          pickupType: "Ambil di Tempat",
          paymentMethod: lastOrder?.metode || "Sedang Memproses",
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading order data:", error);
        setOrderData(null);
        setLoading(false);
      }
    };

    loadOrderData();
    
    // Refresh data setiap 2 detik untuk sinkronisasi real-time
    const interval = setInterval(loadOrderData, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const getCurrentStepIndex = () =>
    statusSteps.findIndex((step) => step.id === orderStatus);

  const getCurrentStep = () =>
    statusSteps.find((step) => step.id === orderStatus);

  const totalAmount = orderData ? orderData.totalPrice + orderData.tax : 0;

  const handleSendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;
    
    const userMessage = chatInput.trim();
    setChatInput("");
    
    // Tambah pesan user
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatLoading(true);

    try {
      // Buat konteks pesanan untuk AI
      const orderContext = `
Konteks Pesanan Pelanggan:
- Order ID: ${orderData?.orderId}
- Customer: ${orderData?.customerName}
- Status Pesanan: ${getCurrentStep()?.label} - ${getCurrentStep()?.desc}
- Menu yang Dipesan: ${orderData?.items.map(item => `${item.name} (${item.qty}x @ Rp ${item.price.toLocaleString('id-ID')})`).join(', ')}
- Total Pembayaran: Rp ${totalAmount.toLocaleString('id-ID')} (termasuk pajak 10%)
- Metode Pembayaran: ${orderData?.paymentMethod}
- Waktu Pemesanan: ${orderData?.orderTime}
- Estimasi Siap: ${orderData?.estimatedTime}
- Tanggal: ${orderData?.orderDate}
- Lokasi Kafe: ${orderData?.cafeName}, ${orderData?.address}
- Nomor Telepon: ${orderData?.phone}
- Customer ID: ${orderData?.customerId}
- Nomor Meja: ${orderData?.tableId}
- Tipe Pesanan: ${orderData?.pickupType}

Instruksi: Anda adalah asisten virtual untuk Kafe Nusantara. Jawab pertanyaan pelanggan dengan ramah, informatif, dan gunakan emoji yang sesuai. Berikan informasi berdasarkan konteks pesanan di atas. Jika ditanya tentang fungsi/kemampuan, jelaskan bahwa Anda bisa membantu info status pesanan, menu, pembayaran, lokasi, waktu, dll.
`;

      // Panggil Google Gemini API (GRATIS!)
      const GEMINI_API_KEY = 'AIzaSyDChHFF_x3X56PZHQYM1GkU_rTXnhAj5jE'; // Ganti dengan API key Anda dari https://makersuite.google.com/app/apikey
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${orderContext}\n\nPertanyaan Pelanggan: ${userMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      const aiReply = data.candidates[0].content.parts[0].text;

      setChatMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Fallback ke response manual jika API gagal
      let fallbackReply = "";
      const userMessageLower = userMessage.toLowerCase();
      
      if (userMessageLower.includes("status")) {
        fallbackReply = `Status pesanan Anda: ${getCurrentStep()?.label}. ${getCurrentStep()?.desc} Estimasi siap: ${orderData?.estimatedTime}. ⏰`;
      } else if (userMessageLower.includes("total") || userMessageLower.includes("harga")) {
        fallbackReply = `Total pesanan: Rp ${totalAmount.toLocaleString('id-ID')} (sudah termasuk pajak 10%). Metode: ${orderData?.paymentMethod}. 💰`;
      } else if (userMessageLower.includes("menu") || userMessageLower.includes("pesan")) {
        fallbackReply = `Menu Anda: ${orderData?.items.map(item => `${item.name} (${item.qty}x)`).join(', ')}. 🍽️`;
      } else {
        fallbackReply = `Maaf, koneksi AI sedang bermasalah. Silakan hubungi kafe di ${orderData?.phone} untuk bantuan langsung. 📞`;
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: fallbackReply }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Status otomatis (berhenti di completed)
  useEffect(() => {
    if (orderStatus === "completed") return;

    const interval = setInterval(() => {
      setOrderStatus((prev) => {
        const currentIndex = statusSteps.findIndex((s) => s.id === prev);
        const nextIndex = currentIndex + 1;
        return statusSteps[nextIndex]?.id || prev;
      });
    }, 10000); // Ubah dari 5 detik ke 10 detik

    return () => clearInterval(interval);
  }, [orderStatus]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Coffee className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Memuat data pesanan...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl shadow-xl p-8 max-w-md">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Pesanan</h2>
          <p className="text-gray-600 mb-6">Silakan buat pesanan terlebih dahulu untuk melakukan monitoring</p>
          <a
            href="/menu"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
          >
            Buat Pesanan Baru
          </a>
        </div>
      </div>
    );
  }

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

            {/* Info Metode Pembayaran */}
            <div className="mt-4 pt-4 border-t border-amber-100">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-3 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Metode Pembayaran</p>
                <p className="font-bold text-green-700 text-lg">{orderData.paymentMethod}</p>
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Customer ID</p>
                    <p className="font-bold text-gray-800">{orderData.customerId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Meja</p>
                    <p className="font-bold text-gray-800">{orderData.tableId}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-green-200">
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

          {/* Tombol ke history muncul otomatis ketika completed */}
          {orderStatus === "completed" && (
            <div className="mt-4">
              <a
                href="/history"
                className="block w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all text-center"
              >
                📜 Lanjut ke History
              </a>
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
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 mb-2">
                    👋 Halo! Saya asisten virtual Kafe Nusantara.
                  </p>
                  <p className="text-xs text-gray-400">
                    Ada yang bisa saya bantu?
                  </p>
                </div>
              )}
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-2 border-t flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !chatLoading && handleSendMessage()}
                disabled={chatLoading}
                className="flex-1 border border-green-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
                placeholder={chatLoading ? "Menunggu balasan..." : "Tulis pesan..."}
              />
              <button
                onClick={handleSendMessage}
                disabled={chatLoading || !chatInput.trim()}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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