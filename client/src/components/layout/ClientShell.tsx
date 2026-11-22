'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOMetaInjector from "@/components/seo/SEOMetaInjector";
import WebsitePopup from "@/components/ui/WebsitePopup";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    // Isolated Clean Admin Shell with Crisp Professional Light Theme
    return <main className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-slate-950">
      <SEOMetaInjector />
      <WebsitePopup />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
