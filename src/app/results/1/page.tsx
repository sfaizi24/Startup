'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import './styles.css';

export default function AnxietyResultsPage() {
  const router = useRouter();
  const { loading } = useAuth();

  const professionals = [
    {
      name: 'Udit Shah',
      slug: 'udit-shah',
      title: 'Clinical Psychologist',
      imageUrl: '/areeb.jpg',
      bio: 'Udit specializes in cognitive behavioral therapy and has extensive experience helping individuals overcome anxiety.',
    },
    {
      name: 'Samer Faizi',
      slug: 'samer-faizi',
      title: 'Licensed Counselor',
      imageUrl: '/samer.jpg',
      bio: 'Samer focuses on a holistic approach to mental wellness, integrating traditional and modern therapeutic techniques.',
    },
  ];

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
      <main className="flex flex-col items-center justify-start text-center pt-2 sm:pt-3 md:pt-4 pb-6 min-h-[calc(100vh-5rem-env(safe-area-inset-bottom))] md:min-h-[calc(100vh-7rem-env(safe-area-inset-bottom))]">
        <div className="wrapper w-full px-4 md:px-0">
          <div className="container mx-auto px-4 py-8 relative">
            <button 
              onClick={() => router.back()}
              className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center text-brand-dark-blue hover:text-brand-teal transition-colors duration-300 font-semibold py-2 px-3 rounded-md border-2 border-brand-dark-blue hover:border-brand-teal bg-white/70 hover:bg-white/90 backdrop-blur-sm z-10"
              aria-label="Go back to previous page"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </button>

            <section className="quran-quote text-center my-8 md:my-12 py-6">
              <blockquote className="text-center">
                <p className="text-3xl md:text-4xl text-brand-dark-blue leading-relaxed my-4 font-bold font-serif" lang="ar" dir="rtl">
                  إِنَّ مَعَ الْعُسْرِ يُسْرًا
                </p>
                <p className="text-2xl md:text-3xl text-brand-dark-blue leading-relaxed my-4 font-bold font-serif italic">
                  &quot;Verily, with hardship comes ease.&quot;
                </p>
                <footer className="text-md text-brand-teal mt-4">- Quran 94:5-6</footer>
              </blockquote>
            </section>

            <section className="reassurance bg-green-100/50 p-6 rounded-lg shadow-md mb-8">
              <p className="text-lg text-gray-700">
                It&apos;s okay to feel anxious sometimes. Remember that you are not alone, and these feelings can be managed.
                Allah (SWT) is with those who are patient and seek His help.
              </p>
            </section>

            <section className="professionals">
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-8 text-center">Recommended Professionals</h2>
              <div className="professionals-list grid grid-cols-1 md:grid-cols-2 gap-8">
                {professionals.map((prof) => (
                  <div key={prof.name} className="professional-card bg-white p-6 rounded-lg shadow-lg text-center transition-transform hover:scale-105 flex flex-col justify-between">
                    <div>
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <Image src={prof.imageUrl} alt={prof.name} layout="fill" objectFit="cover" className="rounded-full border-4 border-brand-teal" />
                        </div>
                        <h3 className="text-xl font-semibold text-brand-dark-blue mb-1">{prof.name}</h3>
                        <p className="text-sm text-brand-teal mb-2">{prof.title}</p>
                        <p className="text-gray-600 text-sm mb-4 px-2">{prof.bio}</p>
                    </div>
                    <Link href={`/professionals/${prof.slug}`} className="mt-auto">
                      <button className="book-button bg-brand-teal text-white px-6 py-2 rounded-md hover:bg-brand-dark-blue transition-colors duration-300 font-semibold w-full md:w-auto">Learn more</button>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <footer className="page-footer text-center mt-12 py-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                If you are in crisis or need immediate assistance, please contact emergency services.
                This page is for informational purposes only and does not substitute professional medical advice.
              </p>
              <Link href="/">
                <button className="home-button bg-brand-dark-blue text-white px-6 py-2 rounded-md hover:bg-brand-teal transition-colors duration-300 font-semibold">Back to Home</button>
              </Link>
            </footer>
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