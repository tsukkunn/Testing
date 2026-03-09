import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Agrowisata from './pages/services/Agrowisata';
import RestoCafe from './pages/services/RestoCafe';
import Venue from './pages/services/Venue';
import NaraVillages from './pages/services/NaraVillages';
import RoomDetail from './pages/services/RoomDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="relative text-gray-800 dark:text-[#e0e0e0] font-sans overflow-x-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-300 min-h-screen flex flex-col">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/agrowisata" element={<Agrowisata />} />
            <Route path="/services/resto-cafe" element={<RestoCafe />} />
            <Route path="/services/venue" element={<Venue />} />
            <Route path="/services/nara-villages" element={<NaraVillages />} />
            <Route path="/services/nara-villages/:roomId" element={<RoomDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
