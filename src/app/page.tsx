'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownCircle, ArrowLeft, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Option {
  id: string;
  text?: string; // Optional text for the card
  imageUrl: string;
  mobileImageUrl: string;
}

interface Question {
  title: string;
  options: Option[];
  next: (answerId: string, currentAnswers: Record<string, string>) => string; // Returns next question key or results path
}

interface QuestionnaireData {
  [key: string]: Question;
}

// Define your questionnaire structure here
const questionnaireData: QuestionnaireData = {
  'initial': {
    title: "What best describes you?",
    options: [
      { id: 'individual', imageUrl: "/individual-desktop.png", mobileImageUrl: "/individual-mobile.png" },
      { id: 'couples', imageUrl: "/couples-desktop.png", mobileImageUrl: "/couples-mobile.png" },
      { id: 'family', imageUrl: "/family-desktop.png", mobileImageUrl: "/family-mobile.png" },
    ],
    next: (answerId) => `q1_${answerId}` // Example: q1_individual, q1_couples, q1_family
  },
  'q1_individual': {
    title: "As an individual, what are you looking for support with?",
    options: [
      // Replace with actual options and images for individuals
      { id: 'stress', text: "Stress", imageUrl: "/individual-desktop.png", mobileImageUrl: "/individual-mobile.png" },
      { id: 'anxiety', text: "Anxiety", imageUrl: "/individual-desktop.png", mobileImageUrl: "/individual-mobile.png" },
      { id: 'relationships', text: "Relationships", imageUrl: "/individual-desktop.png", mobileImageUrl: "/individual-mobile.png" },
    ],
    next: (answerId, answers) => {
      // Example: navigate to a specific results page based on the answer
      if (answerId === 'anxiety') return '/results/individual/anxiety';
      return '/results/individual/general'; // Default results page for individuals
    }
  },
  'q1_couples': {
    title: "For couples, what area needs attention?",
    options: [
      // Replace with actual options and images for couples
      { id: 'communication', text: "Communication", imageUrl: "/couples-desktop.png", mobileImageUrl: "/couples-mobile.png" },
      { id: 'conflict', text: "Conflict Resolution", imageUrl: "/couples-desktop.png", mobileImageUrl: "/couples-mobile.png" },
    ],
    next: () => '/results/couples/general'
  },
  'q1_family': {
    title: "For families, what challenges are you facing?",
    options: [
      // Replace with actual options and images for families
      { id: 'parenting', text: "Parenting Support", imageUrl: "/family-desktop.png", mobileImageUrl: "/family-mobile.png" },
      { id: 'dynamics', text: "Family Dynamics", imageUrl: "/family-desktop.png", mobileImageUrl: "/family-mobile.png" },
    ],
    next: () => '/results/family/general'
  },
  // Add more questions and branching logic as needed
  // e.g., 'q2_individual_stress', etc.
};

