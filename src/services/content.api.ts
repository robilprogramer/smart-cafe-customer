import { ApiResponse, Content } from "@/types/content.types";

export class ContentAPI {
  private static mockData: Content[] = [
    {
      id: '1',
      title: 'Nasi Goreng Special',
      type: 'menu',
      status: 'published',
      category: 'Main Course',
      author: 'Admin',
      publishDate: '2025-10-01',
      thumbnail: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
      views: 1250,
      price: 45000,
      description: 'Nasi goreng spesial dengan telur mata sapi dan ayam'
    },
    {
      id: '2',
      title: '10 Tips Membuat Pasta Perfect',
      type: 'blog',
      status: 'published',
      category: 'Tips & Tricks',
      author: 'Chef John',
      publishDate: '2025-10-03',
      thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      views: 890,
      content: '<p>Pasta adalah makanan yang mudah dibuat...</p>'
    },
    {
      id: '3',
      title: 'Diskon 50% All Menu',
      type: 'promo',
      status: 'published',
      category: 'Flash Sale',
      author: 'Marketing',
      publishDate: '2025-10-05',
      thumbnail: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400',
      views: 2100
    },
    {
      id: '4',
      title: 'Behind The Scene Kitchen',
      type: 'gallery',
      status: 'draft',
      category: 'Documentary',
      author: 'Admin',
      publishDate: '2025-10-06',
      thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
      views: 0,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      images: [
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
        'https://images.unsplash.com/photo-1577219491135-ce391730fb4c?w=400'
      ]
    }
  ];

  static async getContents(filters?: { type?: string; status?: string; search?: string }): Promise<ApiResponse<Content[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...this.mockData];
        
        if (filters?.type && filters.type !== 'all') {
          filtered = filtered.filter(c => c.type === filters.type);
        }
        
        if (filters?.status && filters.status !== 'all') {
          filtered = filtered.filter(c => c.status === filters.status);
        }
        
        if (filters?.search) {
          const search = filters.search.toLowerCase();
          filtered = filtered.filter(c => 
            c.title.toLowerCase().includes(search) ||
            c.category.toLowerCase().includes(search)
          );
        }
        
        resolve({
          data: filtered,
          message: 'Success',
          status: 200
        });
      }, 500);
    });
  }

  static async createContent(content: Omit<Content, 'id' | 'views'>): Promise<ApiResponse<Content>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newContent: Content = {
          ...content,
          id: Date.now().toString(),
          views: 0
        };
        this.mockData.push(newContent);
        resolve({
          data: newContent,
          message: 'Content created successfully',
          status: 201
        });
      }, 500);
    });
  }

  static async deleteContent(id: string): Promise<ApiResponse<null>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockData = this.mockData.filter(c => c.id !== id);
        resolve({
          data: null,
          message: 'Content deleted successfully',
          status: 200
        });
      }, 300);
    });
  }

  static async updateStatus(id: string, status: Content['status']): Promise<ApiResponse<Content>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const content = this.mockData.find(c => c.id === id);
        if (content) {
          content.status = status;
          resolve({
            data: content,
            message: 'Status updated successfully',
            status: 200
          });
        }
      }, 300);
    });
  }
}
