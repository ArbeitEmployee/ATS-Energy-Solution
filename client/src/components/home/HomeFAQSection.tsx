'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { fallbackFAQs } from '@/lib/data';
import { getSetting } from '@/lib/api';
import { FAQItem } from '@/types';

interface HomeFAQSectionProps {
  initialFaqs?: FAQItem[];
}

export default function HomeFAQSection({ initialFaqs }: HomeFAQSectionProps) {
  const [faqs, setFaqs] = useState<FAQItem[]>(
    initialFaqs && initialFaqs.length > 0 ? initialFaqs : fallbackFAQs
  );
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  useEffect(() => {
    if (initialFaqs && initialFaqs.length > 0) {
      setFaqs(initialFaqs);
      return;
    }
    getSetting<FAQItem[]>('faqs').then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setFaqs(data);
      }
    });
  }, [initialFaqs]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-16 sm:py-24 bg-[#f8fbfa] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Side: Bold Corporate FAQ Typography (No image, exact reference layout) */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            <h2 className="text-5xl sm:text-7xl font-black text-slate-950 tracking-tight leading-none">
              FAQ<span className="text-emerald-500">.</span>
            </h2>

            <div className="pt-6 hidden lg:block border-t border-slate-200/80 max-w-xs space-y-2">
              <p className="text-xs text-slate-600 leading-relaxed">
                Have a specific commercial inquiry or custom technical specification requirement?
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline pt-1"
              >
                <span>Contact Engineering Team →</span>
              </a>
            </div>
          </div>

          {/* Right Side: Clean Minimalist Accordion List (Matching Reference) */}
          <div className="lg:col-span-8 space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.id || faq._id || idx}
                  className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs transition-all duration-200 hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-left group"
                  >
                    <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide group-hover:text-emerald-700 transition-colors leading-snug">
                      {faq.question}
                    </span>

                    <span className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
