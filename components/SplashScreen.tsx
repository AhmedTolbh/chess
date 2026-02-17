import React from 'react';

interface SplashScreenProps {
    isFadingOut: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isFadingOut }) => {
    return (
        <div className={`fixed inset-0 z-[100] w-full h-full bg-[#00172D] flex items-center justify-center transition-opacity duration-1000 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <img
                src="/splash.jpg"
                alt="Loading Pioneers Chess Academy..."
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default SplashScreen;
