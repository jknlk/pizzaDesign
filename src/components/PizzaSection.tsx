"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Pizza data ───────────────────────────────────────────────────────────────

interface Pizza {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  bgRGB: [number, number, number];
  bg: string;
  accent: string;
  ingredients: string[];
  image: string;
}

const PIZZAS: Pizza[] = [
  {
    id: "margherita",
    name: "MARGHERITA",
    tagline: "The Italian Classic",
    desc: "San Marzano tomatoes, buffalo mozzarella DOP, fresh basil leaves and a golden drizzle of Sicilian extra-virgin olive oil. Simple. Perfect.",
    bg: "#1B3A1C",
    bgRGB: [27, 58, 28],
    accent: "#7DC67E",
    ingredients: ["MOZZARELLA", "BASIL", "TOMATOES", "OLIVE OIL"],
    image: "/variety/Download_Transparent_Background_Isolated_Pizza_for_free-removebg-preview.png",
  },
  {
    id: "pepperoni",
    name: "PEPPERONI",
    tagline: "The American Legend",
    desc: "Double-layered premium pepperoni, aged mozzarella, rich slow-cooked tomato base, finished with a drizzle of honey and scattered chilli flakes.",
    bg: "#3D0C10",
    bgRGB: [61, 12, 16],
    accent: "#FF6B6B",
    ingredients: ["PEPPERONI", "MOZZARELLA", "CHILLI", "HONEY"],
    image: "/variety/Pizza_Pepperoni_Tomatoes_Cheese_Herbs_Stock_Photo___Adobe_Stock-removebg-preview.png",
  },
  {
    id: "bbq-chicken",
    name: "BBQ CHICKEN",
    tagline: "The Smoky Signature",
    desc: "Tender pulled chicken, smoky BBQ sauce, caramelised onions, red pepper strips and smoked cheddar melted over a golden artisan crust.",
    bg: "#2A1808",
    bgRGB: [42, 24, 8],
    accent: "#E8872A",
    ingredients: ["CHICKEN", "BBQ SAUCE", "CHEDDAR", "ONIONS"],
    image: "/variety/BQ_Chicken_Pizza_Delight___-removebg-preview.png",
  },
  {
    id: "veggie-supreme",
    name: "VEGGIE SUPREME",
    tagline: "The Garden Harvest",
    desc: "Roasted bell peppers, wild mushrooms, artichoke hearts, black olives and spinach on a herbed ricotta base. Garden-fresh every time.",
    bg: "#0A2E1A",
    bgRGB: [10, 46, 26],
    accent: "#52B788",
    ingredients: ["MUSHROOMS", "PEPPERS", "ARTICHOKE", "RICOTTA"],
    image: "/variety/Menu-removebg-preview.png",
  },
  {
    id: "truffle",
    name: "TRUFFLE BLISS",
    tagline: "The Indulgent One",
    desc: "Black truffle shavings, wild mushroom medley, aged gruyère, caramelised onions and fresh thyme. The ultimate luxe pizza experience.",
    bg: "#0E0E1A",
    bgRGB: [14, 14, 26],
    accent: "#C9A84C",
    ingredients: ["TRUFFLE", "MUSHROOMS", "GRUYÈRE", "THYME"],
    image: "/variety/truffle-mushroom-pizza.png",
  },
];

