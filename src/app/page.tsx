'use client';
import React, { useState } from 'react';
import { ShoppingCart, Search, Plus, Minus, X, Store, Package, MapPin, Coffee, Pizza, IceCream, Utensils, QrCode } from 'lucide-react';

// ============= TYPES =============
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  popular?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

type OrderType = 'dine-in' | 'takeaway' | 'delivery';

// ============= DATA =============
const menuData: MenuItem[] = [
  { id: '1', name: 'Espresso', description: 'Kopi hitam pekat dengan rasa yang kuat', price: 18000, category: 'coffee', image: '☕', available: true, popular: true },
  { id: '2', name: 'Cappuccino', description: 'Espresso dengan susu dan foam yang lembut', price: 25000, category: 'coffee', image: '☕', available: true, popular: true },
  { id: '3', name: 'Caffe Latte', description: 'Espresso dengan susu hangat', price: 28000, category: 'coffee', image: '☕', available: true },
  { id: '4', name: 'Mocha', description: 'Espresso dengan cokelat dan susu', price: 30000, category: 'coffee', image: '☕', available: true },
  { id: '5', name: 'Americano', description: 'Espresso dengan air panas', price: 20000, category: 'coffee', image: '☕', available: true },
  { id: '6', name: 'Croissant', description: 'Pastry mentega berlapis yang renyah', price: 22000, category: 'food', image: '🥐', available: true, popular: true },
  { id: '7', name: 'Club Sandwich', description: 'Sandwich tiga lapis dengan ayam dan sayuran', price: 45000, category: 'food', image: '🥪', available: true },
  { id: '8', name: 'Caesar Salad', description: 'Salad segar dengan dressing caesar', price: 38000, category: 'food', image: '🥗', available: true },
  { id: '9', name: 'Spaghetti Carbonara', description: 'Pasta dengan saus krim dan keju', price: 52000, category: 'food', image: '🍝', available: true, popular: true },
  { id: '10', name: 'French Fries', description: 'Kentang goreng renyah dengan saus', price: 25000, category: 'food', image: '🍟', available: true },
  { id: '11', name: 'Ice Cream Sundae', description: 'Es krim vanilla dengan topping cokelat', price: 32000, category: 'dessert', image: '🍨', available: true },
  { id: '12', name: 'Chocolate Cake', description: 'Kue cokelat lembut dengan ganache', price: 35000, category: 'dessert', image: '🍰', available: true, popular: true },
  { id: '13', name: 'Tiramisu', description: 'Dessert Italia dengan kopi dan mascarpone', price: 42000, category: 'dessert', image: '🍰', available: true },
  { id: '14', name: 'Cheesecake', description: 'Kue keju dengan strawberry sauce', price: 38000, category: 'dessert', image: '🍰', available: true },
  { id: '15', name: 'Orange Juice', description: 'Jus jeruk segar tanpa gula tambahan', price: 20000, category: 'drinks', image: '🍊', available: true },
  { id: '16', name: 'Iced Tea', description: 'Teh manis dingin yang menyegarkan', price: 15000, category: 'drinks', image: '🧋', available: true },
  { id: '17', name: 'Lemon Tea', description: 'Teh dengan perasan lemon segar', price: 18000, category: 'drinks', image: '🍋', available: true },
  { id: '18', name: 'Mineral Water', description: 'Air mineral dingin', price: 10000, category: 'drinks', image: '💧', available: true }
];

const categories = [
  { id: 'all', name: 'Semua', icon: Utensils },
  { id: 'coffee', name: 'Kopi', icon: Coffee },
  { id: 'food', name: 'Makanan', icon: Pizza },
  { id: 'dessert', name: 'Dessert', icon: IceCream },
  { id: 'drinks', name: 'Minuman', icon: Coffee }
];

