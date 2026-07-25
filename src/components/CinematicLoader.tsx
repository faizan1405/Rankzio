import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logoAsset from "@/assets/rankzio-logo.png.asset.json";

interface Props {
  onComplete?: () => void;
}

/**
 * Cinematic intro loader — plays only on a visitor's first ever visit
 * (persisted in localStorage under `rz_seen_loader`). Later visits and
 * every in-session navigation skip the animation entirely.
 *
 * The animation intentionally does NOT redraw the logo. It renders the
 * uploaded Rankzio PNG once and animates its transform + a glow layer +
 * a light sweep overlay behind it. Sequence:
 *   1. Solid white background, logo appears
 *   2. Logo spring-scales from 0.7x -> 1.15x
 *   3. Soft blue/green glow fades in behind
 *   4. A subtle light sweep passes across the logo
 *   5. Logo settles back to 1.0x
 *   6. Background fades into the homepage
 */
export function CinematicLoader({ onComplete }: Props) {
  // Start hidden on SSR/first paint so the loader never blocks the LCP
  // element (hero headline). We flip it on after mount if the visitor
  // hasn't seen it — the overlay then covers a brief post-hydration moment.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let seen = true;
    try { seen = localStorage.getItem("rz_seen_loader") === "1"; } catch {}
    if (seen) { onComplete?.(); return; }
    setVisible(true);
  }, [onComplete]);

  useEffect(() => {
    if (!visible) return;
    // Capture scroll position before the loader fades out — if anything
    // causes a scroll shift during the exit transition, Lenis will be
    // aligned to the correct position.
    const scrollY = window.scrollY;
    // Total on-screen time ~2.4s; the exit fade adds ~0.6s.
    const done = setTimeout(() => {
      setVisible(false);
      try {
        localStorage.setItem("rz_seen_loader", "1");
      } catch {}
      // Restore scroll after the overlay is gone.
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
      onComplete?.();
    }, 2400);
    return () => clearTimeout(done);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9990] flex items-center justify-center overflow-hidden bg-white"
        >
          {/* Blue/green glow — appears after the logo begins scaling */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[520px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.72 0.19 155 / 0.35), oklch(0.62 0.18 245 / 0.28) 45%, transparent 70%)",
              filter: "blur(30px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.9, 0.7], scale: [0.6, 1.15, 1] }}
            transition={{ duration: 1.6, delay: 0.35, ease: "easeOut" }}
          />

          {/* Logo — never redrawn, only transformed */}
          <motion.div
            className="relative"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: [0.7, 1.15, 1.0],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.55, 1],
              ease: [0.34, 1.56, 0.64, 1], // spring-like overshoot
            }}
          >
            <img
              src={logoAsset.url}
              alt="Rank Zio Digital"
              width={520}
              height={173}
              style={{ height: 180, width: "auto", display: "block" }}
              draggable={false}
            />

            {/* Light sweep — a diagonal shimmer that passes across the logo */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ mixBlendMode: "screen" }}
            >
              <motion.div
                className="absolute inset-y-[-20%] w-[45%]"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)",
                  filter: "blur(6px)",
                }}
                initial={{ x: "-140%" }}
                animate={{ x: "240%" }}
                transition={{ duration: 1.1, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
