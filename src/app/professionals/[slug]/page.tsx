'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // To get slug from URL
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, CalendarDays, Briefcase, Brain, Users, MessageCircle, CheckCircle } from 'lucide-react'; // Added more icons
import { useAuth } from '@/contexts/AuthContext';
// import './professional-profile.css'; // Optional: if specific styles are needed

interface Professional {
  slug: string;
  name: string;
  title: string;
  imageUrl: string;
  fullBio: string;
  experience: string[];
  specializations: string[];
  approach: string;
  education: string[];
  languages: string[];
}

// Placeholder data - in a real app, this would come from a CMS or database
const professionalsData: Professional[] = [
  {
    slug: 'udit-shah',
    name: 'Udit Shah',
    title: 'Clinical Psychologist, PhD',
    imageUrl: '/areeb.jpg', // Placeholder image
    fullBio: "Dr. Udit Shah is a dedicated Clinical Psychologist with over 12 years of experience specializing in evidence-based therapies for anxiety, depression, and trauma. He is passionate about creating a safe and affirming space for individuals to explore their challenges and cultivate resilience. Dr. Shah believes in a collaborative approach, tailoring treatment plans to meet the unique needs and cultural backgrounds of his clients. He is committed to helping individuals not only alleviate symptoms but also to foster personal growth and long-term well-being, drawing upon Islamic principles of patience, reflection, and community support where appropriate.".replace(/'|’|‘/g, "&apos;"),
    experience: [
      "12+ years in private practice and community mental health settings.",
      "Led workshops on stress management and emotional regulation.",
      "Supervised junior psychologists and mental health counselors.",
      "Worked extensively with diverse populations, including young adults and professionals."
    ],
    specializations: [
      "Cognitive Behavioral Therapy (CBT) for Anxiety and Depression",
      "Trauma-Focused CBT",
      "Mindfulness-Based Stress Reduction (MBSR)",
      "Acceptance and Commitment Therapy (ACT)",
      "Islamic-integrated Psychotherapy"
    ],
    approach: "Dr. Shah utilizes an integrative and client-centered approach, primarily drawing from CBT, ACT, and mindfulness techniques. He emphasizes building a strong therapeutic alliance and empowering clients with practical skills to navigate life&apos;s difficulties. He also integrates Islamic teachings on emotional and spiritual well-being for clients who wish to incorporate their faith into the therapeutic process.".replace(/'|’|‘/g, "&apos;"),
    education: [
      "PhD in Clinical Psychology - University of Toronto (Placeholder)",
      "MA in Counselling Psychology - McGill University (Placeholder)",
      "BSc in Psychology - McMaster University (Placeholder)"
    ],
    languages: ["English", "Urdu", "Hindi"]
  },
  {
    slug: 'samer-faizi',
    name: 'Samer Faizi',
    title: 'Licensed Counselor, MA, LPC',
    imageUrl: '/samer.jpg',
    fullBio: "Samer Faizi is a compassionate Licensed Counselor dedicated to supporting individuals and couples through life&apos;s challenges. With a focus on holistic well-being, Samer integrates traditional counseling techniques with faith-based perspectives to foster healing and growth. He has a warm, empathetic style and works collaboratively with clients to identify strengths and develop coping strategies. Samer has a particular interest in pre-marital counseling, relationship issues, and helping individuals navigate work-life balance with a sense of purpose and contentment rooted in Islamic values.".replace(/'|’|‘/g, "&apos;"),
    experience: [
      "8+ years experience in counseling individuals and couples.",
      "Facilitated support groups for stress and anxiety.",
      "Provided workshops on healthy communication for couples."
    ],
    specializations: [
      "Couples & Marital Counseling",
      "Individual Therapy for Stress & Burnout",
      "Grief and Loss Counseling",
      "Holistic & Faith-Integrated Approaches"
    ],
    approach: "Samer believes in a holistic and strengths-based approach to counseling. He draws from person-centered therapy, solution-focused techniques, and Gottman Method Couples Therapy. For clients who desire it, he thoughtfully integrates Islamic principles to provide a comprehensive framework for healing and personal development.".replace(/'|’|‘/g, "&apos;"),
    education: [
      "MA in Clinical Mental Health Counseling - George Mason University (Placeholder)",
      "BA in Islamic Studies - Zaytuna College (Placeholder)"
    ],
    languages: ["English", "Arabic (Basic)"]
  }
];

export default function ProfessionalProfilePage() {
  const params = useParams();
  const { currentUser, logout, loading: authLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      const foundProf = professionalsData.find(p => p.slug === params.slug);
      setProfessional(foundProf || null);
    }
    setLoading(false);
  }, [params.slug]);

  const navLinkClasses = "text-brand-dark-blue hover:text-brand-teal transition-colors duration-300";
  const mobileNavLinkClasses = "block py-2 px-4 text-lg text-brand-dark-blue hover:text-brand-teal hover:bg-brand-light-teal/50 rounded-md transition-colors duration-300";
  const ctaButtonClasses = "bg-brand-dark-blue text-white px-4 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold";
  const mobileCtaButtonClasses = `${mobileNavLinkClasses} ${ctaButtonClasses} w-full text-center`;

  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light-teal">
        <p className="text-brand-dark-blue text-xl">Loading profile...</p>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-light-teal">
        {/* Simplified Header for error page */}
        <header className="py-2 sticky top-0 z-50 bg-brand-light-teal/80 backdrop-blur-md shadow-sm h-[5rem] md:h-[7rem]">
            <div className="wrapper flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="Sukoon Logo" width={180} height={70} />
                </Link>
            </div>
        </header>
        <main className="flex flex-col items-center justify-center text-center py-10 flex-grow">
          <h1 className="text-2xl text-brand-dark-blue mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find a profile for the requested professional.</p>
          <Link href="/">
            <button className="home-button bg-brand-dark-blue text-white px-6 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold">Back to Home</button>
          </Link>
        </main>
        <footer className="text-center py-8 text-sm text-brand-text/70 bg-white">
            <div className="wrapper">
            <p>&copy; {new Date().getFullYear()} Sukoon. All rights reserved.</p>
            </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-light-teal">
      {/* Standard Header */}
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
            {/* Mobile auth and menu button identical to other pages */}
            {currentUser ? (
              <>
                {currentUser.displayName && (
                  <span className="text-brand-dark-blue text-xs sm:text-sm whitespace-nowrap">
                    Hi, {currentUser.displayName.split(' ')[0]}
                  </span>
                )}
                <button onClick={logout} className="text-brand-dark-blue hover:text-brand-teal p-1" aria-label="Logout"><LogOut size={20} /></button>
              </>
            ) : (
              <>
                <Link href="/auth?action=signup" className="bg-brand-dark-blue text-white px-3 py-1.5 rounded-md hover:bg-brand-teal text-xs sm:text-sm font-semibold whitespace-nowrap">Sign Up</Link>
                <Link href="/auth" className="text-brand-dark-blue hover:text-brand-teal text-xs sm:text-sm p-1 whitespace-nowrap">Login</Link>
              </>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-dark-blue focus:outline-none" aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />} 
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden bg-brand-light-teal/95 backdrop-blur-md shadow-lg fixed top-[5rem] left-0 right-0 bottom-0 z-40 overflow-y-auto">
            <nav className="flex flex-col items-center space-y-4 p-6">
              <Link href="/" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/work-with-us" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Work With Us</Link>
              <Link href="/faq" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
              <Link href="/about" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              {currentUser ? <Link href="/book-now" className={mobileCtaButtonClasses} onClick={() => setIsMobileMenuOpen(false)}>Book Now</Link> : null}
              {currentUser ? <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className={mobileNavLinkClasses}>Logout</button> : null}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="wrapper px-4">
          <div className="bg-white shadow-xl rounded-lg md:flex md:space-x-8 p-6 md:p-10">
            {/* Left Column: Image and Book Button */}
            <div className="md:w-1/3 text-center flex flex-col items-center mb-8 md:mb-0">
              <div className="relative w-48 h-48 md:w-60 md:h-60 mx-auto mb-6">
                <Image src={professional.imageUrl} alt={professional.name} layout="fill" objectFit="cover" className="rounded-full shadow-md border-4 border-brand-teal" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-blue mb-1">{professional.name}</h1>
              <p className="text-lg text-brand-teal mb-6">{professional.title}</p>
              <Link href="/book-now" className={`${ctaButtonClasses} w-full md:w-auto text-lg py-3 px-8`}>
                Book a Session
              </Link>
            </div>

            {/* Right Column: Details */}
            <div className="md:w-2/3">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-3 flex items-center"><Brain size={24} className="mr-2 text-brand-teal"/>About Me</h2>
                <p className="text-gray-700 leading-relaxed text-justify">{professional.fullBio}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-3 flex items-center"><Briefcase size={24} className="mr-2 text-brand-teal"/>Experience</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  {professional.experience.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-3 flex items-center"><CheckCircle size={24} className="mr-2 text-brand-teal"/>Specializations</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  {professional.specializations.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-3 flex items-center"><Users size={24} className="mr-2 text-brand-teal"/>Therapeutic Approach</h2>
                <p className="text-gray-700 leading-relaxed text-justify">{professional.approach}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-3 flex items-center"><CalendarDays size={24} className="mr-2 text-brand-teal"/>Education</h2>
                 <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  {professional.education.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-3 flex items-center"><MessageCircle size={24} className="mr-2 text-brand-teal"/>Languages Spoken</h2>
                 <p className="text-gray-700 leading-relaxed">{professional.languages.join(', ')}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-8 text-sm text-brand-text/70 bg-white">
        <div className="wrapper">
          <p>&copy; {new Date().getFullYear()} Sukoon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 