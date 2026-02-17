import React from 'react';
import { Check, Info } from 'lucide-react';
import { Language, translations } from '../translations';

interface PricingProps {
  isDarkMode: boolean;
  lang: Language;
  onOpenRegistration: (plan?: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ isDarkMode, lang, onOpenRegistration }) => {
  const t = translations[lang].pricing;

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl font-black">{t.title} <span className="text-custom-lime">{t.title_accent}</span></h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.desc}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {t.plans.map((plan, idx) => {
            const isRecommended = idx === 1; // Private training is index 1

            return (
              <div
                key={idx}
                className={`relative rounded-[3rem] flex flex-col transition-all duration-500 ${isRecommended
                  ? `p-12 md:-my-8 z-20 transform md:scale-105 border-2 border-lime-500 shadow-[0_0_50px_rgba(132,204,22,0.15)] ${isDarkMode ? 'bg-[#0B1F3A]/95 backdrop-blur-xl' : 'bg-white shadow-2xl'}`
                  : `p-10 border ${isDarkMode ? 'glass-dark-premium border-white/5 bg-[#0B1F3A]/40' : 'bg-slate-50 border-slate-200'}`
                  }`}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-lime-500 to-lime-400 text-[#00172D] font-black py-3 px-8 rounded-full text-base uppercase tracking-widest shadow-lg shadow-lime-500/30 flex items-center gap-2 whitespace-nowrap">
                    <Check className="w-5 h-5 stroke-[3]" />
                    {t.rec}
                  </div>
                )}

                <div className="mb-8 text-center md:text-left rtl:md:text-right">
                  <h3 className={`text-3xl font-black mb-2 ${isRecommended ? 'text-lime-500' : (isDarkMode ? 'text-white' : 'text-slate-900')}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xl ${isRecommended ? (isDarkMode ? 'text-slate-300' : 'text-slate-600') : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className="flex items-baseline justify-center md:justify-start rtl:md:justify-start gap-1 mb-10 pb-10 border-b border-slate-200 dark:border-white/10">
                  <span className={`text-6xl font-black ${isRecommended ? (isDarkMode ? 'text-white' : 'text-slate-900') : (isDarkMode ? 'text-slate-200' : 'text-slate-900')}`}>
                    {plan.price}
                  </span>
                  <div className="flex flex-col items-start px-2">
                    <span className="text-xl font-bold opacity-60">{t.sar}</span>
                    <span className="text-sm opacity-60">{t.per_level}</span>
                  </div>
                </div>

                <ul className="space-y-5 mb-12 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isRecommended ? 'bg-lime-500 text-[#00172D]' : 'bg-lime-500/10 text-lime-500'}`}>
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                      <span className={`font-medium text-lg ${isRecommended ? (isDarkMode ? 'text-white' : 'text-slate-700') : (isDarkMode ? 'text-slate-300' : 'text-slate-600')}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => onOpenRegistration(idx === 0 ? 'group' : 'private')} className={`w-full py-6 rounded-2xl font-black text-xl transition-all relative overflow-hidden group ${isRecommended
                  ? 'bg-lime-500 text-[#00172D] hover:scale-105 hover:shadow-[0_0_30px_rgba(132,204,22,0.4)]'
                  : 'bg-transparent border-2 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:border-lime-500 hover:text-lime-500'
                  }`}>
                  <span className="relative z-10">{t.cta}</span>
                  {isRecommended && (
                    <div className="absolute inset-0 animate-shimmer"></div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex items-center justify-center gap-3 text-base font-medium opacity-60">
          <Info className="w-5 h-5" />
          {lang === 'en' ? 'No hidden fees. Certificates included in price.' : 'لا توجد رسوم خفية. الشهادات مشمولة في السعر.'}
        </div>
      </div>
    </section>
  );
};

export default Pricing;