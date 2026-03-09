import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Leaf, ArrowRight, Sprout, Utensils, Calendar, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.reveal-item');
    items.forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: i * 0.1,
        ease: "power4.out"
      });
    });

    gsap.from('.hero-content > *', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: mainRef });

  const services = [
    { 
      title: "Agrowisata", 
      icon: <Sprout size={24} />,
      desc: "Edukasi pertanian modern dan tradisional. Rasakan sensasi memetik sayur organik langsung dari lahan subur kami.",
      features: ["Petik Sayur Mandiri", "Edukasi Hidroponik", "Tur Kebun Terpandu"],
      img: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772941036/file_00000000df687206ad778267be2268fa-1000604423_h7biws.png",
      link: "/services/agrowisata",
      color: "from-emerald-500/20 to-emerald-900/40",
      size: "large"
    },
    { 
      title: "Resto & Cafe", 
      icon: <Utensils size={24} />,
      desc: "Sajian kuliner 'Farm to Table' dengan bahan segar dari kebun sendiri. Nikmati kopi di tengah suasana asri.",
      features: ["Bahan Organik Segar", "Menu Khas Nusantara", "Suasana Outdoor"],
      img: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772941040/1000607371_1536_1024_plpnxs.png",
      link: "/services/resto-cafe",
      color: "from-orange-500/20 to-orange-900/40",
      size: "small"
    },
    { 
      title: "Venue", 
      icon: <Calendar size={24} />,
      desc: "Ruang terbuka hijau yang sempurna untuk pernikahan, gathering, atau workshop kreatif Anda.",
      features: ["Kapasitas Besar", "Fasilitas Lengkap", "Paket Kustom"],
      img: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772941028/file_00000000df687206ad778267be2268fa-image-26_yifnkw.png",
      link: "/services/venue",
      color: "from-blue-500/20 to-blue-900/40",
      size: "small"
    },
    { 
      title: "Nara Villages", 
      icon: <Home size={24} />,
      desc: "Penginapan eksklusif dengan sentuhan arsitektur nusantara. Tempat terbaik untuk 'healing' dari hiruk pikuk kota.",
      features: ["Villa Tradisional", "Pemandangan Alam", "Layanan Privat"],
      img: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772941036/1772940134-picsay_zq7pu7.png",
      link: "/services/nara-villages",
      color: "from-stone-500/20 to-stone-900/40",
      size: "large"
    }
  ];

  return (
    <div ref={mainRef} className="bg-white dark:bg-[#050505] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:px-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/50 dark:bg-orange-500/5 -skew-x-12 transform translate-x-1/4 -z-10"></div>
        <div className="max-w-7xl mx-auto hero-content">
          <div className="flex items-center gap-3 text-orange-500 dark:text-orange-400 mb-6">
            <Leaf size={20} className="animate-pulse" />
            <span className="text-sm tracking-[0.3em] uppercase font-bold">Our Ecosystem</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[0.9] text-black dark:text-white max-w-4xl">
            Harmoni Alam <br />
            <span className="italic text-orange-500">Dalam Pelayanan</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            Kami menghadirkan ekosistem wisata terpadu yang merayakan keasrian alam Yogyakarta melalui agrowisata, kuliner, dan akomodasi berkelanjutan.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="reveal-item group relative flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-xl">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-40 mix-blend-overlay`}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                
                {/* Floating Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { size: 18 })}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-orange-500 font-mono text-xs font-bold">0{idx + 1}</span>
                  <h3 className="text-2xl font-serif text-black dark:text-white">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <span key={fIdx} className="px-3 py-1 bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-gray-400 text-[10px] rounded-full border border-gray-200 dark:border-zinc-800">
                      {feature}
                    </span>
                  ))}
                </div>

                <Link 
                  to={service.link} 
                  className="mt-auto inline-flex items-center justify-between w-full px-5 py-3 rounded-full border border-gray-200 dark:border-zinc-700 text-black dark:text-white group/btn hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300"
                >
                  <span className="text-xs tracking-[0.15em] uppercase font-bold group-hover/btn:text-orange-500 transition-colors">
                    Explore
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center group-hover/btn:bg-orange-500 group-hover/btn:text-white transition-all duration-300">
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto bg-orange-500 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 relative z-10">
            Siap Menemukan <br /> Kedamaian Anda?
          </h2>
          <p className="text-orange-100 text-base mb-8 max-w-xl mx-auto relative z-10">
            Jadwalkan kunjungan Anda sekarang dan rasakan harmoni alam Yogyakarta di Nara Kupu Jogja.
          </p>
          <button 
            onClick={() => {
              const phoneNumber = "6282159012561";
              const message = `Halo Nara Kupu Jogja, saya ingin melakukan reservasi. Mohon informasi lebih lanjut.`;
              const encodedMessage = encodeURIComponent(message);
              window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
            }}
            className="bg-white text-orange-500 px-8 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-lg relative z-10"
          >
            Reservasi Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
