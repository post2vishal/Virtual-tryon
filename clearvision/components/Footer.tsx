import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-xl font-bold text-white mb-2">ClearVision</p>
            <p className="text-sm leading-relaxed text-white/50">
              Expert eye care for every stage of life. Personalized, compassionate, comprehensive.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">Quick Links</p>
            <ul className="space-y-2 text-sm">
              {[
                ["About", "/#about"],
                ["Services", "/#services"],
                ["Book Appointment", "/book"],
                ["Privacy Policy", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-teal transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">Follow Us</p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white/50 hover:text-teal transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-white/50 hover:text-teal transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Google */}
              <a href="#" aria-label="Google" className="text-white/50 hover:text-teal transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
                  <path d="M12 12h8" />
                  <path d="M16 8l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/30 text-center">
          © 2026 ClearVision Eye Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
