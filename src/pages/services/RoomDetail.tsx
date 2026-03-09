import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Check, Calendar, MessageCircle } from 'lucide-react';
import { rooms } from '../../data/rooms';

export default function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === roomId);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [roomId]);

  if (!room) {
    return (
      <div className="pt-32 min-h-screen text-center bg-white dark:bg-black text-black dark:text-white">
        <h1 className="text-3xl font-serif mb-4">Kamar tidak ditemukan</h1>
        <button onClick={() => navigate('/services/nara-villages')} className="text-orange-500 hover:underline">
          Kembali ke Nara Villages
        </button>
      </div>
    );
  }

  const handleBooking = () => {
    const phoneNumber = "6282159012561";
    let message = `Halo Nara Kupu Jogja, saya ingin melakukan reservasi untuk kamar *${room.name}*.`;
    
    if (checkIn && checkOut) {
      message += `\nRencana Menginap:\n- Check-in: ${checkIn}\n- Check-out: ${checkOut}`;
    }
    
    message += `\n\nMohon informasi ketersediaan dan detail lebih lanjut. Terima kasih.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-black text-black dark:text-white pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        
        {/* Back Navigation */}
        <Link 
          to="/services/nara-villages"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Pilihan Kamar</span>
        </Link>

        {/* Title & Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif mb-4"
            >
              {room.name}
            </motion.h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>Kapasitas: {room.capacity}</span>
              </div>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Mulai dari</p>
            <p className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">{room.price}</p>
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 h-[400px] md:h-[500px]"
        >
          <div className="md:col-span-2 rounded-2xl overflow-hidden h-full">
            <img 
              src={room.gallery[0]} 
              alt={`${room.name} Main`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="rounded-2xl overflow-hidden h-1/2">
              <img 
                src={room.gallery[1]} 
                alt={`${room.name} View 2`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-1/2">
              <img 
                src={room.gallery[2]} 
                alt={`${room.name} View 3`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>

        {/* Content & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-serif mb-4">Tentang Kamar Ini</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {room.fullDesc}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-6">Fasilitas Kamar</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                {room.facilities.map((facility, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-1.5 rounded-full text-orange-600 dark:text-orange-400">
                      <Check size={14} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{facility}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-gray-50 dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200 dark:border-zinc-800 shadow-lg">
              <h3 className="text-xl font-serif mb-6">Reservasi Kamar</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Calendar size={16} /> Check-in
                  </label>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Calendar size={16} /> Check-out
                  </label>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn} // Prevent checkout before checkin
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                  />
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/20"
              >
                <MessageCircle size={20} />
                Pesan via WhatsApp
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                Anda akan diarahkan ke WhatsApp untuk konfirmasi ketersediaan dan pembayaran.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
