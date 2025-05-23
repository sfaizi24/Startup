'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function WorkWithUsPage() {
  const { currentUser, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const navLinkClasses = "text-brand-dark-blue hover:text-brand-teal transition-colors duration-300";
  const mobileNavLinkClasses = "block py-2 px-4 text-lg text-brand-dark-blue hover:text-brand-teal hover:bg-brand-light-teal/50 rounded-md transition-colors duration-300";
  const ctaButtonClasses = "bg-brand-dark-blue text-white px-4 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold";
  const mobileCtaButtonClasses = `${mobileNavLinkClasses} ${ctaButtonClasses} w-full text-center`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitted(false); // Reset submission status before new attempt

    // Basic validation
    if (!name || !experience || !state || !email || !phone) {
      setFormError('Please fill out all required fields.');
      return;
    }

    const formData = { name, experience, state, email, phone, notes };

    try {
      const response = await fetch('/api/submit-work-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      console.log('Form submitted successfully:', result);
      setFormSubmitted(true);
      // Reset form fields on successful submission
      setName('');
      setExperience('');
      setState('');
      setEmail('');
      setPhone('');
      setNotes('');

    } catch (error: any) {
      console.error('Submission error:', error);
      setFormError(error.message || 'Failed to submit the form. Please try again.');
    }
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light-teal">
            <p className="text-brand-dark-blue text-xl">Loading...</p>
        </div>
    );
  }

  const inputClasses = "w-full p-3 border border-brand-light-gray rounded-md focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-colors";
  const labelClasses = "block text-sm font-medium text-brand-dark-blue mb-1";

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
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue text-center mb-6 md:mb-8">
            Partner with Sukoon
          </h1>
          <p className="text-lg text-brand-text max-w-3xl mx-auto text-center mb-10 md:mb-12">
            Sukoon is dedicated to connecting individuals, couples, and families seeking faith-based mental wellness support with compassionate and qualified Muslim clinicians. If you are a licensed professional passionate about making a difference, we invite you to join our network.
          </p>

          {formSubmitted ? (
            <div className="max-w-xl mx-auto bg-brand-teal/20 p-8 rounded-lg text-center shadow-md">
              <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4">Thank You!</h2>
              <p className="text-brand-text">Your application has been submitted. We will review your information and get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-brand-light-teal/30 p-8 rounded-lg shadow-lg space-y-6">
              <div>
                <label htmlFor="name" className={labelClasses}>Full Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="experience" className={labelClasses}>Years of Experience</label>
                <input type="number" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="state" className={labelClasses}>State of practice</label>
                <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="notes" className={labelClasses}>Notes/Questions (Optional)</label>
                <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className={inputClasses}></textarea>
              </div>
              {formError && (
                <p className="text-sm text-red-600">{formError}</p>
              )}
              <div>
                <button type="submit" className={`${ctaButtonClasses} w-full py-3 text-lg`}>
                  Submit Application
                </button>
              </div>
            </form>
          )}
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