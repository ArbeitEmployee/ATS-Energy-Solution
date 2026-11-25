'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { submitInquiry } from '@/lib/api';

const DEFAULT_CONTACT_INFO = {
  address: 'Sonali Neer, Holding-615/9/1, Bosila Road, Mohammadpur, Dhaka-1207, Bangladesh',
  phone: '+880 1848-160565 / +880 1711-703541',
  hotline: '+880 1848 160565',
  email: 'info@atsenergybd.com',
  hours: 'Saturday - Thursday: 9:00 AM – 7:00 PM'
};

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT_INFO);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ats_custom_contact_info');
      if (saved) {
        setContactInfo({ ...DEFAULT_CONTACT_INFO, ...JSON.parse(saved) });
      }
    } catch (e) {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ats_custom_contact_info' && e.newValue) {
        try {
          setContactInfo({ ...DEFAULT_CONTACT_INFO, ...JSON.parse(e.newValue) });
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productOfInterest: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry(formData);
      
      const newInquiry = {
        _id: 'inq_' + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        productOfInterest: formData.productOfInterest || 'General Contact Inquiry',
        message: formData.message,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      const existing = localStorage.getItem('ats_custom_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newInquiry);
      localStorage.setItem('ats_custom_inquiries', JSON.stringify(list));

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        productOfInterest: '',
        message: ''
      });
    } catch (err) {
      alert('Failed to submit inquiry. Please try again or call our hotline.');
    } finally {
      setSubmitting(false);
    }
  };

  const encodedMapAddress = encodeURIComponent(contactInfo.address);

  return (
    <div className="bg-[#FAFBFB] min-h-screen font-sans">
      
      {/* ========================================================
          1. SUNCOR EXACT BREADCRUMB SECTION (breadcrumb-wrapper bg-color1)
         ======================================================== */}
      <section className="relative bg-[#053F33] overflow-hidden">
        {/* Soft Decorative Ambient Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="pt-24 pb-20 sm:pt-36 sm:pb-28 flex flex-col md:flex-row items-center justify-between gap-6 relative">
            
            {/* Title & Path */}
            <div className="text-left space-y-2.5 z-10 max-w-xl">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
                Contact
              </h1>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
                <span>/</span>
                <span className="text-[#6F9700] font-semibold">Contact</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300/90 font-normal pt-1 leading-relaxed">
                Reach out for institutional quotations, dealer partnerships, and certified electrical engineering solutions.
              </p>
            </div>

            {/* Suncor Breadcrumb Solar/Wind Turbine Illustrated Thumb */}
            <div className="shrink-0 z-10 max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
              <img
                src="/assets/images/intro/breadcrumb-thumb.png"
                alt="Suncor Renewable Energy"
                className="w-full h-auto drop-shadow-xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. SUNCOR TOP CONTACT INFO CARDS (Email & Mobile Side-by-Side)
         ======================================================== */}
      <section className="pt-10 sm:pt-14 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* E-mail Card */}
            <div className="bg-white rounded-[20px] p-6 sm:p-7 flex items-center gap-5 shadow-[0px_4.4px_20px_-1px_rgba(19,16,34,0.06)] border border-slate-100/80 hover:shadow-lg transition-all duration-300">
              <div className="w-[55px] h-[55px] rounded-full bg-[#F2F9EB] flex items-center justify-center shrink-0">
                <img 
                  src="/assets/images/icon/mail-icon.svg" 
                  alt="E-mail" 
                  className="w-6 h-6"
                />
              </div>
              <div className="min-w-0">
                <p className="text-slate-500 text-sm font-light mb-1">E-mail</p>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-[#053F33] text-base sm:text-lg font-bold hover:text-[#6F9700] transition block truncate"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Mobile Card */}
            <div className="bg-white rounded-[20px] p-6 sm:p-7 flex items-center gap-5 shadow-[0px_4.4px_20px_-1px_rgba(19,16,34,0.06)] border border-slate-100/80 hover:shadow-lg transition-all duration-300">
              <div className="w-[55px] h-[55px] rounded-full bg-[#F2F9EB] flex items-center justify-center shrink-0">
                <img 
                  src="/assets/images/icon/call-icon.svg" 
                  alt="Call" 
                  className="w-6 h-6"
                />
              </div>
              <div className="min-w-0">
                <p className="text-slate-500 text-sm font-light mb-1">Mobile</p>
                <a 
                  href={`tel:${contactInfo.hotline.replace(/\s+/g, '')}`}
                  className="text-[#053F33] text-base sm:text-lg font-bold hover:text-[#6F9700] transition block"
                >
                  {contactInfo.hotline}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. ADDRESS CARD & GET IN TOUCH FORM SIDE-BY-SIDE (50% Overlapping Map)
         ======================================================== */}
      <section className="relative z-20 pointer-events-none pt-5 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-[-180px] sm:mb-[-200px]">
            
            {/* Left: Address Card (Directly below Email with tight gap) */}
            <div className="lg:col-span-6 bg-white rounded-[20px] p-6 sm:p-7 flex items-center gap-5 shadow-[0px_4.4px_20px_-1px_rgba(19,16,34,0.06)] border border-slate-100/80 hover:shadow-lg transition-all duration-300 pointer-events-auto">
              <div className="w-[55px] h-[55px] rounded-full bg-[#F2F9EB] flex items-center justify-center shrink-0">
                <img 
                  src="/assets/images/icon/location-icon.svg" 
                  alt="Location" 
                  className="w-6 h-6"
                />
              </div>
              <div className="min-w-0">
                <p className="text-slate-500 text-sm font-light mb-1">Address</p>
                <h4 className="text-[#053F33] text-base sm:text-lg font-bold leading-snug">
                  {contactInfo.address}
                </h4>
              </div>
            </div>

            {/* Right: The Compact White Floating Form (50% Over Map) */}
            <div className="lg:col-span-6 bg-white rounded-[24px] border border-slate-200/90 shadow-[0px_10px_50px_rgba(0,0,0,0.12)] p-6 sm:p-8 pointer-events-auto relative z-20">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#053F33] mb-6 capitalize tracking-tight">
                Get In Touch
              </h2>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-[#F2F9EB] text-[#053F33] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-[#053F33]">Thank You!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Your message has been received. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-6 py-2.5 bg-[#053F33] text-white rounded-full font-medium text-xs hover:bg-[#032b23] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-2.5 rounded-full border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#6F9700] transition"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-2.5 rounded-full border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#6F9700] transition"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-2.5 rounded-full border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#6F9700] transition"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Company (Optional)"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-5 py-2.5 rounded-full border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#6F9700] transition"
                      />
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Message here.."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-3 rounded-2xl border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#6F9700] transition resize-none"
                    />
                  </div>

                  {/* Suncor Sent Now Button with white-arrow.svg (#053F33) */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#053F33] hover:bg-[#032b23] text-white text-sm font-semibold transition duration-300 shadow-md cursor-pointer"
                    >
                      <span>{submitting ? 'Sending...' : 'Sent Now'}</span>
                      <img
                        src="/assets/images/icon/white-arrow.svg"
                        alt="arrow"
                        className="w-3.5 h-3.5"
                      />
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. INTERACTIVE FULL-WIDTH GOOGLE MAP (Accessible & Accurate)
         ======================================================== */}
      <section className="w-full relative z-0">
        <div className="w-full h-[520px] sm:h-[600px] relative">
          <iframe
            title="ATS Energy Official Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Sonali+Neer,+Bosila+Road,+Mohammadpur,+Dhaka-1207,+Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </section>

    </div>
  );
}
