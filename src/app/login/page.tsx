import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-light-teal flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-brand-dark-blue mb-8">Login</h1>
      <p className="text-brand-text mb-8 text-lg text-center max-w-md">
        [This is the Login page. You can add a login form here.]
      </p>
      <Link href="/" className="text-brand-teal hover:underline">
        Go back to Home
      </Link>
    </div>
  );
} 