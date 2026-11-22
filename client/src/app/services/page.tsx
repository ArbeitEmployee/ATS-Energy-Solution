'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall, Image as ImageIcon, Wrench } from 'lucide-react';
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
          setServices(parsed);
        }
      } catch (e) {
        console.error('Error loading services:', e);
      }
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Services & Solutions</span>
        </div>

        {/* Corporate Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 mb-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              Corporate Capabilities
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Get the Services & Support
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              From wholesale dealership partnerships to large-scale commercial project supply and solar energy setups, ATS Energy Solution delivers reliable electrical infrastructure solutions backed by certified engineering standards.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((svc, idx) => (
            <div
              key={svc.id || svc._id || idx}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition duration-300 group"
            >
              {svc.image && (
                <div className="h-56 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Service 0{idx + 1}
                  </div>
                </div>
              )}

              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{svc.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(svc.title)}`}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition text-xs shadow-sm mt-4"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Contact Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-8 sm:p-12 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-black">Need a Custom Commercial Supply Quotation?</h3>
            <p className="text-sm font-medium mt-1 text-slate-900/80">
              Speak directly with our senior procurement engineer for bulk pricing & delivery timeline.
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
    </div>
  );
}
