import React from 'react';

export default function LaporanKategori() {
  const topProducts = [
    { name: 'Cappuccino', sold: 24, revenue: 'Rp 288K' },
    { name: 'Americano', sold: 19, revenue: 'Rp 228K' },
    { name: 'Latte', sold: 17, revenue: 'Rp 238K' },
    { name: 'Cheesecake', sold: 15, revenue: 'Rp 225K' },
    { name: 'Espresso', sold: 12, revenue: 'Rp 144K' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Penjualan per Kategori</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">☕ Minuman Kopi</span>
              <span className="font-bold text-gray-800">Rp 1,150K (40.1%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full" style={{ width: '40.1%' }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">78 item terjual</div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">🍰 Makanan & Dessert</span>
              <span className="font-bold text-gray-800">Rp 820K (28.6%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full" style={{ width: '28.6%' }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">52 item terjual</div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">🧃 Minuman Non-Kopi</span>
              <span className="font-bold text-gray-800">Rp 580K (20.2%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '20.2%' }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">38 item terjual</div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">🍪 Snack & Lainnya</span>
              <span className="font-bold text-gray-800">Rp 320K (11.1%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '11.1%' }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">14 item terjual</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Top 5 Produk Terlaris</h3>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.sold} terjual</div>
                </div>
              </div>
              <div className="font-bold text-green-600">{product.revenue}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}