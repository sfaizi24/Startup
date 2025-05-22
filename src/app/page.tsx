'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownCircle, Menu, X } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, onClick, className }) => {
  return (
    <motion.div
      className={`card-component bg-white/80 p-6 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl transition-shadow duration-300 w-full lg:w-64 h-auto flex flex-col items-center justify-center flex-none ${className || ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      <div className="card-image-container w-full h-48 sm:h-56 md:h-64 lg:h-64 relative mb-4 bg-gray-200 rounded-md">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          className="rounded-md object-contain" 
        />
      </div>
      <h3 className="text-xl font-semibold text-brand-dark-blue mb-2">{title}</h3>
      <p className="text-sm text-brand-text">{description}</p>
    </motion.div>
  );
};

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCardClick = () => {
    setCurrentStep(2);
  };

  const navLinkClasses = "text-brand-dark-blue hover:text-brand-teal transition-colors duration-300";
  const mobileNavLinkClasses = "block py-2 px-4 text-lg text-brand-dark-blue hover:text-brand-teal hover:bg-brand-light-teal/50 rounded-md transition-colors duration-300";

  const individualImageUrl = "/individual-desktop.png";
  const couplesImageUrl = "/couples-desktop.png";
  const familyImageUrl = "/family-desktop.png";

  return (
    <div className="flex flex-col min-h-screen bg-brand-light-teal">
      {/* Header */}
      <header className="py-6 sticky top-0 z-50 bg-brand-light-teal/80 backdrop-blur-md shadow-sm h-[8rem]">
        <div className="wrapper flex justify-between items-center">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo.png" alt="Sukoon Logo" width={250} height={250} className="mr-3" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-grow justify-center space-x-4 md:space-x-6 text-sm md:text-base">
            <Link href="/contact" className={navLinkClasses}>[contact us]</Link>
            <Link href="/work-with-us" className={navLinkClasses}>[work with us]</Link>
            <Link href="/faq" className={navLinkClasses}>[FAQ]</Link>
            <Link href="/about" className={navLinkClasses}>[About us]</Link>
          </nav>

          <nav className="hidden md:flex items-center space-x-4 md:space-x-6 text-sm md:text-base flex-shrink-0">
            <Link href="/book-now" className="bg-brand-dark-blue text-white px-4 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold">[book now]</Link>
            <Link href="/login" className={navLinkClasses}>[login]</Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
            className="md:hidden bg-brand-light-teal/95 backdrop-blur-md shadow-lg absolute top-[6rem] left-0 right-0 z-40"
          >
            <nav className="flex flex-col items-center space-y-2 p-6">
              <Link href="/contact" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>[contact us]</Link>
              <Link href="/work-with-us" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>[work with us]</Link>
              <Link href="/faq" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>[FAQ]</Link>
              <Link href="/about" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>[About us]</Link>
              <Link href="/book-now" className={`${mobileNavLinkClasses} bg-brand-dark-blue text-white hover:bg-brand-teal font-semibold w-full text-center`} onClick={() => setIsMobileMenuOpen(false)}>[book now]</Link>
              <Link href="/login" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>[login]</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main viewable area: Hero text and interactive cards */}
      <main 
        className="flex flex-col items-center justify-center text-center pt-10 pb-10" 
        style={{ minHeight: 'calc(100vh - 13rem)' }}
      >
        <section id="hero" className="hero flex flex-col items-center text-center max-h-[calc(100vh-18rem)] overflow-hidden">
          <div className="wrapper">
            {/* Hero Text - Always Visible */}
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-4">
              Peace of mind, <span className="text-brand-teal">guided by faith.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-text max-w-2xl mb-10 mx-auto">
              Confidential virtual therapy & psychiatric care from licensed Muslim
              clinicians who understand your values.
            </p>

            {/* Animated Question and Cards Section */}
            <div className="flex flex-col items-center">
                <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                    >
                    <h2 className="text-2xl font-semibold text-brand-dark-blue mb-8">
                        What best describes you?
                    </h2>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                        <Card
                        title="Individual"
                        description="For myself"
                        imageUrl={individualImageUrl}
                        onClick={handleCardClick}
                        className="card"
                        />
                        <Card
                        title="Couples"
                        description="For me and my partner"
                        imageUrl={couplesImageUrl}
                        onClick={handleCardClick}
                        className="card"
                        />
                        <Card
                        title="Family"
                        description="For my loved ones"
                        imageUrl={familyImageUrl}
                        onClick={handleCardClick}
                        className="card"
                        />
                    </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                    >
                    <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-8">
                        [New Question Filler Text - e.g., What are you looking for support with?]
                    </h2>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                        <Card
                        title="Individual"
                        description="For myself"
                        imageUrl={individualImageUrl} 
                        onClick={() => { /* Potentially navigate to a different step or page */ }}
                        className="card"
                        />
                        <Card
                        title="Couples"
                        description="For me and my partner"
                        imageUrl={couplesImageUrl}
                        onClick={() => { /* Potentially navigate to a different step or page */ }}
                        className="card"
                        />
                        <Card
                        title="Family"
                        description="For my loved ones"
                        imageUrl={familyImageUrl}
                        onClick={() => { /* Potentially navigate to a different step or page */ }}
                        className="card"
                        />
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
          </div>
        </section>
      </main> 
      
      {/* Visible "How Sukoon helps" Title and Arrow Teaser */}
      <div id="how-sukoon-helps-teaser" className="bg-white text-center pt-6 pb-2">
        <div className="wrapper">
          <h2 className="text-3xl font-bold text-brand-dark-blue mb-3">How Sukoon helps</h2>
          <div className="flex justify-center">
            <ArrowDownCircle size={32} className="text-brand-teal animate-bounce" />
          </div>
        </div>
      </div>

      {/* Scrollable "How Sukoon helps" Content */}
      <section className="bg-white text-center pt-8 pb-16">
        <div className="wrapper">
          <div className="max-w-4xl mx-auto text-left space-y-6 text-brand-text">
            <p>
              [Filler text] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              [Filler text] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              [Filler text] Lorem ipsum. Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              [Filler text] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              [Filler text] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-brand-text/70 bg-white">
        <div className="wrapper">
          <p>&copy; {new Date().getFullYear()} Sukoon. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}