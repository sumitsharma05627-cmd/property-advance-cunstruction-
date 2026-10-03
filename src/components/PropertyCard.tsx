import React from 'react';
import { PropertyItem } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { Image } from './Image';
import { MapPin, Maximize2, BedDouble, Bath, ArrowRight, MessageSquare, Columns3, Check } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyItem;
  onViewDetails: (property: PropertyItem) => void;
  onEnquire: (property: PropertyItem) => void;
  layout?: 'grid' | 'horizontal';
  isCompared?: boolean;
  onToggleCompare?: (property: PropertyItem) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onEnquire,
  layout = 'grid',
  isCompared = false,
  onToggleCompare,
}) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello Advance Property Construction, I am interested in enquiring about: "${property.title}" in ${property.location}. Please provide details.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const isHorizontal = layout === 'horizontal';

  return (
    <div
      onClick={() => onViewDetails(property)}
      className={`group cursor-pointer rounded-xl bg-white dark:bg-[#111622] border transition-all duration-300 overflow-hidden flex flex-col shadow-xs hover:shadow-md ${
        isCompared
          ? 'border-[#8B6D33] dark:border-[#C5A880] ring-1 ring-[#8B6D33]/40 dark:ring-[#C5A880]/50'
          : 'border-[#EAE6DF] dark:border-white/[0.08] hover:border-[#8B6D33]/40 dark:hover:border-[#C5A880]/40'
      } ${isHorizontal ? 'md:flex-row' : ''} premium-card-hover`}
    >
      {/* Visual Render / Image Slot */}
      <div className={`relative overflow-hidden ${isHorizontal ? 'md:w-5/12 shrink-0' : 'w-full'}`}>
        <Image
          src={property.imageUrl}
          theme={property.visualTheme}
          alt={property.title}
          aspectRatio="4:3"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Mandatory Demo Label: "Demo Listing — Replace With Actual Property" */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10 pointer-events-none">
          <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#FAF8F5]/95 dark:bg-[#0A0D14]/90 text-slate-800 dark:text-[#C5A880] border border-[#DDD7CD] dark:border-[#C5A880]/30 backdrop-blur-md shadow-xs">
            Demo Listing — Replace With Actual Property
          </span>
          <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-black/70 text-white border border-white/10 backdrop-blur-md">
            {property.purpose}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Metadata Row: Zero-Pill Unboxed Text with Separators */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-[#8B6D33] dark:text-[#C5A880] font-bold tracking-wider uppercase">{property.type}</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>{property.locality}</span>
              {property.size && (
                <>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                  <span className="tabular-nums font-medium">{property.size}</span>
                </>
              )}
            </div>

            {/* Compare Toggle Button */}
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(property);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                  isCompared
                    ? 'bg-[#8B6D33] text-white dark:bg-[#C5A880] dark:text-[#0B0E14] shadow-xs'
                    : 'bg-[#F4F1EA] text-slate-700 hover:text-slate-900 border border-[#E2DDD5] dark:bg-[#182133] dark:text-slate-400 dark:hover:text-white dark:border-white/10'
                }`}
                title={isCompared ? 'Remove from comparison' : 'Add to compare (up to 3)'}
                aria-label={isCompared ? 'Remove from comparison' : 'Add to compare'}
              >
                {isCompared ? <Check className="w-3 h-3" /> : <Columns3 className="w-3 h-3 text-[#8B6D33] dark:text-[#C5A880]" />}
                <span>{isCompared ? 'Comparing' : 'Compare'}</span>
              </button>
            )}
          </div>

          {/* Property Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#8B6D33] dark:group-hover:text-[#C5A880] transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {property.shortDescription}
          </p>

          {/* Key Metric Specs */}
          <div className="flex items-center gap-4 py-2 px-3 rounded-lg bg-[#FAF8F5] dark:bg-[#0A0D15]/60 border border-[#EAE6DF] dark:border-white/[0.05] text-xs text-slate-700 dark:text-slate-300 mb-4">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
              <span className="tabular-nums font-medium">{property.size}</span>
            </div>
            {property.bedrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                <span className="tabular-nums font-medium">{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                <span className="tabular-nums font-medium">{property.bathrooms} Baths</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer & Actions */}
        <div className="pt-3 border-t border-[#F0ECE1] dark:border-white/[0.06] flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-500">Price</span>
            <span className="text-sm font-bold text-[#8B6D33] dark:text-[#C5A880]">{property.price}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsApp}
              className="p-2 rounded-md bg-[#FAF8F5] hover:bg-[#25D366]/10 border border-[#E2DDD5] text-slate-700 hover:text-[#25D366] dark:bg-[#161D2B] dark:hover:bg-[#25D366]/20 dark:border-white/10 dark:text-slate-300 dark:hover:text-[#25D366] transition-colors"
              title="Enquire on WhatsApp with property title"
              aria-label="Enquire on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </button>

            {/* Enquire CTA */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEnquire(property);
              }}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-900 dark:text-white bg-[#F0ECE1] hover:bg-[#E5DEC\-] dark:bg-[#1A2335] dark:hover:bg-[#232F47] border border-[#DDD7CD] dark:border-[#C5A880]/30 transition-colors whitespace-nowrap shadow-xs"
            >
              Enquire
            </button>

            {/* View Property */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(property);
              }}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white transition-colors"
              title="View Details"
              aria-label="View Details"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
