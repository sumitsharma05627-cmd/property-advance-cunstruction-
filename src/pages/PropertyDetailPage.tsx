import React, { useState } from 'react';
import { PageId, PropertyItem } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { Image } from '../components/Image';
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Check,
  MessageSquare,
  Phone,
  Calendar,
  Share2,
  Building,
  ShieldCheck,
  Info,
  Columns3,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

interface PropertyDetailPageProps {
  property: PropertyItem;
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
  isCompared?: boolean;
  onToggleCompare?: (property: PropertyItem) => void;
  onOpenCompareModal?: () => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onNavigate,
  onOpenEnquiry,
  isCompared = false,
  onToggleCompare,
  onOpenCompareModal,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = property.galleryImages && property.galleryImages.length > 0
    ? property.galleryImages
    : [property.imageUrl];

  const currentImage = images[activeImageIndex] || property.imageUrl;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleWhatsApp = () => {
    const text = `Hello Advance Property Construction, I am viewing "${property.title}" in ${property.location} on your website. Please share full details and arrange a discussion.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${property.title} | Advance Property Construction`,
        text: `Check out this property in Gwalior: ${property.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Quiet toast notification instead of alert
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 py-10 pb-24 md:pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </button>

          <div className="flex items-center gap-2">
            {onToggleCompare && (
              <button
                onClick={() => onToggleCompare(property)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  isCompared
                    ? 'bg-[#8B6D33] text-white dark:bg-[#C5A880] dark:text-[#0B0E14]'
                    : 'bg-white dark:bg-[#161D2B] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-[#EAE6DF] dark:border-white/10 shadow-xs'
                }`}
                title={isCompared ? 'Remove from comparison' : 'Add to compare'}
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span>{isCompared ? 'In Comparison' : 'Add to Compare'}</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#161D2B] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs border border-[#EAE6DF] dark:border-white/10 shadow-xs"
              title="Share property"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Demo Banner Notice */}
        <div className="mb-6 p-3.5 rounded-xl bg-white dark:bg-[#141C2B] border border-[#EAE6DF] dark:border-[#C5A880]/30 flex items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2 text-[#8B6D33] dark:text-[#C5A880]">
            <Info className="w-4 h-4 shrink-0" />
            <span className="font-bold uppercase tracking-wider">Demo Listing — Replace With Actual Property</span>
          </div>
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Specifications are ready for live inventory details.</span>
        </div>

        {/* Main Grid: Details + Sticky Enquiry Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Gallery, Specs, Description, Amenities */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Visual Gallery Preview */}
            <div className="space-y-3">
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="rounded-2xl overflow-hidden border border-[#EAE6DF] dark:border-white/10 shadow-md relative bg-white dark:bg-[#0C1018] group cursor-pointer"
              >
                <Image
                  theme={property.visualTheme}
                  src={currentImage}
                  alt={`${property.title} - View ${activeImageIndex + 1}`}
                  aspectRatio="16:9"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Left/Right arrow controls if multiple images */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Bottom Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded bg-[#FAF8F5]/95 dark:bg-[#0A0D14]/90 text-slate-900 dark:text-[#C5A880] border border-[#DDD7CD] dark:border-[#C5A880]/30 backdrop-blur-md shadow-xs">
                    {property.type} · {property.purpose}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded bg-black/70 text-white backdrop-blur-md">
                      {activeImageIndex + 1} / {images.length} Photos
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded bg-black/70 text-white backdrop-blur-md hidden sm:inline">
                      Click to expand
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 sm:w-24 sm:h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#8B6D33] dark:border-[#C5A880] ring-2 ring-[#8B6D33]/30 dark:ring-[#C5A880]/40 scale-[1.02]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        theme={property.visualTheme}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Key Info */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs">
              <div className="flex items-center gap-2 text-xs text-[#8B6D33] dark:text-[#C5A880] uppercase tracking-wider font-bold mb-2">
                <span>{property.type}</span>
                <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                <span>{property.locality}</span>
                <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                <span>{property.purpose}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-3">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-6">
                <MapPin className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0" />
                <span>{property.location}</span>
              </div>

              {/* Key Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-4 rounded-xl bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#EAE6DF] dark:border-white/[0.06]">
                <div>
                  <span className="block text-[10px] uppercase text-slate-500 font-bold">Area / Size</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">{property.size}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-slate-500 font-bold">Price</span>
                  <span className="text-sm font-bold text-[#8B6D33] dark:text-[#C5A880]">{property.price}</span>
                </div>
                {property.bedrooms !== undefined && (
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500 font-bold">Bedrooms</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">{property.bedrooms} BHK</span>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500 font-bold">Bathrooms</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">{property.bathrooms} Baths</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-4">
                Property Overview & Description
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-6">
                {property.fullDescription}
              </p>

              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] mb-3">
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities & Infrastructure */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-4">
                Amenities & Infrastructure Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#EAE6DF] dark:border-white/5 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <Building className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Neighborhood Guidance */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-3">
                Location Information & Accessibility
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Situated in {property.locality}, Gwalior. Convenient access to major arterial transit roads, civic amenities, educational institutions, and healthcare centers. Advance Property Construction conducts accompanied site visits for prospective clients.
              </p>
              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#EAE6DF] dark:border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Want to inspect the site on-ground?</span>
                <button
                  onClick={() => onOpenEnquiry(property.title, `Site Visit Request: ${property.title}`)}
                  className="text-[#8B6D33] dark:text-[#C5A880] hover:underline font-bold"
                >
                  Schedule Site Inspection
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Desktop Sticky Enquiry Panel */}
          <div className="lg:col-span-4 sticky top-28 space-y-6 hidden lg:block">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121825] border border-[#EAE6DF] dark:border-[#C5A880]/30 shadow-md dark:shadow-2xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-1">
                Property Inquiries
              </span>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                Interested in this Property?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Connect directly with Advance Property Construction to verify availability, review documents, or arrange a private viewing.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1] dark:border-white/[0.06] text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Listing Reference:</span>
                  <span className="text-slate-900 dark:text-white font-mono">{property.id}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1] dark:border-white/[0.06] text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Location:</span>
                  <span className="text-slate-900 dark:text-white font-medium">{property.locality}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1] dark:border-white/[0.06] text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Configured Price:</span>
                  <span className="text-[#8B6D33] dark:text-[#C5A880] font-bold">{property.price}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => onOpenEnquiry(property.title, `Property Enquiry: ${property.title}`)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-all shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Enquire Now</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-800 dark:text-white bg-[#FAF8F5] dark:bg-[#1A2536] hover:bg-[#25D366]/10 border border-[#E2DDD5] dark:border-[#25D366]/40 rounded-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Details</span>
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#0E131C] border border-[#E5E0D6] dark:border-white/10 rounded-md transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0ECE1] dark:border-white/[0.06] flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0" />
                <span>Verified Direct Business Contact in Gwalior</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-6 backdrop-blur-md"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/10" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm font-semibold truncate">
              {property.title} — Photo {activeImageIndex + 1} of {images.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center my-auto" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentImage}
              theme={property.visualTheme}
              alt={property.title}
              objectFit="contain"
              className="max-w-full max-h-[75vh] rounded-lg shadow-2xl"
              containerClassName="max-w-full max-h-[75vh] bg-transparent"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails row in lightbox */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto max-w-3xl py-2" onClick={(e) => e.stopPropagation()}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#C5A880] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <Image
                    src={img}
                    theme={property.visualTheme}
                    alt=""
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MOBILE STICKY BOTTOM BAR (<15% viewport height cap rule) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B0E14]/95 backdrop-blur-md border-t border-[#EAE6DF] dark:border-white/10 px-4 py-3 flex items-center justify-between gap-2 shadow-xl">
        <a
          href={`tel:${BUSINESS_INFO.phoneClean}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-[#F4F1EA] dark:bg-[#161D2B] rounded-md border border-[#E2DDD5] dark:border-white/10"
        >
          <Phone className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
          <span>Call</span>
        </a>

        <button
          onClick={handleWhatsApp}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-white bg-white dark:bg-[#1E293B] border border-[#25D366]/40 rounded-md"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => onOpenEnquiry(property.title, `Property Enquiry: ${property.title}`)}
          className="flex-[1.5] inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md shadow-xs"
        >
          <span>Enquire</span>
        </button>
      </div>

    </div>
  );
};
