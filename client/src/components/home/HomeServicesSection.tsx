'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { fallbackServices } from '@/lib/data';
import { ServiceItem } from '@/types';

export default function HomeServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Typewriter effect states for smooth dynamic presentation
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedDesc, setDisplayedDesc] = useState('');

  // Load custom services from localStorage or admin CMS
  useEffect(() => {
    const loadServices = () => {
      const saved = localStorage.getItem('ats_custom_services');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setServices(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    loadServices();
    window.addEventListener('storage', loadServices);
    return () => window.removeEventListener('storage', loadServices);
  }, []);

  // Typewriter animation trigger & wait 5 seconds AFTER description completes
  useEffect(() => {
    const currentSvc = services[currentIndex];
    if (!currentSvc) return;

    setDisplayedTitle('');
    setDisplayedDesc('');

    const fullTitle = currentSvc.title || '';
    const fullDesc = currentSvc.description || '';

    let titleIdx = 0;
    let descIdx = 0;
    let descInterval: NodeJS.Timeout | null = null;
    let autoNextTimeout: NodeJS.Timeout | null = null;

    // Type Title
    const titleInterval = setInterval(() => {
      if (titleIdx <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIdx));
        titleIdx++;
      } else {
        clearInterval(titleInterval);
        
        // Start typing description right after title completes
        descInterval = setInterval(() => {
          if (descIdx <= fullDesc.length) {
            setDisplayedDesc(fullDesc.slice(0, descIdx));
            descIdx++;
          } else {
            if (descInterval) clearInterval(descInterval);

            // Description completely finished! Now wait full 5 seconds before changing service
            if (services.length > 1) {
              autoNextTimeout = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % services.length);
              }, 5000);
            }
          }
        }, 12);
      }
    }, 20);

    return () => {
      clearInterval(titleInterval);
      if (descInterval) clearInterval(descInterval);
      if (autoNextTimeout) clearTimeout(autoNextTimeout);
    };
  }, [currentIndex, services]);

  const activeService = services[currentIndex] || fallbackServices[0];

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleSelect = (idx: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(idx);
  };

  return (
    <section 
      className="pt-6 pb-10 sm:pt-10 sm:pb-16 bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200 overflow-hidden relative"
    >
      {/* Subtle Ambient Background Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Get the Services & Support
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            Engineered electrical infrastructure, dealership supply and certified renewable energy.
          </p>
        </div>

        {/* Interactive Showcase Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Clean Box Image Frame (No green outline/rings) */}
            <div className="md:col-span-5 flex flex-col items-center justify-start">
              <div className="relative group w-full max-w-sm">
                {/* Main Box Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-200">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-50 relative">
                    {activeService.image ? (
                      <img
                        key={activeService.image}
                        src={activeService.image}
                        alt={activeService.title}
                        className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows for Direct Control */}
              <div className="flex items-center gap-3 mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Service"
                  className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2 px-2">
                  {services.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(idx)}
                      aria-label={`Go to service ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? 'w-8 bg-slate-900'
                          : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Service"
                  className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Column: Dynamic Content with Natural Flow (No text overlap, Tight button spacing) */}
            <div className="md:col-span-7 flex flex-col justify-start text-left pt-1 sm:pt-2">
              
              {/* Animated / Typewriter Title - Dynamic height so 2 lines never overlap */}
              <div className="mb-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight m-0 p-0">
                  {displayedTitle}
                  <span className="inline-block w-1 h-6 sm:h-7 ml-1 bg-emerald-500 animate-pulse align-middle" />
                </h3>
              </div>

              {/* Animated / Typewriter Description - Minimum height to prevent sudden jumps without extra gap */}
              <div className="min-h-[72px] sm:min-h-[80px]">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {displayedDesc}
                  {displayedDesc.length < (activeService.description || '').length && displayedTitle.length >= (activeService.title || '').length && (
                    <span className="inline-block w-1.5 h-4 ml-0.5 bg-emerald-400 animate-pulse align-middle" />
                  )}
                </p>
              </div>

              {/* Quick Action Buttons - Right below description with tight spacing */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/contact?service=${encodeURIComponent(activeService.title || '')}`}
                  className="inline-flex items-center gap-2.5 bg-slate-950 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 text-xs sm:text-sm shadow-md group"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold px-5 py-3 rounded-xl border border-slate-200 transition text-xs sm:text-sm"
                >
                  <span>View All Services</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
