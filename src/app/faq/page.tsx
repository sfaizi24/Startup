'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

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
  const { loading } = useAuth();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
      <Header />
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