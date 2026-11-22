'use client';

import { useState, useEffect } from 'react';
import { fallbackServices } from '@/lib/data';
import { ServiceItem } from '@/types';

export default function HomeServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);

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

  return (
    <section className="py-8 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1 sm:mb-2">
            ATS Services & Solutions
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get the Services & Support
          </h2>
        </div>

        {/* Services Grid (Blended with background by default, visible card with border & shadow only on hover) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc, idx) => (
            <div 
              key={svc.id || svc._id || idx} 
              className="bg-transparent hover:bg-white rounded-2xl border border-transparent hover:border-slate-200 p-6 flex flex-col items-center text-center shadow-none hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
            >
              {/* Image Box */}
              {svc.image ? (
                <div className="w-full h-44 rounded-xl overflow-hidden mb-6 bg-slate-50 border border-slate-100 group-hover:border-slate-200 shrink-0 transition-colors">
                  <img 
                    src={svc.image} 
                    alt={svc.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                </div>
              ) : (
                <div className="w-full h-44 rounded-xl mb-6 bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <span className="text-slate-400 text-xs font-medium">No Image</span>
                </div>
              )}

              {/* Title */}
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-3 tracking-tight group-hover:text-emerald-600 transition min-h-[48px] flex items-center justify-center">
                {svc.title}
              </h3>

              {/* Description: full 5-6 lines display */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-6 text-center">
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
