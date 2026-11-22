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
import { AboutContent } from '@/types';

export default function AboutPage() {
  const [about, setAbout] = useState<AboutContent>(fallbackAboutContent);

  useEffect(() => {
    const saved = localStorage.getItem('ats_custom_about');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title) {
          setAbout(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* ========================================================
          1. HERO HEADER: Corporate Breadcrumb & Title Banner
         ======================================================== */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-14 pb-24 overflow-hidden border-b border-slate-800">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="text-slate-500">/</span>
            <span className="text-white">About ATS Energy Solutions</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{about.tagline || 'Engineered For Bangladesh'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Pioneering Certified Electrical &amp; Solar Solutions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              From precision switchgear to heavy-gauge pure copper cables and commercial solar arrays, discover the corporate vision powering modern infrastructure across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CORPORATE STATS COUNTER STRIP (Overlapping Hero Banner)
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Happy Customers */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
                {about.statHappyCustomers}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Happy Customers
              </span>
            </div>
          </div>

          {/* Successful Projects */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
                {about.statSuccessfulProjects}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Projects Completed
              </span>
            </div>
          </div>

          {/* Dealers & Partners */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
                {about.statDealersPartners}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Dealers Nationwide
              </span>
            </div>
          </div>

          {/* 24h Customer Support */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
                {about.statCustomerSupport}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
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
            4. VISION & MISSION: Modern Split Editorial Showcase
           ======================================================== */}
        <section className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Vision */}
            <div className="space-y-4 md:pr-8">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
                Forward Horizon
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {about.visionTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                &ldquo;{about.visionText}&rdquo;
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-4 pt-8 md:pt-0 md:pl-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
                Daily Commitment
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {about.missionTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                &ldquo;{about.missionText}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. WHY WE'RE THE RIGHT CHOICE: Clean High-Trust Feature Blocks
           ======================================================== */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block">
              {about.rightChoiceSubtitle || "WHY WE'RE"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {about.rightChoiceTitle || "THE RIGHT CHOICE"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Built on certified manufacturing standards, dependable delivery timelines, and nationwide distributor support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Choice 1 */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-t-emerald-600 border border-slate-200/90 shadow-sm hover:shadow-lg transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Dealer &amp; Wholesale Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Special pricing, guaranteed warehouse inventory allocations, and marketing support for dealers, contractors, and retailers across 64 districts.
              </p>
            </div>

            {/* Choice 2 */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-t-emerald-600 border border-slate-200/90 shadow-sm hover:shadow-lg transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Electrical Project Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Complete engineering support for commercial infrastructure, residential high-rises, factories, switchboards, and solar project requirements.
              </p>
            </div>

            {/* Choice 3 */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-t-emerald-600 border border-slate-200/90 shadow-sm hover:shadow-lg transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Solar Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Professional consultation for rooftop solar installations, auto charge controllers (10A to 30A), monocrystalline panels, and energy-saving designs.
              </p>
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
