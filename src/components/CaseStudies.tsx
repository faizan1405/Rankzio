import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";

function BarChart({ data, colorA, colorB }: { data: { label: string; a: number; b: number }[]; colorA: string; colorB: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const max = Math.max(...data.flatMap((d) => [d.a, d.b]));
  return (
    <div ref={ref} className="mt-6 space-y-4">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex justify-between text-xs text-foreground/60">
            <span>{d.label}</span>
            <span>Before → After</span>
          </div>
          <div className="flex gap-2">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-foreground/5">
              <motion.div initial={{ width: 0 }} animate={{ width: inView ? `${(d.a / max) * 100}%` : 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full" style={{ background: colorA }} />
            </div>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-foreground/5">
              <motion.div initial={{ width: 0 }} animate={{ width: inView ? `${(d.b / max) * 100}%` : 0 }} transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full" style={{ background: colorB }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AreaChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <svg ref={ref} viewBox="0 0 400 160" className="mt-6 w-full">
      <defs>
        <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.18 245 / 0.5)" />
          <stop offset="100%" stopColor="oklch(0.72 0.19 155 / 0)" />
        </linearGradient>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.18 245)" />
          <stop offset="100%" stopColor="oklch(0.72 0.19 155)" />
        </linearGradient>
      </defs>
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        d="M 0 130 C 40 120, 80 110, 120 105 S 200 60, 240 55 S 320 20, 400 15" stroke="url(#line)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <motion.path initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1, delay: 0.6 }}
        d="M 0 130 C 40 120, 80 110, 120 105 S 200 60, 240 55 S 320 20, 400 15 L 400 160 L 0 160 Z" fill="url(#area)" />
    </svg>
  );
}

export function CaseStudies() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal><SectionEyebrow>Case Studies</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
              Real numbers. <span className="text-gradient-brand">Compounding curves.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl glass p-8 shadow-soft transition-shadow hover:shadow-float">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">SEO — Meridian Legal</div>
                <div className="rounded-full glass px-3 py-1 text-xs font-medium">+512% Organic</div>
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">From invisible to inevitable in 9 months</h3>
              <AreaChart />
              <BarChart
                data={[
                  { label: "Monthly organic sessions", a: 22, b: 135 },
                  { label: "Top-10 keywords", a: 48, b: 640 },
                  { label: "Organic CTR", a: 30, b: 78 },
                  { label: "Qualified leads / mo", a: 12, b: 96 },
                ]}
                colorA="oklch(0.62 0.18 245 / 0.55)"
                colorB="var(--gradient-brand)"
              />
              <ul className="mt-6 space-y-2 text-sm text-foreground/70">
                <li>• Core Web Vitals rebuilt from failing to green across 400+ pages.</li>
                <li>• Hub-and-spoke content across 8 practice areas.</li>
                <li>• Programmatic SEO for city-level intent.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl glass p-8 shadow-soft transition-shadow hover:shadow-float">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">Ads — Nova Skincare</div>
                <div className="rounded-full glass px-3 py-1 text-xs font-medium">4.2x ROAS</div>
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Halved CPA. Doubled scale. One quarter.</h3>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { l: "ROAS", v: "4.2x" }, { l: "CPC", v: "-38%" },
                  { l: "CTR", v: "+112%" }, { l: "CVR", v: "+64%" },
                ].map((m, i) => (
                  <motion.div key={m.l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl bg-white/60 p-4">
                    <div className="text-2xl font-semibold text-gradient-brand">{m.v}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-foreground/60">{m.l}</div>
                  </motion.div>
                ))}
              </div>
              <BarChart
                data={[
                  { label: "Revenue generated", a: 42, b: 210 },
                  { label: "Conversion rate", a: 18, b: 46 },
                  { label: "Cost per click", a: 88, b: 55 },
                  { label: "Click-through rate", a: 24, b: 62 },
                ]}
                colorA="oklch(0.72 0.19 155 / 0.55)"
                colorB="var(--gradient-brand)"
              />
              <ul className="mt-6 space-y-2 text-sm text-foreground/70">
                <li>• Modular creative system — 60+ variants tested monthly.</li>
                <li>• Rebuilt tracking with server-side conversions.</li>
                <li>• Weekly test-and-scale cadence tied to LTV.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
