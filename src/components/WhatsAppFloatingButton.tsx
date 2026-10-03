import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const handleWhatsAppClick = () => {
    const encoded = encodeURIComponent(BUSINESS_INFO.defaultWhatsAppMessage);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-start flex-col gap-2 pointer-events-auto">
      {/* Subtle Greeting Bubble on desktop */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 py-2 px-3 bg-white/95 dark:bg-[#111724]/95 border border-[#EAE6DF] dark:border-[#25D366]/30 text-slate-800 dark:text-white text-xs rounded-xl shadow-lg backdrop-blur-md animate-fade-in max-w-xs">
          <span>Chat with us on WhatsApp</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleWhatsAppClick}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        aria-label="Chat on WhatsApp with Advance Property Construction"
        title="Chat with Advance Property Construction on WhatsApp (+91 86026 40017)"
      >
        <MessageSquare className="w-6 h-6 fill-white text-[#25D366]" />
      </button>
    </div>
  );
};
