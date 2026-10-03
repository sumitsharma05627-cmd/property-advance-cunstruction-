import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
  variant?: 'compact' | 'segmented';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
  variant = 'segmented',
}) => {
  if (variant === 'compact') {
    return (
      <button
        onClick={onToggle}
        className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
          theme === 'light'
            ? 'bg-[#F2EFE9] text-slate-700 hover:text-slate-900 border-[#E2DDD5]'
            : 'bg-[#182133] text-slate-300 hover:text-white border-white/10'
        } ${className}`}
        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        aria-label="Toggle visual theme"
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4 text-slate-600 transition-transform duration-300 hover:rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-[#C5A880] transition-transform duration-300 hover:rotate-45" />
        )}
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full border transition-all duration-300 ${
        theme === 'light'
          ? 'bg-[#F3EFE9] border-[#E5E0D6] shadow-inner'
          : 'bg-[#161D2B] border-white/10'
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => theme !== 'light' && onToggle()}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
          theme === 'light'
            ? 'bg-white text-slate-900 shadow-sm font-semibold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Activate Light Mode"
      >
        <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-[#9E7B3B]' : 'text-slate-400'}`} />
        <span className="text-[11px]">Light</span>
      </button>

      <button
        type="button"
        onClick={() => theme !== 'dark' && onToggle()}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-[#232F47] text-white shadow-sm font-semibold'
            : 'text-slate-500 hover:text-slate-700'
        }`}
        aria-label="Activate Dark Mode"
      >
        <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-[#C5A880]' : 'text-slate-500'}`} />
        <span className="text-[11px]">Dark</span>
      </button>
    </div>
  );
};
