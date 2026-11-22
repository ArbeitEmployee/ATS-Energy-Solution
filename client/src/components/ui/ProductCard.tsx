'use client';

import Link from 'next/link';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 block cursor-pointer"
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

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {product.subcategory && (
            <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-1 block">
              {product.subcategory}
            </span>
          )}

          <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition line-clamp-1 mb-2">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
