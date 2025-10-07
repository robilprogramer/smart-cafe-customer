export interface Promo {
  id: number;
  judul: string;
  deskripsi: string;
  diskon: string;
  berlaku: string;
  kode: string;
}

export interface PromoFormData {
  judul: string;
  deskripsi: string;
  diskon: string;
  berlaku: string;
  kode: string;
}

export interface PromoState {
  promos: Promo[];
  selectedPromo: Promo | null;
  showForm: boolean;
  loading: boolean;
  error: string | null;
}
