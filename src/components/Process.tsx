import { motion } from "motion/react";
import { useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";

const steps = [
  { n: "01", t: "Discovery", d: "Deep-dive into your brand, buyers and business model — goals, positioning and constraints on the table from day one." },
  { n: "02", t: "Research", d: "Market, competitors and search demand mapped with AI — every opportunity quantified before we spend a rupee." },
  { n: "03", t: "Strategy", d: "A channel and content plan tied to real revenue — clear bets, sequenced roadmap, measurable KPIs." },
  { n: "04", t: "Design", d: "Editorial visuals and interfaces that feel premium — art-directed, on-brand and engineered for conversion." },
  { n: "05", t: "Development", d: "Fast, accessible, SEO-native builds — no templates, no bloat, 95+ Lighthouse out of the box." },
  { n: "06", t: "Launch", d: "Coordinated go-live with tracking wired end-to-end — GA4, GTM, dashboards ready on day one." },
  { n: "07", t: "Growth", d: "Weekly optimisation loops that compound month over month — content, CRO, ads and SEO in one system." },
];

function StepCard({ s }: { s: typeof steps[number] }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative w-[340px] shrink-0 rounded-3xl p-[1.5px] transition-shadow duration-500 hover:shadow-glow-brand"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div className="relative h-full rounded-[calc(1.5rem-1.5px)] glass p-7">
        <div className="text-5xl font-semibold leading-none tracking-tighter text-gradient-brand">
          {s.n}
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight">{s.t}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{s.d}</p>
      </div>
    </motion.div>
  );
}

export function Process() {
  const [paused, setPaused] = useState(false);
  const loop = [...steps, ...steps];

  return (
    <section className="relative overflow-hidden py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gradient-brand"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal><SectionEyebrow>How we work</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
              A seven-step growth <span className="text-gradient-brand">operating system</span>.
            </h2>
          </Reveal>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: paused ? undefined : ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((s, i) => (
            <StepCard key={i} s={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
