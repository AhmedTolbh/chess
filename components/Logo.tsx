
import React from 'react';

interface LogoProps {
  className?: string;
  isDarkMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", isDarkMode }) => {
  const navyColor = isDarkMode ? "#ffffff" : "#00172D";
  const limeColor = "#84cc16";

  return (
    <div className={`relative z-50 ${className}`}>
      <img
        src={isDarkMode ? "/logo-dark.png" : "/logo.png"}
        alt="Pioneers Logo"
        className="h-48 w-auto max-w-none object-contain absolute top-1/2 -translate-y-1/2 ltr:left-0 rtl:right-0"
      />
    </div>
  );
};

export default Logo;
