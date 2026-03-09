import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { rooms } from '../../data/rooms';

export default function NaraVillages() {
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
            Nara Villages
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            <p>
              Temukan kedamaian di Nara Villages, akomodasi ramah lingkungan yang memadukan arsitektur tradisional Indonesia dengan kenyamanan modern. Dikelilingi oleh keindahan alam pedesaan yang asri, setiap sudut dirancang untuk memberikan pengalaman menginap yang tak terlupakan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">Pilihan Kamar</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pilih tipe kamar yang sesuai dengan kebutuhan liburan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col group hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                  <Users size={16} className="text-orange-500" />
                  <span className="text-sm font-bold tracking-wide">{room.capacity}</span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-2xl font-serif font-medium leading-tight">{room.name}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  {room.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {room.facilities.map((facility, idx) => (
                    <span key={idx} className="text-xs font-medium px-3 py-1 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-full">
                      {facility}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-200 dark:border-zinc-800">
                  <span className="font-bold text-orange-600 dark:text-orange-400">{room.price}</span>
                  <Link 
                    to={`/services/nara-villages/${room.id}`}
                    className="flex items-center gap-2 text-sm font-medium hover:text-orange-500 transition-colors group/btn"
                  >
                    Detail & Pesan
                    <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
