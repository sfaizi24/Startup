'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollCue() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transform and opacity based on scroll position
  // Hide completely after scrolling 300px
  const maxScroll = 300;
  const translateY = Math.min(scrollPosition, maxScroll);
  const opacity = 1 - (scrollPosition / maxScroll);

  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-[12vh] z-50 bg-[#E7F7F4] flex items-center justify-center pointer-events-none transition-transform duration-100"
      style={{ 
        transform: `translateY(${translateY}px)`,
        opacity: opacity > 0 ? opacity : 0
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="font-medium tracking-wide text-brand-dark-blue">How Sukoon works</p>
        <ChevronDown 
          className="text-brand-teal animate-pulse-down" 
          size={20} 
        />
      </div>
    </div>
  );
} 