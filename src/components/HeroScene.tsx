import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * Abstract AI environment for the hero:
 * flowing light, glass ribbons, gradient waves, soft particles.
 * Mouse-aware camera drift (very subtle).
 * Pure CSS/SVG — GPU friendly, no WebGL.
 */
export function HeroScene() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.8 });
  const tx = useTransform(sx, (v) => v * 12);
  const ty = useTransform(sy, (v) => v * 12);
  const rx = useTransform(sy, (v) => v * -3);
  const ry = useTransform(sx, (v) => v * 3);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let pending: { x: number; y: number } | null = null;
    const flush = () => {
      raf = 0;
      if (!pending || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set((pending.x - (r.left + r.width / 2)) / r.width);
      my.set((pending.y - (r.top + r.height / 2)) / r.height);
      pending = null;
    };
    const handle = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(flush);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden noise"
      aria-hidden
    >
      {/* Base mesh */}
      <div className="absolute inset-0 bg-mesh" />

      {/* Large blurred orbs */}
      <motion.div
        style={{ x: tx, y: ty }}
        className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.72 0.19 155 / 0.55), transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ x: useTransform(tx, (v) => -v), y: useTransform(ty, (v) => -v) }}
        className="absolute -right-32 top-0 h-[560px] w-[560px] rounded-full opacity-70 blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, oklch(0.62 0.18 245 / 0.55), transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ x: tx, y: ty }}
        className="absolute bottom-[-200px] left-1/3 h-[480px] w-[720px] rounded-full opacity-50 blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.68 0.2 195 / 0.45), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Glass ribbons */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        className="absolute inset-0 [perspective:1200px]"
      >
        <motion.svg
          viewBox="0 0 1200 900"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.6 }}
        >
          <defs>
            <linearGradient id="ribbon" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.18 245 / 0)" />
              <stop offset="50%" stopColor="oklch(0.62 0.18 245 / 0.35)" />
              <stop offset="100%" stopColor="oklch(0.72 0.19 155 / 0)" />
            </linearGradient>
            <linearGradient id="ribbon2" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.19 155 / 0)" />
              <stop offset="50%" stopColor="oklch(0.72 0.19 155 / 0.3)" />
              <stop offset="100%" stopColor="oklch(0.42 0.19 258 / 0)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -100 500 Q 300 300 700 520 T 1400 460"
            stroke="url(#ribbon)"
            strokeWidth="80"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M -100 620 Q 400 800 800 620 T 1400 720"
            stroke="url(#ribbon2)"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 2.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.svg>
      </motion.div>

      {/* Floating particles (reduced count for perf) */}
      {Array.from({ length: 10 }).map((_, i) => {
        const size = 3 + ((i * 7) % 5);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const dur = 7 + (i % 5);
        const delay = (i % 4) * 0.6;
        const isGreen = i % 3 === 0;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              willChange: "transform, opacity",
              background: isGreen
                ? "oklch(0.72 0.19 155 / 0.7)"
                : "oklch(0.62 0.18 245 / 0.7)",
              boxShadow: isGreen
                ? "0 0 10px oklch(0.72 0.19 155 / 0.55)"
                : "0 0 10px oklch(0.62 0.18 245 / 0.55)",
            }}
            animate={{ y: [0, -22, 0], opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
