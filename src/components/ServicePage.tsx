import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "./PageHero";
import { Reveal, SectionEyebrow } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { waLink } from "@/lib/whatsapp";

export interface ServicePageProps {
  slug: string;
  title: string;
  eyebrow: string;
  headline: ReactNode;
  description: string;
  image: string;
  midImage?: string;
  overview: string;
  problem: string;
  solution: string;
  benefits: string[];
  deliverables?: string[];
  keyPoints?: string[];
  technologies: string[];
  process: { step: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  related: { title: string; to: string }[];
  metaTitle: string;
  metaDescription: string;
  heroVariant?: "split" | "center" | "showcase";
}

export function ServicePage(p: ServicePageProps) {
  const keyPoints = p.keyPoints ?? defaultKeyPoints(p);
  const deliverables = p.deliverables ?? defaultDeliverables(p);

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={<span className="text-gradient-brand text-drift">{p.headline}</span>}
        description={p.description}
        image={p.image}
        imageAlt={p.title}
        variant={p.heroVariant ?? "split"}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: p.title },
        ]}
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See our work", href: "/portfolio" }}
      />

      {/* Overview + Problem/Solution */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <Reveal>
              <SectionEyebrow>Overview</SectionEyebrow>
              <h2 className="text-3xl font-semibold tracking-tight">What we build</h2>
              <p className="mt-4 text-foreground/70">{p.overview}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl glass p-8">
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-blue">Problem</div>
                <p className="mt-3 text-foreground/80">{p.problem}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-3xl p-[1.5px] shadow-float">
                <span aria-hidden className="absolute inset-0 rounded-3xl" style={{ background: "var(--gradient-brand)" }} />
                <div className="relative rounded-[calc(1.5rem-1.5px)] bg-background p-8">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">Our Solution</div>
                  <p className="mt-3 text-foreground/85">{p.solution}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionEyebrow>Benefits</SectionEyebrow>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              Outcomes we optimize for, not vanity metrics.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {p.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.05}>
                <div className="group flex h-full items-start gap-4 rounded-2xl glass p-6 transition-shadow duration-500 hover:shadow-float">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                    <Check size={16} />
                  </span>
                  <p className="text-foreground/85">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key points + unique in-content image */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionEyebrow>What's included</SectionEyebrow>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Core deliverables — no fluff.
              </h2>
              <ul className="mt-8 space-y-3">
                {deliverables.map((d: string) => (
                  <li key={d} className="flex items-start gap-3 text-foreground/85">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                      <Check size={12} />
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="overflow-hidden rounded-3xl shadow-float">
                <img
                  src={p.midImage ?? p.image}
                  alt={`${p.title} in action`}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
              </figure>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
            {keyPoints.map((k: string, i: number) => (
              <Reveal key={k} delay={i * 0.05}>
                <div className="flex items-start gap-4 rounded-2xl glass p-6">
                  <span className="text-2xl font-semibold text-gradient-brand">0{i + 1}</span>
                  <p className="text-foreground/85">{k}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* Technologies */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionEyebrow>Technologies</SectionEyebrow>
            <h2 className="text-3xl font-semibold tracking-tight">Tools in our stack</h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {p.technologies.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="rounded-full glass px-5 py-2.5 text-sm font-medium text-foreground/80"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionEyebrow>Process</SectionEyebrow>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              How we ship, in weeks — not quarters.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {p.process.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="h-full rounded-3xl glass p-7">
                  <div className="text-4xl font-semibold text-gradient-brand">{s.step}</div>
                  <div className="mt-3 text-lg font-semibold">{s.title}</div>
                  <p className="mt-2 text-sm text-foreground/70">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Questions, answered.</h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {p.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group rounded-2xl glass p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
                    {f.q}
                    <span className="ml-4 text-foreground/50 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-foreground/75">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl p-[1.5px] shadow-float">
            <span aria-hidden className="absolute inset-0 rounded-3xl" style={{ background: "var(--gradient-brand)" }} />
            <div className="relative rounded-[calc(1.5rem-1.5px)] glass p-10 text-center md:p-14">
              <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">Ready when you are</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Let's build something worth remembering.</h3>
              <p className="mx-auto mt-3 max-w-xl text-foreground/70">
                Book a 20-minute strategy call. No decks, no dance — just clear next steps for your growth.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" variant="primary" className="px-7 py-4 text-sm">
                  Start a project
                </MagneticButton>
                <MagneticButton href={waLink(`Hi Rankzio! I'd like to discuss ${p.title}.`)} variant="secondary" className="px-7 py-4 text-sm">
                  Chat on WhatsApp
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionEyebrow>Related services</SectionEyebrow>
            <h2 className="text-3xl font-semibold tracking-tight">Better together.</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {p.related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group flex items-center justify-between rounded-2xl glass p-6 transition-shadow duration-500 hover:shadow-float"
              >
                <span className="font-semibold">{r.title}</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function defaultDeliverables(p: ServicePageProps): string[] {
  return p.benefits.slice(0, 6);
}

function defaultKeyPoints(p: ServicePageProps): string[] {
  return [
    `Senior specialists lead every ${p.title.toLowerCase()} engagement — no juniors on your account.`,
    `Weekly ship cadence with visible outputs — no black-box retainers.`,
    `Measurement tied to pipeline and revenue — not vanity metrics.`,
    `Documented playbooks and handover — your team owns the system after launch.`,
  ];
}

