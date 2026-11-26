'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { atsOfficialLogo, fallbackSocialMedia } from '@/lib/data';
import { SocialMediaLinks } from '@/types';
import { FacebookIcon, WhatsAppIcon, InstagramIcon, YoutubeIcon, LinkedinIcon, TwitterXIcon } from '@/components/ui/SocialIcons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [socials, setSocials] = useState<SocialMediaLinks>(fallbackSocialMedia);

  useEffect(() => {
    const saved = localStorage.getItem('ats_custom_socials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) setSocials(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <>
    <header className="w-full sticky top-0 z-50 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* Top Bar with ONLY Phone number (+880 1848-160565) and Social Media Icons */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <a href="tel:+8801848160565" className="flex items-center gap-1.5 hover:text-white transition font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+880 1848-160565</span>
            </a>
          </div>

          {/* Social Media Icons with Authentic Brand Colors */}
          <div className="flex items-center gap-3">
            {socials.facebook && (
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] transition" title="Facebook">
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {socials.whatsapp && (
              <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition" title="WhatsApp">
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {socials.instagram && (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition" title="Instagram">
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {socials.youtube && (
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition" title="YouTube">
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition" title="LinkedIn">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" title="Twitter / X">
                <TwitterXIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Corporate Header with Authentic ATS Logo (No Background Box) & Clean Nav Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src={atsOfficialLogo}
            alt="ATS ENERGY SOLUTIONS"
            className="h-10 sm:h-12 w-auto object-contain transition group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Nav - Clear Dark Slate Text with Emerald Hover */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-800">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-emerald-600 transition">
            About
          </Link>
          <Link href="/services" className="hover:text-emerald-600 transition">
            Service
          </Link>
          <Link href="/products" className="hover:text-emerald-600 transition">
            Products
          </Link>
          <Link href="/contact" className="hover:text-emerald-600 transition">
            Contact
          </Link>
        </nav>

        {/* Corporate CTA Button */}
        <div className="hidden sm:flex items-center space-x-4">
          <Link
            href="/contact"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl transition text-xs shadow-md shadow-emerald-600/20"
          >
            Request Quotation
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden text-slate-700 hover:text-emerald-600 p-2 rounded-lg transition cursor-pointer"
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>

      {/* Mobile Drawer (Side-Slide from Right - Completely Self-Contained Fixed Overlay) */}
      <div 
        className={`fixed inset-0 top-0 left-0 w-full h-[100dvh] overflow-hidden z-[9999] md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Dark Backdrop Overlay */}
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-0 left-0 w-full h-full bg-slate-950/70 backdrop-blur-sm cursor-pointer"
        />

        {/* Side-Slide Solid White Drawer Panel */}
        <aside 
          className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-xs bg-white text-slate-900 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform z-10 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Top Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <img
              src={atsOfficialLogo}
              alt="ATS ENERGY SOLUTIONS"
              className="h-9 w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links list */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1 bg-white">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              About
            </Link>
            <Link 
              href="/services" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Service
            </Link>
            <Link 
              href="/products" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Products
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Contact
            </Link>
          </div>

          {/* Drawer Bottom Action & Hotline */}
          <div className="p-4 sm:p-5 border-t border-slate-100 space-y-3 bg-slate-50 shrink-0">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition"
            >
              Request Quotation
            </Link>
            <a 
              href="tel:+8801848160565" 
              className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-600 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+880 1848-160565</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
