"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Investors"],
  "Food & Deals": ["Full Menu", "Deals & Coupons", "Nutrition Info", "Allergens"],
  Support: ["Track Order", "Help Center", "Gift Cards", "Franchise"],
};

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Top fade */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(227,24,55,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-dominos-red rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">D</span>
              </div>
              <span className="text-white font-bold tracking-super text-sm">DOMINO'S</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-8">
              Crafting perfect pizzas since 1960. Delivered fresh, always on time.
              Because life's too short for average pizza.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {["𝕏", "in", "f", "◉"].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/35 hover:text-white hover:border-white/20 text-sm transition-colors duration-200"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[10px] font-mono tracking-super text-white/30 mb-5 uppercase">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © 2026 Domino's Pizza, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
              <a key={item} href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
