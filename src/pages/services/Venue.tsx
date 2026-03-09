import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Briefcase, Heart, GraduationCap, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';

export default function Venue() {
  const eventTypes = [
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: "Pernikahan & Pertunangan",
      desc: "Wujudkan momen sakral Anda di tengah keindahan alam yang romantis dan asri."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-orange-500" />,
      title: "Corporate Gathering",
      desc: "Fasilitas lengkap untuk meeting, team building, dan acara perusahaan lainnya."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Acara Keluarga",
      desc: "Rayakan ulang tahun, arisan, atau reuni keluarga dengan suasana hangat dan santai."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
      title: "Kegiatan Sekolah",
      desc: "Area luas yang aman dan edukatif untuk field trip atau perpisahan sekolah."
    }
  ];

  const venues = [
    {
      name: "Limasan Timur",
      capacity: "Sesuai Kebutuhan",
      type: "Semi-Outdoor",
      desc: "Ruang dengan suasana hangat dan tenang, cocok untuk makan bersama, gathering keluarga, atau pertemuan yang lebih intim. Nuansa tradisionalnya menciptakan momen kebersamaan yang nyaman dan berkesan.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
      features: ["Suasana Hangat", "Nuansa Tradisional", "Cocok untuk Intimate Event"]
    },
    {
      name: "Limasan Barat",
      capacity: "Sesuai Kebutuhan",
      type: "Semi-Outdoor",
      desc: "Area yang lebih luas dan dinamis, ideal untuk acara yang meriah seperti perayaan, pertunjukan, atau kegiatan yang membutuhkan panggung. Memberikan ruang yang fleksibel untuk acara yang lebih hidup dan semarak.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
      features: ["Area Luas", "Dinamis", "Fleksibel untuk Panggung"]
    },
    {
      name: "Limasan Timur & Limasan Barat",
      capacity: "Sesuai Kebutuhan",
      type: "Semi-Outdoor",
      desc: "Pilihan tepat untuk acara berskala lebih besar dengan memanfaatkan kedua area sekaligus. Cocok untuk gathering perusahaan, perayaan, wedding, atau event khusus yang membutuhkan ruang lebih luas dan fleksibel.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
      features: ["Area Maksimal", "Sangat Fleksibel", "Cocok untuk Event Besar"]
    }
  ];

  const handleInquiry = () => {
    const phoneNumber = "6282159012561";
    const message = `Halo Nara Kupu Jogja, saya ingin menanyakan informasi mengenai penyewaan Venue untuk acara. Mohon info paket dan ketersediaannya.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

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
            Venue
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            Jadikan momen berharga Anda lebih berkesan. Kami menyediakan berbagai pilihan venue yang menyatu dengan alam, didukung dengan fasilitas lengkap dan pelayanan profesional.
          </motion.p>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Sempurna Untuk Segala Acara</h2>
            <p className="text-gray-600 dark:text-gray-400">Dari acara intim hingga perayaan besar, kami siap memfasilitasinya.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="bg-orange-50 dark:bg-orange-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {event.icon}
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{event.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">Pilihan Venue</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Temukan ruang yang paling sesuai dengan konsep dan skala acara Anda.
          </p>
        </div>

        <div className="space-y-16">
          {venues.map((venue, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
            >
              <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src={venue.image} 
                  alt={venue.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-orange-500 mb-2">
                    <MapPin size={18} />
                    <span className="text-sm font-medium tracking-wider uppercase">{venue.type}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-medium mb-4">{venue.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {venue.desc}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-zinc-700">
                    <Users className="text-gray-500" size={20} />
                    <span className="font-medium">Kapasitas: {venue.capacity}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {venue.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-20 max-w-4xl mx-auto text-center mb-20">
        <div className="bg-orange-500 rounded-3xl p-10 md:p-16 text-white shadow-2xl shadow-orange-500/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <Leaf className="absolute -top-10 -left-10 w-40 h-40" />
            <Leaf className="absolute -bottom-10 -right-10 w-40 h-40" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-6 relative z-10">Rencanakan Acara Anda Bersama Kami</h2>
          <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Tim kami siap membantu mewujudkan acara impian Anda. Hubungi kami untuk mendiskusikan kebutuhan, paket, dan penawaran spesial.
          </p>
          <button 
            onClick={handleInquiry}
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg relative z-10"
          >
            <MessageCircle size={24} />
            Hubungi via WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}
