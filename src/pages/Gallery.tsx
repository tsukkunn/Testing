import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ZoomIn, X, Instagram, ExternalLink } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const placeholderImg = "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg";

  const galleryItems = [
    { id: 1, title: "Keindahan Alam", category: "Pemandangan" },
    { id: 2, title: "Panen Sayur", category: "Agrowisata" },
    { id: 3, title: "Suasana Resto", category: "Kuliner" },
    { id: 4, title: "Kegiatan Edukasi", category: "Edukasi" },
    { id: 5, title: "Acara Keluarga", category: "Venue" },
    { id: 6, title: "Villa Tradisional", category: "Akomodasi" },
    { id: 7, title: "Spot Foto", category: "Fasilitas" },
    { id: 8, title: "Kebersamaan", category: "Event" },
    { id: 9, title: "Panen Sayur", category: "Agrowisata" },
    { id: 10, title: "Suasana Resto", category: "Kuliner" },
    { id: 11, title: "Senja di Kebun", category: "Pemandangan" },
    { id: 12, title: "Makan Malam", category: "Kuliner" },
  ];

  const row1 = galleryItems.slice(0, 6);
  const row2 = galleryItems.slice(6, 12);

  return (
    <div className="pt-24 min-h-screen pb-20 bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-500 overflow-hidden">
      <section className="relative py-20 px-6 md:px-20 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-orange-500 dark:text-orange-400 mb-6"
          >
            <Leaf size={18} />
            <span className="text-sm tracking-widest uppercase font-medium">Galeri</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mb-8 leading-tight"
          >
            Momen di Nara Kupu
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Kumpulan momen indah, kebersamaan, dan keindahan alam yang terekam di kawasan agroeduwisata Nara Kupu Jogja.
          </motion.p>
        </div>
      </section>

      {/* Infinite Looping Gallery */}
      <div className="relative w-full flex flex-col gap-8 py-10">
        {/* Row 1 - Moving Left */}
        <div className="flex overflow-hidden whitespace-nowrap w-full">
          <motion.div
            className="flex gap-6 px-3 w-max"
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...row1, ...row1].map((item, idx) => (
              <motion.div
                key={`row1-${item.id}-${idx}`}
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4 + (idx % 3), 
                  ease: "easeInOut",
                  delay: idx * 0.2
                }}
                className="relative group w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden cursor-pointer shrink-0 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-shadow duration-300"
                onClick={() => setSelectedImage(item.id)}
              >
                <img 
                  src={placeholderImg} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 whitespace-normal">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-2 block">{item.category}</span>
                    <h3 className="text-white text-2xl font-serif">{item.title}</h3>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <ZoomIn size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moving Right */}
        <div className="flex overflow-hidden whitespace-nowrap w-full">
          <motion.div
            className="flex gap-6 px-3 w-max"
            animate={{ x: ["-50%", 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
          >
            {[...row2, ...row2].map((item, idx) => (
              <motion.div
                key={`row2-${item.id}-${idx}`}
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5 + (idx % 3), 
                  ease: "easeInOut",
                  delay: idx * 0.3
                }}
                className="relative group w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden cursor-pointer shrink-0 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-shadow duration-300"
                onClick={() => setSelectedImage(item.id)}
              >
                <img 
                  src={placeholderImg} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 whitespace-normal">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-2 block">{item.category}</span>
                    <h3 className="text-white text-2xl font-serif">{item.title}</h3>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <ZoomIn size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Instagram Box */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => window.open('https://instagram.com/narakupujogja', '_blank')}
          className="relative group rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row bg-white dark:bg-zinc-900/80 backdrop-blur-sm hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2"
        >
          <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <Instagram size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-4 text-black dark:text-white">See more on Instagram</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
              Temukan lebih banyak momen indah, update terbaru, dan inspirasi liburan di Instagram resmi kami. Jangan lewatkan penawaran spesial!
            </p>
            <div className="inline-flex items-center gap-3 text-orange-500 font-bold uppercase tracking-widest text-sm group-hover:text-orange-600 transition-colors">
              Kunjungi Instagram <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
          <div className="md:w-1/2 relative h-72 md:h-auto overflow-hidden">
            <img src={placeholderImg} alt="Instagram Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-zinc-900/80 to-transparent md:w-1/2 hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900/80 to-transparent md:hidden h-1/2 top-0"></div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={placeholderImg} 
                alt="Enlarged gallery image" 
                className="max-w-full max-h-[80vh] object-contain" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white text-2xl font-serif mb-1">
                  {galleryItems.find(i => i.id === selectedImage)?.title}
                </h3>
                <p className="text-orange-400 text-sm font-medium tracking-wider uppercase">
                  {galleryItems.find(i => i.id === selectedImage)?.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
