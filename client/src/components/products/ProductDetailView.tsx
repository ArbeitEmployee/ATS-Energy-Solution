'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Zap,
  Info
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  similarProducts: Product[];
}

export default function ProductDetailView({ product, similarProducts }: ProductDetailViewProps) {
  // Gallery images array (fallback to mainImage)
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.mainImage];
  const [selectedImage, setSelectedImage] = useState<string>(images[0] || product.mainImage);
  
  // Extract or synthesize options like Size, Color, Warranty from product fields, attributes or features
  const sizeAttr = product.attributes?.find(a => /size|rating|capacity|watt|power/i.test(a.key));
  const sizes = (product.sizes && product.sizes.length > 0)
    ? product.sizes
    : sizeAttr 
      ? sizeAttr.value.split(/[,/|]+/).map(s => s.trim()).filter(Boolean)
      : ['Standard'];
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'Standard');

  const colorAttr = product.attributes?.find(a => /color|shade|cct/i.test(a.key));
  const colors = (product.colors && product.colors.length > 0)
    ? product.colors
    : colorAttr 
      ? colorAttr.value.split(/[,/|]+/).map(s => s.trim()).filter(Boolean)
      : ['Daylight / Standard'];
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || 'Daylight / Standard');

  const warrantyAttr = product.attributes?.find(a => /warranty|guarantee/i.test(a.key));
  const warranty = product.warranty || (warrantyAttr ? warrantyAttr.value : 'Official Company Warranty');
  const brandName = product.brand || 'ATS Energy';

  // Active Tab: Description | Technical Specification | Features | Video (if available)
  const [activeTab, setActiveTab] = useState<'description' | 'spec' | 'features' | 'video'>('description');

  return (
    <div className="bg-white min-h-screen py-8 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* =========================================================
            1. BREADCRUMB (Home » ATS Energy » Category » Sub » Name)
           ========================================================= */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-amber-600 font-medium mb-8">
          <Link href="/" className="hover:underline text-amber-700">Home</Link>
          <span className="text-amber-500 font-bold">&raquo;</span>
          <span className="hover:underline cursor-pointer text-amber-700">ATS Energy</span>
          <span className="text-amber-500 font-bold">&raquo;</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:underline text-amber-700">
            {product.category}
          </Link>
          {product.subcategory && (
            <>
              <span className="text-amber-500 font-bold">&raquo;</span>
              <span className="text-amber-700">{product.subcategory}</span>
            </>
          )}
          <span className="text-amber-500 font-bold">&raquo;</span>
          <span className="text-slate-600 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* =========================================================
            2. PRODUCT TOP SHOWCASE (Left Thumbnails + Main Image, Right Specs)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Thumbnails + Main Preview (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 items-start justify-center">
            {/* Thumbnails (vertical on sm screen) */}
            <div className="flex sm:flex-col gap-2.5 order-2 sm:order-1 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {images.map((img, idx) => {
                const isSelected = selectedImage === img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 p-1 transition-all flex items-center justify-center bg-white ${
                      isSelected ? 'border-sky-700 shadow-md ring-2 ring-sky-700/20' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main Stage Image (Compact Box: max-w-[340px] to max-w-[380px]) */}
            <div className="order-1 sm:order-2 w-full max-w-[340px] sm:max-w-[360px] aspect-square border border-slate-200/80 rounded-2xl p-5 flex items-center justify-center bg-white shadow-xs hover:shadow-sm transition mx-auto">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-[85%] max-w-[85%] object-contain transition duration-300"
              />
            </div>
          </div>

          {/* Right Column: Brand, Title, Options Pills (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col pt-1">
            
            {/* Brand */}
            <div className="text-sm font-semibold text-slate-700 mb-2">
              Brand: <span className="text-sky-900 font-bold text-base hover:underline cursor-pointer">{brandName}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-800 tracking-tight mb-8">
              {product.name}
            </h1>

            {/* Size Options Pill Row */}
            <div className="flex items-center gap-4 mb-5 flex-wrap">
              <span className="text-sm font-bold text-slate-800 min-w-16">Size:</span>
              <div className="flex flex-wrap items-center gap-2">
                {sizes.map((s, idx) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition font-medium ${
                        isSelected 
                          ? 'border-sky-800 bg-sky-50/50 text-sky-900 font-bold shadow-xs' 
                          : 'border-slate-300 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Option Pill Row */}
            <div className="flex items-center gap-4 mb-5 flex-wrap">
              <span className="text-sm font-bold text-slate-800 min-w-16">Color:</span>
              <div className="flex flex-wrap items-center gap-2">
                {colors.map((c, idx) => {
                  const isSelected = selectedColor === c;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition font-medium ${
                        isSelected 
                          ? 'border-sky-800 bg-sky-50/50 text-sky-900 font-bold' 
                          : 'border-slate-300 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Warranty Pill Row */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="text-sm font-bold text-slate-800 min-w-16">Warranty:</span>
              <span className="text-xs px-3.5 py-1.5 rounded-full border border-slate-300 text-slate-700 font-medium">
                {warranty}
              </span>
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-4 pt-6 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>BSTI & Lab Tested</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Guaranteed</span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================
            3. MIDDLE SECTION: TABS (FULL WIDTH - Description, Technical Specs, Features)
           ========================================================= */}
        <div className="border-t border-slate-200 pt-8 mb-16">
          {/* Tab Headers */}
          <div className="flex items-center gap-8 border-b border-slate-200 pb-3 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`text-sm font-bold relative transition pb-2 -mb-3 ${
                activeTab === 'description' 
                  ? 'text-sky-900 border-b-2 border-sky-800' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('spec')}
              className={`text-sm font-bold relative transition pb-2 -mb-3 ${
                activeTab === 'spec' 
                  ? 'text-sky-900 border-b-2 border-sky-800' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Technical Specification
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('features')}
              className={`text-sm font-bold relative transition pb-2 -mb-3 ${
                activeTab === 'features' 
                  ? 'text-sky-900 border-b-2 border-sky-800' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Features
            </button>
            {product.videoUrl && (
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`text-sm font-bold relative transition pb-2 -mb-3 ${
                  activeTab === 'video' 
                    ? 'text-sky-900 border-b-2 border-sky-800' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Video Demonstration
              </button>
            )}
          </div>

          {/* Tab 1: Description Content */}
          {activeTab === 'description' && (
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <p>
                <strong className="text-slate-900 font-semibold">{product.name}</strong> {product.description || product.shortDescription}
              </p>
              {product.applications && product.applications.length > 0 && (
                <div className="pt-4">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Suitable Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-md">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Technical Specification Table */}
          {activeTab === 'spec' && (
            <div className="overflow-hidden border border-slate-200 rounded-xl max-w-4xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  {product.attributes && product.attributes.length > 0 ? (
                    product.attributes.map((attr, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-slate-50/80' : 'bg-white'}
                      >
                        <td className="py-3 px-4 font-semibold text-slate-700 w-1/3 border-b border-slate-100">
                          {attr.key}
                        </td>
                        <td className="py-3 px-4 text-slate-900 border-b border-slate-100">
                          {attr.value}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="p-4 text-slate-500 text-center">
                        Technical specifications are available upon request.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Features */}
          {activeTab === 'features' && (
            <div className="space-y-3 max-w-3xl">
              {product.features && product.features.length > 0 ? (
                <ul className="space-y-2.5">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">Standard verified manufacturer specifications apply.</p>
              )}
            </div>
          )}

          {/* Tab 4: Video Demonstration */}
          {activeTab === 'video' && product.videoUrl && (
            <div className="max-w-3xl rounded-2xl overflow-hidden border border-slate-200 bg-black aspect-video flex items-center justify-center">
              {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={
                    product.videoUrl.includes('watch?v=')
                      ? product.videoUrl.replace('watch?v=', 'embed/')
                      : product.videoUrl.includes('youtu.be/')
                      ? product.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')
                      : product.videoUrl
                  }
                  title="Product Video"
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <video
                  src={product.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          )}
        </div>

        {/* =========================================================
            4. BOTTOM SECTION: SIMILAR PRODUCTS (MOVED BELOW TABS AS REQUESTED)
           ========================================================= */}
        <div className="border-t border-slate-200 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-sky-950 tracking-tight">
              Similar Products
            </h3>
            <Link 
              href="/products" 
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {similarProducts && similarProducts.length > 0 ? (
              similarProducts.slice(0, 6).map((sim, idx) => (
                <Link
                  key={idx}
                  href={`/products/${sim.slug}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl border border-transparent hover:border-slate-200/90 hover:bg-white hover:shadow-lg transition-all duration-300 group overflow-hidden bg-transparent"
                >
                  {/* Zero-padding Image Frame: Full bleed clean fit, seamless borderless container */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-0 border border-transparent group-hover:border-slate-100 bg-transparent group-hover:bg-slate-50 transition-all">
                    <img
                      src={sim.mainImage}
                      alt={sim.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition truncate">
                      {sim.name}
                    </h4>
                    <p className="text-xs text-slate-500 truncate mt-1">
                      {sim.category} {sim.subcategory ? `• ${sim.subcategory}` : ''}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-xs text-slate-400 col-span-full">No other products in this category.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
