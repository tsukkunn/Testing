import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Star, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingTextBackground from '../components/FloatingTextBackground';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const WalkingDeer = () => {
  const deerRef = useRef<HTMLDivElement>(null);
  const deerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!deerRef.current || !deerInnerRef.current) return;
    
    let currentWalkable: Element | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight;
    let deerX = targetX;
    let deerY = targetY;
    
    let isPacing = false;
    let pacingDirection = 1;
    let idleTimer: any;
    let isFalling = false;
    let isTeleporting = false;
    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    const isElementVisible = (el: Element) => {
      const style = window.getComputedStyle(el);
      return parseFloat(style.opacity) > 0.1;
    };

    const getClosestWalkable = (mouseX: number, mouseY: number) => {
      const walkables = Array.from(document.querySelectorAll('.walkable'));
      let closest: Element | null = null;
      let minDistance = Infinity;
      
      for (const w of walkables) {
        if (!isElementVisible(w)) continue;
        const rect = w.getBoundingClientRect();
        if (rect.top < 150 || rect.top > window.innerHeight - 50) continue;
        
        const dx = Math.max(rect.left - mouseX, 0, mouseX - rect.right);
        const dy = Math.max(rect.top - mouseY, 0, mouseY - rect.bottom);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < minDistance) {
          minDistance = distance;
          closest = w;
        }
      }
      return closest;
    };

    const findWalkableBelow = (x: number, y: number) => {
      const walkables = Array.from(document.querySelectorAll('.walkable'));
      let nearest: Element | null = null;
      let minTop = Infinity;
      
      for (const w of walkables) {
        if (!isElementVisible(w)) continue;
        const rect = w.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && rect.top >= y) {
          if (rect.top < minTop) {
            minTop = rect.top;
            nearest = w;
          }
        }
      }
      return nearest;
    };

    const updateTarget = (mouseX: number, mouseY: number) => {
      if (isFalling || isTeleporting) return;
      
      const elements = document.elementsFromPoint(mouseX, mouseY);
      let walkable = elements.find(el => el.classList.contains('walkable') && isElementVisible(el));
      
      if (!walkable) {
        walkable = getClosestWalkable(mouseX, mouseY) || undefined;
      }
      
      if (walkable) {
        const rect = walkable.getBoundingClientRect();
        let newTargetY = rect.top;
        
        if (currentWalkable !== walkable) {
          currentWalkable = walkable;
          
          // Jump animation
          gsap.killTweensOf(deerInnerRef.current);
          
          // Jump arc
          gsap.fromTo(deerInnerRef.current, 
            { y: 0 },
            {
              y: -60,
              yoyo: true,
              repeat: 1,
              duration: 0.25,
              ease: "sine.out"
            }
          );
        }
        
        targetY = newTargetY;
        // Constrain X
        const margin = Math.min(30, rect.width / 2);
        targetX = Math.max(rect.left + margin, Math.min(mouseX, rect.right - margin));
      }
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      lastMouseX = clientX;
      lastMouseY = clientY;
      if (isFalling || isTeleporting) return;
      if (clientY < 80) return; // Prevent movement if in header
      isPacing = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isPacing = true;
      }, 2000);
      
      updateTarget(clientX, clientY);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) return;

      const clickX = e.clientX;
      const clickY = e.clientY;

      isTeleporting = true;
      isPacing = false;
      clearTimeout(idleTimer);

      gsap.killTweensOf(deerRef.current);
      gsap.killTweensOf(deerInnerRef.current);
      
      gsap.to(deerInnerRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        onComplete: () => {
          deerX = clickX;
          deerY = clickY;
          gsap.set(deerRef.current, { x: deerX, y: deerY });
          gsap.set(deerInnerRef.current, { y: 0 });
          
          gsap.to(deerInnerRef.current, { opacity: 1, scale: 1, duration: 0.2 });

          const elements = document.elementsFromPoint(clickX, clickY);
          const clickedWalkable = elements.find(el => el.classList.contains('walkable') && isElementVisible(el));

          if (clickedWalkable) {
            currentWalkable = clickedWalkable;
            const rect = clickedWalkable.getBoundingClientRect();
            let newTargetY = rect.top;
            targetY = newTargetY;
            targetX = clickX;
            deerY = targetY;
            isFalling = false;
            isTeleporting = false;
            idleTimer = setTimeout(() => { isPacing = true; }, 2000);
          } else {
            isFalling = true;
            currentWalkable = null;
            const walkableBelow = findWalkableBelow(clickX, clickY);
            
            let fallTargetY = window.innerHeight + 100;
            if (walkableBelow) {
              const rect = walkableBelow.getBoundingClientRect();
              let newTargetY = rect.top;
              fallTargetY = newTargetY;
              currentWalkable = walkableBelow;
              targetX = clickX;
            }

            targetY = fallTargetY;
            
            const fallDuration = Math.min(1.5, Math.abs(fallTargetY - clickY) / 500);
            
            gsap.to(deerRef.current, {
              y: fallTargetY,
              duration: fallDuration,
              ease: "bounce.out",
              onUpdate: () => {
                deerY = gsap.getProperty(deerRef.current, "y") as number;
              },
              onComplete: () => {
                isFalling = false;
                isTeleporting = false;
                idleTimer = setTimeout(() => { isPacing = true; }, 2000);
                if (!currentWalkable) {
                  targetX = window.innerWidth / 2;
                  targetY = window.innerHeight + 100;
                }
              }
            });
          }
        }
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick);
    idleTimer = setTimeout(() => { isPacing = true; }, 2000);

    const tickerFn = () => {
      // Visibility logic
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.8;
      const isBelowHeader = deerY >= 120;
      
      if (deerRef.current) {
        if (scrolledPastHero && isBelowHeader) {
          deerRef.current.style.opacity = '1';
        } else {
          deerRef.current.style.opacity = '0';
        }
      }

      if (isFalling || isTeleporting) return;

      if (currentWalkable) {
        const rect = currentWalkable.getBoundingClientRect();
        
        // Find new walkable if current is off-screen (too high or too low) or invisible
        if (rect.top < 150 || rect.top > window.innerHeight - 50 || !isElementVisible(currentWalkable)) {
           const closest = getClosestWalkable(lastMouseX, lastMouseY);
           if (closest) {
             if (currentWalkable !== closest) {
               currentWalkable = closest;
               let newTargetY = closest.getBoundingClientRect().top;
               targetY = newTargetY;
               const margin = Math.min(30, closest.getBoundingClientRect().width / 2);
               targetX = Math.max(closest.getBoundingClientRect().left + margin, Math.min(lastMouseX, closest.getBoundingClientRect().right - margin));
               
               gsap.killTweensOf(deerInnerRef.current);
               gsap.fromTo(deerInnerRef.current, 
                 { y: 0 },
                 { y: -60, yoyo: true, repeat: 1, duration: 0.25, ease: "sine.out" }
               );
               
             } else {
               let newTargetY = closest.getBoundingClientRect().top;
               targetY = newTargetY;
             }
           } else {
             let newTargetY = rect.top;
             targetY = newTargetY;
           }
        } else {
           let newTargetY = rect.top;
           targetY = newTargetY;
          
          if (isPacing) {
            targetX += pacingDirection * 1.5;
            const margin = Math.min(30, rect.width / 2);
            const minX = rect.left + margin;
            const maxX = rect.right - margin;
            
            if (targetX > maxX) {
              targetX = maxX;
              pacingDirection = -1;
            }
            if (targetX < minX) {
              targetX = minX;
              pacingDirection = 1;
            }
          }
        }
      }

      deerX += (targetX - deerX) * 0.1;
      
      if (!isFalling && !isTeleporting) {
        deerY += (targetY - deerY) * 0.2;
        if (Math.abs(targetY - deerY) < 1) deerY = targetY;
        gsap.set(deerRef.current, { y: deerY });
      }

      let facingRight = false;
      if (isPacing) {
        facingRight = pacingDirection === 1;
      } else {
        if (Math.abs(targetX - deerX) > 1) {
          facingRight = (targetX - deerX) > 0;
        }
      }
      
      gsap.set(deerRef.current, {
        x: deerX,
        scaleX: facingRight ? 1 : -1,
      });

      // Update CSS variables for spotlight
      document.documentElement.style.setProperty('--deer-x', `${deerX}px`);
      document.documentElement.style.setProperty('--deer-y', `${deerY}px`);

      // Update animation state
      if (deerInnerRef.current) {
        const dx = targetX - deerX;
        const speed = Math.abs(dx) * 0.1;
        const isJumping = gsap.isTweening(deerInnerRef.current);
        
        if (isJumping) {
          deerInnerRef.current.dataset.state = 'jumping';
        } else if (speed > 0.5) {
          deerInnerRef.current.dataset.state = speed > 3 ? 'running' : 'walking';
        } else {
          deerInnerRef.current.dataset.state = 'idle';
        }

        let headAngle = 0;
        if (isPacing) {
          const time = Date.now() / 1000;
          headAngle = Math.sin(time * 2) * 15;
        } else {
          const headX = deerX;
          const headY = deerY - 80;
          const cursorDx = lastMouseX - headX;
          const cursorDy = lastMouseY - headY;
          
          const effectiveDx = facingRight ? cursorDx : -cursorDx;
          
          if (effectiveDx > 0) {
            headAngle = Math.atan2(cursorDy, effectiveDx) * (180 / Math.PI);
            headAngle = Math.max(-40, Math.min(40, headAngle));
          }
        }

        const headGroup = deerInnerRef.current.querySelector('.head-group') as HTMLElement;
        if (headGroup) {
          headGroup.style.transform = `rotate(${headAngle}deg)`;
        }
      }
    };

    gsap.ticker.add(tickerFn);

    setTimeout(() => {
      const walkables = document.querySelectorAll('.walkable');
      if (walkables.length > 0) {
        currentWalkable = walkables[0];
        const rect = currentWalkable.getBoundingClientRect();
        let newTargetY = rect.top;
        targetY = newTargetY;
        targetX = rect.left + rect.width / 2;
        deerX = targetX;
        deerY = targetY;
        gsap.set(deerRef.current, { x: deerX, y: deerY });
      }
    }, 500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('click', onClick);
      gsap.ticker.remove(tickerFn);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div 
      ref={deerRef}
      className="fixed left-0 top-0 z-40 pointer-events-none transition-opacity duration-700 opacity-0"
      style={{ width: '60px', height: '60px', marginLeft: '-30px', marginTop: '-60px' }}
    >
      <div ref={deerInnerRef} className="w-full h-full drop-shadow-lg" data-state="idle">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            <style>{`
              .leg { transition: transform 0.2s; }
              .back-leg-far { transform-origin: 65px 120px; }
              .front-leg-far { transform-origin: 135px 120px; }
              .back-leg-near { transform-origin: 65px 120px; }
              .front-leg-near { transform-origin: 135px 120px; }
              
              @keyframes walk-front-1 {
                0%, 100% { transform: rotate(-25deg); }
                50% { transform: rotate(25deg); }
              }
              @keyframes walk-front-2 {
                0%, 100% { transform: rotate(25deg); }
                50% { transform: rotate(-25deg); }
              }
              @keyframes walk-back-1 {
                0%, 100% { transform: rotate(25deg); }
                50% { transform: rotate(-25deg); }
              }
              @keyframes walk-back-2 {
                0%, 100% { transform: rotate(-25deg); }
                50% { transform: rotate(25deg); }
              }

              [data-state="walking"] .front-leg-near { animation: walk-front-1 0.6s infinite linear; }
              [data-state="walking"] .front-leg-far { animation: walk-front-2 0.6s infinite linear; }
              [data-state="walking"] .back-leg-near { animation: walk-back-1 0.6s infinite linear; }
              [data-state="walking"] .back-leg-far { animation: walk-back-2 0.6s infinite linear; }

              [data-state="running"] .front-leg-near { animation: walk-front-1 0.25s infinite linear; }
              [data-state="running"] .front-leg-far { animation: walk-front-2 0.25s infinite linear; }
              [data-state="running"] .back-leg-near { animation: walk-back-1 0.25s infinite linear; }
              [data-state="running"] .back-leg-far { animation: walk-back-2 0.25s infinite linear; }

              [data-state="jumping"] .front-leg-near, [data-state="jumping"] .front-leg-far { transform: rotate(-45deg); }
              [data-state="jumping"] .back-leg-near, [data-state="jumping"] .back-leg-far { transform: rotate(45deg); }
              
              .head-group {
                transform-origin: 140px 100px;
                transition: transform 0.1s ease-out;
              }
              
              @keyframes breathe {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(1.03); }
              }
              [data-state="idle"] .deer-body { animation: breathe 2.5s infinite ease-in-out; transform-origin: 100px 120px; }
            `}</style>
          </defs>
          
          <g className="leg back-leg-far">
            <path d="M 60 120 L 50 160 L 55 200 L 65 200 L 60 160 L 75 120 Z" fill="#B35D32"/>
            <path d="M 55 190 L 65 190 L 65 200 L 55 200 Z" fill="#4A3B32"/>
          </g>
          <g className="leg front-leg-far">
            <path d="M 130 120 L 125 160 L 130 200 L 140 200 L 135 160 L 145 120 Z" fill="#B35D32"/>
            <path d="M 130 190 L 140 190 L 140 200 L 130 200 Z" fill="#4A3B32"/>
          </g>
          
          <g className="deer-body">
            <path d="M 45 100 C 45 70, 140 70, 150 110 C 150 140, 70 145, 45 120 Z" fill="#D97742"/>
            <path d="M 60 135 C 90 145, 130 135, 145 115 C 140 135, 90 140, 60 135 Z" fill="#F2D3AB"/>
            <path d="M 45 100 C 30 90, 20 95, 35 115 Z" fill="#D97742"/>
            <path d="M 35 95 C 25 90, 20 95, 30 105 Z" fill="#F2D3AB"/>
            <circle cx="65" cy="95" r="4" fill="#F2D3AB" opacity="0.8"/>
            <circle cx="85" cy="90" r="5" fill="#F2D3AB" opacity="0.8"/>
            <circle cx="105" cy="92" r="4" fill="#F2D3AB" opacity="0.8"/>
            <circle cx="125" cy="98" r="3" fill="#F2D3AB" opacity="0.8"/>
          </g>
          
          <g className="leg back-leg-near">
            <path d="M 60 120 L 50 160 L 55 200 L 65 200 L 60 160 L 75 120 Z" fill="#D97742"/>
            <path d="M 55 190 L 65 190 L 65 200 L 55 200 Z" fill="#4A3B32"/>
          </g>
          <g className="leg front-leg-near">
            <path d="M 130 120 L 125 160 L 130 200 L 140 200 L 135 160 L 145 120 Z" fill="#D97742"/>
            <path d="M 130 190 L 140 190 L 140 200 L 130 200 Z" fill="#4A3B32"/>
          </g>
          
          <g className="head-group">
            <path d="M 130 110 L 160 50 L 180 60 L 150 120 Z" fill="#D97742"/>
            <path d="M 155 55 C 150 40, 175 35, 195 45 C 205 50, 205 60, 190 65 C 175 70, 160 65, 155 55 Z" fill="#D97742"/>
            <circle cx="200" cy="55" r="4" fill="#4A3B32"/>
            <circle cx="175" cy="50" r="3" fill="#4A3B32"/>
            <path d="M 200 60 Q 190 65 185 60" stroke="#4A3B32" strokeWidth="1.5" fill="none"/>
            <path d="M 165 45 C 155 30, 145 35, 160 50 Z" fill="#B35D32"/>
            <path d="M 160 50 C 145 35, 135 45, 155 55 Z" fill="#D97742"/>
            <path d="M 165 40 Q 160 10 185 0 M 170 25 Q 185 15 195 5 M 165 15 Q 150 5 145 -5" stroke="#8C6D58" strokeWidth="4" strokeLinecap="round" fill="none"/>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [reviews, setReviews] = useState([
    {
      id: "rev-0",
      name: "Budi Santoso",
      comment: "Tempatnya asri banget, cocok buat healing bareng keluarga. Sayurannya segar-segar dan edukasinya sangat bermanfaat!",
      date: "2 minggu yang lalu"
    },
    {
      id: "rev-1",
      name: "Siti Aminah",
      comment: "Edukasi agrowisatanya bagus banget buat anak-anak. Rusa-rusanya juga jinak dan area kebunnya sangat tertata rapi.",
      date: "1 bulan yang lalu"
    },
    {
      id: "rev-2",
      name: "Andi Wijaya",
      comment: "Restonya nyaman, makanannya enak dan sehat karena dari kebun sendiri. Suasananya tenang, pas buat yang mau menjauh dari kota.",
      date: "3 bulan yang lalu"
    },
    {
      id: "rev-3",
      name: "Dewi Lestari",
      comment: "Suasananya sangat tenang, pelayanan ramah. Sangat direkomendasikan untuk keluarga.",
      date: "4 bulan yang lalu"
    },
    {
      id: "rev-4",
      name: "Rizky Pratama",
      comment: "Tempat terbaik untuk belajar hidroponik. Hasil panennya segar-segar!",
      date: "5 bulan yang lalu"
    }
  ]);

  // Fetch reviews from Google Places API (if key is available)
  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        const apiKey = (import.meta as any).env.VITE_GOOGLE_PLACES_API_KEY;
        const placeId = 'ChIJ6yYhCwbZei4RTEFkHxJBWGc'; // Place ID Nara Kupu Jogja
        
        if (!apiKey) {
          console.log("Catatan: API Key Google Places tidak ditemukan. Menggunakan ulasan bawaan.");
          return;
        }

        // Peringatan: Pemanggilan ini idealnya dilakukan di backend untuk menghindari CORS.
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=id`);
        const data = await response.json();
        
        if (data.result && data.result.reviews) {
          const formattedReviews = data.result.reviews
            .filter((r: any) => r.rating === 5) // Hanya ambil bintang 5
            .map((r: any, index: number) => ({
              id: `google-${index}`,
              name: r.author_name,
              comment: r.text,
              date: r.relative_time_description
            }));
            
          if (formattedReviews.length >= 2) {
            setReviews(formattedReviews);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil ulasan dari Google Maps:", error);
      }
    };

    fetchGoogleReviews();
  }, []);

  const [visibleIndices, setVisibleIndices] = useState([0, 1]);

  useEffect(() => {
    if (reviews.length <= 2) {
      setVisibleIndices([0, reviews.length === 2 ? 1 : 0]);
      return;
    }

    const interval = setInterval(() => {
      setVisibleIndices(prev => {
        let nextIdx = Math.floor(Math.random() * reviews.length);
        while (prev.includes(nextIdx)) {
          nextIdx = Math.floor(Math.random() * reviews.length);
        }
        return [prev[1], nextIdx];
      });
    }, 4000); // Berganti setiap 4 detik

    return () => clearInterval(interval);
  }, [reviews]);

  useGSAP(() => {
    // Simple entrance animation for hero content since it's no longer pinned
    gsap.from(heroContentRef.current, {
      autoAlpha: 0,
      y: 30,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5
    });

    gsap.from(scrollIndicatorRef.current, {
      opacity: 0,
      duration: 1,
      delay: 1.5
    });

    // Content Reveal for other sections
    gsap.utils.toArray('.reveal-text').forEach((text: any) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="relative min-h-screen">
      {/* Floating Text Background (Only visible near deer) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle 350px at var(--deer-x, 50vw) var(--deer-y, 50vh), black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 350px at var(--deer-x, 50vw) var(--deer-y, 50vh), black 0%, transparent 100%)'
        }}
      >
        <FloatingTextBackground />
        <div className="absolute inset-0 bg-[url('https://unsplash.com/photos/a-close-up-of-a-watermelon-rind-against-a-dark-background-rO8X_U6oGWM')] bg-cover bg-center bg-fixed opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-300" />
      </div>

      {/* Hero Section with Video */}
      <section ref={heroRef} className="relative z-10 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
        >
          <source src="https://res.cloudinary.com/dchitlxsf/video/upload/v1772339370/grok_video_2026-03-01-10-19-29_2_jgfi2s.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay to blend smoothly with the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white dark:to-[#0a0a0a] transition-colors duration-300"></div>

        {/* New Hero Content (Revealed on Scroll) */}
        <div ref={heroContentRef} className="relative z-10 text-center flex flex-col items-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-wider text-white drop-shadow-2xl mb-6">
            NARA KUPU JOGJA
          </h1>
          <h2 className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-10 drop-shadow-md">
            Destinasi berbasis alam dengan layanan agrowisata, resto & cafe, serta fasilitas event dan corporate gathering di Yogyakarta.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => {
                const phoneNumber = "6282159012561";
                const message = `Halo Nara Kupu Jogja, saya ingin melakukan reservasi kunjungan. Mohon informasi lebih lanjut.`;
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
              }}
              className="px-8 py-4 bg-orange-500 text-white text-xs tracking-widest uppercase rounded-2xl hover:bg-orange-600 transition-colors shadow-lg font-medium"
            >
              Reservasi Kunjungan
            </button>
            <button className="px-8 py-4 bg-black/30 backdrop-blur-md text-white border border-white/30 text-xs tracking-widest uppercase rounded-2xl hover:bg-white/10 transition-colors shadow-lg font-medium">
              Eksplor Agrowisata
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3">Scroll to explore</p>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </section>

      {/* Intro Section (Yogyakarta, Indonesia) */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="walkable reveal-text flex items-center gap-3 text-orange-500 dark:text-orange-400 mb-6">
              <MapPin size={18} />
              <span className="text-sm tracking-widest uppercase font-medium">Yogyakarta, Indonesia</span>
            </div>
            <h2 className="walkable reveal-text text-4xl md:text-6xl font-serif mb-8 leading-tight text-black dark:text-white">
              About Us
            </h2>
            <p className="walkable reveal-text text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Nara Kupu Jogja adalah kawasan agroeduwisata yang menghadirkan pengalaman berinteraksi langsung dengan alam dalam suasana yang sejuk, asri, dan menenangkan. Mengusung konsep edukasi berbasis alam, Nara Kupu menjadi ruang terbuka yang mempertemukan aktivitas belajar, rekreasi, dan kebersamaan dalam satu kawasan yang nyaman dan tertata.
            </p>
            <p className="walkable reveal-text text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
              Tidak hanya menghadirkan program edukatif, Nara Kupu juga menjadi pilihan ideal untuk berbagai kegiatan seperti family gathering, outing kantor, community event, workshop, hingga acara spesial lainnya. Dengan fasilitas rekreatif dan area healing alami yang luas, setiap kegiatan dapat berlangsung lebih hangat, seru, dan berkesan di tengah keindahan alam.
            </p>
            <Link to="/about" className="walkable reveal-text inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-xs tracking-widest uppercase rounded-2xl hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-colors shadow-lg font-medium">
              Read More
            </Link>
          </div>
          <div className="relative">
            {/* Image 1 with Animated Border */}
            <div className="walkable reveal-text group relative w-4/5 h-[400px] rounded-3xl shadow-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-[2px] rounded-3xl overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <img src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772556494/1772556200-picsays_vwwsse.jpg" alt="Deer" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image 2 with Animated Border */}
            <div className="walkable reveal-text group absolute -bottom-12 -right-4 w-3/5 h-[300px] rounded-3xl shadow-2xl overflow-hidden cursor-pointer border-8 border-white dark:border-[#0a0a0a] transition-colors duration-300">
              <div className="absolute inset-[2px] rounded-3xl overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <img src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772914765/Foto_dari_Nsfall_afsymk.jpg" alt="Mountain" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jelajahi Beragam Pengalaman */}
      <section className="py-20 transition-colors duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-12 reveal-text">
            <h2 className="walkable text-3xl md:text-5xl font-serif text-black dark:text-white mb-6 inline-block">Jelajahi Beragam Pengalaman</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Nikmati keindahan alam Yogyakarta melalui berbagai layanan kami yang dirancang untuk kenyamanan dan edukasi Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Agrowisata", 
                desc: "Kegiatan edukasi pertanian, pengalaman memetik sayur langsung dari kebun, serta program kunjungan sekolah dengan suasana alam yang indah.",
                btn: "Lebih lanjut",
                img: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772941036/file_00000000df687206ad778267be2268fa-1000604423_h7biws.png",
                link: "/services/agrowisata"
              },
              { 
                title: "Resto & Cafe", 
                desc: "Resto & cafe bernuansa kebun dengan hidangan berkualitas berbahan segar dan lokal, dirancang untuk menghadirkan pengalaman bersantap yang istimewa.",
                btn: "Lihat Menu",
                img: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772941040/1000607371_1536_1024_plpnxs.png",
                link: "/services/resto-cafe"
              },
              { 
                title: "Venue", 
                desc: "Kami menghadirkan fasilitas venue representatif untuk berbagai jenis acara, mulai dari gathering keluarga, event perusahaan, hingga kegiatan sekolah.",
                btn: "Lihat paket",
                img: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772941028/file_00000000df687206ad778267be2268fa-image-26_yifnkw.png",
                link: "/services/venue"
              },
              { 
                title: "Nara Villages", 
                desc: "Akomodasi ramah lingkungan dengan arsitektur tradisional Indonesia, menawarkan pengalaman menginap yang nyaman di tengah keindahan alam.",
                btn: "Lihat kamar",
                img: "https://res.cloudinary.com/dchitlxsf/image/upload/v1772941036/1772940134-picsay_zq7pu7.png",
                link: "/services/nara-villages"
              }
            ].map((item, idx) => (
              <Link to={item.link} key={idx} className="reveal-text group bg-gray-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
                <div className="h-64 overflow-hidden relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="walkable p-8 flex-grow flex flex-col">
                  <h3 className="text-3xl font-serif mb-4 text-black dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-sm md:text-base flex-grow">{item.desc}</p>
                  <div className="mt-auto w-full py-4 px-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-colors duration-300">
                    {item.btn} <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="walkable absolute bottom-0 left-0 w-full h-4 pointer-events-none"></div>
      </section>

      {/* Aktivitas Tambahan */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900/50 transition-colors duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-12 reveal-text">
            <h2 className="walkable text-3xl md:text-5xl font-serif text-black dark:text-white mb-6 inline-block">Aktivitas Tambahan</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Lengkapi kunjungan Anda dengan berbagai aktivitas seru yang mendekatkan Anda dengan alam.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Penyewaan Peralatan Memancing", 
                desc: "Nikmati ketenangan memancing di area kolam kami. Peralatan lengkap tersedia untuk disewa, cocok untuk pemula maupun yang sudah berpengalaman.",
                video: "https://res.cloudinary.com/dchitlxsf/video/upload/v1773018258/gemini_generated_video_ed5e6f7d_1_hdrpjl.mp4",
              },
              { 
                title: "Pengalaman Memberi Pakan Rusa", 
                desc: "Interaksi langsung dengan rusa-rusa jinak kami. Pengalaman edukatif dan menyenangkan yang sangat disukai oleh anak-anak maupun dewasa.",
                video: "https://res.cloudinary.com/dchitlxsf/video/upload/v1773018129/gemini_generated_video_dfbf1f59_unfg4v.mp4",
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="reveal-text group bg-white dark:bg-black rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden relative">
                  <video 
                    src={item.video} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    autoPlay
                    loop 
                    muted 
                    playsInline
                  />
                </div>

                <div className="walkable p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-serif mb-4 text-black dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Highlights */}
      <section className="py-20 overflow-hidden transition-colors duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-20 mb-10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="reveal-text">
            <h2 className="walkable text-3xl md:text-5xl font-serif text-black dark:text-white mb-4 inline-block">Portofolio kami</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
              Momen indah yang terekam di Nara Kupu Jogja.
            </p>
          </div>
          <Link to="/gallery" className="walkable reveal-text shrink-0 px-8 py-4 bg-black text-white dark:bg-white dark:text-black text-xs tracking-widest uppercase rounded-2xl hover:bg-orange-500 dark:hover:bg-orange-400 hover:text-white dark:hover:text-white transition-colors font-medium shadow-lg">
            View Full Gallery
          </Link>
        </div>

        {/* Looping Gallery */}
        <div className="relative w-full flex flex-col gap-4">
          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scroll-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-scroll-left {
              animation: scroll-left 40s linear infinite;
            }
            .animate-scroll-right {
              animation: scroll-right 40s linear infinite;
            }
            .gallery-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Row 1 - Scrolling Left */}
          <div className="flex w-max animate-scroll-left gallery-track gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {[
                  "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg",
                  "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg",
                  "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg",
                  "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg"
                ].map((src, idx) => (
                  <div key={idx} className="walkable w-[260px] md:w-[320px] aspect-[4/3] rounded-3xl overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white dark:bg-[#0a0a0a]">
                      <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row 2 - Scrolling Right */}
          <div className="flex w-max animate-scroll-right gallery-track gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {[
                  "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg",
                  "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg",
                  "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg",
                  "https://res.cloudinary.com/dchitlxsf/image/upload/v1772951950/No_Image_Available_bb9qpk.jpg"
                ].map((src, idx) => (
                  <div key={idx} className="walkable w-[260px] md:w-[320px] aspect-[4/3] rounded-3xl overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white dark:bg-[#0a0a0a]">
                      <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="walkable absolute bottom-0 left-0 w-full h-4 pointer-events-none"></div>
      </section>

      {/* Maps Section */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-12 reveal-text">
            <h2 className="walkable text-3xl md:text-5xl font-serif text-black dark:text-white mb-6 inline-block">Lokasi Kami</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Kunjungi Nara Kupu Jogja dan nikmati pengalaman wisata alam yang tak terlupakan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Map Container */}
            <div className="lg:col-span-2 walkable reveal-text w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.53509893952!2d110.3803859!3d-7.7329245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59000b2126eb%3A0x675841121f64924c!2sNara%20Kupu%20Jogja!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-black px-6 py-3 rounded-full shadow-lg border border-gray-100 dark:border-zinc-800 flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <MapPin className="text-orange-500" size={20} />
                <a 
                  href="https://maps.app.goo.gl/yR8R9z52Q52G29Yc8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>

            {/* Reviews Container */}
            <div className="flex flex-col gap-6 min-h-[400px] relative">
              <AnimatePresence mode="popLayout">
                {visibleIndices.map((reviewIdx) => {
                  const review = reviews[reviewIdx];
                  if (!review) return null;
                  return (
                    <motion.div 
                      key={review.id}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                      className="bg-white dark:bg-black p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 hover:border-orange-500/30 group w-full"
                    >
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 italic">
                        "{review.comment}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xs">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-black dark:text-white">{review.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">{review.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              <div className="mt-auto text-center z-10">
                <div className="flex justify-center gap-2 mb-4">
                  {reviews.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${visibleIndices.includes(i) ? 'bg-orange-500 w-4' : 'bg-gray-300 dark:bg-gray-700'}`}
                    />
                  ))}
                </div>
                <a 
                  href="https://www.google.com/maps/place/Nara+Kupu+Jogja/@-7.7329245,110.3803859,17z/data=!4m8!3m7!1s0x2e7a59000b2126eb:0x675841121f64924c!8m2!3d-7.7329245!4d110.3803859!9m1!1b1!16s%2Fg%2F11p0_0_0_0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-[0.2em]"
                >
                  Lihat Semua Ulasan →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WalkingDeer />
    </div>
  );
}
