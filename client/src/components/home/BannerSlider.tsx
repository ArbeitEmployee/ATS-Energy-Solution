'use client';

import { useState, useEffect } from 'react';
import { Banner } from '@/types';
import { getBanners } from '@/lib/api';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BannerSliderProps {
  initialBanners: Banner[];
}

export default function BannerSlider({ initialBanners }: BannerSliderProps) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync with database API and fallback to localStorage if needed
  useEffect(() => {
    let isMounted = true;
    const syncBanners = async () => {
      try {
        const dbBanners = await getBanners();
        if (isMounted && Array.isArray(dbBanners) && dbBanners.length > 0) {
          setBanners(dbBanners);
          return;
        }
      } catch (err) {
        // Fallback to localStorage below
      }

      const saved = localStorage.getItem('ats_custom_banners');
      if (isMounted && saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBanners(parsed);
          }
        } catch (e) {
          // use initial
        }
      }
    };

    syncBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  // Listen to cross-tab updates or admin modifications
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ats_custom_banners' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBanners(parsed);
            setCurrentIndex(0);
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auto slide interval
  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      {/* Dynamic responsive height container matched to banner natural 2.52:1 ratio */}
      <div className="relative w-full aspect-[2.52/1] max-h-[580px]">
        {/* Banner Slide */}
        {banners.map((b, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Main Clean Banner Image - 100% visible, no top or bottom clipping */}
            <img
              src={b.imageUrl}
              alt={b.title || 'ATS Energy Banner'}
              className="w-full h-full object-fill md:object-cover md:object-center"
            />

            {/* Optional Overlay Title & Link (Only if user actually provided a title or link) */}
            {(b.title || b.linkUrl) && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
                  <div className="max-w-lg space-y-2 sm:space-y-3 text-white">
                    {b.title && (
                      <h2 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight drop-shadow-md">
                        {b.title}
                      </h2>
                    )}
                    {b.linkUrl && (
                      <Link
                        href={b.linkUrl}
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl transition text-[10px] sm:text-xs md:text-sm shadow-md"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition border border-white/20 shadow-lg"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition border border-white/20 shadow-lg"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-5 sm:w-8 bg-emerald-500' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
