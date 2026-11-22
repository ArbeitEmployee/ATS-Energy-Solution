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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-700 hover:text-emerald-600 p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-slate-800 hover:text-emerald-600">
            Home
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-slate-800 hover:text-emerald-600">
            About
          </Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-slate-800 hover:text-emerald-600">
            Service
          </Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-slate-800 hover:text-emerald-600">
            Products
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-slate-800 hover:text-emerald-600">
            Contact
          </Link>
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Request Quotation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
