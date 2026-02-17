import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Language, translations } from '../translations';
import { Globe } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  lang: Language;
  onToggleLang: () => void;
  onOpenRegistration: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, lang, onToggleLang, onOpenRegistration }) => {
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? (isDarkMode ? 'bg-[#00172D]/80 backdrop-blur-xl shadow-2xl shadow-black/20 py-4 border-b border-white/5' : 'bg-white/90 backdrop-blur-xl shadow-xl py-4 border-b border-slate-100')
      : 'bg-transparent py-6'
      }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Logo isDarkMode={isDarkMode} className="transform scale-90 md:scale-100 origin-left rtl:origin-right" />

        <nav className="hidden lg:flex items-center gap-8 font-bold text-xs uppercase tracking-widest">
          <a href="#methodology" className={`hover:text-custom-lime transition-all ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t.methodology}</a>
          <a href="#features" className={`hover:text-custom-lime transition-all ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t.whyUs}</a>
          <a href="#curriculum" className={`hover:text-custom-lime transition-all ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t.curriculum}</a>
          <a href="#pricing" className={`hover:text-custom-lime transition-all ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t.pricing}</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleLang}
            className={`flex items-center gap-2 font-black text-sm px-4 py-2 rounded-xl border-2 transition-all ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-white' : 'border-slate-100 hover:bg-slate-50 text-slate-800'
              }`}
          >
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          <button
            onClick={onOpenRegistration}
            className="bg-lime-500 hover:bg-lime-400 text-[#00172D] font-black px-8 py-3.5 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(132,204,22,0.5)] hover:-translate-y-0.5 active:scale-95 whitespace-nowrap">
            {t.join}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
