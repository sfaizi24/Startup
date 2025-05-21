'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, onClick }) => {
  return (
    <motion.div
      className="bg-white/80 p-6 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl transition-shadow duration-300 w-64 h-80 flex flex-col items-center justify-center flex-none"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-64 h-64 relative mb-4 bg-gray-200 rounded-md">
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

  const handleCardClick = () => {
    setCurrentStep(2);
  };

  const navLinkClasses = "text-brand-dark-blue hover:text-brand-teal transition-colors duration-300";

  const individualImageUrl = "/individual-card.png";
  const couplesImageUrl = "/individual-card.png";
  const familyImageUrl = "/individual-card.png";

  return (
    <div className="flex flex-col min-h-screen bg-brand-light-teal">
      {/* Header */}
      <header className="py-6 sticky top-0 z-50 bg-brand-light-teal/80 backdrop-blur-md shadow-sm h-[6rem]">
        <div className="wrapper flex justify-between items-center">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo.png" alt="Sukoon Logo" width={300} height={300} className="mr-3" />
          </Link>
          
          <nav className="flex-grow flex justify-center space-x-4 md:space-x-6 text-sm md:text-base">
            <Link href="/contact" className={navLinkClasses}>[contact us]</Link>
            <Link href="/work-with-us" className={navLinkClasses}>[work with us]</Link>
            <Link href="/faq" className={navLinkClasses}>[FAQ]</Link>
            <Link href="/about" className={navLinkClasses}>[About us]</Link>
          </nav>

          <nav className="flex items-center space-x-4 md:space-x-6 text-sm md:text-base flex-shrink-0">
            <Link href="/book-now" className="bg-brand-dark-blue text-white px-4 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold">[book now]</Link>
            <Link href="/login" className={navLinkClasses}>[login]</Link>
          </nav>
        </div>
      </header>

      {/* Main viewable area: Hero text and interactive cards */}
      <main 
        className="flex flex-col items-center justify-center text-center pt-10 pb-10" 
        style={{ minHeight: 'calc(100vh - 13rem)' }} // Viewport height minus header (6rem) and HSH title/arrow teaser (7rem)
      >
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
                  <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                      <Card
                      title="Individual"
                      description="For myself"
                      imageUrl={individualImageUrl}
                      onClick={handleCardClick}
                      />
                      <Card
                      title="Couples"
                      description="For me and my partner"
                      imageUrl={couplesImageUrl}
                      onClick={handleCardClick}
                      />
                      <Card
                      title="Family"
                      description="For my loved ones"
                      imageUrl={familyImageUrl}
                      onClick={handleCardClick}
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
                  <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                      <Card
                      title="Individual"
                      description="For myself"
                      imageUrl={individualImageUrl} 
                      onClick={() => { /* Potentially navigate to a different step or page */ }}
                      />
                      <Card
                      title="Couples"
                      description="For me and my partner"
                      imageUrl={couplesImageUrl}
                      onClick={() => { /* Potentially navigate to a different step or page */ }}
                      />
                      <Card
                      title="Family"
                      description="For my loved ones"
                      imageUrl={familyImageUrl}
                      onClick={() => { /* Potentially navigate to a different step or page */ }}
                      />
                  </div>
                  </motion.div>
              )}
              </AnimatePresence>
          </div>
        </div>
      </main> 
      
      {/* Visible "How Sukoon helps" Title and Arrow Teaser */}
      <div className="bg-white text-center pt-6 pb-2">
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