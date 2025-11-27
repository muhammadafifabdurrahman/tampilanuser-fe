import { Utensils, Users, ShoppingBasket, DollarSign, Package, TrendingUp, Clock } from "lucide-react";

export default function DashboardKasir() {
  return (
    <div className="w-full">
      {/* --- HEADER --- */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Restoran</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Ringkasan aktivitas dapur & operasional restoran hari ini.</p>
      </header>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Menu */}
        <div className="p-5 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900/50">
              <Utensils className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">+3 Baru</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Menu</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">42</h3>
          </div>
        </div>

        {/* Card 2: Pelanggan */}
        <div className="p-5 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/50">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">+8%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pelanggan Hari Ini</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">128</h3>
          </div>
        </div>

        {/* Card 3: Pesanan */}
        <div className="p-5 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-full dark:bg-red-900/50">
              <ShoppingBasket className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">0%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pesanan Masuk</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">320</h3>
          </div>
        </div>

        {/* Card 4: Pendapatan */}
        <div className="p-5 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/50">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">+12%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pendapatan Bulan Ini</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Rp 74.2 Juta</h3>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID (Chart & Activity) --- */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Chart (Takes 2/3 width on large screens) */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm lg:col-span-2 rounded-xl dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
              <TrendingUp className="w-5 h-5 text-primary" />
              Grafik Penjualan
            </h2>
            <select className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Bulan Ini</option>
              <option>Minggu Ini</option>
              <option>Hari Ini</option>
            </select>
          </div>

          {/* Placeholder Grafik */}
          <div className="flex items-center justify-center h-64 border-2 border-gray-200 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <p className="italic text-gray-400 dark:text-gray-500">[Area Grafik Chart.js / Recharts]</p>
          </div>
        </div>

        {/* Right Column: Recent Activity (Takes 1/3 width) */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
          <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-900 dark:text-white">
            <Clock className="w-5 h-5 text-primary" />
            Aktivitas Terbaru
          </h2>

          <div className="relative ml-2 space-y-6 border-l border-gray-200 dark:border-gray-700">
            {/* Item 1 */}
            <div className="relative ml-6">
              <span className="absolute -left-[31px] flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-blue-900">
                <ShoppingBasket className="w-3 h-3 text-blue-800 dark:text-blue-300" />
              </span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pesanan Baru #ORD-009</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ayam Geprek Level 3 (2 porsi)</p>
              <span className="text-xs text-gray-400">5 menit yang lalu</span>
            </div>

            {/* Item 2 */}
            <div className="relative ml-6">
              <span className="absolute -left-[31px] flex items-center justify-center w-6 h-6 bg-red-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-red-900">
                <Package className="w-3 h-3 text-red-800 dark:text-red-300" />
              </span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Stok Menipis</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cabai Rawit sisa 500gr</p>
              <span className="text-xs text-gray-400">1 jam yang lalu</span>
            </div>

            {/* Item 3 */}
            <div className="relative ml-6">
              <span className="absolute -left-[31px] flex items-center justify-center w-6 h-6 bg-green-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-green-900">
                <Utensils className="w-3 h-3 text-green-800 dark:text-green-300" />
              </span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Menu Baru Aktif</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sate Maranggi ditambahkan</p>
              <span className="text-xs text-gray-400">2 jam yang lalu</span>
            </div>
          </div>

          <button className="w-full mt-6 text-sm font-medium transition-colors text-primary hover:text-yellow-600">Lihat Semua Aktivitas →</button>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="pt-6 mt-8 text-center border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 RasaLokal Admin System. All rights reserved.</p>
      </div>
    </div>
  );
}
