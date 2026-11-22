'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category } from '@/types';

interface HomeCategoriesSectionProps {
  initialCategories: Category[];
}

export default function HomeCategoriesSection({ initialCategories }: HomeCategoriesSectionProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Sync from localStorage if categories updated via admin dashboard
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ats_custom_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge images from initialCategories/fallback if localStorage item is missing an image
          const merged = parsed.map(c => {
            if (!c.image) {
              const matched = initialCategories.find(ic => (ic.id === c.id || ic.slug === c.slug || ic.name === c.name));
              return matched ? { ...c, image: matched.image } : c;
            }
            return c;
          });
          setCategories(merged);
          return;
        }
      }
      setCategories(initialCategories);
    } catch (e) {
      console.error(e);
    }
  }, [initialCategories]);

  // Show only 5 categories in a single clean row
  const displayCategories = categories.slice(0, 5);

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading (View All Products removed as requested) */}
        <div className="mb-8">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1.5">
            ATS Product Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Main Categories
          </h2>
        </div>

        {/* 1 Serial Row - Exactly 5 Categories (Seamless & Clean) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6">
          {displayCategories.map((cat, idx) => {
            const targetUrl = `/products?category=${encodeURIComponent(cat.slug || cat.name)}`;
            const imageSrc = cat.image || 'https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19.jpeg';

            return (
              <Link
                key={cat.id || cat.slug || idx}
                href={targetUrl}
                className="group flex flex-col items-center text-center cursor-pointer p-1"
              >
                {/* Seamless Container: completely blends with the background */}
                <div className="w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex items-center justify-center p-2 mb-3 bg-transparent">
                  <img
                    src={imageSrc}
                    alt={cat.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Category Title Only */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition tracking-tight line-clamp-2">
                  {cat.name}
                </h3>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
