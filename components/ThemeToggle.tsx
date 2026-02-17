
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <button 
        onClick={onToggle}
        className={`relative flex items-center h-14 w-28 rounded-full border-2 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group overflow-hidden ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-700' 
            : 'bg-white border-slate-100'
        }`}
        aria-label="Toggle Dark Mode"
      >
        {/* Toggle Slide Background */}
        <div className={`absolute top-1 bottom-1 w-[52px] rounded-full transition-all duration-500 flex items-center justify-center z-10 ${
          isDarkMode ? 'left-[calc(100%-53px)] bg-custom-lime' : 'left-1 bg-[#00172D]'
        }`}>
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-[#00172D] animate-spin-slow" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Text Labels */}
        <div className="flex w-full px-4 justify-between items-center relative z-0">
          <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 ${
            isDarkMode ? 'opacity-40 text-white' : 'opacity-0'
          }`}>
            Dark
          </span>
          <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-40 text-slate-900'
          }`}>
            Light
          </span>
        </div>
        
        {/* Hover Effect Glow */}
        <div className="absolute inset-0 bg-custom-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </button>
      
      {/* Decorative tooltip (visible on hover) */}
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
        <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap shadow-xl border ${
          isDarkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-100'
        }`}>
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
