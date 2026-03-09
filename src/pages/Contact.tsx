import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Leaf, MapPin, Phone, Mail, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [subSubject, setSubSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.hash === '#booking-form') {
      const element = document.getElementById('booking-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  useGSAP(() => {
    gsap.utils.toArray('.reveal-text').forEach((text: any) => {
      gsap.from(text, {
        scrollTrigger: { trigger: text, start: "top 85%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out"
      });
    });
  }, { scope: mainRef });

  const subSubjectOptions: Record<string, string[]> = {
    'Agrowisata': ['Paket Edukasi', 'Petik Sayur', 'Kunjungan Sekolah', 'Lainnya'],
    'Resto & Cafe': ['Reservasi Meja', 'Informasi Menu', 'Lainnya'],
    'Venue': ['Pernikahan & Pertunangan', 'Corporate Gathering', 'Acara Keluarga', 'Kegiatan Sekolah', 'Lainnya'],
    'Nara Villages': ['Reservasi Kamar', 'Informasi Fasilitas', 'Lainnya'],
    'Lainnya': ['Pertanyaan Umum', 'Kerjasama']
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
    setSubSubject(''); // Reset sub-subject when subject changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !subject || !message) {
      alert('Mohon lengkapi Nama, Subjek, dan Pesan.');
      return;
    }

    const phoneNumber = "6282159012561";
    let waMessage = `Halo Nara Kupu Jogja,\n\nNama: ${name}\nSubjek: ${subject}`;
    
    if (subSubject) {
      waMessage += ` - ${subSubject}`;
    }
    
    waMessage += `\n\nPesan:\n${message}`;
    
    const encodedMessage = encodeURIComponent(waMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div ref={mainRef} className="pt-24 min-h-screen pb-32">
      {/* Header Section */}
      <section className="relative py-32 px-6 md:px-20 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="reveal-text flex items-center justify-center gap-3 text-orange-500 dark:text-orange-400 mb-6">
            <Leaf size={18} />
            <span className="text-sm tracking-widest uppercase font-medium">Hubungi Kami</span>
          </div>
          <h1 className="reveal-text text-5xl md:text-7xl font-serif mb-8 leading-tight text-black dark:text-white">
            Mari Terhubung
          </h1>
          <p className="reveal-text text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Punya pertanyaan atau ingin melakukan reservasi? Tim kami siap membantu Anda merencanakan kunjungan terbaik di Nara Kupu Jogja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="reveal-text">
              <h2 className="text-3xl font-serif text-black dark:text-white mb-8">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-orange-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-2">Alamat</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Jl. Kaliurang KM. 15, Ngemplak, Sleman<br />
                      Daerah Istimewa Yogyakarta 55584
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Phone className="text-orange-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-2">Telepon / WhatsApp</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      +62 821 5901 2561
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Mail className="text-orange-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-2">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      info@narakupujogja.com<br />
                      reservation@narakupujogja.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Clock className="text-orange-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-2">Jam Operasional</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Senin - Jumat: 08.00 - 17.00 WIB<br />
                      Sabtu - Minggu: 07.00 - 18.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="booking-form" className="reveal-text bg-gray-50 dark:bg-[#111] p-8 md:p-12 rounded-sm border border-black/5 dark:border-white/5 shadow-xl">
            <h2 className="text-3xl font-serif text-black dark:text-white mb-8">Pemesanan & Pertanyaan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Nama Lengkap</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3 text-black dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Layanan</label>
                  <select 
                    id="subject" 
                    value={subject}
                    onChange={handleSubjectChange}
                    className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3 text-black dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors appearance-none"
                    required
                  >
                    <option value="">Pilih Layanan</option>
                    <option value="Agrowisata">Agrowisata</option>
                    <option value="Resto & Cafe">Resto & Cafe</option>
                    <option value="Venue">Venue</option>
                    <option value="Nara Villages">Nara Villages</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subSubject" className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Kategori</label>
                  <select 
                    id="subSubject" 
                    value={subSubject}
                    onChange={(e) => setSubSubject(e.target.value)}
                    className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3 text-black dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors appearance-none disabled:opacity-50"
                    disabled={!subject}
                    required={!!subject}
                  >
                    <option value="">Pilih Kategori</option>
                    {subject && subSubjectOptions[subject]?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Pesan / Detail Reservasi</label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3 text-black dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors resize-none"
                  placeholder="Sebutkan tanggal, jumlah orang, atau pertanyaan Anda..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-orange-500 text-white px-8 py-4 text-xs tracking-widest uppercase rounded-sm hover:bg-orange-600 transition-colors font-medium shadow-lg"
              >
                Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="reveal-text px-6 md:px-20 max-w-7xl mx-auto mt-16">
        <div className="w-full h-[400px] bg-gray-200 dark:bg-[#111] rounded-sm overflow-hidden relative border border-black/5 dark:border-white/5">
          {/* Placeholder for actual Google Maps iframe */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <MapPin className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-sm tracking-widest uppercase">Peta Lokasi Nara Kupu Jogja</p>
          </div>
        </div>
      </section>
    </div>
  );
}
