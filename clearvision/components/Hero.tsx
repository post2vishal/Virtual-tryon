"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add("visible"), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* SVG geometric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Large outer circle (lens shape) */}
          <circle cx="720" cy="450" r="380" stroke="#3D9EA8" strokeWidth="0.5" strokeOpacity="0.15" />
          <circle cx="720" cy="450" r="280" stroke="#3D9EA8" strokeWidth="0.5" strokeOpacity="0.12" />
          <circle cx="720" cy="450" r="160" stroke="#3D9EA8" strokeWidth="0.5" strokeOpacity="0.1" />
          {/* Grid lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 80}
              x2="1440"
              y2={i * 80}
              stroke="#0D1B2A"
              strokeWidth="0.3"
              strokeOpacity="0.04"
            />
          ))}
          {Array.from({ length: 19 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 80}
              y1="0"
              x2={i * 80}
              y2="900"
              stroke="#0D1B2A"
              strokeWidth="0.3"
              strokeOpacity="0.04"
            />
          ))}
          {/* Accent arc */}
          <path
            d="M 300 450 Q 720 100 1140 450"
            stroke="#3D9EA8"
            strokeWidth="0.8"
            strokeOpacity="0.2"
            fill="none"
          />
          <path
            d="M 300 450 Q 720 800 1140 450"
            stroke="#3D9EA8"
            strokeWidth="0.8"
            strokeOpacity="0.2"
            fill="none"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        ref={ref}
        className="animate-on-scroll relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <p className="text-teal text-sm font-medium tracking-widest uppercase mb-6">
          ClearVision Eye Care
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-navy leading-tight mb-6">
          See the World
          <br />
          <span className="text-teal">Clearly</span>
        </h1>
        <p className="text-lg md:text-xl text-navy/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Comprehensive eye care for every stage of life. Expert optometrists.
          Personalized care.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-teal text-white font-medium text-base hover:bg-teal-dark transition-colors duration-200 shadow-lg shadow-teal/20"
          >
            Book Appointment
          </Link>
          <a
            href="#services"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-navy/20 text-navy font-medium text-base hover:border-navy/40 hover:bg-navy/5 transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest text-navy uppercase">Scroll</span>
        <div className="w-px h-8 bg-navy animate-bounce" />
      </div>
    </section>
  );
}
