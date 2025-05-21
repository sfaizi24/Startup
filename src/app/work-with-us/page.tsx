import Link from 'next/link';

export default function WorkWithUsPage() {
  return (
    <div className="min-h-screen bg-brand-light-teal flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-brand-dark-blue mb-8">Work With Us</h1>
      <p className="text-brand-text mb-8 text-lg text-center max-w-md">
        [This is the Work With Us page. You can add information about joining your team or partnership opportunities here.]
      </p>
      <Link href="/" className="text-brand-teal hover:underline">
        Go back to Home
      </Link>
    </div>
  );
} 