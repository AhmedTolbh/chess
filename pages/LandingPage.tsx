import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Methodology from '../components/Methodology';
import Features from '../components/Features';
import Curriculum from '../components/Curriculum';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import Stars from '../components/Stars';
import Champions from '../components/Champions';
import { Language } from '../translations';
import SplashScreen from '../components/SplashScreen';
import RegistrationModal from '../components/RegistrationModal';

interface LandingPageProps {
    isDarkMode: boolean;
    lang: Language;
    toggleTheme: () => void;
    toggleLang: () => void;
    isLoading: boolean;
    showSplash: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({
    isDarkMode,
    lang,
    toggleTheme,
    toggleLang,
    isLoading,
    showSplash
}) => {
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [preselectedPlan, setPreselectedPlan] = useState<string | undefined>();

    const openRegistration = (plan?: string) => {
        setPreselectedPlan(plan);
        setIsRegistrationOpen(true);
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 relative ${isDarkMode ? 'bg-[#00172D] text-white' : 'bg-white text-slate-900'}`}>
            {showSplash && <SplashScreen isFadingOut={!isLoading} />}
            {isDarkMode && <Stars />}
            <Header isDarkMode={isDarkMode} lang={lang} onToggleLang={toggleLang} onOpenRegistration={() => openRegistration()} />
            <main className="relative z-10">
                <Hero isDarkMode={isDarkMode} lang={lang} onOpenRegistration={() => openRegistration()} />
                <Methodology isDarkMode={isDarkMode} lang={lang} />
                <Features isDarkMode={isDarkMode} lang={lang} />
                <Curriculum isDarkMode={isDarkMode} lang={lang} />
                <Champions isDarkMode={isDarkMode} lang={lang} />
                <Pricing isDarkMode={isDarkMode} lang={lang} onOpenRegistration={openRegistration} />
                <Testimonials isDarkMode={isDarkMode} lang={lang} />
                <FAQ isDarkMode={isDarkMode} lang={lang} />
            </main>
            <Footer isDarkMode={isDarkMode} lang={lang} />
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            <RegistrationModal
                isOpen={isRegistrationOpen}
                onClose={() => setIsRegistrationOpen(false)}
                isDarkMode={isDarkMode}
                lang={lang}
                preselectedPlan={preselectedPlan}
            />
        </div>
    );
};

export default LandingPage;
