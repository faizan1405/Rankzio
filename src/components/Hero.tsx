import { motion, useScroll, useTransform } from "motion/react";
import { lazy, Suspense, useRef } from "react";
import { MagneticButton } from "./MagneticButton";

// Heavy 3D-ish background is deferred so hero text can paint immediately.
const HeroScene = lazy(() =>
  import("./HeroScene").then((m) => ({ default: m.HeroScene })),
);

const HEADLINE = ["AI", "Powered", "Marketing", "That", "Actually", "Converts"];

// Hero headline is the LCP element — render fully visible on first paint.
// Subtle post-hydration polish only, no opacity/transform gating.
function Word({ word, accent }: { word: string; accent?: boolean }) {
  return (
    <span className="mr-[0.28em] inline-block pb-[0.15em] align-bottom">
      <span className={accent ? "inline-block text-gradient-brand text-drift" : "inline-block"}>
        {word}
      </span>
    </span>
  );
}


export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // GPU-friendly transforms only. No filter/blur, no width/height/top/left.
  // A single scroll listener drives both content and scene — no extra
  // ScrollTriggers, keeping the hero cheap to render on first paint.
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scaleScene = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityScene = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden"
      id="top"
      style={{ contain: "paint" }}
    >
      {/* Decorative background is lazy-loaded so hero text paints first. */}
      <motion.div style={{ scale: scaleScene, opacity: opacityScene, willChange: "transform, opacity" }} className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-soft-blue via-white to-soft-green" />}>
          <HeroScene />
        </Suspense>
      </motion.div>

      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-start justify-center px-6 pt-32 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium tracking-wide text-foreground/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
          </span>
          Digital Growth Starts Here
        </motion.div>

        <h1 className="max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          {HEADLINE.map((w, i) => (
            <Word key={i} word={w} accent={w === "Actually" || w === "Converts"} />
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg text-foreground/70 md:text-xl"
        >
          We engineer growth engines that pair machine intelligence with human
          craft — turning attention into pipeline, and clicks into compounding
          revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton variant="primary" href="#contact">
            Book Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton variant="secondary" href="#work">
            View Our Portfolio
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground/60"
        >
          <TrustBadge label="4.9 client rating" />
          <TrustBadge label="500+ projects delivered" />
          <TrustBadge label="AI-native workflows" />
          <TrustBadge label="Global delivery" />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-foreground/50"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <motion.span
            className="block h-8 w-px bg-foreground/40"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}

          />
        </div>
      </motion.div>
    </section>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-brand" />
      {label}
    </div>
  );
}
