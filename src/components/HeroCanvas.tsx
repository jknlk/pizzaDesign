"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 36;
const SCROLL_MULTIPLIER = 8; // 800vh — ultra-smooth 60fps feel

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
  const textRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    /* ── Draw a single frame, cover-fitted to canvas ── */
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

    /* ── Preload all 36 frames ── */
    function onLoad(i: number) {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (i === 0) drawFrame(0); // show frame 1 immediately
      if (loadedCount === TOTAL_FRAMES) {
        setLoaded(true);
        ScrollTrigger.refresh();
      }
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => onLoad(i);
      img.onerror = () => onLoad(i);
      images[i] = img;
    }
    imagesRef.current = images;

    /* ── Resize canvas to fill viewport ── */
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    }
    resize();
    window.addEventListener("resize", resize);

    /* ── Fade out PI/ZA text as soon as scroll starts ── */
    gsap.to(textRef.current, {
      opacity: 0,
      ease: "power1.in",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "top+=200 top",
        scrub: true,
      },
    });

    /* ── GSAP ScrollTrigger drives the frame index ── */
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5, // tight scrub = very responsive to scroll speed
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
      window.removeEventListener("resize", resize);
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      className="relative"
      aria-label="Domino's pizza box opening animation"
    >
      {/* ── Sticky full-viewport canvas ── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "#080808" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* ── "PI ZA" split text — fades out on first scroll ── */}
        <div
          ref={textRef}
          className="absolute inset-0 pointer-events-none select-none"
          style={{ zIndex: 2 }}
        >
          {/* PI — left anchor */}
          <span
            style={{
              position: "absolute",
              left: "8vw",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "clamp(56px, 13vw, 190px)",
              fontWeight: 900,
              fontFamily: "'Arial Black', Impact, sans-serif",
              letterSpacing: "-0.02em",
              color: "#FFAA6E",
              lineHeight: 1,
            }}
          >
            PI
          </span>

          {/* ZA — right edge where pizza ends */}
          <span
            style={{
              position: "absolute",
              right: "3vw",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "clamp(56px, 13vw, 190px)",
              fontWeight: 900,
              fontFamily: "'Arial Black', Impact, sans-serif",
              letterSpacing: "-0.02em",
              color: "#FFAA6E",
              lineHeight: 1,
            }}
          >
            ZA
          </span>
        </div>

        {/* ── Loading screen ── */}
        {!loaded && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ background: "#080808" }}
          >
            <div className="flex flex-col items-center gap-8">
              {/* Dominos D mark */}
              <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                <rect width="60" height="60" rx="10" fill="#E31837" />
                <text
                  x="30" y="43"
                  fontSize="30" fontWeight="900"
                  fill="white" textAnchor="middle"
                  fontFamily="Arial Black, sans-serif"
                >D</text>
              </svg>

              {/* Progress bar */}
              <div className="w-48 h-[1px] bg-white/10 overflow-hidden rounded-full">
                <div
                  className="h-full bg-white transition-all duration-300 rounded-full"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>

              <span
                className="text-[11px] font-mono tracking-widest tabular-nums"
                style={{ color: "#555" }}
              >
                {loadProgress}%
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