// ============= UTILS =============
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// ============= QR SCANNER COMPONENT =============
const QRScanner = ({ onScanSuccess, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [manualInput, setManualInput] = useState('');

  const startScanning = () => {
    setIsScanning(true);
    // Simulate scan
    setTimeout(() => {
      const mockTable = 'A' + Math.floor(Math.random() * 20 + 1);
      handleScanSuccess(mockTable);
    }, 2000);
  };

  const handleScanSuccess = (tableNumber: string) => {
    setScanResult(tableNumber);
    setTimeout(() => onScanSuccess(tableNumber), 1500);
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      handleScanSuccess(manualInput.toUpperCase());
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Scan QR Code Meja</h2>
          <button onClick={onClose} className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {scanResult ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Scan Berhasil!</h3>
              <p className="text-gray-600 mb-1">Nomor Meja</p>
              <p className="text-4xl font-bold text-amber-600">{scanResult}</p>
              <div className="mt-6">
                <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Memuat menu...</p>
              </div>
            </div>
          ) : isScanning ? (
            <div className="text-center py-8">
              <div className="relative w-64 h-64 mx-auto mb-6 bg-gray-900 rounded-2xl flex items-center justify-center">
                <QrCode className="w-32 h-32 text-amber-500 animate-pulse" />
              </div>
              <p className="text-gray-700 font-medium mb-2">Sedang memindai...</p>
              <button onClick={() => setIsScanning(false)} className="mt-4 px-6 py-2 bg-gray-200 rounded-lg">
                Batal
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={startScanning}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-xl font-bold mb-6 flex items-center justify-center gap-2"
              >
                <QrCode className="w-6 h-6" />
                Mulai Scan QR Code
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">atau</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Nomor Meja Manual
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: A1, B5, 10"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleManualSubmit}
                    disabled={!manualInput.trim()}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300"
                  >
                    OK
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  💡 QR Code biasanya ada di atas meja atau di kartu menu
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============= MAIN APP =============
export default function SmartCafeApp() {
  const [showScanner, setShowScanner] = useState(true);
  const [tableNumber, setTableNumber] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('dine-in');

  const handleScanSuccess = (table: string) => {
    setTableNumber(table);
    setShowScanner(false);
  };

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getTotalPrice = () => getSubtotal() * 1.1;
  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  // Show scanner first
  if (showScanner) {
    return <QRScanner onScanSuccess={handleScanSuccess} onClose={() => setShowScanner(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-amber-500 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-white">☕ Smart Cafe</h1>
              <p className="text-sm text-amber-100">Meja: {tableNumber}</p>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-white text-amber-600 p-3 rounded-full hover:scale-105 transition-all shadow-md"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Order Type Selector */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setOrderType('dine-in')}
              className={`py-3 rounded-lg text-sm font-medium transition-all ${
                orderType === 'dine-in' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Store className="w-5 h-5 mx-auto mb-1" />
              <span className="block text-xs">Dine In</span>
            </button>
            <button
              onClick={() => setOrderType('takeaway')}
              className={`py-3 rounded-lg text-sm font-medium transition-all ${
                orderType === 'takeaway' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Package className="w-5 h-5 mx-auto mb-1" />
              <span className="block text-xs">Takeaway</span>
            </button>
            <button
              onClick={() => setOrderType('delivery')}
              className={`py-3 rounded-lg text-sm font-medium transition-all ${
                orderType === 'delivery' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <MapPin className="w-5 h-5 mx-auto mb-1" />
              <span className="block text-xs">Delivery</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="overflow-x-auto pb-3 mb-4">
          <div className="flex gap-2 min-w-max">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                <cat.icon className="w-4 h-4 inline mr-1.5" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-5xl">{item.image}</div>
                  {item.popular && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                      🔥 Populer
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Harga</p>
                    <p className="text-xl font-bold text-amber-600">{formatCurrency(item.price)}</p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-3 rounded-xl hover:scale-110 transition-all shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">Tidak ada menu yang ditemukan</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowCart(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold">Keranjang Belanja</h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Keranjang masih kosong</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm text-amber-800">
                      <span className="font-semibold">📍 Meja {tableNumber}</span> • {orderType === 'dine-in' ? 'Dine In' : orderType === 'takeaway' ? 'Takeaway' : 'Delivery'}
                    </p>
                  </div>

                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{item.image}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-600">{formatCurrency(item.price)} / item</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1.5 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-md bg-amber-600 hover:bg-amber-700 flex items-center justify-center"
                              >
                                <Plus className="w-3.5 h-3.5 text-white" />
                              </button>
                            </div>
                            <span className="font-bold text-amber-600 text-sm">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 border-t-2 pt-4 sticky bottom-0 bg-white">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">{formatCurrency(getSubtotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pajak (10%)</span>
                        <span className="font-semibold">{formatCurrency(getSubtotal() * 0.1)}</span>
                      </div>
                      <div className="h-px bg-gray-200 my-2"></div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-amber-600">{formatCurrency(getTotalPrice())}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-600 transition-all shadow-lg">
                      Pesan Sekarang
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {getTotalItems() > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-amber-200 shadow-2xl z-30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total ({getTotalItems()} item)</p>
                <p className="text-xl font-bold text-amber-600">{formatCurrency(getTotalPrice())}</p>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
              >
                Lihat Keranjang
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}