interface CardProps {
  desktopImageUrl: string;
  mobileImageUrl: string;
  text?: string; // Make text optional
  onClick: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ desktopImageUrl, mobileImageUrl, text, onClick, className }) => {
  return (
    <motion.div
      className={`card-component cursor-pointer w-full lg:w-64 h-auto flex flex-col items-center justify-center flex-none ${className || ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      <div className="card-image-container w-full relative">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImageUrl} />
          <source media="(min-width: 768px)" srcSet={desktopImageUrl} />
          <Image
            src={desktopImageUrl} // Fallback for older browsers
            alt={text || "Selection card image"} // Use text for alt if available
            layout="responsive"
            width={512}
            height={663}
            className="rounded-md object-contain"
          />
        </picture>
        {text && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center p-2 rounded-b-md">
            <p className="text-sm font-semibold">{text}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  const router = useRouter();
  const [currentQuestionKey, setCurrentQuestionKey] = useState<string>('initial');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);

  const handleOptionClick = (selectedOptionId: string) => {
    const currentQuestion = questionnaireData[currentQuestionKey];
    if (!currentQuestion) return; // Should not happen if keys are correct

    const updatedAnswers = { ...userAnswers, [currentQuestionKey]: selectedOptionId };
    setUserAnswers(updatedAnswers);

    const nextStep = currentQuestion.next(selectedOptionId, updatedAnswers);

    if (nextStep.startsWith('/')) {
      // It's a path, navigate to results page
      router.push(nextStep);
    } else {
      // It's a key for the next question
      setQuestionHistory([...questionHistory, currentQuestionKey]);
      setCurrentQuestionKey(nextStep);
    }
  };

  const handleGoBack = () => {
    if (questionHistory.length === 0) return; // Cannot go back from initial question

    const previousQuestionKey = questionHistory[questionHistory.length - 1];
    const newHistory = questionHistory.slice(0, -1);

    // Remove the answer for the question we are going back to, so it can be re-answered
    const { [previousQuestionKey]: removedAnswer, ...remainingAnswers } = userAnswers;
    // It might be more accurate to remove the answer of the question we are *leaving* (currentQuestionKey)
    // However, to allow re-answering the *previous* question, we clear its previous answer.
    // Let's refine this: clear the answer for the `previousQuestionKey` specifically.
    const updatedAnswers = { ...userAnswers };
    delete updatedAnswers[previousQuestionKey];
    setUserAnswers(updatedAnswers);
    
    setQuestionHistory(newHistory);
    setCurrentQuestionKey(previousQuestionKey);
  };

  const navLinkClasses = "text-brand-dark-blue hover:text-brand-teal transition-colors duration-300";
  const mobileNavLinkClasses = "block py-2 px-4 text-lg text-brand-dark-blue hover:text-brand-teal hover:bg-brand-light-teal/50 rounded-md transition-colors duration-300";

  const currentQuestion = questionnaireData[currentQuestionKey];

  // Fallback if a question key is invalid (should not happen with correct logic)
  if (!currentQuestion) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p>Error: Question not found. Resetting...</p>
            <button 
                onClick={() => { 
                    setCurrentQuestionKey('initial'); 
                    setUserAnswers({}); 
                    setQuestionHistory([]); 
                }} 
                className="mt-4 p-2 bg-brand-dark-blue text-white rounded"
            >
                Start Over
            </button>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-light-teal">
      {/* Header: Reduced height on mobile */}
      <header className="py-2 sticky top-0 z-50 bg-brand-light-teal/80 backdrop-blur-md shadow-sm h-[5rem] md:h-[7rem]">
        <div className="wrapper flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center flex-shrink-0"
            onClick={() => {
              setCurrentQuestionKey('initial');
              setUserAnswers({});
              setQuestionHistory([]);
            }}
          >
            <Image src="/logo.png" alt="Sukoon Logo" width={200} height={80} className="mr-3 w-[130px] h-auto sm:w-[160px] md:w-[180px] lg:w-[200px]" />
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
            className="md:hidden bg-brand-light-teal/95 backdrop-blur-md shadow-lg fixed top-[5rem] left-0 right-0 bottom-0 z-40 overflow-y-auto"
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

      {/* Main viewable area: Hero text and interactive questionnaire */}
      <main 
        className="flex flex-col items-center justify-start text-center pt-2 sm:pt-3 md:pt-4 pb-6 min-h-[calc(85vh-5rem)] md:min-h-[calc(85vh-7rem)]" 
      >
        <section id="hero-questionnaire" className="hero flex flex-col items-center text-center w-full py-4 md:py-8">
          <div className="wrapper">
            {/* Hero Text - Always Visible */}
            <h1 className="mt-1 text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-brand-dark-blue mb-2 sm:mb-3">
              Peace of mind, <span className="text-brand-teal">guided by faith.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-brand-text max-w-xl md:max-w-2xl lg:max-w-3xl mb-3 sm:mb-4 mx-auto">
              Confidential virtual therapy & psychiatric care from licensed Muslim
              clinicians who understand your values.
            </p>

            {/* Animated Question and Cards Section */}
            <div className="flex flex-col items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionKey} // Key change triggers animation
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-brand-dark-blue mb-3 sm:mb-4">
                            {currentQuestion.title}
                        </h2>
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-6">
                            {currentQuestion.options.map((option) => (
                                <Card
                                    key={option.id}
                                    desktopImageUrl={option.imageUrl}
                                    mobileImageUrl={option.mobileImageUrl}
                                    text={option.text}
                                    onClick={() => handleOptionClick(option.id)}
                                    className="w-[85vw] md:w-44 lg:w-48 xl:w-52"
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Go Back Button */} 
                {questionHistory.length > 0 && (
                    <button 
                        onClick={handleGoBack}
                        className="mt-6 flex items-center text-brand-dark-blue hover:text-brand-teal transition-colors duration-300 font-semibold py-2 px-4 rounded-md border-2 border-brand-dark-blue hover:border-brand-teal"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Go Back
                    </button>
                )}
            </div>
          </div>
        </section>
      </main> 
      
      {/* Visible "How Sukoon helps" Title and Arrow Teaser */}
      <div id="how-sukoon-helps-teaser" className="bg-white text-center h-[150px] flex items-center justify-center">
        <div className="wrapper">
          <h2 className="text-3xl font-bold text-brand-dark-blue mb-3">How Sukoon helps</h2>
          <div className="flex justify-center mt-2">
            <ArrowDownCircle size={32} className="text-brand-teal animate-bounce" />
          </div>
        </div>
      </div>

      {/* Scrollable "How Sukoon helps" Content */}
      <section className="bg-white text-center pt-8 h-[100px] overflow-y-auto">
        <div className="wrapper pb-16">
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