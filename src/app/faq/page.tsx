'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Sukoon?",
    answer: "Sukoon is a platform dedicated to providing accessible and culturally sensitive virtual therapy and psychiatric care. We connect individuals, couples, and families with licensed Muslim clinicians who understand your values.",
  },
  {
    question: "How does the questionnaire work?",
    answer: "Our interactive questionnaire helps us understand your needs and preferences. Based on your answers, we can guide you towards the most suitable support options available through our platform.",
  },
  {
    question: "Are the clinicians licensed?",
    answer: "Yes, all clinicians on the Sukoon platform are licensed professionals in their respective fields. We ensure they meet rigorous standards to provide high-quality care.",
  },
  {
    question: "Is my information confidential?",
    answer: "Absolutely. Confidentiality is a cornerstone of our service. We adhere to strict privacy standards to ensure your information is secure and protected.",
  },
  {
    question: "What kind of issues can Sukoon help with?",
    answer: "Sukoon clinicians can help with a wide range of mental health concerns, including stress, anxiety, relationship issues, family dynamics, parenting support, and more, all within a faith-sensitive framework.",
  },
  {
    question: "How do I get started?",
    answer: "You can start by exploring our homepage questionnaire or by signing up to book a session directly if you already know what you&apos;re looking for. If you have any questions, feel free to contact us.",
  },
];

const FAQCard: React.FC<{ item: FAQItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border border-brand-light-gray rounded-lg mb-4 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 md:p-5 text-left bg-brand-light-teal/30 hover:bg-brand-light-teal/50 transition-colors"
      >
        <h3 className="text-md md:text-lg font-semibold text-brand-dark-blue">{item.question}</h3>
        {isOpen ? <ChevronUp className="text-brand-teal" /> : <ChevronDown className="text-brand-teal" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="p-4 md:p-5 text-brand-text text-sm md:text-base bg-white">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const { currentUser, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const navLinkClasses = "text-brand-dark-blue hover:text-brand-teal transition-colors duration-300";
  const mobileNavLinkClasses = "block py-2 px-4 text-lg text-brand-dark-blue hover:text-brand-teal hover:bg-brand-light-teal/50 rounded-md transition-colors duration-300";
  const ctaButtonClasses = "bg-brand-dark-blue text-white px-4 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold";
  const mobileCtaButtonClasses = `${mobileNavLinkClasses} ${ctaButtonClasses} w-full text-center`;

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light-teal">
            <p className="text-brand-dark-blue text-xl">Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-light-teal">
      {/* Header */}
      <header className="py-2 sticky top-0 z-50 bg-brand-light-teal/80 backdrop-blur-md shadow-sm h-[5rem] md:h-[7rem]">
        <div className="wrapper flex justify-between items-center">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo.png" alt="Sukoon Logo" width={200} height={80} className="mr-3 w-[130px] h-auto sm:w-[160px] md:w-[180px] lg:w-[200px]" />
          </Link>
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
          <div className="md:hidden flex items-center space-x-3">
            {currentUser ? (
              <>
                {currentUser.displayName && (
                  <span className="text-brand-dark-blue text-xs sm:text-sm whitespace-nowrap">
                    Hi, {currentUser.displayName.split(' ')[0]}
                  </span>
                )}
                <button onClick={logout} className="text-brand-dark-blue hover:text-brand-teal p-1" aria-label="Logout">
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
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-dark-blue focus:outline-none" aria-label="Toggle menu">
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
              ) : null}
              {currentUser ? (
                <>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className={mobileNavLinkClasses}>Logout</button>
                </>
              ) : null}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main Content */}
      <main className="flex-grow bg-white py-12 md:py-16">
        <div className="wrapper">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue text-center mb-10 md:mb-12">
            Frequently Asked Questions
          </h1>
          <div className="max-w-3xl mx-auto">
            {faqData.map((item, index) => (
              <FAQCard
                key={index}
                item={item}
                isOpen={openFAQ === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="text-center py-8 text-sm text-brand-text/70 bg-white border-t border-brand-light-teal">
        <div className="wrapper">
          <p>&copy; {new Date().getFullYear()} Sukoon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 