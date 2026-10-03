import React from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { Phone, MapPin, MessageSquare, Instagram, Facebook, Youtube, Linkedin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenOwnerGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenOwnerGuide,
}) => {
  const quickLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'properties', label: 'Properties' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(BUSINESS_INFO.defaultWhatsAppMessage);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#F4F1EA] dark:bg-[#080B10] border-t border-[#EAE6DF] dark:border-white/[0.08] text-slate-700 dark:text-slate-300 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E2DDD5] dark:border-white/[0.08]">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-sm bg-[#EAE5DC] dark:bg-[#161E2E] border border-[#8B6D33]/30 dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                </svg>
              </div>
              <div>
                <span className="block text-base font-bold text-slate-900 dark:text-white tracking-tight uppercase">ADVANCE</span>
                <span className="block text-[10px] tracking-[0.18em] text-[#8B6D33] dark:text-[#C5A880] font-bold uppercase">PROPERTY CONSTRUCTION</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
              Property &amp; Construction Solutions in Gwalior. Assisting buyers, sellers, and property owners with local market clarity and construction coordination.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#111723] hover:bg-[#F2EFE8] dark:hover:bg-[#1E293B] border border-[#DDD7CD] dark:border-white/10 rounded transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-slate-900 dark:hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500 uppercase font-semibold">Direct Business Phone</span>
                  <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="text-slate-900 dark:text-white hover:text-[#8B6D33] dark:hover:text-[#C5A880] font-bold">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500 uppercase font-semibold">Location</span>
                  <span className="text-slate-800 dark:text-slate-300 font-medium">{BUSINESS_INFO.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="block text-[11px] text-slate-500 uppercase font-semibold mb-1">Business Hours</span>
                <span className="text-slate-600 dark:text-slate-400 italic">[{BUSINESS_INFO.businessHours}]</span>
              </div>
            </div>
          </div>

          {/* Follow / Social Presence */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] mb-4">
              Follow
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Official social channels will be activated upon providing verified social handles.
            </p>

            <div className="flex items-center gap-2 mb-6">
              {[
                { name: 'Instagram', icon: Instagram },
                { name: 'Facebook', icon: Facebook },
                { name: 'YouTube', icon: Youtube },
                { name: 'LinkedIn', icon: Linkedin },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.name}
                    className="w-8 h-8 rounded bg-white dark:bg-[#111723] border border-[#DDD7CD] dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-xs"
                    title={`${item.name} link will be connected here`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                );
              })}
            </div>

            {onOpenOwnerGuide && (
              <button
                onClick={onOpenOwnerGuide}
                className="inline-flex items-center gap-1.5 text-xs text-[#8B6D33] dark:text-[#C5A880] hover:underline font-semibold"
              >
                <span>Website Proposal &amp; Lead Management Notes</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Advance Property Construction. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
