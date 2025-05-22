'use client';

import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  title: string;
  img: string;
  href: string;
};

const CardButton = ({ title, img, href }: CardProps) => {
  return (
    <Link 
      href={href}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-xs"
    >
      <Image src={img} alt={title} width={80} height={80} className="mb-4" />
      <h3 className="text-lg font-semibold text-[#002D62]">{title}</h3>
    </Link>
  );
};

export default function HeroSection() {
  const cards = [
    { title: 'Individual', img: '/img/individual.svg', href: '/individual' },
    { title: 'Couples', img: '/img/couples.svg', href: '/couples' },
    { title: 'Family', img: '/img/family.svg', href: '/family' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center text-center bg-[#E6F7FB] pt-24 pb-40">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
          Peace of mind, <span className="text-[#28CCE0]">guided by faith.</span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-[#002D62]">
          Confidential virtual therapy & psychiatric care from licensed Muslim clinicians.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          {cards.map((card) => (
            <CardButton key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
} 