import React, { useState, useMemo } from 'react';
import { PageId, PropertyItem, PropertyType, PropertyPurpose } from '../types';
import { DEMO_PROPERTIES, BUSINESS_INFO } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { Filter, Grid, List, Search, RotateCcw, MessageSquare, Phone } from 'lucide-react';

interface PropertiesPageProps {
  onNavigate: (page: PageId) => void;
  onViewProperty: (property: PropertyItem) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
  comparedPropertyIds?: string[];
  onToggleCompare?: (property: PropertyItem) => void;
  onOpenCompareModal?: () => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onNavigate,
  onViewProperty,
  onOpenEnquiry,
  comparedPropertyIds = [],
  onToggleCompare,
  onOpenCompareModal,
}) => {
  const [selectedType, setSelectedType] = useState<PropertyType | 'All'>('All');
  const [selectedPurpose, setSelectedPurpose] = useState<PropertyPurpose | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState<'All' | 'Gwalior' | 'Other'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'horizontal'>('grid');

  const filteredProperties = useMemo(() => {
    return DEMO_PROPERTIES.filter((item) => {
      if (selectedType !== 'All' && item.type !== selectedType) return false;
      if (selectedPurpose !== 'All' && item.purpose !== selectedPurpose) return false;
      if (selectedLocation === 'Gwalior' && !item.location.toLowerCase().includes('gwalior')) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchLoc = item.location.toLowerCase().includes(query);
        const matchType = item.type.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchType) return false;
      }
      return true;
    });
  }, [selectedType, selectedPurpose, selectedLocation, searchTerm]);

  const resetFilters = () => {
    setSelectedType('All');
    setSelectedPurpose('All');
    setSelectedLocation('All');
    setSearchTerm('');
  };

  const openWhatsAppGeneral = () => {
    const encoded = encodeURIComponent(BUSINESS_INFO.defaultWhatsAppMessage);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#8B6D33] dark:text-[#C5A880] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6D33] dark:bg-[#C5A880]" />
            <span>PROPERTY DISCOVERY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white mb-3">
            Available Properties in Gwalior
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Explore sample residential villas, commercial showrooms, corporate floors, and plotted land parcels. All items demonstrate the layout format ready to display your verified listings.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.08] rounded-2xl p-5 sm:p-6 mb-10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search Term */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Keyword / Locality
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. City Centre, Lashkar, Plot..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
              >
                <option value="All">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot/Land">Plot/Land</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Purpose
              </label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
              >
                <option value="All">All Purposes</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
                <option value="Invest">Invest</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
              >
                <option value="All">All Regions</option>
                <option value="Gwalior">Gwalior Only</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Filter Footer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#F0ECE1] dark:border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Showing <strong className="text-slate-900 dark:text-white tabular-nums">{filteredProperties.length}</strong> listings
              </span>
              {(selectedType !== 'All' || selectedPurpose !== 'All' || selectedLocation !== 'All' || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#8B6D33] dark:text-[#C5A880] hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            {/* Layout Toggle & Compare Button */}
            <div className="flex items-center gap-2">
              {comparedPropertyIds.length > 0 && onOpenCompareModal && (
                <button
                  onClick={onOpenCompareModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#8B6D33]/15 text-[#8B6D33] dark:bg-[#C5A880]/15 dark:text-[#C5A880] border border-[#8B6D33]/30 dark:border-[#C5A880]/30 hover:bg-[#8B6D33]/25 transition-colors"
                >
                  <span>Compare ({comparedPropertyIds.length}/3)</span>
                </button>
              )}

              <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#0C1017] p-1 rounded-md border border-[#E2DDD5] dark:border-white/10">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    layoutMode === 'grid'
                      ? 'bg-white dark:bg-[#1F293D] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                  }`}
                  title="Grid view"
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutMode('horizontal')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    layoutMode === 'horizontal'
                      ? 'bg-white dark:bg-[#1F293D] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                  }`}
                  title="Horizontal list view"
                  aria-label="Horizontal view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Display */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.08] rounded-2xl max-w-xl mx-auto shadow-sm">
            <Filter className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Matching Properties</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              No listings match your selected criteria. Try adjusting your filter parameters or request a custom property search.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-white bg-[#F2EFE8] dark:bg-[#1A2232] rounded-md border border-[#DDD7CD] dark:border-white/10"
              >
                Reset Filters
              </button>
              <button
                onClick={() => onOpenEnquiry(undefined, 'Custom Property Search')}
                className="px-4 py-2 text-xs font-semibold text-white dark:text-[#0B0E14] bg-[#8B6D33] dark:bg-[#C5A880] rounded-md"
              >
                Request Custom Search
              </button>
            </div>
          </div>
        ) : (
          <div
            className={
              layoutMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }
          >
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                layout={layoutMode}
                onViewDetails={onViewProperty}
                onEnquire={(p) => onOpenEnquiry(p.title, `Property Enquiry: ${p.title}`)}
                isCompared={comparedPropertyIds.includes(prop.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        )}

        {/* Notice on Real Inventory */}
        <div className="mt-16 p-6 rounded-2xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Have a Specific Property In Mind in Gwalior?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Not all properties are listed publicly. Contact us with your specific locality and budget to access offline options.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenEnquiry(undefined, 'Direct Requirement Search')}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
            >
              Submit Criteria
            </button>
            <button
              onClick={openWhatsAppGeneral}
              className="p-2.5 text-slate-700 dark:text-white bg-[#FAF8F5] dark:bg-[#161D2B] hover:bg-[#25D366]/10 border border-[#E2DDD5] dark:border-white/10 rounded-md transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
