// Landing page mock‑up for **Sukoon** – a virtual mental‑health platform tailored to Muslims.
// ------------------------------------------------------------------------------------------
// This React component is meant for a modern Next.js / Vite setup that already has:
// • shadcn/ui components (Button, Card)
// • TailwindCSS configured for utility‑first styling
// • lucide‑react icon pack for SVG icons
// • framer‑motion for simple entry animations
// Colour palette (also referenced in Tailwind classes):
//   teal     : #00897B  → primary accents & logo
//   gold     : #D4AF37  → secondary accent in logo
//   mint     : #E0F2F1  → background wash
//   charcoal : #263238  → primary text on coloured backgrounds

import { Button } from "@/components/ui/button";           // Reusable button component
import { Card, CardContent } from "@/components/ui/card";  // Card wrapper for service blocks
import { Moon, HeartHandshake, Users } from "lucide-react"; // Icons used in the "How Sukoon helps" section
import { motion } from "framer-motion";                    // Library for fade / slide animation

// We export a single functional component that renders the entire landing page.
export default function Landing() {
  return (
    // Root container – vertical flex to push footer to bottom when content is short.
    <div className="min-h-screen font-nunito bg-[#E0F2F1] text-[#263238] flex flex-col">

      {/* ------------------------------------------------ HEADER ------------------------------------------------ */}
      {/* The header stays at the top and contains logo, nav links (hidden on mobile), and a CTA button. */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo block */}
        <div className="flex items-center gap-2">
          {/* Crescent wrapping a heart – inline SVG keeps the component self‑contained. */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Crescent */}
            <path d="M12 2a9.5 9.5 0 1 0 5.962 16.91 7 7 0 1 1-5.962-11.82Z" fill="#00897B"/>
            {/* Heart */}
            <path d="M15.5 9.5c0 1.933-1.567 3.5-3.5 3.5S8.5 11.433 8.5 9.5 10.067 6 12 6s3.5 1.567 3.5 3.5Z" fill="#D4AF37"/>
          </svg>
          <span className="text-2xl font-semibold text-[#00897B]">Sukoon</span>
        </div>

        {/* Desktop nav (hidden on ≤md screens) */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#services" className="hover:text-[#00897B]">Services</a>
          <a href="#about" className="hover:text-[#00897B]">About</a>
          <a href="#faq" className="hover:text-[#00897B]">FAQ</a>
        </nav>

        {/* Primary CTA */}
        <Button size="sm" className="bg-[#00897B] hover:bg-[#00756A]">Get started</Button>
      </header>

      {/* ------------------------------------------------ HERO -------------------------------------------------- */}
      {/* Two‑column layout: persuasive copy + illustrative image. */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
        {/* Left column – headline, sub, CTA */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Peace of mind, <span className="text-[#00897B]">guided by faith</span>.
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Confidential virtual therapy & psychiatric care from licensed Muslim clinicians who understand your values.
          </p>
          <Button size="lg" className="bg-[#00897B] hover:bg-[#00756A] text-base px-8">Start your journey</Button>
        </div>

        {/* Right column – stock photo with a subtle fade‑in animation */}
        <motion.img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=60"
          alt="Muslim woman smiling"
          className="rounded-2xl shadow-md object-cover w-full h-80"
          initial={{ opacity: 0, y: 20 }}  // Off‑screen + transparent
          animate={{ opacity: 1, y: 0 }}  // Fade + slide up when in view
          transition={{ duration: 0.6 }}   // Smooth 0.6‑second animation
        />
      </main>

      {/* ------------------------------------------- SERVICES SECTION ------------------------------------------- */}
      <section id="services" className="bg-white w-full py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">How Sukoon helps</h2>

          {/* 3 responsive cards – Tailwind grid handles wrapping on small screens. */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 – Therapy */}
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <Moon className="w-10 h-10 text-[#00897B]" />
                <h3 className="text-xl font-semibold">Faith‑aligned Therapy</h3>
                <p className="text-gray-600 text-sm">Culturally competent therapists incorporate Islamic values into evidence‑based care.</p>
              </CardContent>
            </Card>

            {/* Card 2 – Psychiatry */}
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <HeartHandshake className="w-10 h-10 text-[#00897B]" />
                <h3 className="text-xl font-semibold">Medication & Psychiatry</h3>
                <p className="text-gray-600 text-sm">Board‑certified Muslim psychiatrists provide evaluations and ongoing medication management.</p>
              </CardContent>
            </Card>

            {/* Card 3 – Community */}
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <Users className="w-10 h-10 text-[#00897B]" />
                <h3 className="text-xl font-semibold">Community Support</h3>
                <p className="text-gray-600 text-sm">Weekly virtual halaqas & support groups foster connection and shared growth.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- CTA STRIP ------------------------------------------------- */}
      <section className="w-full bg-[#00897B] text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to find Sukoon?</h2>
        <Button size="lg" className="bg-white text-[#00897B] hover:bg-gray-100 px-10">Get matched with a therapist</Button>
      </section>

      {/* -------------------------------------------- FOOTER ---------------------------------------------------- */}
      <footer className="bg-[#263238] text-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          {/* Column 1 – branding */}
          <div>
            <h4 className="font-semibold mb-3">Sukoon</h4>
            {/* Date object ensures copyright stays current without manual changes */}
            <p className="opacity-75">© {new Date().getFullYear()} Sukoon Health, Inc.</p>
          </div>

          {/* Column 2 – quick links */}
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3 – social */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">X / Twitter</a></li>
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
