import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';
import { Phone, MessageSquare, Menu, X, ArrowUpRight, Bot } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (propertyTitle?: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenEnquiry,
  theme,
  onToggleTheme,
  onOpenChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'properties', label: 'PROPERTIES' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'services', label: 'SERVICES' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleLinkClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(BUSINESS_INFO.defaultWhatsAppMessage);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0C1017]/95 backdrop-blur-md shadow-sm border-b border-[#EAE6DF] dark:border-white/10'
            : 'bg-[#FAF8F5]/90 dark:bg-[#0B0E14]/90 backdrop-blur-sm border-b border-[#EAE6DF]/60 dark:border-white/[0.08]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* ZONE 1: Brand Zone (Single-line wordmark with architectural mark) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9E7B3B]"
            aria-label="Advance Property Construction - Return to Home"
          >
            <div className="w-10 h-10 rounded-sm bg-[#F0ECE1] dark:bg-gradient-to-br dark:from-[#1C2538] dark:to-[#0E131E] border border-[#9E7B3B]/30 dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] group-hover:border-[#9E7B3B] transition-colors shadow-xs">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                <line x1="9" y1="14" x2="9" y2="17" />
                <line x1="15" y1="14" x2="15" y2="17" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-sans uppercase leading-tight group-hover:text-[#8B6D33] dark:group-hover:text-[#C5A880] transition-colors whitespace-nowrap">
                ADVANCE
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] text-[#8B6D33] dark:text-[#C5A880] font-semibold uppercase whitespace-nowrap">
                PROPERTY CONSTRUCTION
              </span>
            </div>
          </button>

          {/* ZONE 2: Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#8B6D33] dark:text-[#C5A880]'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9E7B3B] dark:bg-[#C5A880] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: Theme Toggle & Primary / Secondary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle (Segmented) */}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="segmented" />

            {/* AI Assistant Chat Trigger */}
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8B6D33] dark:text-[#C5A880] bg-[#8B6D33]/10 hover:bg-[#8B6D33]/20 dark:bg-[#C5A880]/15 dark:hover:bg-[#C5A880]/25 border border-[#8B6D33]/20 dark:border-[#C5A880]/30 rounded-md transition-colors whitespace-nowrap"
                title="Ask Virtual Real Estate Assistant"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">AI Assistant</span>
              </button>
            )}

            {/* Secondary CTA: WhatsApp Us */}
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-[#F4F1EB] hover:bg-[#ECE7DF] dark:bg-[#161D2B] dark:hover:bg-[#1F293D] border border-[#E5E0D6] dark:border-white/10 rounded-md transition-colors whitespace-nowrap"
              title="Chat with us on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden xl:inline">WhatsApp Us</span>
            </button>

            {/* Primary CTA: Enquire Now */}
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-all shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Header Bar Controls: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="compact" />

            <button
              onClick={openWhatsApp}
              className="p-2 text-slate-700 dark:text-slate-200 bg-[#F2EFE8] dark:bg-[#161D2B] rounded border border-[#E2DDD5] dark:border-white/10 sm:hidden"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF8F5] dark:bg-[#0E131C] border-l border-[#EAE6DF] dark:border-white/10 p-6 flex flex-col justify-between shadow-2xl z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE6DF] dark:border-white/10">
                <div className="flex flex-col">
                  <span className="text-base font-bold text-slate-900 dark:text-white uppercase">ADVANCE</span>
                  <span className="text-[10px] tracking-wider text-[#8B6D33] dark:text-[#C5A880] font-semibold">PROPERTY CONSTRUCTION</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme Switcher inside mobile drawer */}
              <div className="mt-4 p-3 rounded-lg bg-[#F0ECE1] dark:bg-[#141B28] flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Theme Preference</span>
                <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="segmented" />
              </div>

              {/* Navigation list */}
              <nav className="mt-4 flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-left py-2.5 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-between ${
                      currentPage === link.id
                        ? 'bg-[#9E7B3B]/10 text-[#8B6D33] dark:text-[#C5A880] dark:bg-[#C5A880]/10 font-semibold'
                        : 'text-slate-700 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-6 border-t border-[#EAE6DF] dark:border-white/10 flex flex-col gap-2.5">
              {onOpenChat && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenChat();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#8B6D33] dark:text-[#C5A880] bg-[#8B6D33]/10 dark:bg-[#C5A880]/15 rounded-md border border-[#8B6D33]/25 dark:border-[#C5A880]/30"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask AI Assistant</span>
                </button>
              )}

              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-[#F2EFE8] dark:bg-[#161D2B] rounded-md border border-[#E2DDD5] dark:border-white/10"
              >
                <Phone className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-white bg-white dark:bg-[#1E293B] hover:bg-[#25D366]/10 border border-[#25D366]/40 rounded-md"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md shadow-xs"
              >
                <span>Enquire Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
