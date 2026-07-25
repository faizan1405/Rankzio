import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { Sparkles, Target, Users, Trophy, Rocket, Heart } from "lucide-react";
import aboutImg from "@/assets/about-workspace.jpg";
import teamSharry from "@/assets/team-sharry.jpg";
import teamNazar from "@/assets/team-nazar.jpg";
import teamFaizan from "@/assets/team-faizan.jpg";

const team = [
  { name: "Mr. Sharry", role: "Founder", specialty: "SEO & AI Specialist", image: teamSharry, hue: 245 },
  { name: "Mr. Nazar", role: "Co-Founder", specialty: "Social Media & Ads Specialist", image: teamNazar, hue: 155 },
  { name: "Mr. Faizan", role: "Co-Founder", specialty: "Full Stack Developer", image: teamFaizan, hue: 195 },
];

function TeamCard({ m, i }: { m: typeof team[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return (
    <Reveal delay={i * 0.08}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", willChange: "transform" }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative h-full rounded-3xl p-[1.5px] shadow-float transition-shadow duration-500 hover:shadow-glow-brand"
      >
        <span aria-hidden className="absolute inset-0 rounded-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, oklch(0.7 0.2 ${m.hue}), oklch(0.55 0.2 ${m.hue + 60}))` }} />
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: i * 0.4 }}
          className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1.5px)] glass p-6"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={m.image}
              alt={m.name}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full" />
          </div>
          <div className="mt-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">{m.role}</div>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">{m.name}</h3>
            <p className="mt-1 text-foreground/70">{m.specialty}</p>
          </div>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}


import { SITE } from "@/lib/site-url";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rankzio — The Studio Behind AI-Driven Growth" },
      { name: "description", content: "Meet Rankzio: a small studio of strategists, designers and engineers turning AI, brand and performance into compounding growth for ambitious teams." },
      { property: "og:title", content: "About Rankzio — The Studio Behind AI-Driven Growth" },
      { property: "og:description", content: "Meet the studio behind AI-first growth systems for ambitious brands." },
      { property: "og:url", content: `${SITE}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/about` }],
  }),
  component: AboutPage,
});

const values = [
  { Icon: Sparkles, title: "Craft over volume", body: "One idea shipped with taste beats ten shipped in a hurry." },
  { Icon: Target, title: "Outcome-obsessed", body: "We measure our work in pipeline, revenue and rankings — not deliverables." },
  { Icon: Users, title: "Small, senior teams", body: "The people who pitch are the people who build. No handoffs, no juniors on autopilot." },
  { Icon: Trophy, title: "Compounding returns", body: "Every campaign, page and system is designed to keep paying rent for years." },
  { Icon: Rocket, title: "AI as leverage", body: "We use AI to move faster and think sharper — never to replace judgment." },
  { Icon: Heart, title: "Long-term partners", body: "Most of our clients stay 2+ years. Growth is a compounding relationship." },
];

const stats = [
  { k: "150+", v: "Projects shipped" },
  { k: "$18M+", v: "Client revenue influenced" },
  { k: "12", v: "Countries served" },
  { k: "4.9/5", v: "Average client rating" },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title={<>We build growth systems, <span className="text-gradient-brand text-drift">not deliverables.</span></>}
        description="Rankzio is a small, senior team of strategists, designers and engineers based in Delhi. We partner with ambitious founders and marketing leaders to design AI-first growth engines that keep working long after the launch."
        image={aboutImg}
        imageAlt="Sunlit creative workspace with a MacBook showing marketing dashboards"
        variant="split"
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        primary={{ label: "Work with us", href: "/contact" }}
        secondary={{ label: "See our work", href: "/portfolio" }}
      />

      {/* Story */}
      <section className="relative py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 md:grid-cols-2 lg:px-10">
          <Reveal>
            <SectionEyebrow>Our story</SectionEyebrow>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Founded on the belief that <span className="text-gradient-brand">good marketing feels invisible.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg text-foreground/75">
              <p>Rankzio began in a rented studio in Yamuna Vihar with a single conviction: most digital marketing is loud, ugly and forgettable — and it doesn't have to be.</p>
              <p>Since then, we've grown into a hand-picked team building websites, SEO systems, ad engines and AI automation for founders across India, the UAE, the UK and the US. We stay small on purpose. Senior teams. Real ownership. Honest, uncomfortable strategy when it's needed.</p>
              <p>The goal is simple: build brands and systems that outlast every algorithm update.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:px-10">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <div className="rounded-3xl glass p-6 text-center">
                <div className="text-4xl font-semibold text-gradient-brand md:text-5xl">{s.k}</div>
                <div className="mt-2 text-sm text-foreground/65">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionEyebrow>What we believe</SectionEyebrow>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">Six principles that shape every decision we make.</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} className="group h-full rounded-3xl glass p-8 transition-shadow duration-500 hover:shadow-float">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-brand">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-foreground/70">{body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionEyebrow>The team</SectionEyebrow>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
              Small, senior, <span className="text-gradient-brand">obsessed with the work</span>.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 [perspective:1400px] md:grid-cols-3">
            {team.map((m, i) => (
              <TeamCard key={m.name} m={m} i={i} />
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Ready to build something worth building?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-foreground/70">
              Tell us where you are. We'll tell you the honest, fastest way there.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="/contact" variant="primary" className="px-7 py-4 text-sm">Book a call</MagneticButton>
              <MagneticButton href="/services" variant="secondary" className="px-7 py-4 text-sm">Explore services</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
