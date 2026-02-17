
import React from 'react';
import { Video, Users, FileCheck, LineChart, Smile, Award, MoveRight, MoveLeft } from 'lucide-react';
import { Language, translations } from '../translations';

interface FeaturesProps {
  isDarkMode: boolean;
  lang: Language;
}

const Features: React.FC<FeaturesProps> = ({ isDarkMode, lang }) => {
  const t = translations[lang].features;
  const icons = [
    <Video className="w-8 h-8" />,
    <Users className="w-8 h-8" />,
    <FileCheck className="w-8 h-8" />,
    <LineChart className="w-8 h-8" />,
    <Smile className="w-8 h-8" />,
    <Award className="w-8 h-8" />,
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute top-1/2 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl mix-blend-multiply ${isDarkMode ? 'opacity-20' : 'opacity-100'}`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl mix-blend-multiply ${isDarkMode ? 'opacity-20' : 'opacity-100'}`}></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-20 gap-8 text-center md:text-left rtl:md:text-right">
          <div className="max-w-2xl space-y-6">
            <h2 className={`text-4xl md:text-6xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {t.title} <span className="text-lime-500 underline decoration-wavy decoration-lime-500/30 underline-offset-8">{t.title_accent}</span>
            </h2>
            <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {t.desc}
            </p>
          </div>
          <button className="text-lime-600 dark:text-lime-400 font-bold text-lg hover:underline flex items-center gap-2 group whitespace-nowrap transition-all">
            {lang === 'en' ? 'See Detailed Benefits' : 'شاهد الفوائد بالتفصيل'}
            <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform bg-lime-100 dark:bg-lime-500/10 p-2 rounded-full">
              {lang === 'en' ? <MoveRight className="w-5 h-5" /> : <MoveLeft className="w-5 h-5" />}
            </span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((feature, idx) => (
            <div
              key={idx}
              className={`group p-10 rounded-[2rem] border transition-all duration-300 hover:-translate-y-2 ${isDarkMode
                ? 'glass-dark-premium hover:border-lime-500/30'
                : 'bg-white border-slate-100 hover:shadow-2xl hover:shadow-lime-500/10 hover:border-lime-200'
                }`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-600 text-[#00172D] rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-lime-500/20">
                {icons[idx]}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h3>
              <p className={`leading-relaxed text-lg ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;