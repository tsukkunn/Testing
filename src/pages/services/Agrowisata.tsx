import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Agrowisata() {
  const packages = [
    {
      title: "Paket Personal / Keluarga",
      capacity: "< 10 Orang",
      description: "Cocok untuk keluarga kecil atau grup teman yang ingin menikmati suasana alam dan belajar pertanian organik secara intim.",
      features: [
        "Tur keliling kebun organik",
        "Edukasi pertanian dasar",
        "Sesi memetik sayur segar",
        "Welcome drink herbal"
      ],
      image: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg"
    },
    {
      title: "Paket Rombongan",
      capacity: "10 - 30 Orang",
      description: "Pilihan tepat untuk kunjungan sekolah, komunitas, atau acara kantor skala menengah dengan kegiatan interaktif.",
      features: [
        "Semua fasilitas Paket Personal",
        "Pemandu khusus (Guide)",
        "Praktek menanam bibit",
        "Makan siang ala pedesaan"
      ],
      image: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg"
    },
    {
      title: "Paket Custom",
      capacity: "Sesuai Kebutuhan",
      description: "Rancang sendiri pengalaman agrowisata Anda. Kami siap menyesuaikan kegiatan, fasilitas, dan jadwal sesuai keinginan grup Anda.",
      features: [
        "Konsultasi kegiatan eksklusif",
        "Fleksibilitas jumlah peserta",
        "Pilihan menu makan khusus",
        "Sesi workshop tambahan"
      ],
      image: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg"
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-black text-black dark:text-white">
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
            Agrowisata
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 space-y-6"
          >
            <p>
              Selamat datang di pengalaman Agrowisata Nara Kupu Jogja. Kami menawarkan pelarian sejenak dari hiruk-pikuk kota menuju ketenangan alam yang asri dan menyegarkan.
            </p>
            <p>
              Di sini, Anda tidak hanya menikmati pemandangan hijau yang menyejukkan mata, tetapi juga diajak untuk berinteraksi langsung dengan alam. Pelajari proses pertanian organik dari hulu ke hilir, rasakan sensasi memetik hasil bumi dengan tangan Anda sendiri, dan temukan kembali harmoni kehidupan pedesaan yang otentik dan menenangkan jiwa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collage Section */}
      <section className="px-6 md:px-20 max-w-7xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[500px]"
        >
          <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg" 
              alt="Agrowisata Nara Kupu Jogja" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-2 rounded-3xl overflow-hidden h-64 md:h-auto">
            <img 
              src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg" 
              alt="Kegiatan Pertanian" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-3xl overflow-hidden h-64 md:h-auto">
            <img 
              src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg" 
              alt="Sayuran Organik" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-3xl overflow-hidden h-64 md:h-auto">
            <img 
              src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg" 
              alt="Suasana Alam" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">Pilihan Paket Agrowisata</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pilih paket yang paling sesuai dengan kebutuhan kunjungan Anda. Kami menyediakan berbagai pilihan untuk pengalaman yang tak terlupakan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col group hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                  <Users size={16} className="text-orange-500" />
                  <span className="text-sm font-bold tracking-wide">{pkg.capacity}</span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-serif font-medium mb-4">{pkg.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 flex-grow leading-relaxed">
                  {pkg.description}
                </p>
                
                <div className="space-y-4 mb-10">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-orange-100 dark:bg-orange-900/30 p-1 rounded-full shrink-0">
                        <Check size={14} className="text-orange-600 dark:text-orange-400" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => {
                    const phoneNumber = "6282159012561";
                    const message = `Halo Nara Kupu Jogja, saya ingin memesan paket Agrowisata: ${pkg.title}. Mohon informasi lebih lanjut.`;
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                  }}
                  className="mt-auto w-full py-4 px-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-colors duration-300"
                >
                  Pesan Sekarang
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
