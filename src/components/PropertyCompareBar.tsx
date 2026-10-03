import React from 'react';
import { PropertyItem } from '../types';
import { Columns3, X, ArrowRight, Trash2 } from 'lucide-react';
import { Image } from './Image';

interface PropertyCompareBarProps {
  comparedProperties: PropertyItem[];
  onOpenCompareModal: () => void;
  onRemoveProperty: (id: string) => void;
  onClearAll: () => void;
}

export const PropertyCompareBar: React.FC<PropertyCompareBarProps> = ({
  comparedProperties,
  onOpenCompareModal,
  onRemoveProperty,
  onClearAll,
}) => {
  if (comparedProperties.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl pointer-events-auto">
      <div className="p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#0E1420]/95 backdrop-blur-xl border border-[#EAE6DF] dark:border-[#C5A880]/40 shadow-xl dark:shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-900 dark:text-slate-100 animate-slide-up">
        
        {/* Left: Indicator & Thumbnails */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#182133] border border-[#E5E0D6] dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] shrink-0">
            <Columns3 className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <span>Compare Properties</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#8B6D33]/15 text-[#8B6D33] dark:bg-[#C5A880]/20 dark:text-[#C5A880] border border-[#8B6D33]/30 dark:border-[#C5A880]/30 tabular-nums font-semibold">
                {comparedProperties.length}/3
              </span>
            </div>
            
            {/* Selected Property Titles */}
            <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5">
              {comparedProperties.map((p) => (
                <span key={p.id} className="inline-flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#161E2E] pl-1 pr-2 py-0.5 rounded-md border border-[#EAE6DF] dark:border-white/5 truncate max-w-[140px]">
                  <Image
                    src={p.imageUrl}
                    theme={p.visualTheme}
                    alt=""
                    className="w-4 h-4 rounded object-cover shrink-0"
                    containerClassName="w-4 h-4 rounded shrink-0"
                  />
                  <span className="truncate">{p.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveProperty(p.id);
                    }}
                    className="hover:text-red-500 p-0.5 ml-0.5"
                    aria-label={`Remove ${p.title}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={onClearAll}
            className="p-2 text-slate-400 hover:text-red-500 text-xs transition-colors"
            title="Clear all selected"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenCompareModal}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-all shadow-sm whitespace-nowrap"
          >
            <span>Compare Now ({comparedProperties.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
