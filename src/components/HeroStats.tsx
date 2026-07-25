import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Reveal } from "./Reveal";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 300, suffix: "+", label: "Happy Clients" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 2024, suffix: "", label: "Founded In", raw: true },
];


function Counter({ to, suffix, raw }: { to: number; suffix: string; raw?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (raw) { setN(to); return; }
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, raw]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function HeroStats() {
  return (
    <section className="relative z-10 mx-auto -mt-4 max-w-7xl px-6 pb-24 lg:px-10">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl glass shadow-float md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4 }}
              className="relative bg-white/40 p-8 backdrop-blur-md"
            >
              <div className="text-4xl font-semibold tracking-tight text-gradient-brand md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} raw={s.raw} />
              </div>
              <div className="mt-2 text-sm text-foreground/60">{s.label}</div>
              {i < stats.length - 1 && (
                <span className="pointer-events-none absolute right-0 top-1/4 hidden h-1/2 w-px bg-foreground/10 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
