import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#050505] pt-24 pb-8 border-t border-gray-200 dark:border-white/10 relative z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-12 lg:col-span-5 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-3 text-black dark:text-white mb-6 inline-flex">
              <img src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772952941/20260308_135416_jsggug.png" alt="Nara Kupu Jogja Logo" className="w-8 h-8 object-contain brightness-0 dark:invert transition-all duration-300" referrerPolicy="no-referrer" />
              <span className="font-serif text-sm tracking-[0.15em] font-bold">NARA KUPU JOGJA</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
              Destinasi wisata alam edukatif yang memadukan agrowisata, kuliner, dan akomodasi ramah lingkungan di Yogyakarta. Temukan kedamaian dan harmoni bersama alam.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/nara_kupu_jogja/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                <Instagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@narakupujogja" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </a>
              <a href="https://wa.me/6282159012561" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-3">
            <h3 className="text-black dark:text-white font-serif font-medium text-lg mb-6">Jelajahi</h3>
            <ul className="space-y-3">
              {[
                { name: 'Tentang Kami', path: '/about' },
                { name: 'Agrowisata', path: '/services/agrowisata' },
                { name: 'Resto & Cafe', path: '/services/resto-cafe' },
                { name: 'Venue', path: '/services/venue' },
                { name: 'Nara Villages', path: '/services/nara-villages' },
                { name: 'Galeri', path: '/gallery' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm transition-all inline-block hover:translate-x-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="text-black dark:text-white font-serif font-medium text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 bg-orange-100 dark:bg-orange-500/10 p-2 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed pt-1">
                  Jl. Kaliurang Km 15, Pakem, Sleman<br />
                  Daerah Istimewa Yogyakarta 55582
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="bg-orange-100 dark:bg-orange-500/10 p-2 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">+62 821 5901 2561</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="bg-orange-100 dark:bg-orange-500/10 p-2 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">info@narakupujogja.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Nara Kupu Jogja. All rights reserved. <br className="md:hidden" />
            <span className="md:ml-1">
              Design by <a href="https://fal.best" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Nsfall.</a>
            </span>
          </p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
