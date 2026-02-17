import React from 'react';
import { Target, Sword, Crown, Award } from 'lucide-react';
import { Language, translations } from '../translations';

interface CurriculumProps {
  isDarkMode: boolean;
  lang: Language;
}

const Curriculum: React.FC<CurriculumProps> = ({ isDarkMode, lang }) => {
  const t = translations[lang].curriculum;
  const icons = [
    <Target className="w-6 h-6" />,
    <Sword className="w-6 h-6" />,
    <Crown className="w-6 h-6" />,
  ];
  const colors = ["bg-blue-500", "bg-purple-500", "bg-amber-500"];

  return (
    <section id="curriculum" className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black">
            {t.title} <span className="text-custom-lime">{t.title_accent}</span>
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {t.desc}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {t.levels.map((level, idx) => (
            <div
              key={level.id}
              className={`relative overflow-hidden rounded-[2.5rem] p-10 border transition-all duration-300 hover:-translate-y-2 group ${isDarkMode
                ? 'glass-dark-premium hover:border-lime-500/30'
                : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-lime-500/10'
                }`}
            >
              <div className={`w-14 h-14 ${colors[idx]} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                {icons[idx]}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-lime-500">{level.phase}</span>
              </div>
              <h3 className={`text-3xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{level.title}</h3>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                {level.desc}
              </p>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <span className="font-bold opacity-40 text-xl font-mono">0{level.id}</span>
                <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.6)]"></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`p-10 md:p-16 rounded-[50px] flex flex-col md:flex-row items-center justify-between gap-10 border-4 border-dashed ${isDarkMode ? 'border-slate-700 bg-slate-800/20' : 'border-slate-200 bg-white'
          }`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-custom-lime/10 rounded-full flex items-center justify-center shrink-0">
              <Award className="w-12 h-12 text-custom-lime" />
            </div>
            <div className="space-y-2 text-center md:text-left rtl:md:text-right">
              <h4 className="text-3xl font-black">{t.cert_title}</h4>
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.cert_desc}
              </p>
            </div>
          </div>
          <button className="bg-[#00172D] dark:bg-custom-lime text-white dark:text-[#00172D] font-black px-10 py-5 rounded-2xl whitespace-nowrap hover:scale-105 transition-transform">
            {lang === 'en' ? 'Learn More' : 'اقرأ المزيد'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;