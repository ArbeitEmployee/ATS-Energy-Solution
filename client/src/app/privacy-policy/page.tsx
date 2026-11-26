'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fallbackLegalContent } from '@/lib/data';
import { getSetting } from '@/lib/api';
import { Shield, ChevronRight, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [legal, setLegal] = useState(fallbackLegalContent);

  useEffect(() => {
    getSetting<typeof fallbackLegalContent>('legal').then((data) => {
      if (data) setLegal(data);
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">{legal.privacyTitle || 'Privacy Policy'}</span>
        </nav>

        {/* Card Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {legal.privacyTitle || 'Privacy Policy'}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Last updated: {legal.privacyLastUpdated || 'November 2026'}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 my-6" />

          {/* Body */}
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {legal.privacyContent}
          </div>

          <div className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-600">
              ATS Energy Solutions respects your privacy and is committed to protecting your corporate & personal information.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
