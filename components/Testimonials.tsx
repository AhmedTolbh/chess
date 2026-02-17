import React from 'react';
import { Quote } from 'lucide-react';
import { Language, translations } from '../translations';

interface TestimonialsProps {
  isDarkMode: boolean;
  lang: Language;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isDarkMode, lang }) => {
  const t = translations[lang].testimonials;
  const avatars = [
    "/testimonials/client1.jpg",
    "/testimonials/client2.jpg",
    "/testimonials/client3.jpg",
    "/testimonials/client4.jpg"
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#00172D]' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className={`text-4xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.title} <span className="text-lime-500">{t.title_accent}</span></h2>
          <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.reviews.map((review, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-[2rem] flex flex-col transition-all duration-300 hover:-translate-y-2 group ${isDarkMode
                  ? 'glass-dark-premium hover:border-lime-500/30'
                  : 'bg-white shadow-lg shadow-slate-200/50 hover:shadow-lime-500/10'
                }`}
            >
              <Quote className="w-8 h-8 text-lime-500/40 mb-6 rtl:scale-x-[-1]" />
              <p className={`text-lg leading-relaxed italic mb-8 flex-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                "{review.quote}"
              </p>
              <div className="flex items-center gap-4 border-t pt-6 border-slate-100 dark:border-white/10">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-lime-400 to-lime-600">
                  <img src={avatars[idx]} alt={review.author} className="w-full h-full rounded-full object-cover border-2 border-white dark:border-[#00172D]" />
                </div>
                <div>
                  <h4 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{review.author}</h4>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-lime-400' : 'text-lime-600'}`}>{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;