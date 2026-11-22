'use client';

import Link from 'next/link';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 block cursor-pointer"
    >
      {/* Product Image Box (Zero extra gap, object-cover full bleed, badges removed) */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
      </div>

      {/* Content Area (Responsive padding: p-2.5 on mobile, p-5 on desktop) */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {product.subcategory && (
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-0.5 sm:mb-1 block line-clamp-1">
              {product.subcategory}
            </span>
          )}

          <h3 className="font-bold text-slate-900 text-xs sm:text-base group-hover:text-emerald-600 transition line-clamp-2 sm:line-clamp-1 mb-1 sm:mb-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed hidden sm:block">
            {product.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
