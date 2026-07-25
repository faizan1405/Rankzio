import { motion } from "motion/react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  { name: "Priya Malhotra", role: "Founder, Lumen Skincare", body: "Rank Zio rebuilt our storefront and tripled revenue in six months. The craft, speed and clarity are unmatched.", rating: 5, seed: "priya" },
  { name: "David Chen", role: "CMO, Verdant Bank", body: "They think like operators, not vendors. Our CAC dropped a third within a single quarter of working together.", rating: 5, seed: "david" },
  { name: "Ayesha Rahman", role: "Head of Marketing, Northwind Realty", body: "Every deliverable feels premium — the strategy, the site, the reporting. Our brokerage looks a decade ahead now.", rating: 5, seed: "ayesha" },
  { name: "Marco Rossi", role: "CEO, Forge Fitness", body: "The team pairs real AI depth with genuine editorial taste. Rare combination, and it shows in every touchpoint.", rating: 5, seed: "marco" },
  { name: "Sarah Whitaker", role: "Director, Meridian Legal", body: "We went from invisible to owning our category in Google. Best marketing investment we have ever made.", rating: 5, seed: "sarah" },
  { name: "Nikhil Sharma", role: "Founder, Peak Performance", body: "Our paid engine finally makes sense. Cleaner tracking, sharper creative, and a team that actually cares.", rating: 5, seed: "nikhil" },
];

function Card({ t }: { t: typeof testimonials[number] }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative w-[360px] shrink-0 rounded-3xl p-[1.5px] transition-shadow duration-500 hover:shadow-glow-brand"
    >
      <span aria-hidden className="absolute inset-0 rounded-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "var(--gradient-brand)" }} />
      <div className="relative h-full rounded-[calc(1.5rem-1.5px)] glass p-7">
        <Quote className="absolute right-6 top-6 text-foreground/10 transition-transform duration-500 group-hover:rotate-6 group-hover:text-brand-blue/30" size={40} />
        <div className="flex gap-0.5 text-brand-green">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" />
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">"{t.body}"</p>
        <div className="mt-6 flex items-center gap-3">
          <img
            alt=""
            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${t.seed}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`}
            className="h-11 w-11 rounded-full bg-gradient-brand"
            loading="lazy"
          />
          <div>
            <div className="text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-foreground/55">{t.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="relative overflow-hidden py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal><SectionEyebrow>Testimonials</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
              Loved by teams that <span className="text-gradient-brand">measure everything</span>.
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
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
