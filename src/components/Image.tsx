import React, { useState, useEffect } from 'react';
import {
  Building2,
  Home,
  Landmark,
  Compass,
  Hammer,
  Sparkles,
  MapPin,
} from 'lucide-react';

export type ImageTheme =
  | 'luxury-villa'
  | 'commercial-plaza'
  | 'residential-apartment'
  | 'prime-plot'
  | 'construction-site'
  | 'upcoming-development'
  | 'hero'
  | string;

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  alt?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '16:10' | 'auto' | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  theme?: ImageTheme;
  showOverlay?: boolean;
  badgeText?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

// Architectural Vector Theme Icons & Meta
const THEME_METADATA: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    category: string;
    subtext: string;
  }
> = {
  'luxury-villa': {
    icon: Home,
    category: 'Contemporary Luxury Villa',
    subtext: 'Architectural Elevation & Structural Concept',
  },
  'commercial-plaza': {
    icon: Landmark,
    category: 'Commercial Development',
    subtext: 'Retail Showroom & Corporate Layout Concept',
  },
  'residential-apartment': {
    icon: Building2,
    category: 'Residential Complex',
    subtext: 'Multi-Storey Apartment Elevation Blueprint',
  },
  'prime-plot': {
    icon: Compass,
    category: 'Plotted Land Demarcation',
    subtext: 'Boundary Survey & Layout Geometry',
  },
  'construction-site': {
    icon: Hammer,
    category: 'Civil Construction',
    subtext: 'Turnkey Structural Planning & Engineering',
  },
  'upcoming-development': {
    icon: Sparkles,
    category: 'Master Planned Development',
    subtext: 'Future Infrastructure & Civic Corridor',
  },
  'hero': {
    icon: Home,
    category: 'Architectural Landmark Elevation',
    subtext: 'Turnkey Design & Real Estate Discovery',
  },
};

/**
 * Professional, Architectural Placeholder Illustration (SVG/CAD Blueprint)
 * Guaranteed zero empty spaces when an image fails or is missing.
 */
export const ArchitecturalPlaceholder: React.FC<{
  theme?: ImageTheme;
  title?: string;
  subtitle?: string;
  alt?: string;
}> = ({ theme = 'luxury-villa', title, subtitle, alt }) => {
  const meta = THEME_METADATA[theme] || THEME_METADATA['luxury-villa'];
  const IconComponent = meta.icon;
  const displayTitle = title || alt || meta.category;
  const displaySubtitle = subtitle || meta.subtext;

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-between p-4 bg-gradient-to-br from-[#0F1420] via-[#0A0D15] to-[#141B2B] text-white select-none overflow-hidden"
      role="img"
      aria-label={displayTitle}
    >
      {/* Blueprint Grid Watermark */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C5A880 1px, transparent 1px),
            linear-gradient(to bottom, #C5A880 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-60 h-60 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-60 h-60 rounded-full bg-[#8B6D33]/20 blur-3xl pointer-events-none" />

      {/* Blueprint Precision Corner Ticks */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#C5A880]/40 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#C5A880]/40 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#C5A880]/40 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#C5A880]/40 pointer-events-none" />

      {/* Top Header Label */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#C5A880] px-2 py-0.5 rounded bg-black/50 border border-[#C5A880]/30 backdrop-blur-md">
            ARCHITECTURAL CONCEPT
          </span>
          <span className="text-[8px] font-mono text-slate-400 hidden sm:inline">
            SCALE 1:100
          </span>
        </div>
        <span className="text-[9px] text-[#C5A880]/80 font-mono tracking-wider">
          GWALIOR · 26.2183° N
        </span>
      </div>

      {/* Center Architectural Vector Illustration */}
      <div className="flex-1 w-full flex items-center justify-center py-2 z-10">
        <div className="flex flex-col items-center text-center space-y-2 max-w-[85%]">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] shadow-inner backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide block truncate max-w-[260px]">
              {displayTitle}
            </span>
            <span className="text-[10px] text-slate-400 block line-clamp-1 max-w-[240px]">
              {displaySubtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Technical Spec Strip */}
      <div className="w-full flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10 pt-2 z-10">
        <span className="truncate max-w-[70%] font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#C5A880] shrink-0" />
          <span className="truncate">Advance Property Construction</span>
        </span>
        <span className="text-[#C5A880] font-semibold shrink-0">Gwalior, M.P.</span>
      </div>
    </div>
  );
};

/**
 * Reusable, production-grade Image Component:
 * - Uses a CSS-based loading skeleton with shimmer effect while loading
 * - Uses a professional architectural illustration (SVG/Icon) as a fallback if the image fails or is missing
 * - Smooth transition from skeleton to loaded image
 * - Responsive aspect ratios and theme support
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt = 'Advance Property Construction',
  className = '',
  containerClassName = '',
  aspectRatio = 'auto',
  objectFit = 'cover',
  theme = 'luxury-villa',
  showOverlay = false,
  badgeText,
  fallbackTitle,
  fallbackSubtitle,
  loading = 'lazy',
  ...rest
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(() => {
    return src && src.trim().length > 0 ? 'loading' : 'error';
  });

  // Reset status when src changes
  useEffect(() => {
    if (!src || !src.trim()) {
      setStatus('error');
    } else {
      setStatus('loading');
    }
  }, [src]);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : aspectRatio === '16:10'
      ? 'aspect-[16/10]'
      : '';

  const objectFitClass =
    objectFit === 'contain'
      ? 'object-contain'
      : objectFit === 'fill'
      ? 'object-fill'
      : objectFit === 'none'
      ? 'object-none'
      : 'object-cover';

  return (
    <div
      className={`relative overflow-hidden bg-[#FAF8F5] dark:bg-[#0D121C] flex items-center justify-center select-none ${aspectClass} ${containerClassName}`}
    >
      {/* 1. CSS-Based Loading Skeleton with Shimmer Effect */}
      {status === 'loading' && (
        <div
          className="absolute inset-0 bg-[#EAE6DF] dark:bg-[#0E1422] flex flex-col items-center justify-center z-10 overflow-hidden"
          aria-hidden="true"
        >
          {/* Shimmer Light Bar */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer pointer-events-none" />

          {/* Blueprint Drafting Grid Watermark */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #8B6D33 1px, transparent 1px),
                linear-gradient(to bottom, #8B6D33 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#8B6D33]/20 dark:border-[#C5A880]/20 border-t-[#8B6D33] dark:border-t-[#C5A880] animate-spin" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B6D33] dark:text-[#C5A880]/80">
              Loading Visual...
            </span>
          </div>
        </div>
      )}

      {/* 2. Image Element */}
      {status !== 'error' && src && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full ${objectFitClass} transition-all duration-700 ${
            status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          {...rest}
        />
      )}

      {/* 3. Professional Architectural Placeholder Illustration Fallback */}
      {status === 'error' && (
        <ArchitecturalPlaceholder
          theme={theme}
          title={fallbackTitle}
          subtitle={fallbackSubtitle}
          alt={alt}
        />
      )}

      {/* Subtle Contrast Scrim Overlay */}
      {showOverlay && status === 'loaded' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
      )}

      {/* Hairline Border Ring */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 pointer-events-none" />

      {/* Optional Badge */}
      {badgeText && (
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#FAF8F5]/90 dark:bg-black/80 text-slate-900 dark:text-[#C5A880] border border-[#DDD7CD] dark:border-white/10 backdrop-blur-md shadow-xs">
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
};

export default Image;
