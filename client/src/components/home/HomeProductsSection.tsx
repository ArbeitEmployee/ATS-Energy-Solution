'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';

interface HomeProductsSectionProps {
  initialProducts: Product[];
  initialBanner?: string;
  initialBannerLink?: string;
}

export default function HomeProductsSection({
  initialProducts,
  initialBanner,
  initialBannerLink,
}: HomeProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [productSectionBanner, setProductSectionBanner] = useState<string>(
    initialBanner ||
      'https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.37-1-768x305.jpeg'
  );
  const [productSectionBannerLink, setProductSectionBannerLink] = useState<string>(
    initialBannerLink || '/products'
  );

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    if (initialBanner) setProductSectionBanner(initialBanner);
    if (initialBannerLink) setProductSectionBannerLink(initialBannerLink);
  }, [initialBanner, initialBannerLink]);

  return (
    <section className="py-8 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Products
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
          >
            <span>View All Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature / Promotional Banner above Products (Admin Controlled) */}
        {productSectionBanner && (
          <div className="mb-10 w-full overflow-hidden rounded-2xl shadow-sm border border-slate-200 group">
            {productSectionBannerLink ? (
              <Link href={productSectionBannerLink} className="block relative">
                <img
                  src={productSectionBanner}
                  alt="ATS Product Showcase Banner"
                  className="w-full h-auto max-h-56 sm:max-h-72 object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </Link>
            ) : (
              <img
                src={productSectionBanner}
                alt="ATS Product Showcase Banner"
                className="w-full h-auto max-h-56 sm:max-h-72 object-cover"
              />
            )}
          </div>
        )}

        {/* Grid of Real Products (Mobile: 2 columns, Tablet: 2 columns, Desktop: 4 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.slice(0, 8).map((product, idx) => (
            <ProductCard key={product.slug || product._id || idx} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
