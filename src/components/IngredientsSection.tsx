"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
import { useRef } from "react";

const ingredients = [
  { name: "100% Real Mozzarella", origin: "Wisconsin, USA", icon: "●" },
  { name: "San Marzano Tomatoes", origin: "Campania, Italy", icon: "◆" },
  { name: "Hand-stretched Dough", origin: "Artisan Recipe", icon: "◈" },
  { name: "Premium Meats", origin: "Heritage Farms", icon: "▲" },
  { name: "Fresh Herbs", origin: "Local Gardens", icon: "◎" },
  { name: "Extra Virgin Olive Oil", origin: "Tuscany, Italy", icon: "◉" },
];

export default function IngredientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden bg-surface">

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gold radial */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 80%, rgba(201,168,76,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: copy */}
          <motion.div style={{ x: xLeft, opacity }}>
            <p className="text-xs font-mono tracking-super text-dominos-red mb-5 uppercase">
              Sourced with Purpose
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-none mb-8">
              Only the finest
              <br />
              <span className="text-gradient-gold">ingredients.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
              Every topping, every herb, every drop of olive oil is selected by our
              culinary team for peak freshness and flavour. We partner directly with
              farmers who share our obsession with quality.
            </p>

            {/* Quality badges */}
            <div className="flex flex-wrap gap-3">
              {["No Artificial Colours", "No Preservatives", "Locally Sourced", "Nut-free Options"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/8 text-white/50"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: ingredient list */}
          <motion.div style={{ x: xRight, opacity }} className="space-y-0">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className="flex items-center justify-between py-5 border-b border-white/5 group cursor-default"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gold text-sm w-4 text-center group-hover:scale-125 transition-transform duration-300">
                    {ing.icon}
                  </span>
                  <span className="text-white/85 text-sm font-medium group-hover:text-white transition-colors duration-200">
                    {ing.name}
                  </span>
                </div>
                <span className="text-xs text-white/25 font-mono tracking-wide group-hover:text-white/45 transition-colors duration-200">
                  {ing.origin}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