// Radial positions for the 4 ingredient labels (degrees, clockwise from top)
const LABEL_ANGLES = [330, 50, 130, 220];
const LABEL_RADIUS = 230; // px from pizza center
const PIZZA_SIZE = 380;   // px

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerpColor(
  c1: [number, number, number],
  c2: [number, number, number],
  t: number
): string {
  return `rgb(${Math.round(c1[0] + (c2[0] - c1[0]) * t)},${Math.round(
    c1[1] + (c2[1] - c1[1]) * t
  )},${Math.round(c1[2] + (c2[2] - c1[2]) * t)})`;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PizzaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentIdxRef = useRef(0);

  const scrollToPizza = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const totalScroll = container.offsetHeight - window.innerHeight;
    const target = containerTop + (index / (PIZZAS.length - 1)) * totalScroll;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate(self) {
        const exactIdx = self.progress * (PIZZAS.length - 1);
        const loIdx = Math.floor(exactIdx);
        const hiIdx = Math.min(loIdx + 1, PIZZAS.length - 1);
        const t = exactIdx - loIdx;

        // Smooth background colour blend
        if (bgRef.current) {
          bgRef.current.style.background = lerpColor(
            PIZZAS[loIdx].bgRGB,
            PIZZAS[hiIdx].bgRGB,
            t
          );
        }

        // Crossfade slides
        slideRefs.current.forEach((el, i) => {
          if (!el) return;
          if (i === loIdx) el.style.opacity = String(1 - t);
          else if (i === hiIdx) el.style.opacity = String(t);
          else el.style.opacity = "0";
        });

        // Discrete index for nav/dots (limited re-renders)
        const newIdx = Math.round(exactIdx);
        if (newIdx !== currentIdxRef.current) {
          currentIdxRef.current = newIdx;
          setCurrentIdx(newIdx);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  const WRAPPER = PIZZA_SIZE + LABEL_RADIUS * 2 + 80;

  return (
    <section
      ref={containerRef}
      style={{ height: `${PIZZAS.length * 120}vh` }}
      className="relative"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* GSAP-driven background colour */}
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{ background: PIZZAS[0].bg }}
        />

        {/* Radial depth vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* ── Pizza slides (stacked, opacity driven by GSAP) ── */}
        {PIZZAS.map((pizza, i) => (
          <div
            key={pizza.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 z-20"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* ── Title + description ── */}
            <div className="absolute top-0 inset-x-0 flex flex-col items-center pt-14 md:pt-16 px-6 text-center z-30 pointer-events-none">
              <p
                className="text-[10px] font-mono tracking-super uppercase mb-2"
                style={{ color: pizza.accent }}
              >
                {pizza.tagline}
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
                {pizza.name}
              </h2>
              <p className="mt-3 text-sm text-white/55 max-w-xl truncate">
                {pizza.desc}
              </p>
            </div>

            {/* ── Pizza image + radial labels ── */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ paddingTop: 80 }}
            >
              {/* Wrapper sized to hold pizza + labels */}
              <div
                className="relative"
                style={{ width: WRAPPER, height: WRAPPER }}
              >
                {/* Dashed connecting lines SVG */}
                <svg
                  className="absolute inset-0 pointer-events-none"
                  width={WRAPPER}
                  height={WRAPPER}
                >
                  {pizza.ingredients.map((_, j) => {
                    const cx = WRAPPER / 2;
                    const cy = WRAPPER / 2;
                    const rad = ((LABEL_ANGLES[j] - 90) * Math.PI) / 180;
                    const inner = PIZZA_SIZE / 2 + 10;
                    const outer = LABEL_RADIUS - 28;
                    return (
                      <line
                        key={j}
                        x1={cx + Math.cos(rad) * inner}
                        y1={cy + Math.sin(rad) * inner}
                        x2={cx + Math.cos(rad) * outer}
                        y2={cy + Math.sin(rad) * outer}
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="1"
                        strokeDasharray="3 6"
                      />
                    );
                  })}
                </svg>

                {/* ── Pizza photo ── */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: PIZZA_SIZE,
                    height: PIZZA_SIZE,
                    filter: "drop-shadow(0 28px 60px rgba(0,0,0,0.65))",
                  }}
                >
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    className="object-contain"
                    sizes={`${PIZZA_SIZE}px`}
                    priority={i < 3}
                  />
                </div>

                {/* ── Ingredient labels ── */}
                {pizza.ingredients.map((ing, j) => {
                  const rad = ((LABEL_ANGLES[j] - 90) * Math.PI) / 180;
                  const lx = Math.cos(rad) * LABEL_RADIUS;
                  const ly = Math.sin(rad) * LABEL_RADIUS;

                  return (
                    <div
                      key={j}
                      suppressHydrationWarning
                      className="absolute flex flex-col items-center gap-1.5 pointer-events-none"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(calc(-50% + ${lx}px), calc(-50% + ${ly}px))`,
                      }}
                    >
                      {/* Glowing dot */}
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: pizza.accent,
                          boxShadow: `0 0 10px ${pizza.accent}`,
                        }}
                      />
                      {/* Label */}
                      <span
                        className="text-[10px] md:text-[11px] font-mono tracking-super font-semibold whitespace-nowrap"
                        style={{ color: pizza.accent }}
                      >
                        {ing}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* ── Left arrow ── */}
        <button
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/8 transition-all duration-200 disabled:opacity-20 disabled:cursor-default"
          onClick={() => scrollToPizza(currentIdx - 1)}
          disabled={currentIdx === 0}
          aria-label="Previous"
        >
          ←
        </button>

        {/* ── Right arrow ── */}
        <button
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/8 transition-all duration-200 disabled:opacity-20 disabled:cursor-default"
          onClick={() => scrollToPizza(currentIdx + 1)}
          disabled={currentIdx === PIZZAS.length - 1}
          aria-label="Next"
        >
          →
        </button>

        {/* ── Dot progress indicators ── */}
        <div className="absolute bottom-8 inset-x-0 flex items-center justify-center gap-2.5 z-40">
          {PIZZAS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => scrollToPizza(i)}
              aria-label={`Go to ${p.name}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === currentIdx ? 28 : 8,
                height: 8,
                background:
                  i === currentIdx
                    ? PIZZAS[currentIdx].accent
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* ── Counter top-right ── */}
        <div className="absolute top-6 right-8 md:right-12 z-40 pointer-events-none">
          <span className="text-[11px] font-mono text-white/30 tabular-nums">
            {String(currentIdx + 1).padStart(2, "0")}
            <span className="text-white/15"> / {String(PIZZAS.length).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
