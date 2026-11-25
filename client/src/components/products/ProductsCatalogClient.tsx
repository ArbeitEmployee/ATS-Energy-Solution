'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import { 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  Filter, 
  Search, 
  FolderTree, 
  Sparkles,
  X,
  SlidersHorizontal,
  Folder
} from 'lucide-react';

interface ProductsCatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategorySlug?: string;
  initialSearch?: string;
}

export default function ProductsCatalogClient({
  initialProducts,
  categories: propCategories,
  initialCategorySlug = '',
  initialSearch = ''
}: ProductsCatalogClientProps) {
  const [categories, setCategories] = useState<Category[]>(propCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  
  // Track open/collapsed state of accordion dropdowns for categories and subs
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync custom categories & products from localStorage if edited by admin
  useEffect(() => {
    try {
      const savedCats = localStorage.getItem('ats_custom_categories');
      if (savedCats) {
        const parsed = JSON.parse(savedCats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Set initial expanded category if category is in URL
  useEffect(() => {
    if (initialCategorySlug) {
      const match = categories.find(
        c => (c.slug || c.name).toLowerCase() === initialCategorySlug.toLowerCase()
      );
      if (match) {
        const cId = match.id || match.slug;
        setExpandedCategories(prev => ({ ...prev, [cId]: true }));
      }
    }
  }, [initialCategorySlug, categories]);

  // Toggle Category Accordion
  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Toggle Sub-Category Accordion
  const toggleSub = (subId: string) => {
    setExpandedSubs(prev => ({ ...prev, [subId]: !prev[subId] }));
  };

  // Find currently active category object for banner display
  const activeCategoryObj = useMemo(() => {
    if (!selectedCategory) return null;
    return categories.find(
      c => (c.slug || c.name).toLowerCase() === selectedCategory.toLowerCase() || c.id === selectedCategory
    ) || null;
  }, [selectedCategory, categories]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      // 1. Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = (p.description || '').toLowerCase().includes(q);
        const matchesCat = (p.category || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // 2. Main Category filter
      if (selectedCategory) {
        const catTarget = activeCategoryObj ? activeCategoryObj.name.toLowerCase() : selectedCategory.toLowerCase();
        const prodCat = (p.category || '').toLowerCase();
        if (prodCat !== catTarget && (p.category !== selectedCategory)) return false;
      }

      // 3. Sub-Category filter
      if (selectedSubCategory) {
        const prodSub = (p.subcategory || '').toLowerCase();
        if (prodSub !== selectedSubCategory.toLowerCase()) return false;
      }

      // 4. Sub-Sub-Category filter
      if (selectedSubSubCategory) {
        const prodSubSub = (p.subSubCategory || '').toLowerCase();
        if (prodSubSub !== selectedSubSubCategory.toLowerCase()) return false;
      }

      return true;
    });
  }, [initialProducts, searchQuery, selectedCategory, selectedSubCategory, selectedSubSubCategory, activeCategoryObj]);

  const handleSelectAll = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedSubSubCategory('');
  };

  const handleSelectCategory = (cat: Category) => {
    const slug = cat.slug || cat.name;
    const catId = cat.id || cat.slug;
    setSelectedCategory(slug);
    setSelectedSubCategory('');
    setSelectedSubSubCategory('');
    setExpandedCategories(prev => ({ ...prev, [catId]: true }));
  };

  const handleSelectSub = (subName: string, subId: string) => {
    setSelectedSubCategory(subName);
    setSelectedSubSubCategory('');
    setExpandedSubs(prev => ({ ...prev, [subId]: true }));
  };

  const handleSelectSubSub = (subSubName: string) => {
    setSelectedSubSubCategory(subSubName);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Products Catalog</span>
            {activeCategoryObj && (
              <>
                <span>/</span>
                <span className="text-emerald-600 font-bold">{activeCategoryObj.name}</span>
              </>
            )}
            {selectedSubCategory && (
              <>
                <span>/</span>
                <span className="text-slate-700">{selectedSubCategory}</span>
              </>
            )}
            {selectedSubSubCategory && (
              <>
                <span>/</span>
                <span className="text-slate-900 font-semibold">{selectedSubSubCategory}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeCategoryObj ? activeCategoryObj.name : 'ATS Electrical & Solar Catalog'}
            </h1>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{mobileFilterOpen ? 'Close Categories' : 'Filter Categories'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            LAYOUT: LEFT SIDEBAR (CATEGORIES ACCORDION) + RIGHT CONTENT
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================
              LEFT SIDEBAR: AUTHENTIC INDUSTRIAL CATALOG NAVIGATION (lg:col-span-3)
             ======================================================== */}
          <aside className={`lg:col-span-3 lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1 scrollbar-thin`}>
            
            {/* Quick Search Card (Modern Minimalist Form) */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                  Quick Search
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[10px] font-bold text-rose-600 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search catalog or specs..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Product Divisions & Categories Tree (Industrial Specification Style) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                  Product Divisions
                </span>
                {(selectedCategory || selectedSubCategory || selectedSubSubCategory || searchQuery) && (
                  <button
                    onClick={handleSelectAll}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              {/* All Products Item */}
              <div className="p-2 border-b border-slate-100">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                    !selectedCategory 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${!selectedCategory ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                    <span>All Product Lines</span>
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    !selectedCategory ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {initialProducts.length}
                  </span>
                </button>
              </div>

              {/* Main Categories Navigation */}
              <div className="p-2 space-y-1">
                {categories.map((cat) => {
                  const cId = cat.id || cat.slug;
                  const isCatActive = (selectedCategory.toLowerCase() === (cat.slug || cat.name).toLowerCase()) || (selectedCategory === cId);
                  const isExpanded = Boolean(expandedCategories[cId]);
                  const subs = cat.subCategoriesList || [];

                  return (
                    <div key={cId} className="rounded-xl overflow-hidden transition">
                      
                      {/* Main Category Row */}
                      <div
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                          isCatActive 
                            ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200/80 shadow-2xs' 
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        {/* Category Name Click */}
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(cat)}
                          className="flex-1 text-left text-xs font-semibold hover:text-emerald-700 flex items-center truncate pr-2 group"
                        >
                          <span className="truncate group-hover:translate-x-0.5 transition-transform">
                            {cat.name}
                          </span>
                        </button>

                        {/* Expand / Collapse Button if Subs exist */}
                        {subs.length > 0 && (
                          <button
                            type="button"
                            onClick={() => toggleCategory(cId)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition shrink-0 ml-1"
                            title={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-emerald-700' : ''}`} />
                          </button>
                        )}
                      </div>

                      {/* Sub-Categories (Level 2) Accordion Content */}
                      {isExpanded && subs.length > 0 && (
                        <div className="pl-4 pr-2 py-1.5 ml-3 my-1 border-l-2 border-slate-200 space-y-1">
                          {subs.map((sub) => {
                            const isSubActive = selectedSubCategory.toLowerCase() === sub.name.toLowerCase();
                            const subSubs = sub.subSubCategories || [];
                            const isSubExpanded = Boolean(expandedSubs[sub.id]);

                            return (
                              <div key={sub.id} className="py-0.5">
                                <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-50">
                                  <button
                                    type="button"
                                    onClick={() => handleSelectSub(sub.name, sub.id)}
                                    className={`flex-1 text-left text-[11px] transition truncate ${
                                      isSubActive 
                                        ? 'text-emerald-700 font-bold' 
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    <span className="truncate">{sub.name}</span>
                                  </button>

                                  {subSubs.length > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => toggleSub(sub.id)}
                                      className="p-0.5 text-slate-400 hover:text-slate-600 ml-1"
                                    >
                                      <ChevronDown className={`w-3 h-3 transition-transform ${isSubExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
                                    </button>
                                  )}
                                </div>

                                {/* Sub-Sub-Categories (Level 3) */}
                                {isSubExpanded && subSubs.length > 0 && (
                                  <div className="pl-3 py-1 space-y-1 border-l border-slate-200 ml-2 mt-0.5">
                                    {subSubs.map((subSub) => {
                                      const isSubSubActive = selectedSubSubCategory.toLowerCase() === subSub.name.toLowerCase();
                                      return (
                                        <button
                                          key={subSub.id}
                                          type="button"
                                          onClick={() => handleSelectSubSub(subSub.name)}
                                          className={`block w-full text-left text-[10px] py-1 px-2 rounded transition truncate ${
                                            isSubSubActive
                                              ? 'bg-emerald-100/70 text-emerald-900 font-bold'
                                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                                          }`}
                                        >
                                          • {subSub.name}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Status / Total Products */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>Showing:</span>
              <span className="font-bold text-slate-900">{filteredProducts.length} Items</span>
            </div>

          </aside>

          {/* ========================================================
              RIGHT CONTENT AREA: BANNER (TOP) + FILTER STATUS + PRODUCT GRID
             ======================================================== */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Category Banner (If category selected and has banner) */}
            {activeCategoryObj?.banner && (
              <div className="relative w-full aspect-[21/7] max-h-56 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-900">
                <img
                  src={activeCategoryObj.banner}
                  alt={activeCategoryObj.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    Category Division
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    {activeCategoryObj.name}
                  </h2>
                  {activeCategoryObj.description && (
                    <p className="text-xs text-slate-200 line-clamp-1 mt-1 max-w-xl">
                      {activeCategoryObj.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Active Filter Tags Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
                  <Filter className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Filtered By:</span>
                </span>

                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                  <span>{activeCategoryObj ? activeCategoryObj.name : 'All Products'}</span>
                  {activeCategoryObj && (
                    <button onClick={handleSelectAll} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>

                {selectedSubCategory && (
                  <span className="text-xs bg-blue-50 text-blue-800 font-semibold px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1.5">
                    <span>{selectedSubCategory}</span>
                    <button onClick={() => setSelectedSubCategory('')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedSubSubCategory && (
                  <span className="text-xs bg-amber-50 text-amber-900 font-semibold px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1.5">
                    <span>{selectedSubSubCategory}</span>
                    <button onClick={() => setSelectedSubSubCategory('')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="text-xs bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5">
                    <span>Search: &quot;{searchQuery}&quot;</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <div className="text-xs font-semibold text-slate-500">
                Found <strong className="text-slate-900">{filteredProducts.length}</strong> Products
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-xs">
                <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">No products found</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto mb-4">
                  We couldn&apos;t find any items matching your current category or search criteria.
                </p>
                <button
                  onClick={handleSelectAll}
                  className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-sm transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={idx} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
