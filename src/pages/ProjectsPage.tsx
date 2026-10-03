import React, { useState } from 'react';
import { PageId, ProjectItem } from '../types';
import { DEMO_PROJECTS, BUSINESS_INFO } from '../data/mockData';
import { Image } from '../components/Image';
import { MapPin, ArrowRight, X, Check, Calendar, Phone, MessageSquare } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'All' | 'Residential' | 'Commercial' | 'Construction' | 'Upcoming'
  >('All');

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = DEMO_PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const openWhatsAppForProject = (project: ProjectItem) => {
    const text = `Hello Advance Property Construction, I am enquiring about project: "${project.title}" located in ${project.location}. Please share project specifications.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#8B6D33] dark:text-[#C5A880] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6D33] dark:bg-[#C5A880]" />
            <span>PORTFOLIO & DEVELOPMENTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            Projects & Construction Showcase
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Showcasing residential developments, commercial centers, custom civil construction, and upcoming plotted masterplans in Gwalior.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0ECE1] dark:bg-[#121825] border border-[#DDD7CD] dark:border-white/10 rounded-xl max-w-fit mb-12">
          {(['All', 'Residential', 'Commercial', 'Construction', 'Upcoming'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-[#C5A880] text-slate-900 dark:text-[#0B0E14] shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] hover:border-[#8B6D33]/40 dark:hover:border-[#C5A880]/30 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md premium-card-hover group"
            >
              {/* Visual Render Slot */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                  theme={project.visualTheme}
                  src={project.imageUrl}
                  alt={project.title}
                  aspectRatio="16:9"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Mandatory Demo Label */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#FAF8F5]/95 dark:bg-[#0A0D14]/90 text-slate-800 dark:text-[#C5A880] border border-[#DDD7CD] dark:border-[#C5A880]/30 backdrop-blur-md shadow-xs">
                    Demo Project — Replace With Actual Project
                  </span>
                  <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-black/70 text-white border border-white/10 backdrop-blur-md">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="text-[#8B6D33] dark:text-[#C5A880] uppercase tracking-wider font-bold">{project.category}</span>
                    <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-[#8B6D33] dark:group-hover:text-[#C5A880] transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {project.overview}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#F0ECE1] dark:border-white/[0.06] flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Status: <strong className="text-slate-800 dark:text-white font-medium">{project.status}</strong>
                  </span>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-[#F2EFE8] hover:bg-[#EAE5DC] dark:bg-[#182133] dark:hover:bg-[#232F47] border border-[#DDD7CD] dark:border-white/10 rounded-md transition-colors shadow-xs"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal / Drawer */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white dark:bg-[#0F1420] border border-[#EAE6DF] dark:border-[#C5A880]/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                aria-label="Close project view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] font-bold block mb-1">
                  Demo Project Profile — Ready for Verified Data
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                  <span>{selectedProject.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.category}</span>
                </div>
              </div>

              {/* Gallery / Visual Render */}
              <div className="rounded-xl overflow-hidden border border-[#EAE6DF] dark:border-white/10 mb-6 aspect-[16/9] relative">
                <Image
                  src={selectedProject.imageUrl}
                  theme={selectedProject.visualTheme}
                  alt={selectedProject.title}
                  aspectRatio="16:9"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overview */}
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] mb-2">
                  Project Overview
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedProject.overview}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] mb-3">
                  Highlights & Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] mb-3">
                  Project Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProject.specifications.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#141B28] border border-[#EAE6DF] dark:border-white/5 flex items-center justify-between"
                    >
                      <span className="text-slate-500 dark:text-slate-400">{spec.label}:</span>
                      <span className="text-slate-900 dark:text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#F0ECE1] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                  <span>Helpline: {BUSINESS_INFO.phone}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => openWhatsAppForProject(selectedProject)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-white bg-[#FAF8F5] dark:bg-[#1A2536] hover:bg-[#25D366]/10 border border-[#E2DDD5] dark:border-[#25D366]/30 rounded-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      const proj = selectedProject;
                      setSelectedProject(null);
                      onOpenEnquiry(proj.title, `Project Enquiry: ${proj.title}`);
                    }}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
                  >
                    <span>Enquire Now</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
