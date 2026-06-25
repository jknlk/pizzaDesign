"use client";

import { motion, type Variants, type Transition } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pillars = [
  {
    icon: "◈",
    label: "INGREDIENTS",
    title: "Farm-fresh, every time",
    desc: "Vine-ripened San Marzano tomatoes, 100% real mozzarella, and hand-picked herbs. No shortcuts, ever.",
    accent: "#E31837",
  },
  {
    icon: "◉",
    label: "TECHNIQUE",
    title: "Hand-stretched perfection",
    desc: "Our dough is crafted daily, slow-fermented for 24 hours, and hand-stretched to order by our artisan team.",
    accent: "#C9A84C",
  },
  {
    icon: "◎",
    label: "DELIVERY",
    title: "30 minutes or it's on us",
    desc: "Our proprietary routing algorithm and fleet of drivers ensure your pizza arrives piping hot, every single time.",
    accent: "#006491",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } as Transition },
};

export default function ArtistrySection() {
  return (
    <section className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Background accent lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 md:px-12 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-20 md:mb-28"
        >
          <p className="text-xs font-mono tracking-super text-dominos-red mb-5 uppercase">
            The Philosophy
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none max-w-2xl">
              Where craft meets
              <span className="text-gradient-gold"> craving.</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg max-w-sm leading-relaxed">
              Three principles guide every pizza we make. Because good isn't good enough.
            </p>
          </div>
        </motion.div>

        {/* Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.label}
              variants={itemVariants}
              className="relative p-10 md:p-12 bg-surface group hover:bg-surface-2 transition-colors duration-500"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 inset-x-0 h-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${pillar.accent}, transparent)` }}
              />

              <div
                className="text-3xl mb-8 transition-transform duration-500 group-hover:scale-110 inline-block"
                style={{ color: pillar.accent }}
              >
                {pillar.icon}
              </div>

              <p className="text-[10px] font-mono tracking-super mb-3" style={{ color: pillar.accent }}>
                {pillar.label}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {pillar.desc}
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs text-white/25 group-hover:text-white/50 transition-colors duration-300">
                <span>Learn more</span>
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider stat row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/5"
        >
          {[
            { value: "1960", label: "Year founded" },
            { value: "90+", label: "Countries served" },
            { value: "3B+", label: "Pizzas per year" },
            { value: "30min", label: "Or it's free" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-white/35 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
