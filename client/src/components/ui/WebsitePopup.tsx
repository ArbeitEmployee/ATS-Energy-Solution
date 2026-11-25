'use client';

import { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { PopupSettings } from '@/types';
import { fallbackPopupSettings } from '@/lib/data';
import { submitInquiry } from '@/lib/api';
import Link from 'next/link';

export default function WebsitePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState<PopupSettings>(fallbackPopupSettings);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    // Only show on client
    try {
      const saved = localStorage.getItem('ats_custom_popup');
      let currentPopup: PopupSettings = fallbackPopupSettings;
      if (saved) {
        currentPopup = JSON.parse(saved);
      }
      setPopup(currentPopup);

      // Check if user already dismissed popup in this session
      const alreadyClosed = sessionStorage.getItem('ats_popup_closed');

      // If enabled and not closed in current session, open popup after 800ms
      if (currentPopup.isEnabled && alreadyClosed !== 'true') {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Listen to cross-tab storage events or custom trigger to preview instantly
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ats_custom_popup' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setPopup(parsed);
          if (parsed.isEnabled) {
            setIsOpen(true);
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('ats_popup_closed', 'true');
    } catch (e) {}
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your Name and Phone Number');
      return;
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      company: location.trim() ? `Location: ${location.trim()}` : undefined,
      productOfInterest: 'Quotation Popup Request',
      message: details.trim() || 'Inquiry received via Website Popup Form'
    };

    try {
      // 1. Submit to Backend MongoDB API
      await submitInquiry(payload);

      // 2. Also save to localStorage for instant client dashboard display
      const newInquiry = {
        _id: 'inq_' + Date.now(),
        ...payload,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      const existing = localStorage.getItem('ats_custom_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newInquiry);
      localStorage.setItem('ats_custom_inquiries', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setDetails('');
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!isOpen || !popup.isEnabled) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in overflow-y-auto">
      
      {/* ========================================================
          TYPE 1: IMAGE POPUP
         ======================================================== */}
      {popup.type === 'image' && (
        <div className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 my-auto">
          {/* Close Cross Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition shadow-lg cursor-pointer"
            title="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          {popup.imageLinkUrl ? (
            <Link href={popup.imageLinkUrl} onClick={handleClose} className="block group">
              <img
                src={popup.imageUrl}
                alt="Special Notice / Offer"
                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl group-hover:opacity-95 transition"
              />
            </Link>
          ) : (
            <img
              src={popup.imageUrl}
              alt="Special Notice / Offer"
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
            />
          )}
        </div>
      )}

      {/* ========================================================
          TYPE 2: FORM POPUP (ATS Official Industrial Brand Design)
         ======================================================== */}
      {popup.type === 'form' && (
        <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 my-auto max-h-[90vh] flex flex-col">
          
          {/* Header Banner - ATS Official Slate & Emerald Theme */}
          <div className="bg-slate-900 px-5 py-4 sm:px-6 sm:py-5 text-white relative shrink-0">
            {/* Close Cross Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight pr-8">
              {popup.formTitle || 'Request an Official Quotation'}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 max-w-sm leading-relaxed pr-6">
              {popup.formSubtitle || 'Please fill out this form with your requirement details. Our team will contact you shortly.'}
            </p>
          </div>

          {/* Form Body */}
          <div className="p-4 sm:p-6 bg-white overflow-y-auto flex-1">
            {submitted ? (
              <div className="text-center py-6 sm:py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Thank You!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Your quotation inquiry has been successfully submitted. Our team will contact you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-bold uppercase text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-bold uppercase text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="tanvir@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-bold uppercase text-slate-700 mb-1">Location / District</label>
                    <input
                      type="text"
                      placeholder="e.g. Dhaka, Chittagong"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase text-slate-700 mb-1">Requirement Details</label>
                  <textarea
                    rows={2}
                    placeholder="Mention product models, quantity, or requirements..."
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none bg-slate-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{popup.submitButtonText || 'Submit Quotation Request'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
