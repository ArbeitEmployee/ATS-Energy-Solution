'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  PlusCircle, 
  Trash2, 
  LogOut, 
  MessageSquare, 
  ExternalLink,
  Image as ImageIcon,
  FolderTree,
  Upload,
  ChevronRight,
  Folder,
  FolderPlus,
  GitFork,
  X,
  Layers,
  Edit2,
  Wrench,
  Quote,
  Building2,
  Star,
  Info,
  Share2,
  Search,
  FileText,
  BellRing,
  Menu,
  HelpCircle
} from 'lucide-react';
import { Product, Attribute, Banner, Category, SubCategory, SubSubCategory, ServiceItem, PartnerReview, KeyClient, AboutContent, SocialMediaLinks, SEOMetadata, LegalContent, PopupSettings, Inquiry, FAQItem } from '@/types';
import { fallbackProducts, initialBanners, fallbackCategories, fallbackServices, fallbackPartnerReviews, fallbackKeyClients, fallbackAboutContent, fallbackSocialMedia, fallbackSEO, fallbackLegalContent, fallbackPopupSettings, fallbackFAQs, atsOfficialLogo } from '@/lib/data';
import { getInquiries, updateInquiryStatus } from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [partnerReviews, setPartnerReviews] = useState<PartnerReview[]>(fallbackPartnerReviews);
  const [keyClients, setKeyClients] = useState<KeyClient[]>(fallbackKeyClients);
  const [aboutData, setAboutData] = useState<AboutContent>(fallbackAboutContent);
  const [socials, setSocials] = useState<SocialMediaLinks>(fallbackSocialMedia);
  const [seo, setSeo] = useState<SEOMetadata>(fallbackSEO);
  const [legalData, setLegalData] = useState<LegalContent>(fallbackLegalContent);
  const [popupData, setPopupData] = useState<PopupSettings>(fallbackPopupSettings);
  const [faqs, setFaqs] = useState<FAQItem[]>(fallbackFAQs);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'categories' | 'sub-categories' | 'sub-sub-categories' | 'about-page' | 'services' | 'partner-reviews' | 'key-clients' | 'socials' | 'seo' | 'legal-pages' | 'popup-settings' | 'banners' | 'products' | 'new-product' | 'inquiries' | 'faqs'
  >('socials');

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal State for adding items cleanly
  const [showCatModal, setShowCatModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showSubSubModal, setShowSubSubModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingProductSlug, setEditingProductSlug] = useState<string | null>(null);

  // Form State: Partner Reviews
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewDesignation, setReviewDesignation] = useState('');
  const [reviewQuote, setReviewQuote] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  // Form State: Key Clients
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientLogo, setClientLogo] = useState('');
  const [clientWebsite, setClientWebsite] = useState('');

  // Form State: Service (Title, Description, Image, Secondary Image)
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceImage, setServiceImage] = useState('');
  const [serviceSecondaryImage, setServiceSecondaryImage] = useState('');

  // Form State: Category (Name, Image, Banner)
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');
  const [catBanner, setCatBanner] = useState('');

  // Form State: Sub-Category (Target Category, Sub-Category Name)
  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [subTargetCatId, setSubTargetCatId] = useState('');
  const [subName, setSubName] = useState('');

  // Form State: Sub-Sub-Category (Target Category, Target Sub-Category, Sub-Sub Name)
  const [editingSubSubId, setEditingSubSubId] = useState<string | null>(null);
  const [subSubTargetCatId, setSubSubTargetCatId] = useState('');
  const [subSubTargetSubId, setSubSubTargetSubId] = useState('');
  const [subSubName, setSubSubName] = useState('');

  // Form State: Banners
  const [editingBannerIdx, setEditingBannerIdx] = useState<number | null>(null);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerLink, setBannerLink] = useState('');

  // Product Showcase Banner (Banner shown above products in Home)
  const [productSectionBanner, setProductSectionBanner] = useState('');
  const [productSectionBannerLink, setProductSectionBannerLink] = useState('');

  // Form State: Products
  const [name, setName] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodSubCategory, setProdSubCategory] = useState('');
  const [prodSubSubCategory, setProdSubSubCategory] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentExtraInput, setCurrentExtraInput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [productSizes, setProductSizes] = useState('');
  const [productColors, setProductColors] = useState('');
  const [productWarranty, setProductWarranty] = useState('18 Months Replacement');
  const [productBrand, setProductBrand] = useState('ATS Energy');
  const [featured, setFeatured] = useState(false);
  const [featuresList, setFeaturesList] = useState<string[]>([
    'Heavy Duty ATS Industrial Grade',
    'Certified BSTI & BCSIR Standard',
    'Long-life Energy Saving Guarantee'
  ]);
  const [attributes, setAttributes] = useState<Attribute[]>([
    { key: 'Wattage', value: '18 Watt' },
    { key: 'Voltage', value: 'AC 160V-260V' },
    { key: 'Body Material', value: 'Polycarbonate / Aluminum' }
  ]);

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [inquirySearch, setInquirySearch] = useState('');

  // Filter inquiries memo/calculation
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      const isNew = inq.status === 'new' || !inq.status;
      if (inquiryFilter === 'new' && !isNew) return false;
      if (inquiryFilter === 'contacted' && inq.status !== 'contacted') return false;
      if (inquiryFilter === 'closed' && inq.status !== 'closed') return false;

      if (inquirySearch && inquirySearch.trim()) {
        const q = inquirySearch.trim().toLowerCase();
        const str = `${inq.name || ''} ${inq.phone || ''} ${inq.email || ''} ${inq.company || ''} ${inq.productOfInterest || ''} ${inq.message || ''}`.toLowerCase();
        return str.includes(q);
      }
      return true;
    });
  }, [inquiries, inquiryFilter, inquirySearch]);

  // Load inquiries from Backend API and LocalStorage
  const loadInquiries = async () => {
    setLoadingInquiries(true);
    let loaded: Inquiry[] = [];
    try {
      const res = await getInquiries();
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        loaded = res.data;
      }
    } catch (e) {
      console.error(e);
    }

    try {
      const local = localStorage.getItem('ats_custom_inquiries');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge unique by phone/name or id
          const existingIds = new Set(loaded.map(i => i._id || i.id));
          parsed.forEach((item: Inquiry) => {
            const id = item._id || item.id;
            if (!existingIds.has(id)) {
              loaded.unshift(item);
              existingIds.add(id);
            }
          });
        }
      }
    } catch (e) {
      console.error(e);
    }

    setInquiries(loaded);
    setLoadingInquiries(false);
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      await updateInquiryStatus(id, newStatus);
    } catch (e) {}

    const updated = inquiries.map(inq => 
      (inq._id === id || inq.id === id) ? { ...inq, status: newStatus as any } : inq
    );
    setInquiries(updated);
    try {
      localStorage.setItem('ats_custom_inquiries', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Are you sure you want to remove this inquiry?')) {
      const updated = inquiries.filter(inq => inq._id !== id && inq.id !== id);
      setInquiries(updated);
      try {
        localStorage.setItem('ats_custom_inquiries', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // Load from Storage
  useEffect(() => {
    const token = localStorage.getItem('ats_admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const savedBanners = localStorage.getItem('ats_custom_banners');
    if (savedBanners) {
      try {
        setBanners(JSON.parse(savedBanners));
      } catch (e) {
        setBanners(initialBanners);
      }
    } else {
      setBanners(initialBanners);
    }

    const savedServices = localStorage.getItem('ats_custom_services');
    if (savedServices) {
      try {
        const parsedSrv = JSON.parse(savedServices);
        if (Array.isArray(parsedSrv) && parsedSrv.length > 0) {
          setServices(parsedSrv);
        } else {
          setServices(fallbackServices);
        }
      } catch (e) {
        setServices(fallbackServices);
      }
    } else {
      setServices(fallbackServices);
    }

    const savedReviews = localStorage.getItem('ats_custom_partner_reviews');
    if (savedReviews) {
      try {
        const parsedRev = JSON.parse(savedReviews);
        if (Array.isArray(parsedRev) && parsedRev.length > 0) {
          setPartnerReviews(parsedRev);
        } else {
          setPartnerReviews(fallbackPartnerReviews);
        }
      } catch (e) {
        setPartnerReviews(fallbackPartnerReviews);
      }
    } else {
      setPartnerReviews(fallbackPartnerReviews);
    }

    const savedClients = localStorage.getItem('ats_custom_key_clients');
    if (savedClients) {
      try {
        const parsedCli = JSON.parse(savedClients);
        if (Array.isArray(parsedCli) && parsedCli.length > 0) {
          setKeyClients(parsedCli);
        } else {
          setKeyClients(fallbackKeyClients);
        }
      } catch (e) {
        setKeyClients(fallbackKeyClients);
      }
    } else {
      setKeyClients(fallbackKeyClients);
    }

    const savedAbout = localStorage.getItem('ats_custom_about');
    if (savedAbout) {
      try {
        const parsedAbout = JSON.parse(savedAbout);
        if (parsedAbout && parsedAbout.title) {
          setAboutData(parsedAbout);
        } else {
          setAboutData(fallbackAboutContent);
        }
      } catch (e) {
        setAboutData(fallbackAboutContent);
      }
    } else {
      setAboutData(fallbackAboutContent);
    }

    const savedSocials = localStorage.getItem('ats_custom_socials');
    if (savedSocials) {
      try {
        const parsedSoc = JSON.parse(savedSocials);
        if (parsedSoc) setSocials(parsedSoc);
      } catch (e) {
        setSocials(fallbackSocialMedia);
      }
    } else {
      setSocials(fallbackSocialMedia);
    }

    const savedSEO = localStorage.getItem('ats_custom_seo');
    if (savedSEO) {
      try {
        const parsedSEO = JSON.parse(savedSEO);
        if (parsedSEO) setSeo(parsedSEO);
      } catch (e) {
        setSeo(fallbackSEO);
      }
    } else {
      setSeo(fallbackSEO);
    }

    const savedLegal = localStorage.getItem('ats_custom_legal');
    if (savedLegal) {
      try {
        const parsedLegal = JSON.parse(savedLegal);
        if (parsedLegal && parsedLegal.termsTitle) setLegalData(parsedLegal);
      } catch (e) {
        setLegalData(fallbackLegalContent);
      }
    } else {
      setLegalData(fallbackLegalContent);
    }

    const savedPopup = localStorage.getItem('ats_custom_popup');
    if (savedPopup) {
      try {
        const parsedPop = JSON.parse(savedPopup);
        if (parsedPop) setPopupData(parsedPop);
      } catch (e) {
        setPopupData(fallbackPopupSettings);
      }
    } else {
      setPopupData(fallbackPopupSettings);
    }

    const savedFaqs = localStorage.getItem('ats_custom_faqs');
    if (savedFaqs) {
      try {
        const parsedF = JSON.parse(savedFaqs);
        if (Array.isArray(parsedF) && parsedF.length > 0) setFaqs(parsedF);
      } catch (e) {
        setFaqs(fallbackFAQs);
      }
    } else {
      setFaqs(fallbackFAQs);
    }

    const savedProdBanner = localStorage.getItem('ats_product_section_banner');
    if (savedProdBanner) {
      setProductSectionBanner(savedProdBanner);
    } else {
      setProductSectionBanner('https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.37-1-768x305.jpeg');
    }
    const savedProdBannerLink = localStorage.getItem('ats_product_section_banner_link');
    if (savedProdBannerLink) {
      setProductSectionBannerLink(savedProdBannerLink);
    } else {
      setProductSectionBannerLink('/products');
    }

    const savedCategories = localStorage.getItem('ats_custom_categories');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
          setSubTargetCatId(parsed[0].id || parsed[0].slug);
          setSubSubTargetCatId(parsed[0].id || parsed[0].slug);
          setProdCategory(parsed[0].name);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (e) {
        setCategories(fallbackCategories);
      }
    } else {
      setCategories(fallbackCategories);
      setSubTargetCatId(fallbackCategories[0].id || fallbackCategories[0].slug);
      setSubSubTargetCatId(fallbackCategories[0].id || fallbackCategories[0].slug);
      setProdCategory(fallbackCategories[0].name);
    }

    loadInquiries();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ats_admin_token');
    localStorage.removeItem('ats_admin_user');
    router.push('/admin/login');
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size: if larger than 2MB, compress using canvas
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1200;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setter(compressedDataUrl);
        } else {
          setter(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // 1. ADD / EDIT PRIMARY CATEGORY
  const handleOpenAddCategory = () => {
    setEditingCatId(null);
    setCatName('');
    setCatImage('');
    setCatBanner('');
    setShowCatModal(true);
  };

  const handleOpenEditCategory = (cat: Category) => {
    setEditingCatId(cat.id || cat.slug);
    setCatName(cat.name);
    setCatImage(cat.image || '');
    setCatBanner(cat.banner || '');
    setShowCatModal(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) {
      alert('Category Name is required!');
      return;
    }

    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let updated: Category[] = [];

    if (editingCatId) {
      updated = categories.map(cat => {
        if ((cat.id || cat.slug) === editingCatId) {
          return {
            ...cat,
            name: catName.trim(),
            image: catImage || cat.image,
            banner: catBanner || cat.banner
          };
        }
        return cat;
      });
      alert('Category updated successfully!');
    } else {
      const newCategory: Category = {
        id: `cat_${Date.now()}`,
        name: catName.trim(),
        slug,
        image: catImage || 'https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19.jpeg',
        banner: catBanner || 'https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-2-768x305.jpeg',
        subCategoriesList: []
      };
      updated = [...categories, newCategory];
      alert('Category added successfully!');
    }

    setCategories(updated);
    localStorage.setItem('ats_custom_categories', JSON.stringify(updated));

    setShowCatModal(false);
    setEditingCatId(null);
    setCatName('');
    setCatImage('');
    setCatBanner('');
  };

  const handleDeleteCategory = (catId: string) => {
    if (confirm('Are you sure you want to delete this Category?')) {
      const updated = categories.filter(c => (c.id || c.slug) !== catId);
      setCategories(updated);
      localStorage.setItem('ats_custom_categories', JSON.stringify(updated));
    }
  };

  // 2. ADD / EDIT SUB-CATEGORY
  const handleOpenAddSubCategory = () => {
    setEditingSubId(null);
    setSubName('');
    setShowSubModal(true);
  };

  const handleOpenEditSubCategory = (parentCatId: string, sub: SubCategory) => {
    setEditingSubId(sub.id);
    setSubTargetCatId(parentCatId);
    setSubName(sub.name);
    setShowSubModal(true);
  };

  const handleSaveSubCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTargetCatId || !subName.trim()) {
      alert('Please select a parent Category and provide Sub-Category Name!');
      return;
    }

    const subSlug = subName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let updated: Category[] = [];

    if (editingSubId) {
      updated = categories.map(cat => {
        if ((cat.id || cat.slug) === subTargetCatId) {
          const updatedSubs = (cat.subCategoriesList || []).map(s => {
            if (s.id === editingSubId) {
              return { ...s, name: subName.trim(), slug: subSlug };
            }
            return s;
          });
          return { ...cat, subCategoriesList: updatedSubs };
        }
        return cat;
      });
      alert('Sub-Category updated successfully!');
    } else {
      const newSub: SubCategory = {
        id: `sub_${Date.now()}`,
        name: subName.trim(),
        slug: subSlug,
        subSubCategories: []
      };
      updated = categories.map(cat => {
        if ((cat.id || cat.slug) === subTargetCatId) {
          return {
            ...cat,
            subCategoriesList: [...(cat.subCategoriesList || []), newSub]
          };
        }
        return cat;
      });
      alert('Sub-Category added successfully!');
    }

    setCategories(updated);
    localStorage.setItem('ats_custom_categories', JSON.stringify(updated));

    setShowSubModal(false);
    setEditingSubId(null);
    setSubName('');
  };

  const handleDeleteSubCategory = (catId: string, subId: string) => {
    if (confirm('Delete this Sub-Category?')) {
      const updated = categories.map(cat => {
        if ((cat.id || cat.slug) === catId) {
          return {
            ...cat,
            subCategoriesList: (cat.subCategoriesList || []).filter(s => s.id !== subId)
          };
        }
        return cat;
      });
      setCategories(updated);
      localStorage.setItem('ats_custom_categories', JSON.stringify(updated));
    }
  };

  // 3. ADD / EDIT SUB-SUB-CATEGORY
  const handleOpenAddSubSubCategory = () => {
    setEditingSubSubId(null);
    setSubSubName('');
    setShowSubSubModal(true);
  };

  const handleOpenEditSubSubCategory = (parentCatId: string, parentSubId: string, subSub: SubSubCategory) => {
    setEditingSubSubId(subSub.id);
    setSubSubTargetCatId(parentCatId);
    setSubSubTargetSubId(parentSubId);
    setSubSubName(subSub.name);
    setShowSubSubModal(true);
  };

  const handleSaveSubSubCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subSubTargetCatId || !subSubTargetSubId || !subSubName.trim()) {
      alert('Please choose Category, Sub-Category and enter Sub-Sub Name!');
      return;
    }

    const subSubSlug = subSubName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let updated: Category[] = [];

    if (editingSubSubId) {
      updated = categories.map(cat => {
        if ((cat.id || cat.slug) === subSubTargetCatId) {
          const updatedSubs = (cat.subCategoriesList || []).map(sub => {
            if (sub.id === subSubTargetSubId) {
              const updatedSubSubs = (sub.subSubCategories || []).map(ss => {
                if (ss.id === editingSubSubId) {
                  return { ...ss, name: subSubName.trim(), slug: subSubSlug };
                }
                return ss;
              });
              return { ...sub, subSubCategories: updatedSubSubs };
            }
            return sub;
          });
          return { ...cat, subCategoriesList: updatedSubs };
        }
        return cat;
      });
      alert('Sub-Sub-Category updated successfully!');
    } else {
      const newSubSub: SubSubCategory = {
        id: `subsub_${Date.now()}`,
        name: subSubName.trim(),
        slug: subSubSlug
      };
      updated = categories.map(cat => {
        if ((cat.id || cat.slug) === subSubTargetCatId) {
          const updatedSubs = (cat.subCategoriesList || []).map(sub => {
            if (sub.id === subSubTargetSubId) {
              return {
                ...sub,
                subSubCategories: [...(sub.subSubCategories || []), newSubSub]
              };
            }
            return sub;
          });
          return { ...cat, subCategoriesList: updatedSubs };
        }
        return cat;
      });
      alert('Sub-Sub-Category added successfully!');
    }

    setCategories(updated);
    localStorage.setItem('ats_custom_categories', JSON.stringify(updated));

    setShowSubSubModal(false);
    setEditingSubSubId(null);
    setSubSubName('');
  };

  const handleDeleteSubSubCategory = (catId: string, subId: string, subSubId: string) => {
    if (confirm('Delete this Sub-Sub-Category?')) {
      const updated = categories.map(cat => {
        if ((cat.id || cat.slug) === catId) {
          const updatedSubs = (cat.subCategoriesList || []).map(sub => {
            if (sub.id === subId) {
              return {
                ...sub,
                subSubCategories: (sub.subSubCategories || []).filter(ss => ss.id !== subSubId)
              };
            }
            return sub;
          });
          return { ...cat, subCategoriesList: updatedSubs };
        }
        return cat;
      });
      setCategories(updated);
      localStorage.setItem('ats_custom_categories', JSON.stringify(updated));
    }
  };

  // BANNER ADD / EDIT
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerImage) {
      alert('দয়া করে ব্যানার ছবি আপলোড করুন অথবা Image URL দিন!');
      return;
    }

    let updated: Banner[] = [];
    if (editingBannerIdx !== null) {
      updated = banners.map((b, i) => {
        if (i === editingBannerIdx) {
          return {
            ...b,
            title: bannerTitle.trim() || undefined,
            imageUrl: bannerImage,
            linkUrl: bannerLink.trim() || undefined
          };
        }
        return b;
      });
      alert('Banner updated successfully!');
      setEditingBannerIdx(null);
    } else {
      const newBanner: Banner = {
        title: bannerTitle.trim() || undefined,
        imageUrl: bannerImage,
        linkUrl: bannerLink.trim() || undefined,
        order: banners.length + 1,
        isActive: true
      };
      updated = [newBanner, ...banners];
      alert('Banner added successfully!');
    }

    setBanners(updated);
    localStorage.setItem('ats_custom_banners', JSON.stringify(updated));

    setBannerTitle('');
    setBannerImage('');
    setBannerLink('');
  };

  const handleEditBanner = (idx: number) => {
    const target = banners[idx];
    if (target) {
      setEditingBannerIdx(idx);
      setBannerTitle(target.title || '');
      setBannerImage(target.imageUrl || '');
      setBannerLink(target.linkUrl || '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCancelBannerEdit = () => {
    setEditingBannerIdx(null);
    setBannerTitle('');
    setBannerImage('');
    setBannerLink('');
  };

  const handleDeleteBanner = (idx: number) => {
    if (confirm('Are you sure you want to remove this banner?')) {
      const updated = banners.filter((_, i) => i !== idx);
      setBanners(updated);
      localStorage.setItem('ats_custom_banners', JSON.stringify(updated));
      if (editingBannerIdx === idx) {
        handleCancelBannerEdit();
      }
    }
  };

  const handleSaveProductSectionBanner = (e?: React.FormEvent | React.MouseEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!productSectionBanner) {
      alert('Please select or upload a banner image first!');
      return;
    }
    try {
      localStorage.setItem('ats_product_section_banner', productSectionBanner);
      localStorage.setItem('ats_product_section_banner_link', productSectionBannerLink || '/products');
      window.dispatchEvent(new Event('storage'));
      alert('✓ Products Catalog Section Banner updated successfully!');
    } catch (err: any) {
      console.error(err);
      if (err.name === 'QuotaExceededError' || err.code === 22) {
        alert('Image file is too large for storage. Please upload a smaller image file or paste an image URL.');
      } else {
        alert('Failed to save banner. Error: ' + (err.message || 'Unknown error'));
      }
    }
  };

  // SERVICES CRUD
  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceDesc('');
    setServiceImage('');
    setServiceSecondaryImage('');
    setShowServiceModal(true);
  };

  const handleOpenEditService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id || srv._id || null);
    setServiceTitle(srv.title);
    setServiceDesc(srv.description);
    setServiceImage(srv.image || '');
    setServiceSecondaryImage(srv.secondaryImage || '');
    setShowServiceModal(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle.trim() || !serviceDesc.trim()) {
      alert('Please fill in both Service Title and Description.');
      return;
    }

    let updatedList: ServiceItem[] = [];
    if (editingServiceId) {
      updatedList = services.map(s => 
        (s.id === editingServiceId || s._id === editingServiceId)
          ? {
              ...s,
              title: serviceTitle,
              description: serviceDesc,
              image: serviceImage || s.image,
              secondaryImage: serviceSecondaryImage || undefined
            }
          : s
      );
    } else {
      const newService: ServiceItem = {
        id: `srv_${Date.now()}`,
        title: serviceTitle,
        description: serviceDesc,
        image: serviceImage || 'https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.37-1-768x305.jpeg',
        secondaryImage: serviceSecondaryImage || undefined,
        link: '/contact'
      };
      updatedList = [newService, ...services];
    }

    setServices(updatedList);
    localStorage.setItem('ats_custom_services', JSON.stringify(updatedList));
    setShowServiceModal(false);
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceDesc('');
    setServiceImage('');
    setServiceSecondaryImage('');
  };

  const handleDeleteService = (targetId?: string) => {
    if (!targetId) return;
    if (confirm('Are you sure you want to delete this service?')) {
      const updated = services.filter(s => (s.id !== targetId && s._id !== targetId));
      setServices(updated);
      localStorage.setItem('ats_custom_services', JSON.stringify(updated));
    }
  };

  // PARTNER REVIEWS CRUD
  const handleOpenAddReview = () => {
    setEditingReviewId(null);
    setReviewAuthor('');
    setReviewDesignation('');
    setReviewQuote('');
    setReviewImage('');
    setReviewRating(5);
    setShowReviewModal(true);
  };

  const handleOpenEditReview = (rev: PartnerReview) => {
    setEditingReviewId(rev.id || rev._id || null);
    setReviewAuthor(rev.author);
    setReviewDesignation(rev.designation);
    setReviewQuote(rev.quote);
    setReviewImage(rev.image || '');
    setReviewRating(rev.rating || 5);
    setShowReviewModal(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewQuote.trim()) {
      alert('Please fill in Author/Company Name and Quote.');
      return;
    }

    let updated: PartnerReview[] = [];
    if (editingReviewId) {
      updated = partnerReviews.map(r => 
        (r.id === editingReviewId || r._id === editingReviewId)
          ? {
              ...r,
              author: reviewAuthor,
              designation: reviewDesignation,
              quote: reviewQuote,
              image: reviewImage || r.image,
              rating: reviewRating
            }
          : r
      );
    } else {
      const newReview: PartnerReview = {
        id: `rev_${Date.now()}`,
        author: reviewAuthor,
        designation: reviewDesignation,
        quote: reviewQuote,
        image: reviewImage || 'https://atsenergybd.com/wp-content/uploads/2026/11/PHOTO-2026-11-04-13-58-39.jpg',
        rating: reviewRating
      };
      updated = [newReview, ...partnerReviews];
    }

    setPartnerReviews(updated);
    localStorage.setItem('ats_custom_partner_reviews', JSON.stringify(updated));
    setShowReviewModal(false);
  };

  const handleDeleteReview = (targetId?: string) => {
    if (!targetId) return;
    if (confirm('Are you sure you want to delete this partner review?')) {
      const updated = partnerReviews.filter(r => (r.id !== targetId && r._id !== targetId));
      setPartnerReviews(updated);
      localStorage.setItem('ats_custom_partner_reviews', JSON.stringify(updated));
    }
  };

  // KEY CLIENTS CRUD
  const handleOpenAddClient = () => {
    setEditingClientId(null);
    setClientName('');
    setClientLogo('');
    setClientWebsite('');
    setShowClientModal(true);
  };

  const handleOpenEditClient = (cli: KeyClient) => {
    setEditingClientId(cli.id || cli._id || null);
    setClientName(cli.name);
    setClientLogo(cli.logo);
    setClientWebsite(cli.website || '');
    setShowClientModal(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientLogo.trim()) {
      alert('Please provide Client Name and Logo Image.');
      return;
    }

    let updated: KeyClient[] = [];
    if (editingClientId) {
      updated = keyClients.map(c => 
        (c.id === editingClientId || c._id === editingClientId)
          ? {
              ...c,
              name: clientName,
              logo: clientLogo,
              website: clientWebsite
            }
          : c
      );
    } else {
      const newClient: KeyClient = {
        id: `cli_${Date.now()}`,
        name: clientName,
        logo: clientLogo,
        website: clientWebsite
      };
      updated = [newClient, ...keyClients];
    }

    setKeyClients(updated);
    localStorage.setItem('ats_custom_key_clients', JSON.stringify(updated));
    setShowClientModal(false);
  };

  // FAQ CRUD
  const handleOpenAddFaq = () => {
    setEditingFaqId(null);
    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleOpenEditFaq = (f: FAQItem) => {
    setEditingFaqId(f.id || f._id || null);
    setFaqQuestion(f.question);
    setFaqAnswer(f.answer);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      alert('Please provide both FAQ Question and Answer.');
      return;
    }

    let updated: FAQItem[] = [];
    if (editingFaqId) {
      updated = faqs.map(f => 
        (f.id === editingFaqId || f._id === editingFaqId)
          ? { ...f, question: faqQuestion.trim(), answer: faqAnswer.trim() }
          : f
      );
      alert('FAQ updated successfully!');
    } else {
      const newFaq: FAQItem = {
        id: `faq_${Date.now()}`,
        question: faqQuestion.trim(),
        answer: faqAnswer.trim()
      };
      updated = [...faqs, newFaq];
      alert('FAQ added successfully!');
    }

    setFaqs(updated);
    localStorage.setItem('ats_custom_faqs', JSON.stringify(updated));
    setEditingFaqId(null);
    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleDeleteFaq = (targetId?: string) => {
    if (!targetId) return;
    if (confirm('Are you sure you want to delete this FAQ?')) {
      const updated = faqs.filter(f => (f.id !== targetId && f._id !== targetId));
      setFaqs(updated);
      localStorage.setItem('ats_custom_faqs', JSON.stringify(updated));
    }
  };

  const handleDeleteClient = (targetId?: string) => {
    if (!targetId) return;
    if (confirm('Are you sure you want to delete this key client logo?')) {
      const updated = keyClients.filter(c => (c.id !== targetId && c._id !== targetId));
      setKeyClients(updated);
      localStorage.setItem('ats_custom_key_clients', JSON.stringify(updated));
    }
  };

  // ABOUT CONTENT SAVE
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ats_custom_about', JSON.stringify(aboutData));
    alert('About Us page content successfully updated!');
  };

  // SOCIAL MEDIA SAVE
  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ats_custom_socials', JSON.stringify(socials));
    alert('Social media accounts updated successfully!');
  };

  // SEO METADATA SAVE
  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ats_custom_seo', JSON.stringify(seo));
    alert('SEO meta tags and settings successfully updated!');
  };

  const handleSaveLegal = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ats_custom_legal', JSON.stringify(legalData));
    alert('Terms & Conditions and Privacy Policy saved successfully!');
  };

  const handleSavePopup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ats_custom_popup', JSON.stringify(popupData));
    sessionStorage.removeItem('ats_popup_closed'); // Reset so admin can test live immediately
    localStorage.removeItem('ats_popup_closed');
    alert('Website Popup Settings saved successfully! (Popup enabled and ready)');
  };

  // PRODUCT CREATE
  const handleAddAttribute = () => setAttributes([...attributes, { key: '', value: '' }]);
  const handleRemoveAttribute = (idx: number) => setAttributes(attributes.filter((_, i) => i !== idx));
  const handleAttributeChange = (idx: number, field: 'key' | 'value', val: string) => {
    const updated = [...attributes];
    updated[idx][field] = val;
    setAttributes(updated);
  };

  // Dynamic Features List Handlers
  const handleAddFeature = () => setFeaturesList([...featuresList, '']);
  const handleRemoveFeature = (idx: number) => setFeaturesList(featuresList.filter((_, i) => i !== idx));
  const handleFeatureChange = (idx: number, val: string) => {
    const updated = [...featuresList];
    updated[idx] = val;
    setFeaturesList(updated);
  };

  // Dynamic Gallery Images (One single uploader with dynamic list underneath)
  const handleAddExtraImage = (imageSrc: string) => {
    if (!imageSrc || !imageSrc.trim()) return;
    setGalleryImages([...galleryImages, imageSrc.trim()]);
    setCurrentExtraInput('');
  };

  const handleRemoveExtraImage = (idx: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== idx));
  };

  // Video File Uploader Handler
  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert('Video file size exceeds 25MB. Please upload smaller video or paste a YouTube / MP4 URL.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Product name is required!');
      return;
    }
    if (!mainImage.trim()) {
      alert('Please provide or upload a Main Product Image!');
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Parse sizes & colors array from comma-separated input
    const parsedSizes = productSizes
      ? productSizes.split(/[,/|]+/).map(s => s.trim()).filter(Boolean)
      : [];
    const parsedColors = productColors
      ? productColors.split(/[,/|]+/).map(c => c.trim()).filter(Boolean)
      : [];

    const activeGallery = galleryImages.filter(img => img && img.trim().length > 0);
    const activeFeatures = featuresList.filter(f => f && f.trim().length > 0);

    let updated: Product[] = [];
    if (editingProductSlug) {
      updated = products.map(p => {
        if (p.slug === editingProductSlug) {
          return {
            ...p,
            name: name.trim(),
            category: prodCategory || p.category,
            subcategory: prodSubCategory,
            subSubCategory: prodSubSubCategory,
            brand: productBrand.trim() || 'ATS Energy',
            warranty: productWarranty.trim() || 'Official Company Warranty',
            sizes: parsedSizes.length > 0 ? parsedSizes : undefined,
            colors: parsedColors.length > 0 ? parsedColors : undefined,
            videoUrl: videoUrl.trim() || undefined,
            shortDescription: shortDesc,
            description: desc || shortDesc,
            mainImage: mainImage.trim(),
            gallery: [mainImage.trim(), ...activeGallery],
            attributes: attributes.filter(a => a.key && a.value),
            features: activeFeatures.length > 0 ? activeFeatures : ['Heavy Duty ATS Grade', 'Certified BSTI Standards'],
            featured
          };
        }
        return p;
      });
      alert('Product updated successfully!');
    } else {
      const newProduct: Product = {
        name: name.trim(),
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        category: prodCategory || 'Electrical Accessories',
        subcategory: prodSubCategory,
        subSubCategory: prodSubSubCategory,
        brand: productBrand.trim() || 'ATS Energy',
        warranty: productWarranty.trim() || 'Official Company Warranty',
        sizes: parsedSizes.length > 0 ? parsedSizes : undefined,
        colors: parsedColors.length > 0 ? parsedColors : undefined,
        videoUrl: videoUrl.trim() || undefined,
        shortDescription: shortDesc,
        description: desc || shortDesc,
        mainImage: mainImage.trim(),
        gallery: [mainImage.trim(), ...activeGallery],
        attributes: attributes.filter(a => a.key && a.value),
        features: activeFeatures.length > 0 ? activeFeatures : ['Heavy Duty ATS Grade', 'Certified BSTI Standards', 'Long-life Guarantee'],
        applications: ['Residential', 'Commercial', 'Industrial'],
        featured,
        isAvailable: true
      };
      updated = [newProduct, ...products];
      alert('Product added successfully!');
    }

    setProducts(updated);
    localStorage.setItem('ats_custom_products', JSON.stringify(updated));
    setActiveTab('products');
    setEditingProductSlug(null);
    
    setName('');
    setShortDesc('');
    setDesc('');
    setMainImage('');
    setGalleryImages([]);
    setCurrentExtraInput('');
    setVideoUrl('');
    setProductSizes('');
    setProductColors('');
    setProductWarranty('18 Months Replacement');
    setProductBrand('ATS Energy');
    setFeaturesList([
      'Heavy Duty ATS Industrial Grade',
      'Certified BSTI & BCSIR Standard',
      'Long-life Energy Saving Guarantee'
    ]);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductSlug(prod.slug);
    setName(prod.name);
    setProdCategory(prod.category);
    setProdSubCategory(prod.subcategory || '');
    setProdSubSubCategory(prod.subSubCategory || '');
    setShortDesc(prod.shortDescription || '');
    setDesc(prod.description || '');
    setMainImage(prod.mainImage || '');
    setGalleryImages((prod.gallery || []).filter(g => g !== prod.mainImage));
    setVideoUrl(prod.videoUrl || '');
    setProductSizes((prod.sizes || []).join(', '));
    setProductColors((prod.colors || []).join(', '));
    setProductWarranty(prod.warranty || '18 Months Replacement');
    setProductBrand(prod.brand || 'ATS Energy');
    setFeatured(Boolean(prod.featured));
    if (prod.features && prod.features.length > 0) {
      setFeaturesList(prod.features);
    } else {
      setFeaturesList(['Heavy Duty ATS Industrial Grade', 'Certified BSTI & BCSIR Standard']);
    }
    if (prod.attributes && prod.attributes.length > 0) {
      setAttributes(prod.attributes);
    }
    setActiveTab('new-product');
  };

  const handleStartNewProduct = () => {
    setEditingProductSlug(null);
    setName('');
    setShortDesc('');
    setDesc('');
    setMainImage('');
    setGalleryImages([]);
    setCurrentExtraInput('');
    setVideoUrl('');
    setProductSizes('');
    setProductColors('');
    setProductWarranty('18 Months Replacement');
    setProductBrand('ATS Energy');
    setFeatured(false);
    setFeaturesList([
      'Heavy Duty ATS Industrial Grade',
      'Certified BSTI & BCSIR Standard',
      'Long-life Energy Saving Guarantee'
    ]);
    setActiveTab('new-product');
  };

  const handleDeleteProduct = (slug: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.slug !== slug);
      setProducts(updated);
      localStorage.setItem('ats_custom_products', JSON.stringify(updated));
    }
  };

  // Flat lists for Sub and Sub-Sub tables
  const allSubCategories = categories.flatMap(cat => 
    (cat.subCategoriesList || []).map(sub => ({
      ...sub,
      parentCatName: cat.name,
      parentCatId: cat.id || cat.slug
    }))
  );

  const allSubSubCategories = categories.flatMap(cat => 
    (cat.subCategoriesList || []).flatMap(sub => 
      (sub.subSubCategories || []).map(subsub => ({
        ...subsub,
        parentCatName: cat.name,
        parentCatId: cat.id || cat.slug,
        parentSubName: sub.name,
        parentSubId: sub.id
      }))
    )
  );

  // Cascading lists for Product Form
  const prodCatObj = categories.find(c => c.name === prodCategory);
  const prodSubList = prodCatObj?.subCategoriesList || [];
  const prodSubObj = prodSubList.find(s => s.name === prodSubCategory);
  const prodSubSubList = prodSubObj?.subSubCategories || [];

  // Sub-Sub Modal helper: target sub list for the chosen category
  const modalTargetCatObj = categories.find(c => (c.id || c.slug) === subSubTargetCatId);
  const modalTargetSubList = modalTargetCatObj?.subCategoriesList || [];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 text-slate-800 relative">
      
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* 🌟 Professional Standalone Admin Sidebar (Responsive Slide-over Drawer on Mobile) 🌟 */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-xl lg:shadow-sm transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand Header */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm">
                <img src={atsOfficialLogo} alt="ATS" className="h-8 w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm tracking-tight text-slate-900">ATS CONTROL</span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">CMS Enterprise</span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Menu Items: Logical Sectional Grouping with Serial Numbering */}
          <nav className="p-3 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
            
            {/* SECTION 1: PRODUCT & CATALOG MANAGEMENT */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Products &amp; Catalog
              </div>

              {/* 1. Manage Products */}
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'products'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Package className={`w-4 h-4 shrink-0 transition ${activeTab === 'products' ? 'text-white' : 'text-slate-500'}`} />
                <span>1. Manage Products</span>
              </button>

              {/* 2. Add New Product */}
              <button
                onClick={() => setActiveTab('new-product')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'new-product'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <PlusCircle className={`w-4 h-4 shrink-0 transition ${activeTab === 'new-product' ? 'text-white' : 'text-slate-500'}`} />
                <span>2. Add New Product</span>
              </button>

              {/* 3. Categories */}
              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'categories'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Folder className={`w-4 h-4 shrink-0 transition ${activeTab === 'categories' ? 'text-white' : 'text-slate-500'}`} />
                <span>3. Categories</span>
              </button>

              {/* 4. Sub-Categories */}
              <button
                onClick={() => setActiveTab('sub-categories')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'sub-categories'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FolderTree className={`w-4 h-4 shrink-0 transition ${activeTab === 'sub-categories' ? 'text-white' : 'text-slate-500'}`} />
                <span>4. Sub-Categories</span>
              </button>

              {/* 5. Sub-Sub-Categories */}
              <button
                onClick={() => setActiveTab('sub-sub-categories')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'sub-sub-categories'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <GitFork className={`w-4 h-4 shrink-0 transition ${activeTab === 'sub-sub-categories' ? 'text-white' : 'text-slate-500'}`} />
                <span>5. Sub-Sub-Categories</span>
              </button>
            </div>

            {/* SECTION 2: HOMEPAGE & VISUAL MEDIA */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Media &amp; Appearance
              </div>

              {/* 6. Homepage Banners */}
              <button
                onClick={() => setActiveTab('banners')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'banners'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ImageIcon className={`w-4 h-4 shrink-0 transition ${activeTab === 'banners' ? 'text-white' : 'text-slate-500'}`} />
                <span>6. Homepage Banners</span>
              </button>

              {/* 7. Website Entry Popup */}
              <button
                onClick={() => setActiveTab('popup-settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'popup-settings'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BellRing className={`w-4 h-4 shrink-0 transition ${activeTab === 'popup-settings' ? 'text-white' : 'text-slate-500'}`} />
                <span>7. Website Entry Popup</span>
              </button>
            </div>

            {/* SECTION 3: CONTENT & BRANDING */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Content &amp; Brand
              </div>

              {/* 8. About Us Page */}
              <button
                onClick={() => setActiveTab('about-page')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'about-page'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Info className={`w-4 h-4 shrink-0 transition ${activeTab === 'about-page' ? 'text-white' : 'text-slate-500'}`} />
                <span>8. About Us Page</span>
              </button>

              {/* 9. Services & Support */}
              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'services'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Wrench className={`w-4 h-4 shrink-0 transition ${activeTab === 'services' ? 'text-white' : 'text-slate-500'}`} />
                <span>9. Services &amp; Support</span>
              </button>

              {/* 10. What Partners Say */}
              <button
                onClick={() => setActiveTab('partner-reviews')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'partner-reviews'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Quote className={`w-4 h-4 shrink-0 transition ${activeTab === 'partner-reviews' ? 'text-white' : 'text-slate-500'}`} />
                <span>10. What Partners Say</span>
              </button>

              {/* 11. Our Key Clients */}
              <button
                onClick={() => setActiveTab('key-clients')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'key-clients'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Building2 className={`w-4 h-4 shrink-0 transition ${activeTab === 'key-clients' ? 'text-white' : 'text-slate-500'}`} />
                <span>11. Our Key Clients</span>
              </button>

              {/* 12. Terms & Privacy Pages */}
              <button
                onClick={() => setActiveTab('legal-pages')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'legal-pages'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FileText className={`w-4 h-4 shrink-0 transition ${activeTab === 'legal-pages' ? 'text-white' : 'text-slate-500'}`} />
                <span>12. Terms &amp; Privacy Pages</span>
              </button>

              {/* 13. FAQ Management */}
              <button
                onClick={() => setActiveTab('faqs')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'faqs'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <HelpCircle className={`w-4 h-4 shrink-0 transition ${activeTab === 'faqs' ? 'text-white' : 'text-slate-500'}`} />
                <span>13. FAQs Management</span>
              </button>
            </div>

            {/* SECTION 4: COMMUNICATIONS & SEO */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Marketing &amp; Inquiries
              </div>

              {/* 14. Customer Inquiries */}
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'inquiries'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <MessageSquare className={`w-4 h-4 shrink-0 transition ${activeTab === 'inquiries' ? 'text-white' : 'text-slate-500'}`} />
                <span>14. Customer Inquiries</span>
              </button>

              {/* 15. Social Media Links */}
              <button
                onClick={() => setActiveTab('socials')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'socials'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Share2 className={`w-4 h-4 shrink-0 transition ${activeTab === 'socials' ? 'text-white' : 'text-slate-500'}`} />
                <span>15. Social Media Links</span>
              </button>

              {/* 16. SEO & Meta Tags */}
              <button
                onClick={() => setActiveTab('seo')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'seo'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Search className={`w-4 h-4 shrink-0 transition ${activeTab === 'seo' ? 'text-white' : 'text-slate-500'}`} />
                <span>16. SEO &amp; Meta Tags</span>
              </button>
            </div>

          </nav>
        </div>

        {/* Sidebar Footer with Live Site & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition border border-slate-200"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition border border-rose-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* 🖥️ Main Dashboard Workspace (Crisp Professional Light Theme) 🖥️ */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-10 w-full min-w-0">
        
        {/* Top Status Bar with Mobile Hamburger */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-200 mb-6 sm:mb-8 gap-3">
          <div className="flex items-center gap-3">
            {/* Hamburger Button on Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-2xs"
              title="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                <span className="hidden sm:inline">Admin Management</span>
                <span className="hidden sm:inline">/</span>
                <span className="text-emerald-600 truncate max-w-[150px] sm:max-w-none">{activeTab.replace('-', ' ')}</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight capitalize truncate">
                {activeTab.replace('-', ' ')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">Live System</span>
              <span className="sm:hidden">Live</span>
            </span>
          </div>
        </div>

        {/* ========================================================
            PAGE 1: PRIMARY CATEGORIES (Table + Add Category Button)
           ======================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6 max-w-6xl">
            {/* Header with "Add Category" Button */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Primary Categories Directory</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage root department divisions for ATS catalog</p>
              </div>

              <button
                onClick={handleOpenAddCategory}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Category</span>
              </button>
            </div>

            {/* Categories Table / Card Grid */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="py-3.5 px-5">Image</th>
                    <th className="py-3.5 px-5">Category Name</th>
                    <th className="py-3.5 px-5">Slug</th>
                    <th className="py-3.5 px-5">Sub-Categories Count</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((cat) => {
                    const cId = cat.id || cat.slug;
                    return (
                      <tr key={cId} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-5">
                          <img
                            src={cat.image || 'https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19.jpeg'}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-100"
                          />
                        </td>
                        <td className="py-3 px-5">
                          <span className="font-bold text-slate-900 text-sm">{cat.name}</span>
                          {cat.banner && (
                            <span className="block text-[10px] text-emerald-600 font-semibold mt-0.5">Has Header Banner</span>
                          )}
                        </td>
                        <td className="py-3 px-5 text-slate-500 font-mono text-[11px]">{cat.slug}</td>
                        <td className="py-3 px-5">
                          <button
                            onClick={() => {
                              setSubTargetCatId(cId);
                              setActiveTab('sub-categories');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-lg text-xs"
                          >
                            <span>{cat.subCategoriesList?.length || 0} Sub-Categories</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                        <td className="py-3 px-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditCategory(cat)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Edit Category"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cId)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Modal: Add/Edit Primary Category */}
            {showCatModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <PlusCircle className="w-5 h-5 text-emerald-500" />
                      <span>{editingCatId ? 'Edit Category' : 'Add New Category'}</span>
                    </h3>
                    <button
                      onClick={() => setShowCatModal(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCategory} className="space-y-4">
                    {/* Category Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Industrial Switchgear & Relays"
                        value={catName}
                        onChange={e => setCatName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Category Image */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <label className="block text-[11px] font-bold uppercase text-slate-700">Category Thumbnail Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageFile(e, setCatImage)}
                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="Or paste image URL"
                        value={catImage.startsWith('data:') ? '' : catImage}
                        onChange={e => setCatImage(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                      />
                      {catImage && (
                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200">
                          <img src={catImage} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    {/* Category Banner */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <label className="block text-[11px] font-bold uppercase text-slate-700">Category Banner (Header Image)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageFile(e, setCatBanner)}
                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="Or paste banner URL"
                        value={catBanner.startsWith('data:') ? '' : catBanner}
                        onChange={e => setCatBanner(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                      />
                      {catBanner && (
                        <div className="w-24 h-12 rounded-lg overflow-hidden border border-slate-200">
                          <img src={catBanner} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCatModal(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow"
                      >
                        Save Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            PAGE 2: SUB-CATEGORIES (Table + Add Sub-Category Button)
           ======================================================== */}
        {activeTab === 'sub-categories' && (
          <div className="space-y-6 max-w-6xl">
            {/* Header with "Add Sub-Category" Button */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Sub-Categories Directory</h2>
                <p className="text-xs text-slate-500 mt-0.5">All sub-categories grouped under their parent categories</p>
              </div>

              <button
                onClick={handleOpenAddSubCategory}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Sub-Category</span>
              </button>
            </div>

            {/* Sub-Categories Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="py-3.5 px-5">Sub-Category Name</th>
                    <th className="py-3.5 px-5">Parent Category</th>
                    <th className="py-3.5 px-5">Sub-Sub Count</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allSubCategories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No sub-categories created yet. Click &quot;+ Add Sub-Category&quot; above.
                      </td>
                    </tr>
                  ) : (
                    allSubCategories.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-5">
                          <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <FolderTree className="w-4 h-4 text-blue-600" />
                            <span>{sub.name}</span>
                          </span>
                        </td>
                        <td className="py-3 px-5">
                          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-900 font-bold rounded-lg text-xs border border-emerald-200">
                            {sub.parentCatName}
                          </span>
                        </td>
                        <td className="py-3 px-5">
                          <button
                            onClick={() => {
                              setSubSubTargetCatId(sub.parentCatId);
                              setSubSubTargetSubId(sub.id);
                              setActiveTab('sub-sub-categories');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-lg text-xs"
                          >
                            <span>{sub.subSubCategories?.length || 0} Sub-Sub Items</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                        <td className="py-3 px-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditSubCategory(sub.parentCatId, sub)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Edit Sub-Category"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubCategory(sub.parentCatId, sub.id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Sub-Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal: Add/Edit Sub-Category */}
            {showSubModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <FolderTree className="w-5 h-5 text-blue-600" />
                      <span>{editingSubId ? 'Edit Sub-Category' : 'Add Sub-Category'}</span>
                    </h3>
                    <button
                      onClick={() => setShowSubModal(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveSubCategory} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Select Parent Category *
                      </label>
                      <select
                        value={subTargetCatId}
                        onChange={e => setSubTargetCatId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map((c) => (
                          <option key={c.id || c.slug} value={c.id || c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Sub-Category Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AC LED Bulbs, MCB Breakers, Copper Wires"
                        value={subName}
                        onChange={e => setSubName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowSubModal(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow"
                      >
                        Save Sub-Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            PAGE 3: SUB-SUB-CATEGORIES (Table + Add Button)
           ======================================================== */}
        {activeTab === 'sub-sub-categories' && (
          <div className="space-y-6 max-w-6xl">
            {/* Header with "Add Sub-Sub-Category" Button */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Sub-Sub-Categories Directory</h2>
                <p className="text-xs text-slate-500 mt-0.5">Level-3 granular product categorization</p>
              </div>

              <button
                onClick={handleOpenAddSubSubCategory}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Sub-Sub-Category</span>
              </button>
            </div>

            {/* Sub-Sub Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="py-3.5 px-5">Sub-Sub-Category Name</th>
                    <th className="py-3.5 px-5">Parent Sub-Category</th>
                    <th className="py-3.5 px-5">Root Category</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allSubSubCategories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No sub-sub-categories created yet. Click &quot;+ Add Sub-Sub-Category&quot; above.
                      </td>
                    </tr>
                  ) : (
                    allSubSubCategories.map((subsub) => (
                      <tr key={subsub.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-5">
                          <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <GitFork className="w-4 h-4 text-emerald-600" />
                            <span>{subsub.name}</span>
                          </span>
                        </td>
                        <td className="py-3 px-5">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-900 font-bold rounded-lg text-xs border border-blue-200">
                            {subsub.parentSubName}
                          </span>
                        </td>
                        <td className="py-3 px-5">
                          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-900 font-bold rounded-lg text-xs border border-emerald-200">
                            {subsub.parentCatName}
                          </span>
                        </td>
                        <td className="py-3 px-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditSubSubCategory(subsub.parentCatId, subsub.parentSubId, subsub)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Edit Sub-Sub-Category"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubSubCategory(subsub.parentCatId, subsub.parentSubId, subsub.id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Sub-Sub-Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal: Add/Edit Sub-Sub-Category */}
            {showSubSubModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <GitFork className="w-5 h-5 text-emerald-600" />
                      <span>{editingSubSubId ? 'Edit Sub-Sub-Category' : 'Add Sub-Sub-Category'}</span>
                    </h3>
                    <button
                      onClick={() => setShowSubSubModal(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveSubSubCategory} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        1. Select Category *
                      </label>
                      <select
                        value={subSubTargetCatId}
                        onChange={e => {
                          setSubSubTargetCatId(e.target.value);
                          setSubSubTargetSubId('');
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {categories.map((c) => (
                          <option key={c.id || c.slug} value={c.id || c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        2. Select Sub-Category *
                      </label>
                      <select
                        value={subSubTargetSubId}
                        onChange={e => setSubSubTargetSubId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">-- Choose Sub-Category --</option>
                        {modalTargetSubList.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        3. Sub-Sub-Category Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5W to 12W Bulbs, 1-2 Gang Plates"
                        value={subSubName}
                        onChange={e => setSubSubName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowSubSubModal(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                      >
                        Save Sub-Sub-Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            PAGE: ABOUT US MANAGEMENT
           ======================================================== */}
        {activeTab === 'about-page' && (
          <div className="space-y-6 max-w-5xl">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 shadow-2xs">
                <Info className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  About Us Page Management
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Customize the corporate intro, image, vision, mission, counter statistics, values, and why choose us points.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveAbout} className="space-y-6">
              {/* Section 1: Main Intro & Image */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  1. Company Intro & Photo
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={aboutData.tagline}
                      onChange={e => setAboutData({ ...aboutData, tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Main Heading</label>
                    <input
                      type="text"
                      value={aboutData.title}
                      onChange={e => setAboutData({ ...aboutData, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">About Text</label>
                  <textarea
                    rows={4}
                    value={aboutData.aboutText}
                    onChange={e => setAboutData({ ...aboutData, aboutText: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">About Image (Upload or URL)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <label className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 text-xs font-bold text-slate-600 transition">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span>Choose Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleImageFile(e, (val) => setAboutData({ ...aboutData, image: val }))}
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Paste Image URL..."
                      value={aboutData.image}
                      onChange={e => setAboutData({ ...aboutData, image: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  {aboutData.image && (
                    <div className="mt-3 w-40 h-24 rounded-xl overflow-hidden border border-slate-200">
                      <img src={aboutData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Vision & Mission */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  2. Vision & Mission
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-slate-700">Vision Title</label>
                    <input
                      type="text"
                      value={aboutData.visionTitle}
                      onChange={e => setAboutData({ ...aboutData, visionTitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <label className="block text-xs font-bold uppercase text-slate-700 pt-2">Vision Text</label>
                    <textarea
                      rows={3}
                      value={aboutData.visionText}
                      onChange={e => setAboutData({ ...aboutData, visionText: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-slate-700">Mission Title</label>
                    <input
                      type="text"
                      value={aboutData.missionTitle}
                      onChange={e => setAboutData({ ...aboutData, missionTitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <label className="block text-xs font-bold uppercase text-slate-700 pt-2">Mission Text</label>
                    <textarea
                      rows={3}
                      value={aboutData.missionText}
                      onChange={e => setAboutData({ ...aboutData, missionText: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Counter Numbers */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  3. Key Figures & Counters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Happy Customers</label>
                    <input
                      type="text"
                      value={aboutData.statHappyCustomers}
                      onChange={e => setAboutData({ ...aboutData, statHappyCustomers: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Successful Projects</label>
                    <input
                      type="text"
                      value={aboutData.statSuccessfulProjects}
                      onChange={e => setAboutData({ ...aboutData, statSuccessfulProjects: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dealers & Partners</label>
                    <input
                      type="text"
                      value={aboutData.statDealersPartners}
                      onChange={e => setAboutData({ ...aboutData, statDealersPartners: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Customer Support</label>
                    <input
                      type="text"
                      value={aboutData.statCustomerSupport}
                      onChange={e => setAboutData({ ...aboutData, statCustomerSupport: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Bullet Lists */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  4. Values, Why Choose Us, Services Scope (One per line)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Our Values (Lines)</label>
                    <textarea
                      rows={5}
                      value={aboutData.valuesList.join('\n')}
                      onChange={e => setAboutData({ ...aboutData, valuesList: e.target.value.split('\n').filter(Boolean) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Why Choose Us (Lines)</label>
                    <textarea
                      rows={5}
                      value={aboutData.whyChooseUsList.join('\n')}
                      onChange={e => setAboutData({ ...aboutData, whyChooseUsList: e.target.value.split('\n').filter(Boolean) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Our Services Include (Lines)</label>
                    <textarea
                      rows={5}
                      value={aboutData.servicesIncludeList.join('\n')}
                      onChange={e => setAboutData({ ...aboutData, servicesIncludeList: e.target.value.split('\n').filter(Boolean) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Why We're The Right Choice */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  5. Why We&apos;re The Right Choice (Feature Cards)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={aboutData.rightChoiceSubtitle || "WHY WE'RE"}
                      onChange={e => setAboutData({ ...aboutData, rightChoiceSubtitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Main Title</label>
                    <input
                      type="text"
                      value={aboutData.rightChoiceTitle || "THE RIGHT CHOICE"}
                      onChange={e => setAboutData({ ...aboutData, rightChoiceTitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {(aboutData.rightChoiceCards || fallbackAboutContent.rightChoiceCards || []).map((card, idx) => (
                    <div key={card.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <span className="text-[10px] font-bold uppercase text-emerald-600 block">Card #{idx + 1}</span>
                      <label className="block text-xs font-bold text-slate-700">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={e => {
                          const updated = [...(aboutData.rightChoiceCards || fallbackAboutContent.rightChoiceCards || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setAboutData({ ...aboutData, rightChoiceCards: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                      />
                      <label className="block text-xs font-bold text-slate-700 pt-1">Description</label>
                      <textarea
                        rows={2}
                        value={card.description}
                        onChange={e => {
                          const updated = [...(aboutData.rightChoiceCards || fallbackAboutContent.rightChoiceCards || [])];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setAboutData({ ...aboutData, rightChoiceCards: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            PAGE: SERVICES & SUPPORT MANAGEMENT
           ======================================================== */}
        {activeTab === 'services' && (
          <div className="space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0 text-cyan-600 shadow-2xs">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    Services &amp; Support Management
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Manage commercial services, dealership programs, solar engineering, and support offerings shown on the website.
                  </p>
                </div>
              </div>

              {!editingServiceId && (
                <button
                  onClick={() => {
                    setEditingServiceId(null);
                    setServiceTitle('');
                    setServiceDesc('');
                    setServiceImage('');
                    setServiceSecondaryImage('');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-md shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Create New Service</span>
                </button>
              )}
            </div>

            {/* In-Page Add / Edit Service Form (No Popup Modal) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyan-600" />
                  <span>{editingServiceId ? 'Edit Existing Service' : 'Add New Service (Direct Form)'}</span>
                </h3>
                {editingServiceId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingServiceId(null);
                      setServiceTitle('');
                      setServiceDesc('');
                      setServiceImage('');
                      setServiceSecondaryImage('');
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveService} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Solar Energy Setup & Consultation"
                      value={serviceTitle}
                      onChange={e => setServiceTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Service Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the service details, support scope, deliverables, warranty..."
                      value={serviceDesc}
                      onChange={e => setServiceDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* 2 Image Upload Slots (Image 1 Primary & Image 2 Optional) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 bg-slate-50/80 border border-slate-200 rounded-2xl">
                  {/* Image 1: Primary Image */}
                  <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase text-slate-800">
                        Primary Service Image *
                      </label>
                      <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        Main Card
                      </span>
                    </div>
                    
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-50/60 border border-cyan-200 border-dashed rounded-xl cursor-pointer hover:bg-cyan-100/60 text-xs font-bold text-cyan-800 transition">
                      <Upload className="w-4 h-4 text-cyan-600" />
                      <span>Choose File (Image 1)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleImageFile(e, setServiceImage)}
                      />
                    </label>
                    
                    <input
                      type="text"
                      placeholder="Or paste Image 1 URL..."
                      value={serviceImage}
                      onChange={e => setServiceImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    {serviceImage && (
                      <div className="relative mt-2 w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={serviceImage} alt="Primary Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setServiceImage('')}
                          className="absolute top-2 right-2 bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-full shadow"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Image 2: Secondary Image (Optional) */}
                  <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase text-slate-800">
                        Secondary Service Image
                      </label>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        Optional (2nd Photo)
                      </span>
                    </div>

                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 text-xs font-bold text-slate-600 transition">
                      <Upload className="w-4 h-4 text-slate-500" />
                      <span>Choose File (Image 2 - Optional)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleImageFile(e, setServiceSecondaryImage)}
                      />
                    </label>

                    <input
                      type="text"
                      placeholder="Or paste Image 2 URL (optional)..."
                      value={serviceSecondaryImage}
                      onChange={e => setServiceSecondaryImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    {serviceSecondaryImage && (
                      <div className="relative mt-2 w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={serviceSecondaryImage} alt="Secondary Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setServiceSecondaryImage('')}
                          className="absolute top-2 right-2 bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-full shadow"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition"
                  >
                    {editingServiceId ? 'Update Service' : 'Save'}
                  </button>
                </div>
              </form>
            </div>

            {/* Services Table List */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="py-3.5 px-5">Images</th>
                    <th className="py-3.5 px-5">Service Title</th>
                    <th className="py-3.5 px-5">Description</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No services added yet. Fill the form above to create one.
                      </td>
                    </tr>
                  ) : (
                    services.map((srv, idx) => (
                      <tr key={srv.id || srv._id || idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-11 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                              {srv.image ? (
                                <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            {srv.secondaryImage && (
                              <div className="w-14 h-11 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0" title="Secondary Image">
                                <img src={srv.secondaryImage} alt="Secondary" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-5">
                          <span className="font-bold text-slate-900 text-sm block">
                            {srv.title}
                          </span>
                        </td>
                        <td className="py-3 px-5 max-w-md">
                          <p className="text-slate-600 line-clamp-2 leading-relaxed">
                            {srv.description}
                          </p>
                        </td>
                        <td className="py-3 px-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                handleOpenEditService(srv);
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                              }}
                              className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition"
                              title="Edit Service"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(srv.id || srv._id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Service"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE: WHAT OUR PARTNERS SAY (TESTIMONIALS / REVIEWS)
           ======================================================== */}
        {activeTab === 'partner-reviews' && (
          <div className="space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600 shadow-2xs">
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    What Our Partners Say
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Manage client testimonials, dealer reviews, and corporate partner feedback shown on the homepage.
                  </p>
                </div>
              </div>

              <button
                onClick={handleOpenAddReview}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Partner Review</span>
              </button>
            </div>

            {/* Reviews Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="py-3.5 px-5">Partner / Client</th>
                    <th className="py-3.5 px-5">Location / Designation</th>
                    <th className="py-3.5 px-5">Feedback Quote</th>
                    <th className="py-3.5 px-5 text-center">Rating</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {partnerReviews.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No partner reviews added yet. Click &quot;+ Add Partner Review&quot; above.
                      </td>
                    </tr>
                  ) : (
                    partnerReviews.map((rev, idx) => (
                      <tr key={rev.id || rev._id || idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                              {rev.image ? (
                                <img src={rev.image} alt={rev.author} className="w-full h-full object-cover" />
                              ) : (
                                <span className="font-bold text-xs text-emerald-600">{rev.author.charAt(0)}</span>
                              )}
                            </div>
                            <span className="font-bold text-slate-900 text-sm block">
                              {rev.author}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-md text-xs">
                            {rev.designation || 'Client Partner'}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 max-w-md">
                          <p className="text-slate-600 line-clamp-2 italic leading-relaxed">
                            {rev.quote}
                          </p>
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <span className="text-amber-500 font-bold inline-flex items-center gap-0.5 text-xs">
                            ★ {rev.rating || 5}.0
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditReview(rev)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Edit Review"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteReview(rev.id || rev._id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal: Add or Edit Review */}
            {showReviewModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Quote className="w-5 h-5 text-emerald-600" />
                      <span>{editingReviewId ? 'Edit Partner Review' : 'Add Partner Review'}</span>
                    </h3>
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Partner / Client Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aziz Electric"
                          value={reviewAuthor}
                          onChange={e => setReviewAuthor(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Location / Role
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sandwip, Chattagram"
                          value={reviewDesignation}
                          onChange={e => setReviewDesignation(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Review / Feedback Quote *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="What does the client say about ATS products, service or solar reliability..."
                        value={reviewQuote}
                        onChange={e => setReviewQuote(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Partner Logo / Photo (Upload or URL)
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 text-xs font-bold text-slate-600 transition">
                          <Upload className="w-4 h-4 text-emerald-600" />
                          <span>Choose Local File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handleImageFile(e, setReviewImage)}
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="Or paste direct image URL (https://...)"
                          value={reviewImage}
                          onChange={e => setReviewImage(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      {reviewImage && (
                        <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                          <img src={reviewImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowReviewModal(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                      >
                        {editingReviewId ? 'Update Review' : 'Save Review'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            PAGE: OUR KEY CLIENTS MANAGEMENT
           ======================================================== */}
        {activeTab === 'key-clients' && (
          <div className="space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                  <span>OUR KEY CLIENTS</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage official client brand logos showcased directly under the &quot;What Our Partners Say&quot; section.
                </p>
              </div>

              <button
                onClick={handleOpenAddClient}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Client Logo</span>
              </button>
            </div>

            {/* Grid of Client Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {keyClients.map((cli, idx) => (
                <div 
                  key={cli.id || cli._id || idx}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition relative group"
                >
                  <div className="w-full h-20 flex items-center justify-center p-2 mb-2">
                    <img src={cli.logo} alt={cli.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 text-center truncate w-full block mb-2">
                    {cli.name}
                  </span>
                  <div className="flex items-center gap-1 w-full justify-center border-t border-slate-100 pt-2">
                    <button
                      onClick={() => handleOpenEditClient(cli)}
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      title="Edit Client"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(cli.id || cli._id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete Client"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add or Edit Client */}
            {showClientModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-indigo-600" />
                      <span>{editingClientId ? 'Edit Key Client' : 'Add Key Client'}</span>
                    </h3>
                    <button
                      onClick={() => setShowClientModal(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveClient} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Client Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Corporation"
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Client Logo Image (Upload or URL) *
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 text-xs font-bold text-slate-600 transition">
                          <Upload className="w-4 h-4 text-indigo-600" />
                          <span>Choose Local File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handleImageFile(e, setClientLogo)}
                          />
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Or paste direct image URL (https://...)"
                          value={clientLogo}
                          onChange={e => setClientLogo(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      {clientLogo && (
                        <div className="mt-2 w-full h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center p-2">
                          <img src={clientLogo} alt="Preview" className="max-h-full max-w-full object-contain" />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowClientModal(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow"
                      >
                        {editingClientId ? 'Update Client' : 'Save Client'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            PAGE: SOCIAL MEDIA ACCOUNTS MANAGEMENT
           ======================================================== */}
        {activeTab === 'socials' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0 text-pink-600 shadow-2xs">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  Official Social Media Accounts
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Manage external links for Facebook, WhatsApp, Instagram, YouTube, LinkedIn, and Twitter shown in the Navbar and Footer.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSocials} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Facebook */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Facebook Page URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/..."
                    value={socials.facebook}
                    onChange={e => setSocials({ ...socials, facebook: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400">Scraped from atsenergybd.com: https://www.facebook.com/share/1BUjcTEdv2/</span>
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>WhatsApp Contact URL / Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://wa.me/8801848160565"
                    value={socials.whatsapp}
                    onChange={e => setSocials({ ...socials, whatsapp: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400">Format: https://wa.me/8801848160565</span>
                </div>

                {/* Instagram */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    <span>Instagram Profile URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/..."
                    value={socials.instagram}
                    onChange={e => setSocials({ ...socials, instagram: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* YouTube */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>YouTube Channel URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/@..."
                    value={socials.youtube}
                    onChange={e => setSocials({ ...socials, youtube: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* LinkedIn */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-700" />
                    <span>LinkedIn Company URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/company/..."
                    value={socials.linkedin}
                    onChange={e => setSocials({ ...socials, linkedin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Twitter / X */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-900" />
                    <span>Twitter / X Profile URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://x.com/..."
                    value={socials.twitter}
                    onChange={e => setSocials({ ...socials, twitter: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            PAGE: SEO & META TAGS MANAGEMENT
           ======================================================== */}
        {activeTab === 'seo' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-2xs">
                <Search className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  Search Engine Optimization (SEO) &amp; Meta Tags
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Configure Google search meta title, description, keywords, Open Graph image, and Google Search Console verification tag.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSEO} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Meta Title */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Meta Title (Browser Tab &amp; Google Result Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ATS ENERGY SOLUTIONS | Industrial Electrical & Solar Technology Bangladesh"
                  value={seo.metaTitle}
                  onChange={e => setSeo({ ...seo, metaTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Recommended length: 50–60 characters. Current length: {seo.metaTitle.length} characters.
                </span>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Meta Description (Google Snippet Description) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your company and product offerings for Google search results..."
                  value={seo.metaDescription}
                  onChange={e => setSeo({ ...seo, metaDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Recommended length: 140–160 characters. Current length: {seo.metaDescription.length} characters.
                </span>
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Meta Keywords (Comma-separated keywords)
                </label>
                <input
                  type="text"
                  placeholder="ATS Energy, LED bulbs, Gang Switch, MCB, Cables 1.5 RM 2.5 RM, Solar systems Dhaka..."
                  value={seo.metaKeywords}
                  onChange={e => setSeo({ ...seo, metaKeywords: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Open Graph Image & Canonical URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Open Graph Social Share Image URL (og:image)
                  </label>
                  <input
                    type="text"
                    placeholder="https://atsenergybd.com/wp-content/uploads/..."
                    value={seo.ogImage}
                    onChange={e => setSeo({ ...seo, ogImage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {seo.ogImage && (
                    <div className="mt-2 w-32 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                      <img src={seo.ogImage} alt="OG Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Canonical Domain URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://atsenergybd.com"
                    value={seo.canonicalUrl}
                    onChange={e => setSeo({ ...seo, canonicalUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Google Site Verification Code */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Google Search Console Verification Tag (google-site-verification)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7qX_AbCdEfGhIjKlMnOpQrStUvWxYz..."
                  value={seo.googleSiteVerification || ''}
                  onChange={e => setSeo({ ...seo, googleSiteVerification: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Paste the verification code provided by Google Search Console to verify domain ownership.
                </span>
              </div>

              {/* Google Search Live Preview Simulator */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Google Search Engine Result Snippet Preview
                </span>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 block">{seo.canonicalUrl || 'https://atsenergybd.com'}</span>
                  <h4 className="text-base text-blue-800 font-semibold hover:underline cursor-pointer">
                    {seo.metaTitle || 'ATS ENERGY SOLUTIONS | Industrial Electrical & Solar Technology Bangladesh'}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {seo.metaDescription || 'ATS Energy Solution is a verified Manufacturer and supplier of premium electrical and solar products in Bangladesh...'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            LEGAL PAGES (TERMS & CONDITIONS + PRIVACY POLICY)
           ======================================================== */}
        {activeTab === 'legal-pages' && (
          <div className="space-y-8 max-w-5xl">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 text-purple-600 shadow-2xs">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  Terms &amp; Conditions and Privacy Policy Management
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Edit the content displayed on <Link href="/terms-and-conditions" target="_blank" className="text-emerald-600 underline font-semibold">/terms-and-conditions</Link> and <Link href="/privacy-policy" target="_blank" className="text-emerald-600 underline font-semibold">/privacy-policy</Link>
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveLegal} className="space-y-8">
              {/* Terms & Conditions Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">
                    1. Terms &amp; Conditions Page Content
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Page Title</label>
                    <input
                      type="text"
                      value={legalData.termsTitle}
                      onChange={e => setLegalData({ ...legalData, termsTitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Last Updated Text</label>
                    <input
                      type="text"
                      value={legalData.termsLastUpdated}
                      onChange={e => setLegalData({ ...legalData, termsLastUpdated: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Terms &amp; Conditions Full Text / Paragraphs
                  </label>
                  <textarea
                    rows={10}
                    value={legalData.termsContent}
                    onChange={e => setLegalData({ ...legalData, termsContent: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 leading-relaxed font-mono"
                  />
                </div>
              </div>

              {/* Privacy Policy Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">
                    2. Privacy Policy Page Content
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Page Title</label>
                    <input
                      type="text"
                      value={legalData.privacyTitle}
                      onChange={e => setLegalData({ ...legalData, privacyTitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Last Updated Text</label>
                    <input
                      type="text"
                      value={legalData.privacyLastUpdated}
                      onChange={e => setLegalData({ ...legalData, privacyLastUpdated: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Privacy Policy Full Text / Paragraphs
                  </label>
                  <textarea
                    rows={10}
                    value={legalData.privacyContent}
                    onChange={e => setLegalData({ ...legalData, privacyContent: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 leading-relaxed font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end pb-8">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            PAGE: FAQ MANAGEMENT (ADD, EDIT, DELETE FAQS)
           ======================================================== */}
        {activeTab === 'faqs' && (
          <div className="space-y-8 max-w-5xl">
            {/* Header */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 shadow-2xs">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    Frequently Asked Questions (FAQ) Management
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Add, edit, or remove questions and answers shown in the Homepage FAQ accordion.
                  </p>
                </div>
              </div>

              {!editingFaqId && (
                <button
                  onClick={() => {
                    handleOpenAddFaq();
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Add New FAQ</span>
                </button>
              )}
            </div>

            {/* Direct Form: Add / Edit FAQ */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>{editingFaqId ? 'Edit FAQ Item' : 'Add New FAQ Item'}</span>
                </h3>
                {editingFaqId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFaqId(null);
                      setFaqQuestion('');
                      setFaqAnswer('');
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveFaq} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Question *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HOW DOES SOLAR ENERGY & HYBRID INVERTER WORK?"
                    value={faqQuestion}
                    onChange={e => setFaqQuestion(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Answer / Detailed Explanation *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter the complete answer to this question..."
                    value={faqAnswer}
                    onChange={e => setFaqAnswer(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
                  >
                    {editingFaqId ? 'Update FAQ' : 'Save FAQ'}
                  </button>
                </div>
              </form>
            </div>

            {/* Existing FAQs Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="py-3.5 px-5 w-12">#</th>
                    <th className="py-3.5 px-5">Question</th>
                    <th className="py-3.5 px-5">Answer</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {faqs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No FAQs added yet. Fill the form above to add one.
                      </td>
                    </tr>
                  ) : (
                    faqs.map((f, idx) => (
                      <tr key={f.id || f._id || idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-5 font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-5 max-w-xs">
                          <span className="font-bold text-slate-900 text-xs block leading-snug">
                            {f.question}
                          </span>
                        </td>
                        <td className="py-3 px-5 max-w-md">
                          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                            {f.answer}
                          </p>
                        </td>
                        <td className="py-3 px-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditFaq(f)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Edit FAQ"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(f.id || f._id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            POPUP SETTINGS (2 TYPES: ONLY FORM OR ONLY IMAGE)
           ======================================================== */}
        {activeTab === 'popup-settings' && (
          <div className="space-y-8 max-w-5xl">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600 shadow-2xs">
                <BellRing className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  Website Entry Popup Management
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Manage the promotional or inquiry popup that appears immediately when visitors open the website.
                </p>
              </div>
            </div>

            <form onSubmit={handleSavePopup} className="space-y-6">
              
              {/* 1. Master Toggle & Type Selection */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                
                {/* On / Off Switch */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Popup Status (ON / OFF)</span>
                    <span className="text-xs text-slate-500">
                      Turn ON to display the popup immediately upon visiting the website.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={popupData.isEnabled}
                      onChange={e => setPopupData({ ...popupData, isEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* 2 Types Radio Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-3">
                    Select Popup Type:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Option 1: Form Popup */}
                    <div
                      onClick={() => setPopupData({ ...popupData, type: 'form' })}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition ${
                        popupData.type === 'form'
                          ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name="popupType"
                          checked={popupData.type === 'form'}
                          onChange={() => setPopupData({ ...popupData, type: 'form' })}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-bold text-slate-900">Type 1: Only Form (Quotation Popup)</span>
                      </div>
                      <p className="text-xs text-slate-500 pl-6 leading-relaxed">
                        Displays a sleek modern lead capture quotation form with Name, Phone, Email, Location & Details with a direct cross button.
                      </p>
                    </div>

                    {/* Option 2: Image Popup */}
                    <div
                      onClick={() => setPopupData({ ...popupData, type: 'image' })}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition ${
                        popupData.type === 'image'
                          ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name="popupType"
                          checked={popupData.type === 'image'}
                          onChange={() => setPopupData({ ...popupData, type: 'image' })}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-bold text-slate-900">Type 2: Only Image (Promotional Banner)</span>
                      </div>
                      <p className="text-xs text-slate-500 pl-6 leading-relaxed">
                        Displays a custom promotional poster / notice image with a clear cross button to close.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Form Popup Customization Controls */}
              {popupData.type === 'form' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm animate-in fade-in">
                  <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider border-b border-slate-100 pb-3">
                    Form Popup Configuration
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Form Heading Title</label>
                      <input
                        type="text"
                        value={popupData.formTitle}
                        onChange={e => setPopupData({ ...popupData, formTitle: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                        placeholder="e.g. GET A QUOTATION"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Submit Button Text</label>
                      <input
                        type="text"
                        value={popupData.submitButtonText}
                        onChange={e => setPopupData({ ...popupData, submitButtonText: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                        placeholder="e.g. SEND"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Form Subtitle Message</label>
                    <input
                      type="text"
                      value={popupData.formSubtitle}
                      onChange={e => setPopupData({ ...popupData, formSubtitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                      placeholder="e.g. Please fillup this form correctly, we will contact with you as soon as possible"
                    />
                  </div>
                </div>
              )}

              {/* Image Popup Customization Controls */}
              {popupData.type === 'image' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm animate-in fade-in">
                  <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider border-b border-slate-100 pb-3">
                    Image Popup Configuration
                  </h3>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold uppercase text-slate-700">
                      Popup Image (Choose File or Paste URL) *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block mb-1">Option A: Upload Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleImageFile(e, (val) => setPopupData({ ...popupData, imageUrl: val }))}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 block mb-1">Option B: Or Paste Image URL</span>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={popupData.imageUrl.startsWith('data:') ? '' : popupData.imageUrl}
                          onChange={e => setPopupData({ ...popupData, imageUrl: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                        />
                      </div>
                    </div>

                    {popupData.imageUrl && (
                      <div className="pt-2">
                        <span className="text-[10px] text-emerald-600 font-semibold block mb-1">Image Preview:</span>
                        <div className="max-w-xs max-h-48 rounded-xl overflow-hidden border border-slate-200 bg-white p-2">
                          <img
                            src={popupData.imageUrl}
                            alt="Popup Preview"
                            className="w-full h-auto max-h-40 object-contain rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Redirect URL when image clicked (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /products or /contact"
                      value={popupData.imageLinkUrl || ''}
                      onChange={e => setPopupData({ ...popupData, imageLinkUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end pb-8">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
                >
                  Save Popup Settings
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================
            PAGE 4: HOMEPAGE BANNERS
           ======================================================== */}
        {activeTab === 'banners' && (
          <div className="space-y-8 max-w-5xl">
            <form onSubmit={handleSaveBanner} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black uppercase text-emerald-600 tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>{editingBannerIdx !== null ? `Edit Banner (Slide #${editingBannerIdx + 1})` : 'Upload / Add New Banner'}</span>
                </h3>
                {editingBannerIdx !== null && (
                  <button
                    type="button"
                    onClick={handleCancelBannerEdit}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1 bg-slate-100 rounded-lg"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Banner Title <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. ATS Cables & Wiring Solutions"
                  value={bannerTitle}
                  onChange={e => setBannerTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Banner Image (Choose File or Paste URL) *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Option A: Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageFile(e, setBannerImage)}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Option B: Or Paste Image URL</span>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={bannerImage.startsWith('data:') ? '' : bannerImage}
                      onChange={e => setBannerImage(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {bannerImage && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-emerald-600 font-semibold block">Preview:</span>
                      <button
                        type="button"
                        onClick={() => setBannerImage('')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded-md transition"
                        title="Remove uploaded image"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove Image</span>
                      </button>
                    </div>
                    <div className="relative aspect-[21/9] max-h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center group">
                      <img src={bannerImage} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setBannerImage('')}
                        className="absolute top-2 right-2 bg-rose-600 text-white rounded-full p-1.5 shadow-md hover:bg-rose-500 transition hover:scale-105"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Redirect URL <span className="text-slate-400 font-normal lowercase">(optional - e.g. /products or /contact)</span>
                </label>
                <input
                  type="text"
                  placeholder="/products"
                  value={bannerLink}
                  onChange={e => setBannerLink(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition text-xs shadow-sm"
                >
                  {editingBannerIdx !== null ? 'Update Banner Slide' : 'Add Banner to Homepage Slider'}
                </button>
                {editingBannerIdx !== null && (
                  <button
                    type="button"
                    onClick={handleCancelBannerEdit}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Active Banners List */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-600">Current Active Banners ({banners.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banners.map((b, idx) => (
                  <div key={idx} className={`bg-white border rounded-2xl overflow-hidden group shadow-sm transition ${editingBannerIdx === idx ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'}`}>
                    <div className="relative aspect-[21/9] w-full bg-slate-100">
                      <img src={b.imageUrl} alt="" className="w-full h-full object-cover" />
                      
                      {/* Action Buttons: Edit and Delete */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditBanner(idx)}
                          className="bg-white/95 text-slate-800 p-2 rounded-lg text-xs hover:bg-white hover:text-emerald-700 transition shadow"
                          title="Edit Banner"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(idx)}
                          className="bg-rose-600 text-white p-2 rounded-lg text-xs hover:bg-rose-500 transition shadow"
                          title="Delete Banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Slide #{idx + 1}
                        </span>
                        {editingBannerIdx === idx && (
                          <span className="text-[10px] font-bold text-emerald-600 animate-pulse">Editing Now...</span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{b.title || 'Pure Image Banner'}</h4>
                      {b.linkUrl && (
                        <p className="text-[11px] text-slate-500 truncate">Link: {b.linkUrl}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NEW: Dedicated Products Section Promotional Banner */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm mt-8">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black uppercase text-emerald-600 tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Home Products Section Header Banner</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  This banner will appear directly above the product cards on the homepage (Our Products Section).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Section Banner Image (Upload File or Paste URL)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageFile(e, setProductSectionBanner)}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Or Paste Image URL</span>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={productSectionBanner.startsWith('data:') ? '' : productSectionBanner}
                      onChange={e => setProductSectionBanner(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {productSectionBanner && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-emerald-600 font-semibold block">Live Preview:</span>
                      <button
                        type="button"
                        onClick={() => setProductSectionBanner('')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded-md transition cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove Banner</span>
                      </button>
                    </div>
                    <div className="relative aspect-[21/7] max-h-48 rounded-xl overflow-hidden border border-slate-200 bg-white">
                      <img
                        src={productSectionBanner}
                        alt="Product Section Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Click Redirect Link (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /products or /contact"
                  value={productSectionBannerLink}
                  onChange={e => setProductSectionBannerLink(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSaveProductSectionBanner}
                  className="px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition cursor-pointer active:scale-95"
                >
                  Save Products Section Banner
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 5: PRODUCTS INVENTORY
           ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6 max-w-6xl">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 shadow-2xs">
                  <Package className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    Registered Products List ({products.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    All inventory items stored in ATS system
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartNewProduct}
                className="self-start sm:self-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Product</span>
              </button>
            </div>

            {/* Products Inventory View */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Desktop & Tablet Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                      <th className="py-3.5 px-5">Product Name</th>
                      <th className="py-3.5 px-5">Category</th>
                      <th className="py-3.5 px-5">Sub-Category</th>
                      <th className="py-3.5 px-5">Specs Count</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-5 font-semibold text-slate-900 flex items-center gap-3">
                          <img src={p.mainImage} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0" />
                          <div className="min-w-0">
                            <span className="font-bold block text-sm truncate max-w-xs">{p.name}</span>
                            <span className="text-[11px] text-emerald-600 font-semibold">{p.brand || 'ATS Energy'} • {p.features?.length || 0} Features</span>
                          </div>
                        </td>
                        <td className="py-3 px-5 text-slate-600 font-medium">{p.category}</td>
                        <td className="py-3 px-5 text-slate-500">{p.subcategory || '-'}</td>
                        <td className="py-3 px-5 text-slate-600 font-semibold">{p.attributes?.length || 0} Specs</td>
                        <td className="py-3 px-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Edit Product & Features"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.slug)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="sm:hidden divide-y divide-slate-100">
                {products.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">No products found</div>
                ) : (
                  products.map((p, idx) => (
                    <div key={idx} className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={p.mainImage}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                            {p.brand || 'ATS Energy'} • {p.features?.length || 0} Features
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100/80">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Category</span>
                          <span className="font-medium text-slate-700 text-[11px]">
                            {p.category} {p.subcategory ? `› ${p.subcategory}` : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.slug)}
                            className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 6: ADD / EDIT PRODUCT
           ======================================================== */}
        {activeTab === 'new-product' && (
          <form onSubmit={handleCreateProduct} className="space-y-6 max-w-5xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingProductSlug ? `Edit Product: ${name}` : 'Create New Product'}
                </h2>
                <p className="text-xs text-slate-500">
                  Configure Category, Features, Media, Technical Specs, Variants and Warranty.
                </p>
              </div>
              {editingProductSlug && (
                <button
                  type="button"
                  onClick={handleStartNewProduct}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* Cascading Dropdowns */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold uppercase text-emerald-600">1. Dependent Category Mapping</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category *</label>
                  <select
                    value={prodCategory}
                    onChange={e => {
                      setProdCategory(e.target.value);
                      setProdSubCategory('');
                      setProdSubSubCategory('');
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map((c) => (
                      <option key={c.id || c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Sub-Category</label>
                  <select
                    value={prodSubCategory}
                    disabled={!prodCategory || prodSubList.length === 0}
                    onChange={e => {
                      setProdSubCategory(e.target.value);
                      setProdSubSubCategory('');
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40"
                  >
                    <option value="">-- Choose Sub-Category --</option>
                    {prodSubList.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Sub-Sub-Category</label>
                  <select
                    value={prodSubSubCategory}
                    disabled={!prodSubCategory || prodSubSubList.length === 0}
                    onChange={e => setProdSubSubCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40"
                  >
                    <option value="">-- Choose Sub-Sub-Category --</option>
                    {prodSubSubList.map((ss) => (
                      <option key={ss.id} value={ss.name}>{ss.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ATS Ultra AC LED 20W"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. ATS Energy / Super Star"
                  value={productBrand}
                  onChange={e => setProductBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Product Variants: Sizes, Colors, Warranty */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold uppercase text-emerald-600">2. Product Specifications &amp; Variants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Sizes / Wattage / Ratings
                  </label>
                  <input
                    type="text"
                    placeholder="30W, 40W, 50W, 70W (comma separated)"
                    value={productSizes}
                    onChange={e => setProductSizes(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Separate sizes by comma</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Colors / Shades
                  </label>
                  <input
                    type="text"
                    placeholder="Daylight, Warm White, Cool Day (comma separated)"
                    value={productColors}
                    onChange={e => setProductColors(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Separate colors by comma</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Warranty Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 18 Months Replacement"
                    value={productWarranty}
                    onChange={e => setProductWarranty(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Official warranty term</span>
                </div>
              </div>
            </div>

            {/* Media Section: Main Image Upload/URL + 4 Extra Gallery Images + Video URL */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <h3 className="text-xs font-bold uppercase text-emerald-600">3. Media Upload (Images &amp; Video)</h3>

              {/* Main Image */}
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Main Product Image * (Choose Local File or Paste Optional URL)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 border-dashed rounded-xl cursor-pointer hover:bg-emerald-100 text-xs font-bold text-emerald-800 transition">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Upload Main Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleImageFile(e, setMainImage)}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Or paste image URL (optional)..."
                    value={mainImage.startsWith('data:') ? '' : mainImage}
                    onChange={e => setMainImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
                {mainImage && (
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0">
                        <img src={mainImage} alt="Main Preview" className="max-h-full max-w-full object-contain" />
                      </div>
                      <span className="text-xs text-emerald-700 font-bold">✓ Main Image Selected</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMainImage('')}
                      className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Extra Gallery Images: Single uploader + Dynamic List */}
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700">
                      Extra Gallery Images
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Upload from file or enter image URL. Added images will appear in the list below.
                    </span>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {galleryImages.length} Images Added
                  </span>
                </div>

                {/* Single Add Box */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 text-xs font-bold text-slate-700 transition shadow-xs">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span>Upload Gallery Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleImageFile(e, val => handleAddExtraImage(val))}
                      />
                    </label>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Or paste Image URL..."
                        value={currentExtraInput}
                        onChange={e => setCurrentExtraInput(e.target.value)}
                        className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddExtraImage(currentExtraInput)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shrink-0"
                      >
                        Add URL
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dynamic List of Added Gallery Images */}
                {galleryImages.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Added Gallery Images ({galleryImages.length}):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {galleryImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-xl border border-slate-200 bg-slate-50 p-1.5 flex flex-col items-center"
                        >
                          <div className="w-full aspect-square rounded-lg overflow-hidden bg-white flex items-center justify-center">
                            <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                          </div>
                          <span className="text-[10px] text-slate-500 font-semibold mt-1">
                            Image #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveExtraImage(idx)}
                            className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-1 shadow-md hover:bg-rose-500 transition"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Video: File Upload OR YouTube / Direct Video URL */}
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Product Demonstration Video (Upload Video File OR Paste YouTube / MP4 Link)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-50 border border-sky-200 border-dashed rounded-xl cursor-pointer hover:bg-sky-100 text-xs font-bold text-sky-900 transition">
                    <Upload className="w-4 h-4 text-sky-600" />
                    <span>Upload Video File (MP4/WebM)</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoFile}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Or paste YouTube / video URL..."
                    value={videoUrl.startsWith('data:') ? '' : videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {videoUrl && (
                  <div className="pt-2 flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="text-xs font-semibold text-slate-800 truncate">
                        {videoUrl.startsWith('data:') ? '✓ Video File Uploaded Successfully' : `✓ Video Link: ${videoUrl.slice(0, 30)}...`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideoUrl('')}
                      className="text-xs text-rose-600 hover:underline font-bold shrink-0 ml-2"
                    >
                      Remove Video
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product Key Features (Bullet Points) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold uppercase text-emerald-600">Product Key Features (Bullet Points)</h3>
                  <span className="text-[11px] text-slate-500">Add highlight features shown in the Features tab and product overview</span>
                </div>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">+ Add Feature</span>
                  <span className="sm:hidden">+ Add</span>
                </button>
              </div>

              <div className="space-y-2">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="e.g. High luminous efficacy with clear daylight output"
                      value={feat}
                      onChange={e => handleFeatureChange(idx, e.target.value)}
                      className="flex-1 min-w-0 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-rose-600 hover:text-rose-700 p-2 shrink-0"
                      title="Remove Feature"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Short Description</label>
              <input
                type="text"
                placeholder="Summary for product card..."
                value={shortDesc}
                onChange={e => setShortDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Description</label>
              <textarea
                rows={3}
                placeholder="Detailed engineering background..."
                value={desc}
                onChange={e => setDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Dynamic Attributes */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-emerald-600">Technical Attributes (Specs Table)</h3>
                <button
                  type="button"
                  onClick={handleAddAttribute}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Row</span>
                </button>
              </div>

              <div className="space-y-2">
                {attributes.map((attr, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Key (e.g. Wattage)"
                      value={attr.key}
                      onChange={e => handleAttributeChange(idx, 'key', e.target.value)}
                      className="w-1/2 min-w-0 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 18 Watt)"
                      value={attr.value}
                      onChange={e => handleAttributeChange(idx, 'value', e.target.value)}
                      className="w-1/2 min-w-0 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAttribute(idx)}
                      className="text-rose-600 hover:text-rose-700 p-2 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition text-xs shadow-sm"
            >
              Save Product into ATS Database
            </button>
          </form>
        )}

        {/* ========================================================
            PAGE 7: INQUIRIES
           ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 max-w-5xl">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 shadow-2xs">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    Customer &amp; Quotation Inquiries
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    All inquiries submitted from the website Contact Page and Entry Quotation Popup appear here in real-time.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={loadInquiries}
                className="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition shrink-0 shadow-2xs"
              >
                Refresh Inquiries
              </button>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setInquiryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    inquiryFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All ({inquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter('new')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    inquiryFilter === 'new'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  New ({inquiries.filter(i => i.status === 'new' || !i.status).length})
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter('contacted')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    inquiryFilter === 'contacted'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Contacted ({inquiries.filter(i => i.status === 'contacted').length})
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter('closed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    inquiryFilter === 'closed'
                      ? 'bg-slate-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Archived ({inquiries.filter(i => i.status === 'closed').length})
                </button>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, phone, email..."
                  value={inquirySearch}
                  onChange={e => setInquirySearch(e.target.value)}
                  className="w-full sm:w-64 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>
            </div>

            {loadingInquiries ? (
              <div className="text-center py-12 text-slate-500 text-xs">Loading inquiries...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-700">No Inquiries Found</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {inquirySearch ? 'No inquiries match your search query.' : 'No inquiries recorded in this filter.'}
                </p>
                {inquirySearch && (
                  <button
                    type="button"
                    onClick={() => setInquirySearch('')}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredInquiries.map((inq, idx) => {
                  const inqId = inq._id || inq.id || `inq_${idx}`;
                  const isNew = inq.status === 'new' || !inq.status;
                  const isContacted = inq.status === 'contacted';
                  const isClosed = inq.status === 'closed';
                  const dateStr = inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Recent';

                  return (
                    <div
                      key={inqId}
                        className={`group rounded-xl border bg-white transition hover:shadow-sm ${
                          isNew
                            ? 'border-slate-300 shadow-2xs'
                            : 'border-slate-200 opacity-90 hover:opacity-100'
                        }`}
                      >
                        <div className="p-4 sm:p-5 space-y-3">
                          {/* Top: Sender Name, Email, Status & Date (Clean Inbox Header) */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              {/* Blue unread dot for new */}
                              {isNew ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" title="Unread inquiry" />
                              ) : (
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" title="Reviewed" />
                              )}

                              <span className="font-bold text-slate-900 text-sm tracking-tight">
                                {inq.name}
                              </span>

                              {inq.company && (
                                <span className="text-xs text-slate-500 font-normal">
                                  • {inq.company}
                                </span>
                              )}

                              {inq.email && (
                                <span className="text-xs text-slate-400 font-normal hidden sm:inline">
                                  &lt;{inq.email}&gt;
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-auto">
                              <span className="text-[11px] text-slate-400 font-medium">
                                {dateStr}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(inqId)}
                                className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-slate-100 transition"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Subject Line (Like Gmail/Outlook Subject) */}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold text-slate-600">Subject:</span>
                            <span className="font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                              {inq.productOfInterest || 'General Contact Inquiry'}
                            </span>
                          </div>

                          {/* Email Body: Simple, clean white card with subtle quote styling */}
                          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100 text-xs sm:text-sm text-slate-700 font-normal whitespace-pre-wrap leading-relaxed">
                            {inq.message || 'No additional requirement message provided.'}
                          </div>

                          {/* Bottom: Contact Details & Status Bar */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                            <div className="flex flex-wrap items-center gap-3 text-slate-600">
                              <a
                                href={`tel:${inq.phone}`}
                                className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                              >
                                📞 {inq.phone}
                              </a>
                              {inq.email && (
                                <a
                                  href={`mailto:${inq.email}`}
                                  className="hover:text-slate-900 inline-flex items-center gap-1"
                                >
                                  ✉️ {inq.email}
                                </a>
                              )}
                            </div>

                            {/* Minimal Email Status Tag & Toggle */}
                            <div className="flex items-center gap-1 self-end sm:self-auto">
                              <button
                                type="button"
                                onClick={() => handleUpdateInquiryStatus(inqId, 'new')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                                  isNew
                                    ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                New
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateInquiryStatus(inqId, 'contacted')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                                  isContacted
                                    ? 'bg-slate-800 text-white font-semibold shadow-2xs'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                Contacted
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateInquiryStatus(inqId, 'closed')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                                  isClosed
                                    ? 'bg-slate-600 text-white font-semibold shadow-2xs'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                Archived
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
