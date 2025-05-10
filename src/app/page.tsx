'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, HeartHandshake, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen font-nunito bg-[#e7fff5] text-[#012d52] flex flex-col">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="175" height="175" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path fill="#54CEDB" opacity="1.000000" stroke="none" 
              d="M97.715454,268.247528 C93.147690,250.085556 92.686028,231.860336 94.317398,213.937729 
              C96.918060,185.366302 104.638252,157.952301 120.889183,133.808990 
              C128.705200,122.197098 136.891785,110.562546 146.566864,100.536583 
              C161.844543,84.704842 180.045166,72.616020 200.573227,64.097954 
              C214.574844,58.288013 228.975494,54.020245 243.936691,52.360844 
              C258.065430,50.793777 272.444550,50.602261 286.438690,53.439301 
              C298.291779,55.842281 309.845947,59.719776 321.532379,62.944752 
              C321.434326,63.520821 321.336243,64.096886 321.238159,64.672958 
              C313.792542,66.150368 306.226471,67.193077 298.931732,69.214905 
              C289.751831,71.759232 280.528076,74.484200 271.793396,78.228104 
              C251.393097,86.972176 233.949524,100.076996 219.005829,116.457390 
              C200.819351,136.392303 189.069427,159.624481 185.374557,186.385208 
              C182.068207,210.332092 185.373856,233.455124 196.060684,255.505676 
              C208.330246,280.821960 227.137222,299.296875 252.162643,311.743469 
              C274.010376,322.609589 297.368073,326.004211 321.266357,323.755463 
              C345.646240,321.461365 367.417236,311.660980 386.927734,296.781250 
              C400.751678,286.238403 412.962677,274.200836 422.515686,259.641174 
              C425.878815,254.515472 428.648834,249.001053 431.701782,243.671066 
              C432.381683,242.484116 433.112793,241.326523 433.820343,240.155411 
              C434.454651,240.309402 435.088959,240.463394 435.723267,240.617386 
              C434.671356,248.652237 434.225739,256.823792 432.451141,264.695709 
              C427.588776,286.265045 420.424408,306.991821 408.133423,325.660950 
              C396.080933,343.967834 381.395081,359.733673 363.899963,372.969269 
              C343.760406,388.205536 321.270691,398.297028 296.675171,403.430389 
              C277.293457,407.475555 257.785400,407.679108 238.103516,404.285767 
              C222.611130,401.614777 208.140854,396.513855 193.843277,390.251160 
              C171.234344,380.347931 152.506729,365.584412 136.490448,346.984131 
              C123.165787,331.509705 112.508987,314.445496 105.414742,295.341248 
              C102.205452,286.698883 100.344437,277.555878 97.715454,268.247528 z"/>
            <path fill="#54CEDB" opacity="1.000000" stroke="none" 
              d="M310.148132,286.899170 C287.071411,272.814514 266.408386,256.217529 248.420715,236.570587 
              C238.225159,225.434570 230.017197,212.915894 226.664856,197.570023 
              C220.595612,169.786972 239.144012,143.097412 264.984558,137.088501 
              C280.218018,133.546143 292.995422,138.831863 304.159760,148.806763 
              C308.570740,152.747772 312.415039,157.323013 316.256470,161.336868 
              C320.529968,156.949707 324.460480,152.253311 329.047028,148.322388 
              C347.358643,132.628326 368.322449,131.974411 387.810150,146.793243 
              C402.549530,158.001343 407.430756,172.907959 406.872192,190.141861 
              C406.320709,207.156799 397.742340,220.774124 386.692383,233.194763 
              C368.858704,253.240646 348.299438,270.008026 325.945374,284.660522 
              C321.294373,287.709106 316.582672,292.464264 310.148132,286.899170 z"/>
          </svg>
          <span className="text-7xl font-semibold text-[#012d52]">Sukoon</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#services" className="hover:text-[#012d52]">Services</a>
          <a href="#about" className="hover:text-[#012d52]">About</a>
          <a href="#faq" className="hover:text-[#012d52]">FAQ</a>
        </nav>
        <Button size="sm" className="bg-[#00897B] hover:bg-[#012d52]">Get started</Button>
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
