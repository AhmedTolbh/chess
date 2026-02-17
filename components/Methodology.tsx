
import React from 'react';
import { Calendar, Clock, Layers, Zap, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../translations';

interface MethodologyProps {
  isDarkMode: boolean;
  lang: Language;
}

const Methodology: React.FC<MethodologyProps> = ({ isDarkMode, lang }) => {
  const t = translations[lang].methodology;
  const icons = [
    <Layers className="w-6 h-6" />,
    <Zap className="w-6 h-6" />,
    <Calendar className="w-6 h-6" />,
    <Clock className="w-6 h-6" />,
  ];

  return (
    <section id="methodology" className={`py-32 relative z-20 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
          <h2 className={`text-4xl md:text-6xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {t.title} <span className="text-lime-500 relative inline-block">
              {t.title_accent}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-lime-500/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>
          <p className={`text-xl md:text-2xl leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {t.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden ${isDarkMode
                ? 'glass-dark-premium hover:border-lime-500/50'
                : 'bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-lime-500/20'
                }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-lime-500/10 to-transparent rounded-bl-[2rem] -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>

              <div className="w-12 h-12 md:w-14 md:h-14 bg-lime-100 dark:bg-lime-500/20 text-lime-600 dark:text-lime-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                {icons[idx]}
              </div>
              <div className={`text-3xl md:text-5xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
              <div className={`font-bold uppercase tracking-widest text-[10px] md:text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className={`p-8 md:p-16 rounded-[3rem] items-center gap-12 overflow-hidden relative ${isDarkMode ? 'glass-dark-premium border border-white/5' : 'bg-white shadow-2xl shadow-slate-200/60'
          }`}>
          {/* Decorative Blob */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-center relative z-10">
            <div className="lg:col-span-3 space-y-8 text-center lg:text-left rtl:lg:text-right">
              <h3 className={`text-3xl md:text-5xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.why_title} <span className="text-lime-500">{t.why_accent}</span>
              </h3>
              <p className={`text-lg md:text-xl leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.why_desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {t.benefits.map((item, i) => (
                  <div key={i} className={`flex items-center justify-center lg:justify-start gap-3 font-bold text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <CheckCircle2 className="w-6 h-6 text-lime-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 w-full">
              <div className="aspect-square rounded-[2.5rem] p-8 flex items-center justify-center relative bg-gradient-to-br from-lime-400 to-lime-600 group overflow-hidden shadow-2xl shadow-lime-500/30">
                <div className="text-center z-10 text-[#00172D]">
                  <span className="block text-8xl font-black tracking-tighter">100%</span>
                  <span className="text-xl font-black opacity-80 uppercase tracking-[0.2em]">{t.growth}</span>
                </div>

                {/* Animated Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[40px] border-white/10 rounded-full animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[20px] border-white/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
