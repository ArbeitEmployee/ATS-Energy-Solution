'use client';

import { useEffect } from 'react';
import { fallbackSEO } from '@/lib/data';

export default function SEOMetaInjector() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ats_custom_seo');
      const seo = saved ? JSON.parse(saved) : fallbackSEO;

      if (seo) {
        if (seo.metaTitle) {
          document.title = seo.metaTitle;
        }

        const updateOrCreateMeta = (name: string, content: string, isProperty = false) => {
          if (!content) return;
          const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
          let el = document.querySelector(selector);
          if (!el) {
            el = document.createElement('meta');
            if (isProperty) el.setAttribute('property', name);
            else el.setAttribute('name', name);
            document.head.appendChild(el);
          }
          el.setAttribute('content', content);
        };

        updateOrCreateMeta('description', seo.metaDescription);
        updateOrCreateMeta('keywords', seo.metaKeywords);
        updateOrCreateMeta('author', seo.author || 'ATS Energy Solutions');
        updateOrCreateMeta('og:title', seo.metaTitle, true);
        updateOrCreateMeta('og:description', seo.metaDescription, true);
        updateOrCreateMeta('og:image', seo.ogImage, true);
        updateOrCreateMeta('og:url', seo.canonicalUrl || 'https://atsenergybd.com', true);

        if (seo.googleSiteVerification) {
          updateOrCreateMeta('google-site-verification', seo.googleSiteVerification);
        }
      }
    } catch (e) {
      console.error('Error injecting SEO meta:', e);
    }
  }, []);

  return null;
}
