import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button — pulses, glows, magnetically follows cursor,
 * expands on hover. Present on every page via __root.
 */
export function FloatingWhatsApp() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = btnRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d < 120) {
        x.set(dx * 0.35);
        y.set(dy * 0.35);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.a
      ref={btnRef}
      href={waLink("Hi Rankzio! I'd like to know more about your services.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Rankzio on WhatsApp"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{ x: sx, y: sy }}
      className="fixed bottom-6 right-6 z-[9995] flex h-16 items-center justify-center overflow-hidden rounded-full text-white shadow-glow-brand"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, width: hovered ? 220 : 64 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.19 155), oklch(0.62 0.18 245))",
        }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ background: "oklch(0.72 0.19 155 / 0.6)" }}
        animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
        <MessageCircle size={26} strokeWidth={2.2} />
      </span>
      {hovered && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative pr-5 text-sm font-semibold tracking-tight"
        >
          Chat on WhatsApp
        </motion.span>
      )}
    </motion.a>
  );
}
