
import React from 'react';
import { Trophy, Medal, Star, Crown } from 'lucide-react';
import { Language, translations } from '../translations';

interface ChampionsProps {
    isDarkMode: boolean;
    lang: Language;
}

const Champions: React.FC<ChampionsProps> = ({ isDarkMode, lang }) => {
    const t = translations[lang].champions;

    const championImages = [
        "/champions/student1.jpg",
        "/champions/student2.png",
        "/champions/student3.jpg",
        "/champions/student4.jpg"
    ];

    const badges = [
        <Trophy className="w-6 h-6 text-yellow-500" />,
        <Star className="w-6 h-6 text-lime-500" />,
        <Medal className="w-6 h-6 text-orange-500" />,
        <Crown className="w-6 h-6 text-purple-500" />
    ];

    return (
        <section id="champions" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#00172D]/50' : 'bg-white'}`}>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className={`text-4xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-400">{t.title_accent}</span>
                    </h2>
                    <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.desc}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.students.map((student, idx) => (
                        <div
                            key={idx}
                            className={`group relative rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-3 ${isDarkMode
                                ? 'glass-dark-premium border-white/5'
                                : 'bg-white shadow-2xl shadow-slate-200/50 border border-slate-100'
                                }`}
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00172D] via-transparent to-transparent opacity-60 z-10"></div>
                                <img
                                    src={championImages[idx]}
                                    alt={student.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${student.name}&background=84cc16&color=00172D&size=400`;
                                    }}
                                />

                                {/* Floating Badge */}
                                <div className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                                    {badges[idx]}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 space-y-2">
                                <h3 className="text-2xl font-bold text-white mb-1">{student.name}</h3>
                                <p className="text-lime-400 font-medium text-sm tracking-wide uppercase">{student.level}</p>
                                <div className="pt-3 border-t border-white/10 mt-3">
                                    <p className="text-slate-200 text-sm leading-snug">{student.achievement}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Champions;
