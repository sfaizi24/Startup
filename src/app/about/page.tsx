'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AboutPage() {
  const { currentUser, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClasses = "text-brand-dark-blue hover:text-brand-teal transition-colors duration-300";
  const mobileNavLinkClasses = "block py-2 px-4 text-lg text-brand-dark-blue hover:text-brand-teal hover:bg-brand-light-teal/50 rounded-md transition-colors duration-300";
  const ctaButtonClasses = "bg-brand-dark-blue text-white px-4 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold";
  const mobileCtaButtonClasses = `${mobileNavLinkClasses} ${ctaButtonClasses} w-full text-center`;

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light-teal">
            <p className="text-brand-dark-blue text-xl">Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-light-teal">
      {/* Header: Reduced height on mobile */}
      <header className="py-2 sticky top-0 z-50 bg-brand-light-teal/80 backdrop-blur-md shadow-sm h-[5rem] md:h-[7rem]">
        <div className="wrapper flex justify-between items-center">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo.png" alt="Sukoon Logo" width={200} height={80} className="mr-3 w-[130px] h-auto sm:w-[160px] md:w-[180px] lg:w-[200px]" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-grow justify-center items-center space-x-8 md:space-x-10 text-sm md:text-base">
            <Link href="/work-with-us" className={navLinkClasses}>Work With Us</Link>
            <Link href="/faq" className={navLinkClasses}>FAQ</Link>
            <Link href="/about" className={navLinkClasses}>About Us</Link>
          </nav>

          <nav className="hidden md:flex items-center space-x-4 md:space-x-6 text-sm md:text-base flex-shrink-0">
            {currentUser ? (
              <Link href="/book-now" className={ctaButtonClasses}>Book Now</Link>
            ) : (
              <Link href="/auth?action=signup" className={ctaButtonClasses}>Sign Up</Link>
            )}
            {currentUser ? (
              <>
                {currentUser.displayName && <span className="text-brand-dark-blue">Hi, {currentUser.displayName.split(' ')[0]}</span>}
                <button onClick={logout} className={navLinkClasses}>Logout</button>
              </>
            ) : (
              <Link href="/auth" className={navLinkClasses}>Login</Link>
            )}
          </nav>

          {/* Mobile Header Right Side (Auth Status + Menu Button) */}
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
              <>
                <Link href="/auth?action=signup" className="bg-brand-dark-blue text-white px-3 py-1.5 rounded-md hover:bg-brand-teal text-xs sm:text-sm font-semibold whitespace-nowrap">
                    Sign Up
                </Link>
                <Link href="/auth" className="text-brand-dark-blue hover:text-brand-teal text-xs sm:text-sm p-1 whitespace-nowrap">
                    Login
                </Link>
              </>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-dark-blue focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>
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
                null
              )}
              {currentUser ? (
                <>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className={mobileNavLinkClasses}
                  >
                    Logout
                  </button>
                </>
              ) : (
                null
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main Content */}
      <main className="flex-grow bg-white py-12 md:py-16">
        <div className="wrapper">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue text-center mb-10 md:mb-12">
            About Sukoon
          </h1>
          <section className="mb-12 md:mb-16">
            <h2 className="text-3xl font-semibold text-brand-teal text-center mb-8">Our Mission</h2>
            <p className="text-lg text-brand-text max-w-3xl mx-auto text-center">
              At Sukoon, we are driven by a passion for accessible and culturally sensitive psychiatric care. We believe that everyone deserves to find peace of mind, guided by their faith and values. Our mission is to connect individuals, couples, and families with licensed Muslim clinicians who provide confidential virtual therapy and psychiatric support.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-brand-teal text-center mb-10">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Areeb Irshad Profile */}
              <div className="flex flex-col items-center text-center p-6 bg-brand-light-teal/50 rounded-lg shadow-md">
                <Image
                  src="/areeb.jpg"
                  alt="Areeb Irshad"
                  width={180}
                  height={180}
                  className="rounded-full mb-4 border-4 border-brand-teal"
                />
                <h3 className="text-2xl font-semibold text-brand-dark-blue mb-1">Areeb Irshad</h3>
                <p className="text-brand-teal font-medium mb-3">Co-founder & CEO</p>
                <p className="text-brand-text text-sm">
                  Areeb is passionate about leveraging technology to make mental healthcare more accessible and attuned to the specific needs of the Muslim community. He believes in creating a platform where individuals can find understanding and support that resonates with their cultural and spiritual identity.
                </p>
              </div>

              {/* Samer Faizi Profile */}
              <div className="flex flex-col items-center text-center p-6 bg-brand-light-teal/50 rounded-lg shadow-md">
                <Image
                  src="/samer.jpg" 
                  alt="Samer Faizi"
                  width={180}
                  height={180}
                  className="rounded-full mb-4 border-4 border-brand-teal"
                />
                <h3 className="text-2xl font-semibold text-brand-dark-blue mb-1">Samer Faizi</h3>
                <p className="text-brand-teal font-medium mb-3">Co-founder & CTO</p>
                <p className="text-brand-text text-sm">
                  Samer is dedicated to building a secure and user-friendly platform that ensures a seamless experience for both clients and clinicians. His vision is to harness the power of technology to bridge the gap in mental health services, fostering a community of healing and support.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="text-center py-8 text-sm text-brand-text/70 bg-white border-t border-brand-light-teal">
        <div className="wrapper">
          <p>&copy; {new Date().getFullYear()} Sukoon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 