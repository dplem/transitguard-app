
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false,
  onBack
}) => {
  return (
    <div className="mobile-container">
      {title && (
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center">
          {showBackButton && (
            <button 
              onClick={onBack} 
              className="mr-2 p-1"
            >
              ←
            </button>
          )}
          <div className="flex items-center justify-center flex-1">
            <img 
              src="/logo/transitguard_logo.png" 
              alt="TransitGuard Logo" 
              className="h-6 mr-2" 
            />
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </div>
      )}
      <div className="page-container p-4">
        {children}
      </div>
      <Navbar />
    </div>
  );
};

export default Layout;
