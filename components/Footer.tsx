
import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  isDarkMode: boolean;
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, lang }) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  return (
    <footer className={`pt-24 pb-12 transition-colors duration-500 relative overflow-hidden ${isDarkMode ? 'bg-slate-950 border-t border-slate-900' : 'bg-[#00172D] text-white'}`}>
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-lime-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 text-center md:text-left rtl:md:text-right">
          <div className="space-y-8">
            <Logo isDarkMode={true} className="transform scale-90 origin-left rtl:origin-right mx-auto md:mx-0" />
            <p className="opacity-70 leading-relaxed text-lg max-w-sm mx-auto md:mx-0 font-medium">
              {t.desc}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-lime-500 hover:text-[#00172D] hover:border-lime-500 flex items-center justify-center transition-all duration-300 group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-bold tracking-wide">{t.links}</h4>
            <ul className="space-y-5 font-medium opacity-70">
              {['methodology', 'curriculum', 'pricing', 'features'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="hover:text-lime-400 transition-colors flex items-center justify-center md:justify-start gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {nav[item as keyof typeof nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-bold tracking-wide">{t.contact}</h4>
            <ul className="space-y-5 font-medium opacity-70">
              <li className="flex items-center justify-center md:justify-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-lime-500 group-hover:text-[#00172D] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                info@pioneers.academy
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-lime-500 group-hover:text-[#00172D] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                +966 (0) 50 000 0000
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-lime-500 group-hover:text-[#00172D] transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                Riyadh, Saudi Arabia
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-bold tracking-wide">{t.newsletter}</h4>
            <p className="opacity-70 text-sm leading-relaxed">{lang === 'en' ? 'Receive tips on cognitive development and chess news.' : 'احصل على نصائح حول التطوير المعرفي وأخبار الشطرنج.'}</p>
            <div className="relative max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                placeholder={t.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 transition-all placeholder:text-white/30"
              />
              <button className={`absolute ${lang === 'en' ? 'right-2' : 'left-2'} top-2 bottom-2 aspect-square bg-lime-500 text-[#00172D] rounded-xl hover:bg-lime-400 hover:scale-105 transition-all flex items-center justify-center`}>
                {lang === 'en' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowUpLeft className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 text-sm font-medium">
          <p>{t.rights}</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors hover:underline">{lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a>
            <a href="#" className="hover:text-white transition-colors hover:underline">{lang === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
