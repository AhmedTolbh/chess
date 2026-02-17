import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { Language, translations } from '../translations';

interface FAQProps {
    isDarkMode: boolean;
    lang: Language;
}

const FAQ: React.FC<FAQProps> = ({ isDarkMode, lang }) => {
    const t = (translations as any)[lang].faq;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#001a33]' : 'bg-white'}`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 text-lime-600 font-bold text-sm mb-4">
                        <HelpCircle className="w-4 h-4" />
                        {t.badge}
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {t.title} <span className="text-lime-500">{t.title_accent}</span>
                    </h2>
                    <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.desc}
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {t.items.map((item: any, idx: number) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen
                                    ? isDarkMode
                                        ? 'border-lime-500/30 bg-lime-500/5 shadow-lg shadow-lime-500/5'
                                        : 'border-lime-300 bg-lime-50/50 shadow-lg shadow-lime-500/10'
                                    : isDarkMode
                                        ? 'border-white/10 hover:border-white/20'
                                        : 'border-slate-200 hover:border-lime-200'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleItem(idx)}
                                    className="w-full p-6 flex items-center gap-4 text-left rtl:text-right"
                                >
                                    {/* Number badge */}
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-colors ${isOpen
                                        ? 'bg-lime-500 text-white'
                                        : isDarkMode ? 'bg-white/10 text-white/50' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>

                                    <span className={`flex-1 font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        {item.q}
                                    </span>

                                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-lime-500' : isDarkMode ? 'text-white/30' : 'text-slate-300'
                                        }`} />
                                </button>

                                {/* Answer */}
                                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className={`px-6 pb-6 ltr:pl-20 rtl:pr-20 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                        <p className="text-base leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <div className={`inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-lime-500/10 flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-lime-500" />
                            </div>
                            <div className="text-left rtl:text-right">
                                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.cta_title}</p>
                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.cta_desc}</p>
                            </div>
                        </div>
                        <a
                            href="https://wa.me/966501234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-lime-500 hover:bg-lime-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-lime-500/20 hover:-translate-y-0.5"
                        >
                            {t.cta_button}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
