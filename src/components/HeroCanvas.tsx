"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 36;
const SCROLL_MULTIPLIER = 8; // 800vh for ultra-smooth animation

function framePath(index: number): string {
  const n = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${n}.jpg`;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  /* Framer Motion scroll for overlay text parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const revealTextOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const revealTextY = useTransform(scrollYProgress, [0.7, 0.85], [40, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    /* ── Image preloader ── */
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[index];
      if (!img?.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const ox = (cw - iw * scale) / 2;
      const oy = (ch - ih * scale) / 2;

      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, ox, oy, iw * scale, ih * scale);
    }

    function onImageLoad(i: number) {
      loadedCount++;
      const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadProgress(pct);

      if (i === 0) drawFrame(0); // show first frame ASAP
      if (loadedCount === TOTAL_FRAMES) {
        setLoaded(true);
        ScrollTrigger.refresh();
      }
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => onImageLoad(i);
      img.onerror = () => onImageLoad(i); // still count on error
      images[i] = img;
    }
    imagesRef.current = images;

    /* ── Canvas resize ── */
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    /* ── GSAP ScrollTrigger ── */
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate(self) {
        const idx = Math.min(
          TOTAL_FRAMES - 1,
          Math.round(self.progress * (TOTAL_FRAMES - 1))
        );
        if (idx !== currentFrameRef.current) {
          currentFrameRef.current = idx;
          drawFrame(idx);
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      className="relative"
      aria-label="Hero pizza animation"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Dark vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(8,8,8,0.65) 100%)",
          }}
        />

        {/* Bottom gradient for text legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 100%)",
          }}
        />

        {/* Top gradient */}
        <div
          className="absolute inset-x-0 top-0 h-36 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, transparent 100%)",
          }}
        />

        {/* ── Loading overlay ── */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-20">
            <div className="flex flex-col items-center gap-6">
              <DominosLogo size={56} />
              <div className="w-48 h-px bg-white/10 overflow-hidden rounded-full">
                <div
                  className="h-full bg-dominos-red transition-all duration-300 rounded-full"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-xs tracking-super text-muted font-mono">
                {loadProgress}%
              </span>
            </div>
          </div>
        )}

        {/* ── Initial hero text (fades out on scroll) ── */}
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="absolute inset-x-0 bottom-20 px-8 md:px-16 lg:px-24 pointer-events-none"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-mono tracking-super text-dominos-red mb-4 uppercase">
              Premium Experience
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight">
              Crafted.
              <br />
              <span className="text-gradient-gold">Delivered.</span>
              <br />
              Perfected.
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-md leading-relaxed">
              Scroll to experience the art of pizza making.
            </p>
          </div>
        </motion.div>

        {/* ── Reveal text (appears at end of animation) ── */}
        <motion.div
          style={{ opacity: revealTextOpacity, y: revealTextY }}
          className="absolute inset-x-0 bottom-20 px-8 md:px-16 lg:px-24 pointer-events-none"
        >
          <div className="max-w-xl">
            <p className="text-xs font-mono tracking-super text-gold mb-4 uppercase">
              Your order awaits
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Taste the
              <br />
              <span className="text-gradient-red">difference.</span>
            </h2>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono tracking-super text-white/40 rotate-90 origin-center mb-4">
            SCROLL
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>

        {/* ── Frame counter (subtle, bottom right) ── */}
        <FrameCounter scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

/* Mini frame counter */
function FrameCounter({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const frame = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  const label = useTransform(frame, (v) => String(Math.round(v)).padStart(2, "0"));
  return (
    <motion.div
      className="absolute bottom-8 left-8 md:left-16 pointer-events-none"
      style={{ opacity }}
    >
      <motion.span className="text-[10px] font-mono text-white/25 tabular-nums">
        <motion.span>{label}</motion.span>
        {" / "}
        {String(TOTAL_FRAMES).padStart(2, "0")}
      </motion.span>
    </motion.div>
  );
}

/* Dominos D logo SVG */
function DominosLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="8" fill="#E31837" />
      <text x="30" y="42" fontSize="28" fontWeight="900" fill="white" textAnchor="middle" fontFamily="Arial Black, sans-serif">D</text>
    </svg>
  );
}
