import React, { useEffect, useRef } from 'react';

const WORDS = ["NARA KUPU JOGJA", "NARA", "KUPU", "JOGJA", "NKJ"];

export default function FloatingTextBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Create fixed columns to prevent overlapping (Matrix style)
    // 40 columns across the screen ensures they don't overlap horizontally
    const numColumns = 40; 
    const columnWidth = 100 / numColumns;
    
    for (let i = 0; i < numColumns; i++) {
      const el = document.createElement('div');
      el.textContent = WORDS[Math.floor(Math.random() * WORDS.length)];
      
      // Use font-mono for the matrix feel
      el.className = 'absolute text-[10pt] md:text-[12pt] font-mono font-bold select-none text-black dark:text-white opacity-40 dark:opacity-30';
      
      // Vertical text styling
      el.style.writingMode = 'vertical-rl';
      el.style.textOrientation = 'upright';
      el.style.letterSpacing = '0.2em';
      
      // Position in its own column (evenly spaced)
      el.style.left = `${i * columnWidth}vw`;
      el.style.top = `0`;
      
      // Randomize falling speed and start time
      const duration = 15 + Math.random() * 20; // 15s to 35s
      const delay = -Math.random() * duration;
      
      el.style.animation = `matrixRain ${duration}s linear ${delay}s infinite`;
      
      container.appendChild(el);
    }
    
    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
    </>
  );
}
