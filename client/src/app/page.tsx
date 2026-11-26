import Link from 'next/link';
import { ArrowRight, Zap, Shield, Award, CheckCircle } from 'lucide-react';
import { getProducts, getCategories, getBanners, getAllSettings } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import BannerSlider from '@/components/home/BannerSlider';
import HomeServicesSection from '@/components/home/HomeServicesSection';
import HomeCategoriesSection from '@/components/home/HomeCategoriesSection';
import HomeProductsSection from '@/components/home/HomeProductsSection';
import PartnerReviewsAndClients from '@/components/home/PartnerReviewsAndClients';
import HomeFAQSection from '@/components/home/HomeFAQSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [products, categories, banners, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getBanners(),
    getAllSettings()
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Banner Slider Area (Uploaded via Admin CMS or Default atsenergybd.com Banners) */}
      <section className="w-full">
        <BannerSlider initialBanners={banners} />
      </section>

      {/* Dynamic Services from atsenergybd.com and Admin CMS */}
      <HomeServicesSection initialServices={settings.services} />

      {/* Corporate Product Divisions Showcase (Categories Section below Services) */}
      <HomeCategoriesSection initialCategories={categories} />

      {/* Product Showcase Section with Admin Manageable Banner */}
      <HomeProductsSection
        initialProducts={products}
        initialBanner={settings.product_section_banner}
        initialBannerLink={settings.product_section_banner_link}
      />

      {/* What Our Partners Say & OUR KEY CLIENTS Section */}
      <PartnerReviewsAndClients
        initialReviews={settings.partner_reviews}
        initialClients={settings.key_clients}
      />

      {/* Editable Interactive FAQ Section */}
      <HomeFAQSection initialFaqs={settings.faqs} />

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
