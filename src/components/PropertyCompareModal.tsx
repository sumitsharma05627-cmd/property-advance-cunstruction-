import React from 'react';
import { PropertyItem } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { Image } from './Image';
import {
  X,
  Check,
  Minus,
  MessageSquare,
  Calendar,
  Trash2,
  MapPin,
  Building,
} from 'lucide-react';

interface PropertyCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: PropertyItem[];
  onRemoveProperty: (id: string) => void;
  onClearAll: () => void;
  onViewProperty: (property: PropertyItem) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
}

export const PropertyCompareModal: React.FC<PropertyCompareModalProps> = ({
  isOpen,
  onClose,
  properties,
  onRemoveProperty,
  onClearAll,
  onViewProperty,
  onOpenEnquiry,
}) => {
  if (!isOpen) return null;

  // Extract all unique amenities across the compared properties
  const allAmenities = Array.from(
    new Set(properties.flatMap((p) => p.amenities || []))
  );

  const handleWhatsAppAll = () => {
    const titles = properties.map((p) => `"${p.title}" (${p.location})`).join(', ');
    const text = `Hello Advance Property Construction, I am comparing the following properties in Gwalior on your website: ${titles}. Please provide a comparative consultation.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppSingle = (property: PropertyItem) => {
    const text = `Hello Advance Property Construction, I compared "${property.title}" on your website and would like specific details regarding pricing and site inspection.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl my-6 bg-white dark:bg-[#0E131E] border border-[#EAE6DF] dark:border-[#C5A880]/30 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] text-slate-900 dark:text-slate-100 overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE6DF] dark:border-white/10 flex items-center justify-between gap-4 bg-[#FAF8F5] dark:bg-[#111724]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] mb-1">
              <span>Property Comparison Matrix</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span className="tabular-nums">{properties.length} of 3 Selected</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Side-by-Side Property Comparison
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {properties.length > 0 && (
              <button
                onClick={onClearAll}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-500 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close comparison view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Comparison Table Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-white dark:bg-[#0E131E]">
          {properties.length === 0 ? (
            <div className="text-center py-16">
              <Building className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">No Properties Selected</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                Add up to three properties to this comparison matrix using the &quot;Compare&quot; button on any property card.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] dark:bg-[#C5A880] rounded-md shadow-xs"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="min-w-[640px]">
              {/* Properties Cards Row (Columns) */}
              <div
                className="grid gap-4 mb-6"
                style={{
                  gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                }}
              >
                {/* Empty corner label cell */}
                <div className="p-3 flex flex-col justify-end text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <span>Parameter</span>
                </div>

                {/* Property Header Cards */}
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141B28] border border-[#EAE6DF] dark:border-white/10 relative flex flex-col justify-between shadow-xs"
                  >
                    <button
                      onClick={() => onRemoveProperty(property.id)}
                      className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-500 bg-white/80 dark:bg-black/60 rounded-full z-10 shadow-xs"
                      title="Remove from comparison"
                      aria-label="Remove property"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      {/* Visual */}
                      <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 border border-[#EAE6DF] dark:border-white/5">
                        <Image
                          theme={property.visualTheme}
                          src={property.imageUrl}
                          alt={property.title}
                          aspectRatio="16:9"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="text-[10px] uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] font-bold mb-1">
                        {property.type} · {property.purpose}
                      </div>

                      <h3
                        onClick={() => {
                          onClose();
                          onViewProperty(property);
                        }}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-[#8B6D33] dark:hover:text-[#C5A880] cursor-pointer transition-colors line-clamp-1 mb-1"
                      >
                        {property.title}
                      </h3>

                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mb-3 truncate">
                        <MapPin className="w-3 h-3 text-[#8B6D33] dark:text-[#C5A880] shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EAE6DF] dark:border-white/10 flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          onClose();
                          onViewProperty(property);
                        }}
                        className="w-full py-1.5 px-2 text-[11px] font-semibold text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#1D2638] border border-[#E2DDD5] dark:border-white/10 rounded transition-colors text-center shadow-xs"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => onOpenEnquiry(property.title, `Comparison Enquiry: ${property.title}`)}
                        className="w-full py-1.5 px-2 text-[11px] font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded transition-colors text-center shadow-xs"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specification Table Rows */}
              <div className="rounded-xl border border-[#EAE6DF] dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#101622] divide-y divide-[#F0ECE1] dark:divide-white/[0.06] text-xs">
                
                {/* Row: Price */}
                <div
                  className="grid p-3.5 bg-[#FAF8F5]/80 dark:bg-[#141B28]/50"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Price
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="font-bold text-[#8B6D33] dark:text-[#C5A880] text-sm">
                      {p.price}
                    </div>
                  ))}
                </div>

                {/* Row: Size / Area */}
                <div
                  className="grid p-3.5"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Size / Area
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="text-slate-900 dark:text-white tabular-nums font-semibold">
                      {p.size}
                    </div>
                  ))}
                </div>

                {/* Row: Property Type */}
                <div
                  className="grid p-3.5 bg-[#FAF8F5]/80 dark:bg-[#141B28]/50"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Category
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="text-slate-800 dark:text-slate-200">
                      {p.type}
                    </div>
                  ))}
                </div>

                {/* Row: Purpose */}
                <div
                  className="grid p-3.5"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Intended Purpose
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="text-slate-800 dark:text-slate-200 font-medium">
                      {p.purpose}
                    </div>
                  ))}
                </div>

                {/* Row: Bedrooms & Bathrooms */}
                <div
                  className="grid p-3.5 bg-[#FAF8F5]/80 dark:bg-[#141B28]/50"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Rooms / Layout
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="text-slate-700 dark:text-slate-300">
                      {p.bedrooms !== undefined ? (
                        <span className="tabular-nums font-medium">{p.bedrooms} BHK / {p.bathrooms || p.bedrooms} Baths</span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 italic">Not applicable (Plot/Commercial)</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Row: Locality */}
                <div
                  className="grid p-3.5"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Locality in Gwalior
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="text-slate-800 dark:text-slate-200">
                      {p.locality}
                    </div>
                  ))}
                </div>

                {/* Row: Architectural Style */}
                <div
                  className="grid p-3.5 bg-[#FAF8F5]/80 dark:bg-[#141B28]/50"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Architectural Elevation
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="text-slate-700 dark:text-slate-300 text-[11px]">
                      {p.architecturalStyle}
                    </div>
                  ))}
                </div>

                {/* Row: Key Features */}
                <div
                  className="grid p-3.5"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Key Features
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="space-y-1.5 text-[11px]">
                      {p.keyFeatures.map((kf, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{kf}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Row: Amenities Matrix */}
                <div
                  className="grid p-3.5 bg-[#FAF8F5]/80 dark:bg-[#141B28]/50"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Amenities Breakdown
                  </div>
                  {properties.map((p) => (
                    <div key={p.id} className="space-y-1 text-[11px]">
                      {allAmenities.map((amenity, idx) => {
                        const hasAmenity = p.amenities?.includes(amenity);
                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-1.5 ${
                              hasAmenity ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-400 dark:text-slate-600'
                            }`}
                          >
                            {hasAmenity ? (
                              <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                            ) : (
                              <Minus className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 shrink-0" />
                            )}
                            <span className={hasAmenity ? '' : 'line-through opacity-60'}>
                              {amenity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Row: Quick Contact / WhatsApp */}
                <div
                  className="grid p-3.5"
                  style={{
                    gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    Direct WhatsApp
                  </div>
                  {properties.map((p) => (
                    <div key={p.id}>
                      <button
                        onClick={() => handleWhatsAppSingle(p)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-slate-800 dark:text-white bg-[#FAF8F5] hover:bg-[#25D366]/10 border border-[#E2DDD5] dark:bg-[#1A2536] dark:border-[#25D366]/30 rounded transition-colors shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Chat Regarding This</span>
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        {properties.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#EAE6DF] dark:border-white/10 bg-[#FAF8F5] dark:bg-[#111724] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
              Want professional advice comparing these options in Gwalior?
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleWhatsAppAll}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-white bg-white dark:bg-[#1E293B] hover:bg-[#25D366]/10 border border-[#25D366]/40 rounded-md transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Discuss on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenEnquiry(undefined, 'Comparative Property Consultation');
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Comparison Call</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
