"use client";
import { useState } from 'react';
import { Utensils, ShoppingBag, Truck, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Option {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay: string;
}

export default function WelcomePage() {
    const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: Option[] = [
    {
      id: 'dine-in',
      title: 'Makan di Tempat',
      subtitle: 'Nikmati suasana restaurant',
      icon: Utensils,
      color: 'from-orange-400 to-red-500',
      delay: 'delay-0'
    },
    {
      id: 'takeaway',
      title: 'Take Away',
      subtitle: 'Bawa pulang pesananmu',
      icon: ShoppingBag,
      color: 'from-blue-400 to-cyan-500',
      delay: 'delay-100'
    },
    {
      id: 'delivery',
      title: 'Delivery',
      subtitle: 'Diantar ke lokasimu',
      icon: Truck,
      color: 'from-green-400 to-emerald-500',
      delay: 'delay-200'
    },
    {
      id: 'other',
      title: 'Lainnya',
      subtitle: 'Opsi pemesanan lain',
      icon: MoreHorizontal,
      color: 'from-purple-400 to-pink-500',
      delay: 'delay-300'
    }
  ];

 const handleSelect = (id: string): void => {
    setSelectedOption(id);
    setTimeout(() => {
      const selectedOpt = options.find((opt: Option) => opt.id === id);
      if (selectedOpt) {
        if (id === "dine-in") {
          router.push("/scan")   // arahkan ke halaman /scan
        } else {
          alert(`Anda memilih: ${selectedOpt.title}`);
        }
      }
      setSelectedOption(null);
    }, 600);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce">🍕</div>
        <div className="absolute top-32 right-20 text-5xl opacity-10 animate-pulse">🍔</div>
        <div className="absolute bottom-20 left-32 text-7xl opacity-10 animate-[spin_20s_linear_infinite]">🍜</div>
        <div className="absolute bottom-40 right-10 text-6xl opacity-10 animate-bounce animation-delay-1000">🍰</div>
        <div className="absolute top-1/2 left-1/4 text-5xl opacity-10 animate-pulse animation-delay-2000">🍱</div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative z-10 animate-[slideUp_0.8s_ease-out_forwards]">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-[bounce_2s_ease-in-out_infinite]">🍽️</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Selamat Datang
          </h1>
          <p className="text-gray-600 text-lg">
            Pilih cara menikmati hidangan favorit Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {options.map((option: Option) => {
            const Icon = option.icon;
            const isSelected: boolean = selectedOption === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`
                  relative overflow-hidden rounded-2xl p-6 
                  bg-gradient-to-br ${option.color}
                  transform transition-all duration-300 ease-out
                  hover:scale-105 hover:shadow-xl active:scale-95
                  ${isSelected ? 'scale-95 shadow-inner' : 'shadow-lg'}
                  group
                  animate-[fadeInUp_0.6s_ease-out_forwards] ${option.delay}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700 ease-in-out"></div>
                
                <div className="relative z-10">
                  <Icon className="w-12 h-12 text-white mb-3 mx-auto transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 ease-out" />
                  <h3 className="text-white font-bold text-xl mb-1">
                    {option.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {option.subtitle}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            ✨ Pengalaman kuliner digital terbaik untuk Anda
          </p>
        </div>
      </div>
    </div>
  );
}