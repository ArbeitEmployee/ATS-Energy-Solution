'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { atsOfficialLogo, fallbackSocialMedia } from '@/lib/data';
import { getSetting } from '@/lib/api';
import { SocialMediaLinks } from '@/types';
import { FacebookIcon, WhatsAppIcon, InstagramIcon, YoutubeIcon, LinkedinIcon, TwitterXIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  const [socials, setSocials] = useState<SocialMediaLinks>(fallbackSocialMedia);

  useEffect(() => {
    getSetting<SocialMediaLinks>('socials').then((data) => {
      if (data) setSocials(data);
    });
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Company Info with Real ATS Logo & Social Links */}
        <div className="space-y-4">
          <div className="bg-white p-2.5 rounded-xl inline-block">
            <img
              src={atsOfficialLogo}
              alt="ATS ENERGY SOLUTIONS"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Dynamic Social Media Icons with Authentic Brand Colors */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Connect With Us
            </span>
            <div className="flex items-center gap-2.5 flex-wrap">
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 shadow-sm"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {socials.whatsapp && (
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 shadow-sm"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#E4405F] text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 shadow-sm"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 shadow-sm"
                  title="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#000000] hover:border-slate-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 shadow-sm"
                  title="Twitter / X"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Core Product Lines */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
            Our Products
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/products?category=lighting-solutions" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                ATS AC &amp; Emergency LED Lights
              </Link>
            </li>
            <li>
              <Link href="/products?category=electrical-accessories" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                Gang Switches &amp; Piano Sockets
              </Link>
            </li>
            <li>
              <Link href="/products?category=electrical-accessories" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                Circuit Breakers (MCB) &amp; Main Switches
              </Link>
            </li>
            <li>
              <Link href="/products?category=wiring-cables" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                ATS Electric Cables &amp; Copper Wires
              </Link>
            </li>
            <li>
              <Link href="/products?category=solar-energy-systems" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                Solar Panels &amp; Auto Charge Controllers
              </Link>
            </li>
          </ul>
        </div>

        {/* Important Links & Compliance */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
            Important Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition">About ATS Energy Solution</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-400 transition">Dealer &amp; Distributor Inquiries</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-emerald-400 transition">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-emerald-400 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
            Contact Info &amp; Location
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span>Sonali Neer, Holding-615/9/1, Bosila Road, Mohammadpur, Dhaka-1207, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>+880 1848-160565 / +880 1711-703541</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>info@atsenergybd.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2026 ATS ENERGY SOLUTIONS. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Trusted Dealership for Quality Electrical &amp; Lighting Products</p>
      </div>
    </footer>
  );
}
