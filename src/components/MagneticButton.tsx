import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface Props {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  href?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  variant = "primary",
  onClick,
  className,
  href,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });
  const textY = useMotionValue(0);
  const stextY = useSpring(textY, { stiffness: 300, damping: 20 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.35);
    textY.set(-3);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
    textY.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium tracking-tight transition-shadow duration-500 will-change-transform select-none";
  const styles =
    variant === "primary"
      ? "text-white shadow-glow-brand hover:shadow-[0_16px_60px_-10px_oklch(0.62_0.18_245/0.7),0_24px_80px_-20px_oklch(0.72_0.19_155/0.55)]"
      : "glass text-foreground hover:shadow-float";

  const Inner = (
    <motion.span
      style={{ y: stextY }}
      className="relative z-10 inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const bg =
    variant === "primary" ? (
      <>
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-brand"
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(120deg, oklch(0.72 0.19 155), oklch(0.68 0.2 195), oklch(0.62 0.18 245))",
          }}
        />
        <span className="btn-shine absolute inset-0 rounded-full" aria-hidden />
      </>
    ) : (
      <>
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            padding: 1,
            background: "var(--gradient-brand)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </>
    );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: sx, y: sy }}
        className={cn("group", base, styles, className)}
      >
        {bg}
        {Inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn("group", base, styles, className)}
    >
      {bg}
      {Inner}
    </motion.button>
  );
}
