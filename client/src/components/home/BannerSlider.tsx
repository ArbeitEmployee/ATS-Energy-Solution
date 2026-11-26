'use client';

import { useState, useEffect } from 'react';
import { Banner } from '@/types';
import { API_BASE } from '@/lib/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BannerSliderProps {
  initialBanners: Banner[];
}

export default function BannerSlider({ initialBanners }: BannerSliderProps) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync with database API
  useEffect(() => {
    let isMounted = true;
    const syncBanners = async () => {
      try {
        const res = await fetch(`${API_BASE}/banners`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json?.success && Array.isArray(json.data)) {
            setBanners(json.data);
          }
        }
      } catch (err) {
        // Keep initialBanners from server render
      }
    };

    syncBanners();
    return () => {
      isMounted = false;
    };
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
      {/* Natural-aspect responsive container: zero cropping on mobile, laptop, and desktop */}
      <div className="relative w-full flex items-center justify-center">
        {/* Banner Slide */}
        {banners.map((b, idx) => {
          const isActive = idx === currentIndex;
          const imgElement = (
            <img
              src={b.imageUrl}
              alt={b.title || 'ATS Energy Banner'}
              className="w-full h-auto max-h-[760px] object-contain mx-auto block"
            />
          );

          return (
            <div
              key={b._id || idx}
              className={`w-full transition-opacity duration-700 ease-in-out ${
                isActive
                  ? 'relative z-10 opacity-100'
                  : 'absolute inset-0 z-0 opacity-0 pointer-events-none flex items-center justify-center'
              }`}
            >
              {b.linkUrl ? (
                <Link href={b.linkUrl} className="block w-full">
                  {imgElement}
                </Link>
              ) : (
                imgElement
              )}

              {/* Optional Overlay Title (Only if user actually provided a title) */}
              {b.title && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent flex items-center pointer-events-none">
                  <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
                    <div className="max-w-lg space-y-2 sm:space-y-3 text-white">
                      <h2 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight drop-shadow-md">
                        {b.title}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

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
