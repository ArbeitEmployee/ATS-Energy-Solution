'use client';

import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { fallbackPartnerReviews, fallbackKeyClients } from '@/lib/data';
import { PartnerReview, KeyClient } from '@/types';

export default function PartnerReviewsAndClients() {
  const [reviews, setReviews] = useState<PartnerReview[]>(fallbackPartnerReviews);
  const [clients, setClients] = useState<KeyClient[]>(fallbackKeyClients);

  useEffect(() => {
    const loadData = () => {
      const savedReviews = localStorage.getItem('ats_custom_partner_reviews');
      if (savedReviews) {
        try {
          const parsed = JSON.parse(savedReviews);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviews(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }

      const savedClients = localStorage.getItem('ats_custom_key_clients');
      if (savedClients) {
        try {
          const parsed = JSON.parse(savedClients);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setClients(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Duplicate logos for seamless infinite smooth scrolling
  const marqueeClients = [...clients, ...clients];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* ========================================================
            PART 1: WHAT OUR PARTNERS SAY (TESTIMONIALS)
           ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Partners Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Feedback from our valued distributors, project developers, and long-standing corporate partners.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || rev._id || idx}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition duration-300 relative group"
            >
              <div className="absolute top-5 right-5 text-emerald-500/20 group-hover:text-emerald-500/40 transition">
                <Quote className="w-8 h-8" />
              </div>

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4 text-xs">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  {rev.quote}
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 mt-auto">
                <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-emerald-500/20 shadow-sm overflow-hidden flex items-center justify-center shrink-0 ring-2 ring-slate-100">
                  {rev.image ? (
                    <img src={rev.image} alt={rev.author} className="w-full h-full object-cover object-center" />
                  ) : (
                    <span className="font-extrabold text-base text-emerald-600 bg-emerald-50 w-full h-full flex items-center justify-center">
                      {rev.author.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug truncate" title={rev.author}>
                    {rev.author}
                  </span>
                  <span className="text-xs text-slate-500 font-medium truncate" title={rev.designation || 'Dealer / Partner'}>
                    {rev.designation || 'Dealer / Partner'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================
            PART 2: OUR KEY CLIENTS (CONTINUOUS ULTRA-SMOOTH SLIDER)
           ======================================================== */}
        <div className="pt-10 border-t border-slate-200/80">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              OUR KEY CLIENTS
            </h3>
          </div>

          {/* Smooth Continuous Marquee Container */}
          <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
            <div className="animate-client-marquee flex items-center gap-6 sm:gap-8 py-2">
              {marqueeClients.map((cli, idx) => (
                <div 
                  key={`${cli.id || cli.name}-${idx}`}
                  className="w-[18vw] min-w-[160px] max-w-[210px] h-20 shrink-0 flex items-center justify-center p-1 transition-transform duration-300 hover:scale-105 cursor-pointer"
                  title={cli.name}
                >
                  <img
                    src={cli.logo}
                    alt={cli.name}
                    className="max-h-14 sm:max-h-16 max-w-full object-contain filter drop-shadow-sm select-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
