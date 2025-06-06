'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthError } from 'firebase/auth';

// Helper function to generate years for dropdown (e.g., last 100 years from current)
const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 100; i++) {
    years.push(currentYear - i);
  }
  return years;
};

// Helper function to generate month options
const getMonthOptions = () => {
  return [
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' }, { value: '04', label: 'April' },
    { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' },
  ];
};

// Helper function to generate day options (1-31)
const getDayOptions = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i.toString().padStart(2, '0'));
  }
  return days;
};

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    currentUser,
    loginWithGoogle,
    signUpWithEmailPassword,
    signInWithEmailPassword,
    loading 
  } = useAuth();

  // Default to Sign Up tab if ?action=signup is present in URL
  const [isSignUp, setIsSignUp] = useState(searchParams.get('action') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Local loading state for form submission

  const yearOptions = getYearOptions();
  const monthOptions = getMonthOptions();
  const dayOptions = getDayOptions();

  // Effect for redirecting if user is already logged in or becomes logged in
  useEffect(() => {
    if (!loading && currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  // Effect to update isSignUp state if searchParams change (e.g. client-side navigation to /auth?action=signup)
  useEffect(() => {
    if (searchParams.get('action') === 'signup') {
      setIsSignUp(true);
    } else {
        // Optional: if navigating to /auth without params, default to sign in
        // setIsSignUp(false); 
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    let result: { success: boolean; error?: AuthError };

    if (isSignUp) {
      if (!firstName || !lastName || !birthDay || !birthMonth || !birthYear) {
        setError("Please fill in all required fields for sign up, including your full birthday.");
        setIsSubmitting(false);
        return;
      }
      const formattedBirthday = `${birthYear}-${birthMonth}-${birthDay}`;
      result = await signUpWithEmailPassword(email, password, firstName, lastName, formattedBirthday);
    } else {
      result = await signInWithEmailPassword(email, password);
    }

    setIsSubmitting(false);
    if (result.success) {
      // No need to router.push here if currentUser change triggers useEffect
      // However, explicit push can be kept if preferred, but ensure it doesn't cause issues
      // For now, relying on useEffect is cleaner
      // router.push('/'); 
    } else if (result.error) {
      setError(result.error.message || 'An unexpected error occurred.');
      // More specific error handling based on result.error.code can be added here
      // e.g., if (result.error.code === 'auth/email-already-in-use') { ... }
    }
  };
  
  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
        await loginWithGoogle();
        // Redirection will be handled by the useEffect hook watching currentUser
    } catch (err) {
        setError("Failed to sign in with Google. Please try again.");
        console.error(err);
    }
    setIsSubmitting(false);
  };

  // If initial auth state is loading, show loading message
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-brand-light-teal"><p>Loading app state...</p></div>;
  }

  // If user is already logged in (and not loading), useEffect will handle redirect.
  // So, if we reach here and currentUser exists, it means redirect is imminent or already happened.
  // To prevent rendering the form briefly before redirect, we can return null or a loading indicator.
  if (currentUser) {
      return <div className="min-h-screen flex items-center justify-center bg-brand-light-teal"><p>Redirecting...</p></div>; 
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light-teal p-4 relative">
      {/* "X" button to go to previous page */}
      <button 
        onClick={() => router.back()} 
        className="absolute top-4 right-4 text-4xl font-semibold text-gray-600 hover:text-gray-800 z-10"
        aria-label="Close"
      >
        &times;
      </button>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-brand-dark-blue mb-6 text-center">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>

        <div className="mb-6 border-b border-gray-300">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => { 
                setIsSignUp(false); setError(null); setEmail(''); setPassword(''); 
                setFirstName(''); setLastName(''); setBirthDay(''); setBirthMonth(''); setBirthYear('');
                router.replace('/auth', { scroll: false }); // Clear query params on tab switch
              }}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm 
                ${!isSignUp ? 'border-brand-teal text-brand-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { 
                setIsSignUp(true); setError(null); setEmail(''); setPassword(''); 
                // No need to clear other fields if switching to sign up as they are part of it
                router.replace('/auth?action=signup', { scroll: false }); // Set query params on tab switch
              }}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm 
                ${isSignUp ? 'border-brand-teal text-brand-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Sign Up
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-brand-text">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required={isSignUp}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-brand-text">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required={isSignUp}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-text mb-1">
                  Birthday
                </label>
                <div className="flex space-x-2">
                  <div className="w-1/3">
                    <label htmlFor="birthMonth" className="sr-only">Month</label>
                    <select
                      id="birthMonth"
                      name="birthMonth"
                      required={isSignUp}
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                    >
                      <option value="" disabled>Month</option>
                      {monthOptions.map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="birthDay" className="sr-only">Day</label>
                    <select
                      id="birthDay"
                      name="birthDay"
                      required={isSignUp}
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                    >
                      <option value="" disabled>Day</option>
                      {dayOptions.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="birthYear" className="sr-only">Year</label>
                    <select
                      id="birthYear"
                      name="birthYear"
                      required={isSignUp}
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                    >
                      <option value="" disabled>Year</option>
                      {yearOptions.map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-text">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-text">
              Password (min. 6 characters)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark-blue hover:bg-brand-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-brand-dark-blue bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-light-teal">
        <p className="text-brand-dark-blue text-xl">Loading...</p>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
} 