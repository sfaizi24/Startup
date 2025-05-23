'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProfessionalSearch from '@/app/components/ProfessionalSearch';

interface HeaderProps {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navLinkClasses = "text-brand-dark-blue hover:text-brand-teal transition-colors duration-300";
  const mobileNavLinkClasses = "block py-2 px-4 text-lg text-brand-dark-blue hover:text-brand-teal hover:bg-brand-light-teal/50 rounded-md transition-colors duration-300";
  const ctaButtonClasses = "bg-brand-dark-blue text-white px-4 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold";
  const mobileCtaButtonClasses = `${mobileNavLinkClasses} ${ctaButtonClasses} w-full text-center`;

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <>
      <header className="py-2 sticky top-0 z-50 bg-brand-light-teal/80 backdrop-blur-md shadow-sm h-[5rem] md:h-[7rem]">
        <div className="wrapper flex justify-between items-center h-full">
          {/* Left Group: Logo + Main Nav Links */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center flex-shrink-0"
              onClick={handleLogoClick}
            >
              <Image 
                src="/logo.png" 
                alt="Sukoon Logo" 
                width={200} 
                height={80} 
                className="w-[130px] h-auto sm:w-[160px] md:w-[180px] lg:w-[200px]" 
              />
            </Link>
            <nav className="hidden md:flex items-center ml-4 md:ml-6 space-x-4 md:space-x-5 lg:space-x-7 text-sm md:text-base">
              <Link href="/work-with-us" className={navLinkClasses}>Work With Us</Link>
              <Link href="/faq" className={navLinkClasses}>FAQ</Link>
              <Link href="/about" className={navLinkClasses}>About Us</Link>
            </nav>
          </div>
          
          {/* Center Group: Search Bar - Always shown on desktop */}
          <div className="hidden md:flex flex-1 items-center justify-center px-2 sm:px-4">
            <div className="w-full max-w-md">
              <ProfessionalSearch />
            </div>
          </div>

          {/* Right Group: Auth Links (and Book Now) - Always flex-shrink-0 */}
          <nav className="hidden md:flex items-center space-x-3 sm:space-x-4 md:space-x-6 text-sm md:text-base flex-shrink-0">
            {currentUser ? (
              <Link href="/book-now" className={ctaButtonClasses}>Book Now</Link>
            ) : (
              <Link href="/auth?action=signup" className={ctaButtonClasses}>Sign Up</Link>
            )}
            {currentUser ? (
              <>
                {currentUser.displayName && (
                  <span className="text-brand-dark-blue text-xs sm:text-sm md:text-base whitespace-nowrap">
                    Hi, {currentUser.displayName.split(' ')[0]}
                  </span>
                )}
                <button onClick={logout} className={navLinkClasses}>Logout</button>
              </>
            ) : (
              <Link href="/auth" className={navLinkClasses}>Login</Link>
            )}
          </nav>

          {/* Mobile Header Right Side (Auth Status + Search Icon + Menu Button) */}
          <div className="md:hidden flex items-center space-x-3">
            {currentUser ? (
              <>
                {currentUser.displayName && (
                  <span className="text-brand-dark-blue text-xs sm:text-sm whitespace-nowrap">
                    Hi, {currentUser.displayName.split(' ')[0]}
                  </span>
                )}
                <button 
                  onClick={logout} 
                  className="text-brand-dark-blue hover:text-brand-teal p-1" 
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link href="/auth?action=signup" className="bg-brand-dark-blue text-white px-3 py-1.5 rounded-md hover:bg-brand-teal text-xs sm:text-sm font-semibold whitespace-nowrap">
                  Sign Up
              </Link>
            )}
            {/* Mobile Search Icon Button - Always shown */}
            <button 
              onClick={() => {
                setIsMobileSearchOpen(!isMobileSearchOpen);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              className="text-brand-dark-blue focus:outline-none p-1" 
              aria-label="Toggle search"
            >
              {isMobileSearchOpen ? <X size={24} /> : <Search size={24} />}
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isMobileSearchOpen) setIsMobileSearchOpen(false);
              }}
              className="text-brand-dark-blue focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />} 
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Input Area - Render based on isMobileSearchOpen state */}
      {isMobileSearchOpen && (
        <div className="md:hidden fixed top-[5rem] left-0 right-0 z-30 bg-brand-light-teal/95 backdrop-blur-md shadow-lg p-4">
          <ProfessionalSearch />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-brand-light-teal/95 backdrop-blur-md shadow-lg fixed top-[5rem] left-0 right-0 bottom-0 z-40 overflow-y-auto"
          >
            <nav className="flex flex-col items-center space-y-4 p-6">
              <Link href="/" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/work-with-us" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Work With Us</Link>
              <Link href="/faq" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
              <Link href="/about" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              {currentUser ? (
                <Link href="/book-now" className={mobileCtaButtonClasses} onClick={() => setIsMobileMenuOpen(false)}>Book Now</Link>
              ) : (
                <Link href="/auth" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              )}
              {currentUser && (
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                  className={mobileNavLinkClasses}
                >
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 