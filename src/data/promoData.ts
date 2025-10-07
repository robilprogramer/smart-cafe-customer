// src/data/promoData.ts
import { Promo } from "@/components/admin/promo/types"

export const promoList: Promo[] = [
  {
    id: 1,
    judul: "Diskon Spesial Kopi",
    deskripsi: "Nikmati kopi favoritmu dengan potongan harga 30%.",
    diskon: "-30%",
    berlaku: "1 - 15 Oktober 2025",
    kode: "KOPI30"
  },
  {
    id: 2,
    judul: "Gratis Dessert",
    deskripsi: "Setiap pembelian minimal Rp100,000 dapat gratis dessert.",
    diskon: "-10%",
    berlaku: "5 - 20 Oktober 2025",
    kode: "SWEET100"
  },
  {
    id: 3,
    judul: "Paket Hemat Keluarga",
    deskripsi: "Pesan 3 menu utama, gratis 1 minuman spesial.",
    diskon: "-25%",
    berlaku: "1 - 31 Oktober 2025",
    kode: "FAMILY25"
  },
  {
    id: 4,
    judul: "Diskon Weekend",
    deskripsi: "Khusus Sabtu-Minggu, dapatkan diskon 20% untuk semua menu.",
    diskon: "-20%",
    berlaku: "4 - 26 Oktober 2025",
    kode: "WEEKEND20"
  },
  {
    id: 5,
    judul: "Promo Lunch Time",
    deskripsi: "Diskon 15% untuk pembelian pada jam makan siang 11:00-14:00.",
    diskon: "-15%",
    berlaku: "1 - 30 Oktober 2025",
    kode: "LUNCH15"
  },
  {
    id: 6,
    judul: "Buy 1 Get 1 Free",
    deskripsi: "Beli 1 minuman ukuran besar, gratis 1 minuman ukuran regular.",
    diskon: "-50%",
    berlaku: "10 - 25 Oktober 2025",
    kode: "BUY1GET1"
  }
]
