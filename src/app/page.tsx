'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, HeartHandshake, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen font-nunito bg-[#E0F2F1] text-[#263238] flex flex-col">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2a9.5 9.5 0 1 0 5.962 16.91 7 7 0 1 1-5.962-11.82Z" fill="#00897B" />
            <path d="M15.5 9.5c0 1.933-1.567 3.5-3.5 3.5S8.5 11.433 8.5 9.5 10.067 6 12 6s3.5 1.567 3.5 3.5Z" fill="#D4AF37" />
          </svg>
          <span className="text-2xl font-semibold text-[#00897B]">Sukoon</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#services" className="hover:text-[#00897B]">Services</a>
          <a href="#about" className="hover:text-[#00897B]">About</a>
          <a href="#faq" className="hover:text-[#00897B]">FAQ</a>
        </nav>
        <Button size="sm" className="bg-[#00897B] hover:bg-[#00756A]">Get started</Button>
      </header>

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-24">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Peace of mind, <span className="text-[#00897B]">guided by faith</span>.
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Confidential virtual therapy &amp; psychiatric care from licensed Muslim clinicians who understand your values.
          </p>
          <Button size="lg" className="bg-[#00897B] hover:bg-[#00756A] px-8">Start your journey</Button>
        </div>

        <motion.img
          src="https://media.npr.org/assets/img/2015/07/26/afgrl_2_custom-109049c492b6d26b0e4b38d12f78dec39b7dea79.jpg?s=800&c=85&f=webp"
          alt="Muslim woman smiling"
          className="rounded-2xl shadow-md object-cover w-full h-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
      </main>

      {/* ─── Services ──────────────────────────────────────────── */}
      <section id="services" className="bg-white w-full py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">How Sukoon helps</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <Moon className="w-10 h-10 text-[#00897B]" />
                <h3 className="text-xl font-semibold">Faith‑forward counselling</h3>
                <p className="text-gray-600 text-sm text-center">
                  Islamic scholars provide faith-building counselling sessions
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <HeartHandshake className="w-10 h-10 text-[#00897B]" />
                <h3 className="text-xl font-semibold">Medication &amp; Psychiatry</h3>
                <p className="text-gray-600 text-sm text-center">
                  Board‑certified Muslim psychiatrists for evaluations and meds.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <Users className="w-10 h-10 text-[#00897B]" />
                <h3 className="text-xl font-semibold">Faith‑aligned Therapy</h3>
                <p className="text-gray-600 text-sm text-center">
                Muslim Therapists provide evidence‑based care with a personal islamic touch
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── CTA Strip ─────────────────────────────────────────── */}
      <section className="w-full bg-[#00897B] text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to find Sukoon?</h2>
        <Button size="lg" className="bg-white text-[#00897B] hover:bg-gray-100 px-10">
          Get matched with a therapist
        </Button>
      </section>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <footer className="bg-[#263238] text-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-3">Sukoon</h4>
            <p className="opacity-75">© {new Date().getFullYear()} Sukoon Health, Inc.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
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
