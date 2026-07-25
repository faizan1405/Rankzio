import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Plus } from "lucide-react";

const faqs = [
  { q: "What makes Rank Zio Digital different from other agencies?", a: "We combine editorial-grade craft with AI-native workflows. Every deliverable is stress-tested by models and shipped by senior humans — so you get agency taste at studio speed." },
  { q: "How is AI used inside your services?", a: "AI handles research, drafting, testing and reporting so our strategists spend their time on positioning, story and conversion. It compresses timelines, not quality." },
  { q: "Do you offer a free consultation?", a: "Yes. Every engagement starts with a free 30-minute call where we audit your current setup, identify quick wins and outline a growth roadmap." },
  { q: "How quickly can we get started?", a: "Most clients kick off within a week of the initial call. Websites launch in 3–6 weeks; SEO and paid engagements go live in the first 7 days." },
  { q: "What industries do you specialise in?", a: "We work across DTC, SaaS, fintech, real estate, legal, wellness and creative services — anywhere premium storytelling and measurable growth matter." },
  { q: "How do you measure success?", a: "Every engagement ships with clear KPIs — revenue, pipeline, ROAS, organic growth or LTV — and a live dashboard you can check anytime." },
  { q: "Do I own the work you produce?", a: "Absolutely. All websites, content and creative assets are transferred to you at full ownership on project completion." },
  { q: "Can you work with existing teams or agencies?", a: "Yes. We frequently plug into in-house marketing teams as an extension — augmenting strategy, execution or creative firepower." },
  { q: "What is your typical engagement length?", a: "Websites are project-based. SEO, paid and content usually run on 3–6 month sprints, with most partnerships continuing 12+ months." },
  { q: "How do payments and contracts work?", a: "Simple monthly billing for retainers, milestone payments for projects, and month-to-month flexibility after your first term. No lock-ins." },
];

function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.04}>
      <div className="border-b border-foreground/10">
        <button
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="text-lg font-medium tracking-tight md:text-xl">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow-brand"
          >
            <Plus size={18} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} transition={{ delay: 0.05 }} className="pb-8 pr-16 text-[15px] leading-relaxed text-foreground/70">
                {a}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-32 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_2fr] lg:px-10">
        <div>
          <Reveal><SectionEyebrow>FAQ</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Questions, <span className="text-gradient-brand">answered</span>.
            </h2>
          </Reveal>
        </div>
        <div>
          {faqs.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
