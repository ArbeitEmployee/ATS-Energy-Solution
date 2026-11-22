export interface Attribute {
  key: string;
  value: string;
}

export interface SubSubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  subSubCategories?: SubSubCategory[];
}

export interface Category {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  image?: string;
  banner?: string;
  description?: string;
  icon?: string;
  subcategories?: string[];
  subCategoriesList?: SubCategory[];
}

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  subSubCategory?: string;
  shortDescription: string;
  description: string;
  mainImage: string;
  gallery: string[];
  videoUrl?: string;
  sizes?: string[];
  colors?: string[];
  warranty?: string;
  brand?: string;
  attributes: Attribute[];
  features: string[];
  applications: string[];
  featured: boolean;
  isAvailable: boolean;
  brochureUrl?: string;
  createdAt?: string;
}

export interface ServiceItem {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface Inquiry {
  _id?: string;
  id?: string;
  name: string;
  email?: string;
  phone: string;
  company?: string;
  productOfInterest?: string;
  message?: string;
  status?: 'new' | 'in-review' | 'contacted' | 'closed';
  createdAt?: string;
}

export interface Banner {
  _id?: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  order?: number;
  isActive?: boolean;
}

export interface PartnerReview {
  id?: string;
  _id?: string;
  author: string;
  designation: string;
  quote: string;
  image?: string;
  rating?: number;
}

export interface KeyClient {
  id?: string;
  _id?: string;
  name: string;
  logo: string;
  website?: string;
}

export interface SocialMediaLinks {
  facebook: string;
  whatsapp: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  twitter: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  canonicalUrl: string;
  author: string;
  googleSiteVerification?: string;
}

export interface LegalContent {
  termsTitle: string;
  termsLastUpdated: string;
  termsContent: string;
  privacyTitle: string;
  privacyLastUpdated: string;
  privacyContent: string;
}

export interface PopupSettings {
  isEnabled: boolean;
  type: 'form' | 'image';
  // Form type fields
  formTitle: string;
  formSubtitle: string;
  submitButtonText: string;
  // Image type fields
  imageUrl: string;
  imageLinkUrl?: string;
}

export interface RightChoiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface AboutContent {
  tagline: string;
  title: string;
  aboutText: string;
  image: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  statHappyCustomers: string;
  statSuccessfulProjects: string;
  statDealersPartners: string;
  statCustomerSupport: string;
  valuesList: string[];
  whyChooseUsList: string[];
  servicesIncludeList: string[];
  rightChoiceSubtitle?: string;
  rightChoiceTitle?: string;
  rightChoiceCards?: RightChoiceItem[];
}
