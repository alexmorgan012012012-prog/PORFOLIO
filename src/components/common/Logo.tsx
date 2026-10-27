import React from 'react';
import { useAgency } from '../../context/AgencyContext';

interface LogoProps {
  variant?: 'primary' | 'dark' | 'light' | 'icon';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'primary', className = 'h-9', onClick }) => {
  const { settings, navigate } = useAgency();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else {
      e.preventDefault();
      navigate('/');
    }
  };

  // 1. Icon-only variant
  if (variant === 'icon') {
    return (
      <div onClick={handleClick} className={`cursor-pointer inline-flex items-center select-none ${className}`}>
        <img
          src="/ryvo-icon.svg"
          alt="RYVO Icon"
          className="h-9 w-9 object-contain"
          onError={(e) => {
            // In case of any loading fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  // 2. Dark background variant (for footer / dark headers)
  if (variant === 'dark') {
    return (
      <div onClick={handleClick} className={`cursor-pointer inline-flex items-center select-none ${className}`}>
        <img
          src="/ryvo-logo-light.svg"
          alt="RYVO Digital Agency"
          className="h-10 w-auto object-contain"
        />
      </div>
    );
  }

  // 3. Primary light background variant (for navigation and public pages)
  return (
    <div onClick={handleClick} className={`cursor-pointer inline-flex items-center select-none ${className}`}>
      <img
        src="/ryvo-logo.svg"
        alt="RYVO Digital Agency"
        className="h-10 w-auto object-contain"
      />
    </div>
  );
};
