import React, { useState, useEffect } from 'react';
import { PageId, PropertyItem } from './types';
import { DEMO_PROPERTIES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { EnquiryModal } from './components/EnquiryModal';
import { LegalModal } from './components/LegalModal';
import { OwnerEditGuideModal } from './components/OwnerEditGuideModal';
import { PropertyCompareBar } from './components/PropertyCompareBar';
import { PropertyCompareModal } from './components/PropertyCompareModal';
import { ChatBot } from './components/ChatBot';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationPage } from './pages/ConsultationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(DEMO_PROPERTIES[0]);

  // Visual Theme State — LIGHT MODE BY DEFAULT
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('apc_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('apc_theme', theme);
    } catch {}
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Comparison state (Max 3 properties)
  const [comparedPropertyIds, setComparedPropertyIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareNotice, setCompareNotice] = useState<string | null>(null);

  // Modal states
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryPropertyTitle, setEnquiryPropertyTitle] = useState<string | undefined>();
  const [enquiryRequirement, setEnquiryRequirement] = useState<string | undefined>();

  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [ownerGuideOpen, setOwnerGuideOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sync hash routing on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentPage('home');
        return;
      }

      if (hash.startsWith('property/')) {
        const propId = hash.replace('property/', '');
        const found = DEMO_PROPERTIES.find((p) => p.id === propId);
        if (found) {
          setSelectedProperty(found);
          setCurrentPage('property-detail');
          return;
        }
      }

      const validPages: PageId[] = [
        'home',
        'about',
        'properties',
        'property-detail',
        'services',
        'projects',
        'contact',
        'consultation',
      ];

      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProperty = (property: PropertyItem) => {
    setSelectedProperty(property);
    setCurrentPage('property-detail');
    window.location.hash = `property/${property.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (propertyTitle?: string, requirement?: string) => {
    setEnquiryPropertyTitle(propertyTitle);
    setEnquiryRequirement(requirement || 'Property Consultation');
    setEnquiryModalOpen(true);
  };

  // Compare logic
  const handleToggleCompare = (property: PropertyItem) => {
    setComparedPropertyIds((prev) => {
      if (prev.includes(property.id)) {
        return prev.filter((id) => id !== property.id);
      }
      if (prev.length >= 3) {
        setCompareNotice('You can compare up to 3 properties at a time. Replacing the earliest selected property.');
        setTimeout(() => setCompareNotice(null), 3500);
        return [...prev.slice(1), property.id];
      }
      return [...prev, property.id];
    });
  };

  const handleRemoveCompared = (id: string) => {
    setComparedPropertyIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearCompared = () => {
    setComparedPropertyIds([]);
  };

  const comparedProperties = DEMO_PROPERTIES.filter((p) => comparedPropertyIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-[#B89758]/20 dark:selection:bg-[#B89758]/30 selection:text-slate-900 dark:selection:text-white transition-colors duration-300">
      {/* Strict 3-zone Top Bar Contract with Light/Dark Theme Switcher */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={() => handleOpenEnquiry()}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Ephemeral comparison notification */}
      {compareNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-[#141B29] border border-[#C5A880]/50 text-xs text-[#C5A880] shadow-xl backdrop-blur-md animate-fade-in">
          {compareNotice}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onViewProperty={handleViewProperty}
            onOpenEnquiry={handleOpenEnquiry}
            comparedPropertyIds={comparedPropertyIds}
            onToggleCompare={handleToggleCompare}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesPage
            onNavigate={handleNavigate}
            onViewProperty={handleViewProperty}
            onOpenEnquiry={handleOpenEnquiry}
            comparedPropertyIds={comparedPropertyIds}
            onToggleCompare={handleToggleCompare}
            onOpenCompareModal={() => setCompareModalOpen(true)}
          />
        )}

        {currentPage === 'property-detail' && (
          <PropertyDetailPage
            property={selectedProperty}
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
            isCompared={comparedPropertyIds.includes(selectedProperty.id)}
            onToggleCompare={handleToggleCompare}
            onOpenCompareModal={() => setCompareModalOpen(true)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'consultation' && (
          <ConsultationPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenOwnerGuide={() => setOwnerGuideOpen(true)}
      />

      {/* Floating Property Comparison Bar */}
      <PropertyCompareBar
        comparedProperties={comparedProperties}
        onOpenCompareModal={() => setCompareModalOpen(true)}
        onRemoveProperty={handleRemoveCompared}
        onClearAll={handleClearCompared}
      />

      {/* Side-by-Side Property Comparison Modal */}
      <PropertyCompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        properties={comparedProperties}
        onRemoveProperty={handleRemoveCompared}
        onClearAll={handleClearCompared}
        onViewProperty={handleViewProperty}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Floating Sticky WhatsApp Lead Button */}
      <WhatsAppFloatingButton />

      {/* Floating AI Virtual Assistant Chatbot */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        currentPage={currentPage}
        currentProperty={selectedProperty}
        onNavigate={handleNavigate}
        onViewProperty={handleViewProperty}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Global Modals */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialPropertyTitle={enquiryPropertyTitle}
        initialRequirement={enquiryRequirement}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <OwnerEditGuideModal
        isOpen={ownerGuideOpen}
        onClose={() => setOwnerGuideOpen(false)}
      />
    </div>
  );
}
