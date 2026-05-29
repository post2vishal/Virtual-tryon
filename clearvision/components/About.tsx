"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "2,400+", label: "Patients Served" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 lg:py-32 bg-white" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className="animate-on-scroll grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <div>
            <p className="text-teal text-sm font-medium tracking-widest uppercase mb-3">Our Story</p>
            <h2 id="about-heading" className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
              Dedicated to Your Vision
            </h2>
            <div className="w-12 h-0.5 bg-teal mb-6" />
            <h3 className="font-serif text-xl font-semibold text-navy mb-3">
              Dr. Sarah Chen, OD
            </h3>
            <p className="text-navy/60 leading-relaxed mb-4">
              With over 15 years of experience in comprehensive optometry, Dr. Chen brings a rare combination
              of clinical expertise and genuine compassion to every patient interaction.
            </p>
            <p className="text-navy/60 leading-relaxed mb-8">
              Our mission is simple: to provide exceptional, personalized eye care that empowers our patients
              to see the world at its best. We believe that healthy vision is foundational to a full life,
              and we treat every appointment as an opportunity to make a meaningful difference.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-soft">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal">{stat.value}</p>
                  <p className="text-xs text-navy/50 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-teal/10 to-navy/10 border border-gray-soft overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3D9EA8" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="font-serif text-navy/40 text-lg">Dr. Sarah Chen, OD</p>
                <p className="text-sm text-navy/30 mt-1">Doctor of Optometry</p>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border-2 border-teal/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl border border-teal/15 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
