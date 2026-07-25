import { motion } from "motion/react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Check } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

const plans = [
  { title: "Website Development", price: "$149", unit: "one-time", highlight: false,
    features: ["Custom design system", "Up to 8 core pages", "Mobile & speed optimised", "SEO-ready architecture", "Analytics + tracking"] },
  { title: "AI SEO", price: "$99", unit: "/month", highlight: true,
    features: ["Keyword & intent research", "AI-assisted content briefs", "Technical + on-page fixes", "Monthly growth reporting", "Priority support"] },
  { title: "Social Media Management", price: "$99", unit: "/month", highlight: false,
    features: ["12–16 posts per month", "Reels + carousels + statics", "Community management", "Brand voice tuning", "Monthly insights"] },
  { title: "Google & Meta Ads", price: "$49", unit: "/month", highlight: false,
    features: ["Full-funnel setup", "Weekly creative testing", "Conversion tracking", "ROAS-focused reporting", "Landing page guidance"] },
  { title: "AI Chatbot & Automation", price: "$49", unit: "/month", highlight: false,
    features: ["Custom knowledge base", "Website + WhatsApp deploy", "CRM + calendar sync", "24/7 lead capture", "Continuous training"] },
  { title: "Content Writing", price: "$0.02", unit: "/word", highlight: false,
    features: ["SEO-optimised drafts", "Human editorial pass", "Brand voice tuning", "Fast turnarounds", "Unlimited formats"] },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal><SectionEyebrow>Pricing</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
              Simple pricing. <span className="text-gradient-brand">Serious outcomes.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p, i) => {
            const msg = `Hi Rank Zio, I'd like to get started with ${p.title} (${p.price}${p.unit === "one-time" ? "" : " " + p.unit}).`;
            return (
              <Reveal key={p.title} delay={(i % 3) * 0.06}>
                <motion.div whileHover={{ y: -8 }} className={`group relative h-full overflow-hidden rounded-3xl p-[1.5px] transition-shadow duration-500 ${p.highlight ? "shadow-glow-brand" : "hover:shadow-glow-brand"}`}>
                  <span aria-hidden className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${p.highlight ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`} style={{ background: "var(--gradient-brand)" }} />
                  <div className="relative flex h-full flex-col rounded-[calc(1.5rem-1.5px)] glass p-8">
                    {p.highlight && (
                      <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white">Most popular</div>
                    )}
                    <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <div className="text-5xl font-semibold tracking-tight text-gradient-brand">{p.price}</div>
                      <div className="text-sm text-foreground/55">{p.unit}</div>
                    </div>
                    <ul className="mt-6 space-y-3 text-sm text-foreground/80">
                      {p.features.map((f, k) => (
                        <motion.li key={f} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + k * 0.05 }} className="flex items-start gap-2">
                          <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-brand text-white">
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-8 flex-1" />
                    <a
                      href={waLink(msg)}
                      target="_blank"
                      rel="noreferrer"
                      className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-brand transition-transform duration-500 hover:scale-[1.02]"
                    >
                      <span aria-hidden className="absolute inset-0 bg-gradient-brand" />
                      <span className="btn-shine absolute inset-0" aria-hidden />
                      <span className="relative">Get Started Today</span>
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
