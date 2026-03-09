import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ChevronLeft, ChevronRight, Download, Coffee, Utensils } from 'lucide-react';

const restoMenus = [
  {
    id: 1,
    name: "Ayam Bakar Madu Organik",
    price: "Rp 65.000",
    desc: "Ayam kampung pilihan dibakar dengan olesan madu murni dari peternakan lokal, disajikan dengan lalapan segar dari kebun kami.",
    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Nasi Goreng Spesial Nara",
    price: "Rp 45.000",
    desc: "Nasi goreng dengan bumbu rempah rahasia, disajikan dengan telur mata sapi, sate ayam, dan kerupuk udang renyah.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Gurame Asam Manis",
    price: "Rp 85.000",
    desc: "Ikan gurame segar hasil tangkapan kolam digoreng renyah dengan siraman saus asam manis nanas dan paprika.",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Sate Lilit Khas Jogja",
    price: "Rp 55.000",
    desc: "Daging sapi cincang yang dililitkan pada batang serai, dibakar sempurna dengan bumbu rempah istimewa.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Sup Iga Sapi Kuah Asam",
    price: "Rp 75.000",
    desc: "Iga sapi empuk dalam kuah kaldu sapi yang segar dengan sentuhan belimbing wuluh dan tomat hijau.",
    image: "https://images.unsplash.com/photo-1548943487-a2e4f43b4850?q=80&w=800&auto=format&fit=crop"
  }
];

const cafeMenus = [
  {
    id: 1,
    name: "Kopi Susu Gula Aren",
    price: "Rp 28.000",
    desc: "Perpaduan espresso house blend dengan susu segar dan manisnya gula aren asli yang legit.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Matcha Latte Premium",
    price: "Rp 35.000",
    desc: "Bubuk matcha asli Jepang diseduh dengan susu segar, memberikan rasa creamy dan earthy yang menenangkan.",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Nara Signature Mocktail",
    price: "Rp 32.000",
    desc: "Minuman penyegar dahaga dari campuran sirup markisa, perasan jeruk nipis, daun mint, dan air soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Pisang Goreng Keju Coklat",
    price: "Rp 25.000",
    desc: "Pisang kepok manis digoreng renyah dengan taburan keju parut melimpah dan saus coklat premium.",
    image: "https://images.unsplash.com/photo-1604423043492-4138ce6dc59b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Croissant Butter Flaky",
    price: "Rp 22.000",
    desc: "Pastry klasik Prancis yang renyah di luar dan lembut di dalam, disajikan hangat dari oven.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
  }
];

const MenuSlider = ({ menus }: { menus: typeof restoMenus }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {menus.map((menu) => (
          <div 
            key={menu.id} 
            className="snap-start shrink-0 w-[280px] md:w-[350px] bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={menu.image} 
                alt={menu.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3 gap-4">
                <h3 className="text-xl font-serif font-medium text-black dark:text-white leading-tight">{menu.name}</h3>
                <span className="text-orange-600 dark:text-orange-400 font-bold whitespace-nowrap">{menu.price}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                {menu.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 z-10"
        aria-label="Previous menu"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 z-10"
        aria-label="Next menu"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default function RestoCafe() {
  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-20 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-orange-500 dark:text-orange-400 mb-6"
          >
            <Leaf size={18} />
            <span className="text-sm tracking-widest uppercase font-medium">Layanan Kami</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mb-8 leading-tight"
          >
            Resto & Cafe
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Nikmati hidangan berkualitas berbahan segar dan lokal dengan nuansa kebun yang asri, dirancang untuk menghadirkan pengalaman bersantap yang istimewa.
          </motion.p>
        </div>
      </section>

      {/* Resto Section */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Utensils className="text-orange-500" size={24} />
              <h2 className="text-3xl md:text-5xl font-serif font-medium">Restoran Kami</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Menyajikan hidangan Nusantara otentik yang diolah dari bahan-bahan organik pilihan hasil panen kebun kami sendiri. Rasakan kelezatan alami dalam setiap suapan dengan suasana pedesaan yang menenangkan.
            </p>
          </div>
          <a 
            href="/Menu_Nara_Kupu_Jogja.pdf" 
            download="Menu_Nara_Kupu_Jogja.pdf"
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium text-sm hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-colors duration-300"
          >
            <Download size={18} />
            Download All Menu
          </a>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <MenuSlider menus={restoMenus} />
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="h-px w-full bg-gray-200 dark:bg-zinc-800"></div>
      </div>

      {/* Cafe Section */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto mb-20 relative">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Coffee className="text-orange-500" size={24} />
            <h2 className="text-3xl md:text-5xl font-serif font-medium">Cafe & Bersantai</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Tempat sempurna untuk melepas penat. Nikmati racikan kopi nusantara, minuman herbal segar, dan aneka kudapan manis sambil ditemani semilir angin dan pemandangan hijau yang memanjakan mata.
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <MenuSlider menus={cafeMenus} />
        </motion.div>
      </section>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
