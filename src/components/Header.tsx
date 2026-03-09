import React, { useState } from 'react';
import { Leaf, Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean, setIsDarkMode: (val: boolean) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-black/30 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors duration-300">
        <Link to="/" className="flex items-center gap-2 md:gap-3 text-black dark:text-white">
          <img src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772952941/20260308_135416_jsggug.png" alt="Nara Kupu Jogja Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain brightness-0 dark:invert transition-all duration-300" referrerPolicy="no-referrer" />
          <span className="font-serif text-xs md:text-sm tracking-[0.15em] font-bold">NARA KUPU JOGJA</span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden md:flex gap-4 xl:gap-8 text-[10px] xl:text-xs tracking-[0.15em] uppercase text-black/70 dark:text-white/80">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">{link.name}</Link>
            ))}
          </div>
          
          {/* Light/Dark Mode Toggle Slider */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="relative w-10 h-5 md:w-12 md:h-6 rounded-full bg-gray-200 dark:bg-white/20 flex items-center px-1 transition-colors duration-300 shrink-0"
            aria-label="Toggle Dark Mode"
          >
            <div className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDarkMode ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`}>
              {isDarkMode ? <Moon size={10} className="text-black" /> : <Sun size={10} className="text-black" />}
            </div>
          </button>

          <Link 
            to="/contact#booking-form"
            className="hidden sm:block bg-black text-white dark:bg-white dark:text-black px-4 py-2 md:px-5 md:py-2 text-[10px] md:text-xs tracking-widest uppercase hover:bg-orange-500 dark:hover:bg-orange-400 hover:text-white dark:hover:text-white transition-colors rounded-sm font-medium shrink-0"
          >
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white dark:bg-[#0a0a0a] transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden overflow-y-auto`}>
        <div className="flex flex-col min-h-full pt-28 pb-12 px-8">
          
          {/* Section: Main Pages */}
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-6 font-bold">Navigasi Utama</p>
            <div className="flex flex-col gap-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Tentang Kami', path: '/about' },
                { name: 'Galeri', path: '/gallery' },
                { name: 'Kontak', path: '/contact' },
              ].map((link, idx) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-serif text-black dark:text-white hover:text-orange-500 transition-colors"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Section: Services */}
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-6 font-bold">Layanan Kami</p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'Agrowisata', path: '/services/agrowisata' },
                { name: 'Resto & Cafe', path: '/services/resto-cafe' },
                { name: 'Venue', path: '/services/venue' },
                { name: 'Nara Villages', path: '/services/nara-villages' },
              ].map((link, idx) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-3"
                  style={{ transitionDelay: `${(idx + 4) * 50}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Section: Contact Info */}
          <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5">
            <div className="space-y-4 mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Jl. Kaliurang Km 15, Pakem, Sleman<br />
                Yogyakarta 55582
              </p>
              <p className="text-sm font-bold text-black dark:text-white">+62 821 5901 2561</p>
            </div>
            
            <Link 
              to="/contact#booking-form"
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-orange-500 text-white py-4 rounded-sm tracking-widest uppercase text-sm font-bold shadow-lg mb-8 text-center block"
            >
              Book Now
            </Link>
            
            <div className="flex justify-center gap-8 text-gray-400 dark:text-gray-600">
              <a href="#" className="text-[10px] tracking-widest uppercase hover:text-orange-500 transition-colors">Instagram</a>
              <a href="#" className="text-[10px] tracking-widest uppercase hover:text-orange-500 transition-colors">Facebook</a>
              <a href="#" className="text-[10px] tracking-widest uppercase hover:text-orange-500 transition-colors">Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
