import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const enabledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    enabledRef.current = true;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      setHovering(!!interactive);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y, visible]);

  if (!enabledRef.current && typeof window !== "undefined") {
    // still render but stays offscreen for non-hover devices
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-multiply"
        style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 28,
            height: hovering ? 56 : 28,
            x: hovering ? -28 : -14,
            y: hovering ? -28 : -14,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.72 0.19 155 / 0.9), oklch(0.62 0.18 245 / 0.9))",
            boxShadow:
              "0 0 24px oklch(0.62 0.18 245 / 0.5), 0 0 40px oklch(0.72 0.19 155 / 0.35)",
          }}
        >
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            animate={{ opacity: hovering ? 0 : 1, scale: hovering ? 0.6 : 1 }}
            transition={{ duration: 0.2 }}
            className="drop-shadow"
          >
            <path
              d="M7 17L17 7M17 7H9M17 7V15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      >
        <div
          className="rounded-full"
          style={{
            width: 4, height: 4, transform: "translate(-2px,-2px)",
            background: "oklch(0.42 0.19 258)",
          }}
        />
      </motion.div>
    </>
  );
}
