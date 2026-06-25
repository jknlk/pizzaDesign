"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function OrderCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="order" ref={ref} className="relative py-24 md:py-40 bg-background overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(227,24,55,0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ scale, opacity }}
        className="relative max-w-5xl mx-auto px-8 md:px-12"
      >
        <div
          className="relative overflow-hidden rounded-3xl p-12 md:p-20"
          style={{
            background: "linear-gradient(135deg, #1a0a0d 0%, #111 40%, #0a0a0f 100%)",
            border: "1px solid rgba(227,24,55,0.15)",
            boxShadow: "0 40px 120px rgba(227,24,55,0.15), 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(227,24,55,0.15) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-xs font-mono tracking-super text-dominos-red mb-4 uppercase"
              >
                Ready to order?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Your next craving
                <br />
                is one tap{" "}
                <span className="text-gradient-red">away.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-4 text-white/40 text-base leading-relaxed"
              >
                Free delivery on orders over $20. Track your pizza in real-time.
                <br />30 minutes guaranteed — or your next order is free.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-col gap-4 min-w-[180px]"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-dominos-red text-white font-semibold text-base glow-red transition-all duration-200"
              >
                Order Now
                <span className="text-lg">→</span>
              </motion.a>
              <motion.a
                href="#menu"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center px-8 py-4 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-200"
              >
                View Menu
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
