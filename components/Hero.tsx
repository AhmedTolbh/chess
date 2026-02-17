import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Star, Play } from 'lucide-react';
import { Language, translations } from '../translations';

interface HeroProps {
  isDarkMode: boolean;
  lang: Language;
  onOpenRegistration: () => void;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode, lang, onOpenRegistration }) => {
  const t = translations[lang].hero;
  const heroImage = "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=2000&auto=format&fit=crop";
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image & Overlay */}
      <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-[#00172D]' : 'bg-slate-50'}`}>
        <img
          src={heroImage}
          alt="Pioneers Chess Hero"
          className={`w-full h-full object-cover object-center lg:object-[20%] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Modern Gradient Overlays */}
        <div className={`absolute inset-0 z-10 transition-colors duration-500 ${isDarkMode
          ? 'bg-gradient-to-r rtl:bg-gradient-to-l from-[#00172D] via-[#00172D]/95 to-transparent'
          : 'bg-gradient-to-r rtl:bg-gradient-to-l from-slate-50 via-white/90 to-transparent'
          }`}></div>

        <div className={`absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t ${isDarkMode ? 'from-[#00172D] to-transparent' : 'from-white to-transparent'
          }`}></div>
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className="max-w-4xl space-y-8 animate-fade-in-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 border border-lime-400/20 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
            </span>
            <span className="text-sm font-bold text-lime-600 dark:text-lime-400 tracking-wide uppercase">{t.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {t.headline_1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-400 italic pr-4 rtl:pl-4 rtl:pr-0">
              {t.headline_accent}
            </span>
            {t.headline_2} <br />
            {t.headline_3}.
          </h1>

          {/* Subheadline */}
          <p className={`text-xl md:text-2xl leading-relaxed max-w-xl font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onOpenRegistration}
              className="bg-lime-500 hover:bg-lime-400 text-[#00172D] font-black px-8 py-4 rounded-xl text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-lime-500/25 flex items-center justify-center gap-3 group">
              {t.cta_join}
              {lang === 'en' ? (
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              ) : (
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              )}
            </button>
            <button className={`px-8 py-4 rounded-xl text-lg font-bold border-2 transition-all hover:bg-white/5 flex items-center justify-center gap-3 ${isDarkMode
              ? 'border-white/20 text-white hover:border-white'
              : 'border-slate-200 text-slate-800 hover:border-slate-800'
              }`}>
              <Play className="w-5 h-5 fill-current" />
              {t.cta_programs}
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 pt-8 pb-12">
            <div className="flex -space-x-4 rtl:space-x-reverse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-12 h-12 rounded-full border-2 ${isDarkMode ? 'border-[#00172D]' : 'border-white'} overflow-hidden`}>
                  <img
                    src={`https://i.pravatar.cc/100?u=${i + 300}`}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-lime-500">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.trusted}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 top-1/4 w-1/3 h-full pointer-events-none hidden lg:block">
        <div className="absolute top-20 right-20 w-64 h-64 bg-lime-500/20 rounded-full blur-[100px]"></div>
      </div>
    </section>
  );
};

export default Hero;
