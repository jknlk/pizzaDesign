"use client";

import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pizzas = [
  {
    id: 1,
    label: "SIGNATURE",
    name: "Margherita Classica",
    desc: "San Marzano tomato, buffalo mozzarella DOP, fresh basil, extra virgin olive oil.",
    price: "$14.99",
    tag: "Bestseller",
    gradient: "from-amber-950/80 via-red-950/60 to-stone-950",
    accent: "#E31837",
    emoji: "🍕",
  },
  {
    id: 2,
    label: "INDULGENT",
    name: "Pepperoni Passion",
    desc: "Double-layered premium pepperoni, rich tomato sauce, aged mozzarella, honey drizzle.",
    price: "$17.99",
    tag: "Most Popular",
    gradient: "from-red-950/90 via-rose-950/70 to-stone-950",
    accent: "#E31837",
    emoji: "🔥",
  },
  {
    id: 3,
    label: "PREMIUM",
    name: "Truffle Mushroom",
    desc: "Black truffle shavings, wild mushroom medley, gruyère, caramelised onions, thyme.",
    price: "$22.99",
    tag: "Chef's Pick",
    gradient: "from-zinc-900/90 via-stone-900/70 to-zinc-950",
    accent: "#C9A84C",
    emoji: "✦",
  },
  {
    id: 4,
    label: "GOURMET",
    name: "Spicy Inferno",
    desc: "Nduja sausage, Calabrian chilli, roasted peppers, smoked mozzarella, fresh rocket.",
    price: "$18.99",
    tag: "New Arrival",
    gradient: "from-orange-950/80 via-red-950/70 to-stone-950",
    accent: "#F97316",
    emoji: "🌶",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: i * 0.1,
      ease: EASE,
    },
  }),
};

export default function MenuSection() {
  return (
    <section id="menu" className="relative py-32 md:py-48 bg-background">
      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(227,24,55,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 md:px-12 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-mono tracking-super text-gold mb-5 uppercase">
            Signature Collection
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none">
              Our finest
              <br />
              <span className="text-gradient-red">creations.</span>
            </h2>
            <a
              href="#order"
              className="self-start md:self-end flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
            >
              View full menu
              <span>→</span>
            </a>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pizzas.map((pizza, i) => (
            <motion.div
              key={pizza.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${pizza.gradient} border border-white/5 cursor-pointer group`}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span
                  className="text-[10px] font-mono tracking-wide px-2.5 py-1 rounded-full border"
                  style={{
                    color: pizza.accent,
                    borderColor: `${pizza.accent}30`,
                    background: `${pizza.accent}12`,
                  }}
                >
                  {pizza.tag}
                </span>
              </div>

              {/* Large emoji background */}
              <div className="absolute top-6 right-5 text-7xl opacity-[0.07] select-none pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-500">
                {pizza.emoji}
              </div>

              <div className="p-7 pt-8">
                {/* Label */}
                <p
                  className="text-[10px] font-mono tracking-super mb-3"
                  style={{ color: pizza.accent }}
                >
                  {pizza.label}
                </p>

                {/* Name */}
                <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-white/95 transition-colors">
                  {pizza.name}
                </h3>

                {/* Desc */}
                <p className="text-white/40 text-xs leading-relaxed mb-8 line-clamp-3">
                  {pizza.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-gold text-lg font-light tracking-wide">
                    {pizza.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-white transition-all duration-200"
                    style={{ background: pizza.accent }}
                  >
                    Order
                  </motion.button>
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${pizza.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
