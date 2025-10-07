export interface Content {
  id: string;
  title: string;
  type: 'menu' | 'blog' | 'promo' | 'gallery';
  status: 'draft' | 'published' | 'archived';
  category: string;
  author: string;
  publishDate: string;
  thumbnail: string;
  views: number;
  description?: string;
  price?: number;
  images?: string[];
  videoUrl?: string;
  content?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}