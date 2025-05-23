'use client';

import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

export default function AboutPage() {
  const { loading } = useAuth();

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