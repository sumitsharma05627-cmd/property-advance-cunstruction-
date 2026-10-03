export type PageId =
  | 'home'
  | 'about'
  | 'properties'
  | 'property-detail'
  | 'services'
  | 'projects'
  | 'contact'
  | 'consultation';

export type PropertyType = 'Residential' | 'Commercial' | 'Plot/Land' | 'Other';
export type PropertyPurpose = 'Buy' | 'Sell' | 'Invest';

export interface PropertyItem {
  id: string;
  title: string;
  isDemo: boolean;
  type: PropertyType;
  purpose: PropertyPurpose;
  location: string;
  locality: string;
  price: string;
  priceRaw?: number;
  size: string;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  amenities: string[];
  architecturalStyle: string;
  visualTheme: 'luxury-villa' | 'commercial-plaza' | 'residential-apartment' | 'prime-plot';
  imageUrl: string;
  galleryImages?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  isDemo: boolean;
  category: 'Residential' | 'Commercial' | 'Construction' | 'Upcoming';
  location: string;
  status: string;
  overview: string;
  highlights: string[];
  specifications: { label: string; value: string }[];
  visualTheme: 'luxury-villa' | 'commercial-plaza' | 'construction-site' | 'upcoming-development';
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  iconType: 'compass' | 'building' | 'trending-up' | 'map-pin' | 'hammer' | 'shield-check' | 'briefcase';
}

export interface EnquirySubmission {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  requirement: string;
  propertyType: string;
  preferredLocation: string;
  budget: string;
  message?: string;
  propertyTitle?: string;
}
