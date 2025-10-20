import { MenuItemWithImages, Category } from "@/types/menu"
import { UtensilsCrossed, Coffee, IceCream } from "lucide-react"

export const menuData: MenuItemWithImages[] = [
  {
    id: 1,
    name: "Espresso",
    description: "Kopi hitam pekat dengan rasa yang kuat",
    price: 18000,
    category: "Minuman",
    images: [
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop"
    ],
    // Enhanced features
    isPopular: true,
    isNew: false,
    availability: true,
    rating: 4.7,
    reviewCount: 89,
    spicyLevel: 0,
    dietary: ["halal", "vegan"],
    calories: 5,
    prepTime: "5 menit",
    options: {
      sizes: [
        { name: "Single Shot", price: 0 },
        { name: "Double Shot", price: 5000 }
      ],
      addOns: [
        { name: "Extra Shot", price: 8000 },
        { name: "Gula Aren", price: 3000 }
      ]
    }
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Espresso dengan susu dan foam lembut",
    price: 25000,
    category: "Minuman",
    images: [
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop"
    ],
    isPopular: true,
    isNew: false,
    availability: true,
    rating: 4.8,
    reviewCount: 156,
    spicyLevel: 0,
    dietary: ["halal", "vegetarian"],
    calories: 120,
    prepTime: "8 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 7000 }
      ],
      addOns: [
        { name: "Extra Shot", price: 8000 },
        { name: "Caramel Drizzle", price: 5000 },
        { name: "Whipped Cream", price: 5000 }
      ]
    }
  },
  {
    id: 3,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan ayam, udang, dan telur",
    price: 45000,
    category: "Makanan",
    images: [
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop"
    ],
    isPopular: true,
    isNew: false,
    availability: true,
    rating: 4.9,
    reviewCount: 234,
    spicyLevel: 2,
    dietary: ["halal"],
    calories: 650,
    prepTime: "15-20 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Jumbo", price: 15000 }
      ],
      addOns: [
        { name: "Extra Telur", price: 5000 },
        { name: "Extra Ayam", price: 10000 },
        { name: "Extra Udang", price: 12000 },
        { name: "Extra Keju", price: 8000 }
      ],
      freeOptions: [
        {
          label: "Level Pedas",
          options: ["Tidak Pedas", "Sedang", "Pedas", "Extra Pedas"]
        },
        {
          label: "Kerupuk",
          options: ["Tidak Pakai", "Pakai Kerupuk"]
        }
      ]
    }
  },
  {
    id: 4,
    name: "French Fries",
    description: "Kentang goreng renyah dengan pilihan saus",
    price: 20000,
    category: "Lainnya",
    images: [
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop"
    ],
    isPopular: false,
    isNew: false,
    availability: true,
    rating: 4.5,
    reviewCount: 78,
    spicyLevel: 0,
    dietary: ["halal", "vegan"],
    calories: 365,
    prepTime: "10 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 8000 }
      ],
      addOns: [
        { name: "Cheese Sauce", price: 5000 },
        { name: "BBQ Sauce", price: 3000 },
        { name: "Mayo", price: 3000 }
      ]
    }
  },
  {
    id: 5,
    name: "Caffe Latte",
    description: "Espresso dengan susu steamed yang creamy",
    price: 28000,
    category: "Minuman",
    images: [
      "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop"
    ],
    isPopular: true,
    isNew: false,
    availability: true,
    rating: 4.6,
    reviewCount: 142,
    spicyLevel: 0,
    dietary: ["halal", "vegetarian"],
    calories: 150,
    prepTime: "8 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 8000 }
      ],
      addOns: [
        { name: "Extra Shot", price: 8000 },
        { name: "Vanilla Syrup", price: 5000 },
        { name: "Hazelnut Syrup", price: 5000 },
        { name: "Oat Milk (pengganti)", price: 7000 }
      ]
    }
  },
  {
    id: 6,
    name: "Spaghetti Carbonara",
    description: "Pasta dengan saus creamy dan bacon crispy",
    price: 55000,
    category: "Makanan",
    images: [
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
    ],
    isPopular: false,
    isNew: true,
    availability: true,
    rating: 4.7,
    reviewCount: 67,
    spicyLevel: 0,
    dietary: ["halal"],
    calories: 580,
    prepTime: "18-22 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 15000 }
      ],
      addOns: [
        { name: "Extra Bacon", price: 12000 },
        { name: "Extra Cheese", price: 8000 },
        { name: "Garlic Bread", price: 10000 },
        { name: "Mushroom", price: 8000 }
      ]
    }
  },
  {
    id: 7,
    name: "Chicken Wings",
    description: "Sayap ayam crispy dengan saus pilihan",
    price: 38000,
    category: "Makanan",
    images: [
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop"
    ],
    isPopular: true,
    isNew: false,
    availability: true,
    rating: 4.8,
    reviewCount: 198,
    spicyLevel: 1,
    dietary: ["halal"],
    calories: 495,
    prepTime: "15-18 menit",
    options: {
      sizes: [
        { name: "6 pcs", price: 0 },
        { name: "12 pcs", price: 30000 }
      ],
      addOns: [
        { name: "BBQ Sauce", price: 5000 },
        { name: "Hot Sauce", price: 5000 },
        { name: "Honey Mustard", price: 5000 },
        { name: "Ranch Dip", price: 5000 }
      ]
    }
  },
  {
    id: 8,
    name: "Ice Cream Sundae",
    description: "Es krim vanilla dengan topping cokelat dan kacang",
    price: 32000,
    category: "Lainnya",
    images: [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop"
    ],
    isPopular: false,
    isNew: false,
    availability: true,
    rating: 4.6,
    reviewCount: 112,
    spicyLevel: 0,
    dietary: ["halal", "vegetarian"],
    calories: 280,
    prepTime: "5 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 10000 }
      ],
      addOns: [
        { name: "Extra Chocolate", price: 5000 },
        { name: "Extra Nuts", price: 5000 },
        { name: "Caramel Sauce", price: 5000 },
        { name: "Whipped Cream", price: 5000 }
      ]
    }
  },
  {
    id: 9,
    name: "Green Tea Latte",
    description: "Matcha premium dengan susu creamy",
    price: 30000,
    category: "Minuman",
    images: [
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=300&fit=crop"
    ],
    isPopular: false,
    isNew: true,
    availability: true,
    rating: 4.5,
    reviewCount: 45,
    spicyLevel: 0,
    dietary: ["halal", "vegetarian"],
    calories: 180,
    prepTime: "8 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 8000 }
      ],
      addOns: [
        { name: "Boba", price: 7000 },
        { name: "Extra Matcha", price: 8000 },
        { name: "Honey", price: 3000 }
      ]
    }
  },
  {
    id: 10,
    name: "Caesar Salad",
    description: "Salad segar dengan dressing caesar dan crouton",
    price: 42000,
    category: "Makanan",
    images: [
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
    ],
    isPopular: false,
    isNew: false,
    availability: true,
    rating: 4.4,
    reviewCount: 56,
    spicyLevel: 0,
    dietary: ["halal", "vegetarian"],
    calories: 320,
    prepTime: "10 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 12000 }
      ],
      addOns: [
        { name: "Grilled Chicken", price: 15000 },
        { name: "Extra Parmesan", price: 8000 },
        { name: "Avocado", price: 10000 }
      ]
    }
  },
  {
    id: 11,
    name: "Chocolate Milkshake",
    description: "Milkshake cokelat dengan whipped cream",
    price: 35000,
    category: "Minuman",
    images: [
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop"
    ],
    isPopular: true,
    isNew: false,
    availability: true,
    rating: 4.7,
    reviewCount: 134,
    spicyLevel: 0,
    dietary: ["halal", "vegetarian"],
    calories: 420,
    prepTime: "7 menit",
    options: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 10000 }
      ],
      addOns: [
        { name: "Extra Whipped Cream", price: 5000 },
        { name: "Oreo Crumble", price: 7000 },
        { name: "Chocolate Chips", price: 5000 }
      ]
    }
  },
  {
    id: 12,
    name: "Beef Burger",
    description: "Burger daging sapi dengan keju dan sayuran segar",
    price: 52000,
    category: "Makanan",
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop"
    ],
    isPopular: true,
    isNew: false,
    availability: false, // SOLD OUT contoh
    rating: 4.9,
    reviewCount: 287,
    spicyLevel: 1,
    dietary: ["halal"],
    calories: 720,
    prepTime: "20-25 menit",
    options: {
      sizes: [
        { name: "Single Patty", price: 0 },
        { name: "Double Patty", price: 25000 }
      ],
      addOns: [
        { name: "Extra Cheese", price: 8000 },
        { name: "Bacon", price: 12000 },
        { name: "Onion Rings", price: 10000 },
        { name: "Fries", price: 15000 }
      ]
    }
  }
]

export const categories: Category[] = [
  { name: "Semua", icon: UtensilsCrossed },
  { name: "Makanan", icon: UtensilsCrossed },
  { name: "Minuman", icon: Coffee },
  { name: "Lainnya", icon: IceCream },
]