'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const therapists = [
  {
    name: 'Aminah',
    color: 'bg-emerald-700', // green
    img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Michelle',
    color: 'bg-sky-700', // blue
    img: 'https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Aminah',
    color: 'bg-amber-700', // orange
    img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export default function RecommendPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#214E3E] text-white relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-7xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          {/* Placeholder logo (crescent+heart) */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M97.7 268.2c-4.6-18.2-5.1-36.4-3.4-54.3 2.6-28.6 10.3-56 26.6-80.1 7.8-11.6 16-23.2 25.7-32.9 15.3-15.8 33.6-27.8 54.1-36.4 14-5.9 28.5-10.3 43.5-12.4 14.1-2 28.3-2.1 42.4.6 10.7 2.1 21.2 5.3 31.8 8 3 .8 5.9 1.7 8.9 2.6l-1.2 6c-19 3.9-37.7 7.3-55.8 13.1-8.7 2.8-17.3 6.1-25.4 10.1-20.1 9.6-37.9 22.4-52.7 38.6-18.8 20.3-30 43.9-33.5 71.4-3 23.3-.1 46.1 8.4 67.7 9.8 25.1 25.3 45.2 46.6 60.2 19.8 14 41 22.4 64.3 24.9 23 2.4 45.4-.3 66.7-10.4 18-8.5 33.8-20.4 47.4-35.1 9.5-10.2 17.8-21.5 24.4-34 2.2-4.2 4.2-8.6 6.7-13.7l5.9 2c-1.1 8.4-1.6 16.9-3.3 25.1-4.6 22.7-11.4 44.7-23 64.9-10.9 19.2-24.4 36-40.5 50.5-16.9 15.3-36 27.4-57.4 35.9-18.7 7.4-38 11.7-58.1 13.4-16.3 1.4-32.4.9-48.5-2.1-12.4-2.2-24.5-5.4-36.3-9.8-24.2-9-45.9-22.3-64.9-39.2-12.3-11-23-23.3-32.1-37.1-9.6-14.5-17.3-30.1-23-46.7-4.3-12.3-7.4-25-9.8-37.7z"
              fill="#54CEDB"
            />
            <path
              d="M310.1 286.9c-23.1-14.1-43.8-30.7-61.7-50.3-10.2-11-18.8-23.5-25.1-37.5-6.7-14.8-9.3-30.3-6.9-46.6 5.4-36.7 34.6-59.8 69.9-52.1 16.7 3.6 29.7 13.5 40 26.4 4.4 5.6 8.5 11.4 12.7 17.2 4-5.2 7.7-10.6 12.1-15.5 18.3-20.2 40.9-21.6 63.5-6 14 9.5 21.3 22.9 22.3 39.9.8 14.5-3.4 28-10.6 40.4-7.7 13.3-18 24.6-29.2 35-18.4 17.1-38.9 30.1-60.9 41.2-5.7 2.9-11.4 5.8-17.1 8.7z"
              fill="#54CEDB"
            />
          </svg>
          <span className="">betterhelp</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {['Business', 'About', 'Advice', 'FAQ', 'Reviews', 'Therapist jobs', 'Contact'].map((item) => (
            <Link key={item} href="#" className="hover:underline">
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Button variant="outline" className="border-white text-white px-4 py-1.5 rounded-full hover:bg-white/10">
            Login
          </Button>
          <Button className="bg-white text-[#214E3E] font-semibold px-4 py-1.5 rounded-full hover:bg-white/90">
            Get started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 py-16 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl leading-tight">
          We Recommend: Trauma and Psychiatric Treatment
        </h1>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {therapists.map((t) => (
            <div key={t.name} className="flex flex-col">
              <div className={`${t.color} rounded-t-2xl pt-4 text-lg font-semibold`}>{t.name}</div>
              <div className={`${t.color} rounded-b-2xl p-6 flex-1 flex flex-col items-center justify-between`}>
                <Image
                  src={t.img}
                  alt={`${t.name} portrait`}
                  width={180}
                  height={220}
                  className="rounded shadow-md object-cover"
                />
                {/* Decorative placeholder illustration or space */}
              </div>
              <div className="bg-white text-[#214E3E] py-4 font-medium text-center rounded-b-2xl">
                Blurb
              </div>
            </div>
          ))}
        </div>

        {/* Bottom blurb boxes for mobile */}
        <div className="md:hidden mt-8 space-y-4 w-full max-w-md">
          {therapists.map((t) => (
            <div key={t.name} className="bg-white text-[#214E3E] py-4 font-medium text-center rounded-xl">
              Blurb
            </div>
          ))}
        </div>
      </section>

      {/* Wave at bottom */}
      <svg
        viewBox="0 0 1440 120"
        className="absolute bottom-0 left-0 w-full h-auto text-[#F1F4ED]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 96l48-5.3C96 85 192 75 288 85.3 384 96 480 128 576 138.7 672 149 768 139 864 122.7 960 107 1056 85 1152 74.7 1248 64 1344 64 1392 64H1440v56H0z"
          fill="currentColor"
        />
      </svg>

      {/* HSA/FSA note */}
      <div className="absolute bottom-24 right-6 bg-transparent flex items-center gap-2 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="currentColor"
          className="text-white"
        >
          <path d="M9.00098 16.17L4.83098 12L3.41098 13.41L9.00098 19L21.001 6.99998L19.591 5.58998L9.00098 16.17Z" />
        </svg>
        <span>We accept HSA/FSA for individual and Teen therapy</span>
      </div>
    </div>
  );
} 