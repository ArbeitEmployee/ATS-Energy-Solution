'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { fallbackServices } from '@/lib/data';
import { ServiceItem } from '@/types';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);

  useEffect(() => {
    const saved = localStorage.getItem('ats_custom_services');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with fallback to ensure rich image data if secondaryImage is missing
          const merged = parsed.map((item, idx) => {
            const fallback = fallbackServices[idx] || fallbackServices[0];
            return {
              ...item,
              image: item.image || fallback.image,
              secondaryImage: item.secondaryImage || fallback.secondaryImage
            };
          });
          setServices(merged);
        }
      } catch (e) {
        console.error('Error loading services:', e);
      }
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-0 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Services & Solutions</span>
        </div>

        {/* Corporate Header */}
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-14 mb-12 shadow-xl border border-slate-800 overflow-hidden">
          {/* Ambient Lighting & Glow FX for natural blending */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
            {/* Left Content Column */}
            <div className="max-w-2xl space-y-4">
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                Corporate Capabilities
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Get the Services &amp; Support
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                From wholesale dealership partnerships to large-scale commercial project supply and solar energy setups, ATS Energy Solution delivers reliable electrical infrastructure solutions backed by certified engineering standards.
              </p>
            </div>

            {/* Right Artwork: Certified Engineering & Support Concept (Seamless Cutout, Zero Box Edge) */}
            <div className="shrink-0 w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] flex justify-center md:justify-end">
              <div className="relative group">
                {/* Ambient Aura behind clipboard, helmet and gear */}
                <div className="absolute inset-0 bg-emerald-400/15 rounded-full blur-2xl transform scale-110 pointer-events-none group-hover:bg-emerald-400/25 transition-all duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

                {/* Seamless Transparent Artwork */}
                <img
                  src="/assets/images/intro/services-support-clean.png"
                  alt="ATS Engineering, Services & Quality Compliance Support"
                  className="relative w-full h-auto block select-none pointer-events-none group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services List (Clean Layout Without Card Boxes - Seamless & Well-Balanced) */}
        <div className="space-y-12 sm:space-y-20 md:space-y-24 mb-16 sm:mb-24 max-w-5xl mx-auto">
          {services.map((svc, idx) => {
            const isEven = idx % 2 === 1; // 0 = Left Image, Right Text; 1 = Left Text, Right Image

            return (
              <div
                key={svc.id || svc._id || idx}
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-14 items-center">
                  
                  {/* Column 1: Overlapping Double Images (Balanced Proportions, Mobile Friendly) */}
                  <div className={`md:col-span-5 relative ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative pb-5 sm:pb-8 pr-4 sm:pr-7 max-w-[280px] sm:max-w-sm mx-auto md:max-w-none">
                      {/* Main Image */}
                      {svc.image ? (
                        <div className="w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/80">
                          <img
                            src={svc.image}
                            alt={svc.title}
                            className="w-full h-full object-cover hover:scale-105 transition duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-[4/3] rounded-xl sm:rounded-2xl bg-slate-200" />
                      )}

                      {/* Overlapping Secondary Image */}
                      {svc.secondaryImage && (
                        <div className="absolute -bottom-1 -right-1 sm:-bottom-3 sm:-right-3 w-5/12 aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-white p-1 sm:p-1.5 border border-slate-200/90 shadow-xl z-10">
                          <div className="w-full h-full rounded-md sm:rounded-lg overflow-hidden bg-slate-100">
                            <img
                              src={svc.secondaryImage}
                              alt={`${svc.title} detail`}
                              className="w-full h-full object-cover hover:scale-110 transition duration-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Column 2: Content (Title, Description & Action - Balanced Spacing) */}
                  <div className={`md:col-span-7 space-y-3 sm:space-y-4 text-center md:text-left ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        {svc.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto md:mx-0">
                      {svc.description}
                    </p>

                    {/* Inquire CTA Button */}
                    <div className="pt-1 sm:pt-2 flex justify-center md:justify-start">
                      <Link
                        href={`/contact?service=${encodeURIComponent(svc.title)}`}
                        className="inline-flex items-center gap-2 bg-slate-950 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 text-xs shadow-sm group"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Contact Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-8 sm:p-12 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mb-12">
          <div>
            <h3 className="text-2xl font-black">Need a Custom Commercial Supply Quotation?</h3>
            <p className="text-sm font-medium mt-1 text-slate-900/80">
              Speak directly with our senior procurement engineer for bulk pricing &amp; delivery timeline.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+8801848160565"
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3.5 rounded-xl transition text-xs flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>01848-160565</span>
            </a>
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition text-xs shadow"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </div>

      {/* Complete Full Width High-Clarity Illustration Directly Touching Footer (2048px Ultra HD, zero blur, sharp lines) */}
      <div className="w-full mt-12 overflow-hidden pointer-events-none select-none leading-none">
        <img
          src="/images/services-solar-bg-hd.jpg"
          alt="Solar Grid Architecture"
          className="w-full h-auto block m-0 p-0 contrast-[1.08] brightness-[1.02]"
        />
      </div>
    </div>
  );
}
