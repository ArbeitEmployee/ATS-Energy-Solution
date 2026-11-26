'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Users, 
  FolderCheck, 
  Clock, 
  FileCheck, 
  Sliders, 
  Wrench,
  Check,
  Handshake,
  Sun,
  Award,
  ArrowRight,
  Sparkles,
  Building,
  CheckCircle2,
  PhoneCall,
  Globe,
  Layers
} from 'lucide-react';
import { fallbackAboutContent, atsOfficialLogo } from '@/lib/data';
import { getSetting } from '@/lib/api';
import { AboutContent } from '@/types';

export default function AboutPage() {
  const [about, setAbout] = useState<AboutContent>(fallbackAboutContent);

  useEffect(() => {
    getSetting<AboutContent>('about').then((data) => {
      if (data && data.title) {
        setAbout(data);
      }
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* ========================================================
          1. HERO HEADER: Suncor Deep Green & Electric Bulb Concept Banner
         ======================================================== */}
      <section className="relative bg-[#053F33] overflow-hidden">
        {/* Soft Decorative Ambient Background Glows matching bulb energy */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#86B817]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle patterned background grid accent for technical electric feel */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="pt-20 pb-20 sm:pt-24 sm:pb-24 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
            
            {/* Left Content Column */}
            <div className="text-left space-y-4 max-w-2xl z-10">
              {/* Breadcrumb matching Suncor identity */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                <Link href="/" className="hover:text-emerald-300 transition">Home</Link>
                <span className="text-emerald-200/50">/</span>
                <span className="text-[#86B817] font-semibold">About Us</span>
              </div>

              {/* Tagline Badge with Electric Energy Icon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#86B817]" />
                <span>{about.tagline || 'Who we are >'}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
                Pioneering Certified Electrical &amp; Solar Solutions
              </h1>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed max-w-xl font-normal">
                From precision switchgear to heavy-gauge pure copper cables and commercial solar arrays, discover the corporate vision powering modern infrastructure across Bangladesh.
              </p>
            </div>

            {/* Right Distinctive Electric Bulb Concept Illustration (Seamlessly Integrated, No Box Borders) */}
            <div className="shrink-0 z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] flex justify-center md:justify-end">
              <div className="relative group">
                {/* Radial energy halo directly centered on the bulb element */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-[#86B817]/20 rounded-full blur-3xl transform scale-125 pointer-events-none group-hover:scale-135 transition-all duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/30 transition-all duration-500" />
                
                {/* Clean cutout graphic - 100% transparent edges, no square box or seam visible */}
                <img
                  src="/assets/images/intro/about-bulb-clean.png"
                  alt="ATS Energy Innovation & Electrical Power"
                  className="relative w-full h-auto block select-none pointer-events-none group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. CORPORATE STATS COUNTER STRIP (Overlapping Hero Banner)
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-4 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 md:divide-x divide-slate-100">
          {/* Happy Customers */}
          <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-0 sm:px-2 md:px-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight block">
                {about.statHappyCustomers}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Happy Customers
              </span>
            </div>
          </div>

          {/* Successful Projects */}
          <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-0 sm:px-2 md:px-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <FolderCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight block">
                {about.statSuccessfulProjects}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Projects Completed
              </span>
            </div>
          </div>

          {/* Dealers & Partners */}
          <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-0 sm:px-2 md:px-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Handshake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight block">
                {about.statDealersPartners}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Dealers Nationwide
              </span>
            </div>
          </div>

          {/* 24h Customer Support */}
          <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-0 sm:px-2 md:px-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight block">
                {about.statCustomerSupport}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Dedicated Support
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 space-y-24">
        
        {/* ========================================================
            3. STORY SECTION: Asymmetric Editorial Layout (Not a generic card)
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual: Premium layered image with official badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src={about.image || fallbackAboutContent.image}
                alt="ATS Energy Solutions"
                className="w-full h-auto object-cover max-h-[460px] hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center gap-4">
                <img src={atsOfficialLogo} alt="ATS Logo" className="h-10 w-auto object-contain" />
                <div className="border-l border-slate-200 pl-3">
                  <span className="text-xs font-black text-slate-900 block">BSTI &amp; BCSIR Lab Verified</span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Certified Industrial Grade</span>
                </div>
              </div>
            </div>

            {/* Decorative background accent behind image */}
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-emerald-500/10 rounded-3xl -z-10 transform -rotate-2" />
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                {about.tagline || 'Who We Are'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {about.title}
              </h2>
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-normal">
              <strong className="text-slate-950 font-bold text-lg">ATS Energy Solution</strong> {about.aboutText.replace(/^ATS Energy Solution\s*/i, '')}
            </p>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Our Core Promise</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We manufacture and distribute electrical infrastructure components tested to withstand demanding power fluctuations, heavy residential currents, and commercial industrial continuous load conditions.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl transition text-xs shadow-md inline-flex items-center gap-2"
              >
                <span>Browse Products Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-7 py-3.5 rounded-xl transition text-xs border border-slate-300"
              >
                Request Corporate Quote
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. VISION & MISSION: Authentic Corporate Manifesto Layout (No Dark Tech Card)
           ======================================================== */}
        <section className="py-6 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Vision Column */}
            <div className="space-y-4 border-l-4 border-emerald-600 pl-6 sm:pl-8 py-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block">
                Strategic Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {about.visionTitle || "Our Vision"}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {about.visionText}
              </p>
            </div>

            {/* Mission Column */}
            <div className="space-y-4 border-l-4 border-slate-900 pl-6 sm:pl-8 py-2">
              <span className="text-xs font-black uppercase tracking-widest text-slate-600 block">
                Corporate Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {about.missionTitle || "Our Mission"}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {about.missionText}
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================
            5. WHY WE'RE THE RIGHT CHOICE: Industrial Engineering Benchmarks (Card-less Corporate Editorial)
           ======================================================== */}
        <section className="py-8 sm:py-12 border-t border-b border-slate-200/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Header & Institutional Credibility Statement */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-black uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{about.rightChoiceSubtitle || "WHY WE'RE"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {about.rightChoiceTitle || "THE RIGHT CHOICE"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Built on certified manufacturing standards, dependable delivery timelines, and nationwide distributor support across all 64 districts of Bangladesh.
              </p>

              {/* Verified Trust Metric Pointers */}
              <div className="pt-4 space-y-3 border-t border-slate-200/80">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Electrolytic Pure Copper Testing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>BDS &amp; BSTI Aligned Engineering Specs</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Factory Warranty &amp; Logistics</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Pillars Displayed in Modern Linear Architectural Format (No Cards) */}
            <div className="lg:col-span-8 divide-y divide-slate-200">
              {(about.rightChoiceCards || fallbackAboutContent.rightChoiceCards || []).map((card, idx) => {
                const getIcon = () => {
                  if (card.icon === 'handshake' || idx === 0) return <Handshake className="w-5 h-5 text-emerald-700" />;
                  if (card.icon === 'users' || idx === 1) return <Users className="w-5 h-5 text-emerald-700" />;
                  return <Sun className="w-5 h-5 text-emerald-700" />;
                };

                return (
                  <div 
                    key={card.id || idx} 
                    className={`py-6 sm:py-8 ${idx === 0 ? 'pt-0' : ''} group`}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Icon Marker */}
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 border border-slate-200 group-hover:border-emerald-200 flex items-center justify-center shrink-0 transition duration-300">
                        {getIcon()}
                      </div>

                      {/* Content details */}
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition duration-300">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================
            6. CORPORATE CAPABILITIES: 3 Column Seamless Layout (No Card Container)
           ======================================================== */}
        <section className="py-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block">
              Organizational Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Company Values &amp; Operational Scope
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {/* Column 1: Our Values */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-emerald-600">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900">Our Values</h3>
              </div>
              <ul className="space-y-3 pt-2">
                {(about.valuesList || fallbackAboutContent.valuesList).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Why Choose Us */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-emerald-600">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900">Why Choose Us</h3>
              </div>
              <ul className="space-y-3 pt-2">
                {(about.whyChooseUsList || fallbackAboutContent.whyChooseUsList).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Services Include */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-emerald-600">
                <Wrench className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900">Our Services Include</h3>
              </div>
              <ul className="space-y-3 pt-2">
                {(about.servicesIncludeList || fallbackAboutContent.servicesIncludeList).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
