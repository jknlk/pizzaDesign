"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Track Order", href: "#track" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 lg:px-16"
      >
        <div
          className="mx-auto max-w-7xl flex items-center justify-between py-4 px-6 rounded-2xl mt-3 transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(8, 8, 8, 0.92)"
              : "rgba(8, 8, 8, 0.3)",
            backdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(255,255,255,0.03)",
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 bg-dominos-red rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-red-500/30 transition-shadow duration-300">
                <span className="text-white font-black text-lg leading-none">D</span>
              </div>
              <div className="absolute -inset-1 bg-dominos-red/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-white font-bold text-sm tracking-super hidden sm:block">
              DOMINO'S
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#order"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-dominos-red text-white text-sm font-semibold hover:bg-red-500 transition-colors duration-200 glow-red"
            >
              Order Now
            </a>
            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-40 mx-6 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8,8,8,0.96)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <ul className="flex flex-col p-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block px-4 py-3 text-white/70 hover:text-white text-base font-medium transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-white/5">
                <a
                  href="#order"
                  className="block px-4 py-3 text-dominos-red font-semibold text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  Order Now →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
