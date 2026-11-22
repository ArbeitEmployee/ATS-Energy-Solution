import Link from 'next/link';
import { ArrowRight, Zap, Shield, Award, CheckCircle } from 'lucide-react';
import { getProducts, getCategories, getBanners } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import BannerSlider from '@/components/home/BannerSlider';
import HomeServicesSection from '@/components/home/HomeServicesSection';
import HomeCategoriesSection from '@/components/home/HomeCategoriesSection';
import HomeProductsSection from '@/components/home/HomeProductsSection';
import PartnerReviewsAndClients from '@/components/home/PartnerReviewsAndClients';

export default async function HomePage() {
  const [products, categories, banners] = await Promise.all([
    getProducts(),
    getCategories(),
    getBanners()
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Banner Slider Area (Uploaded via Admin CMS or Default atsenergybd.com Banners) */}
      <section className="w-full">
        <BannerSlider initialBanners={banners} />
      </section>

      {/* Dynamic Services from atsenergybd.com and Admin CMS */}
      <HomeServicesSection />

      {/* Corporate Product Divisions Showcase (Categories Section below Services) */}
      <HomeCategoriesSection initialCategories={categories} />

      {/* Product Showcase Section with Admin Manageable Banner */}
      <HomeProductsSection initialProducts={products} />

      {/* What Our Partners Say & OUR KEY CLIENTS Section */}
      <PartnerReviewsAndClients />

      {/* Real FAQs from atsenergybd.com */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-1">Are you an authorized ATS dealer/manufacturer?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes, ATS Energy Solution is a verified manufacturer and wholesale supplier with official BSTI and DNCC registrations.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-1">Do you provide wholesale pricing?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes, we offer special tier-based wholesale pricing for authorized retailers, dealers, and project contractors.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-1">Do you deliver all over Bangladesh?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes, we provide nationwide logistics and dispatch services to any district or divisional warehouse in Bangladesh.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-1">Do you support commercial projects?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes, our engineering team supplies tailored electrical cables, MCBs, switchboards, and solar setups for commercial complexes and residential developments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Call To Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              We&apos;re Here for All Your Business Needs
            </h3>
            <p className="text-sm font-medium text-slate-900/80 max-w-xl">
              Connect with ATS Energy Solutions for bulk orders, dealership inquiries, or project quotes.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-slate-950 hover:bg-slate-900 text-white font-bold px-8 py-4 rounded-xl transition text-sm shadow-xl"
          >
            Request Official Quotation
          </Link>
        </div>
      </section>
    </div>
  );
}
