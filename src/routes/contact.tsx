import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { Mail, Phone, MessageCircle, MapPin, Clock, Instagram, Facebook, Send, PartyPopper } from "lucide-react";
import contactImg from "@/assets/contact-hero.jpg";
import { waLink } from "@/lib/whatsapp";

import { SITE } from "@/lib/site-url";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rankzio — Let's Build Something Together" },
      { name: "description", content: "Get in touch with Rankzio. Book a strategy call, WhatsApp us directly, or drop a message — usually a reply within a few hours." },
      { property: "og:title", content: "Contact Rankzio — Let's Build Something Together" },
      { property: "og:description", content: "Book a free strategy call, WhatsApp the studio directly, or send a project brief — the Rankzio team usually replies within a few hours." },
      { property: "og:url", content: `${SITE}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/contact` }],
  }),
  component: ContactPage,
});

const cards = [
  { Icon: Mail, label: "Email", value: "info@rankzio.com", href: "mailto:info@rankzio.com", tint: "245" },
  { Icon: Phone, label: "Phone", value: "+91 82870 08400", href: "tel:+918287008400", tint: "195" },
  { Icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: waLink("Hi Rankzio! I'd like to know more."), tint: "155" },
];

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Website Development");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    const text = `Hi Rankzio! I'm ${name} (${email}) — I'd like to discuss ${service}.\n\n${message}`;
    setTimeout(() => {
      window.open(waLink(text), "_blank");
    }, 1400);
  };

  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title={<>Let's build <span className="text-gradient-brand text-drift">something worth building.</span></>}
        description="Book a strategy call, WhatsApp us directly or drop a message below. We usually reply within a few hours during business days."
        image={contactImg}
        imageAlt="Modern premium office reception with holographic communication icons"
        variant="split"
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        primary={{ label: "WhatsApp us", href: waLink("Hi Rankzio!") }}
        secondary={{ label: "Book a call", href: "mailto:info@rankzio.com" }}
      />

      {/* Cards */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {cards.map(({ Icon, label, value, href, tint }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <motion.a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" whileHover={{ y: -6 }} className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-8 transition-shadow duration-500 hover:shadow-float">
                  <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90" style={{ background: `radial-gradient(closest-side, oklch(0.7 0.2 ${tint} / 0.5), transparent)` }} />
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-brand">
                    <Icon size={20} />
                  </div>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-foreground/50">{label}</div>
                  <div className="mt-1 text-lg font-semibold">{value}</div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="relative py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-5 lg:px-10">
          <div className="md:col-span-3">
            <Reveal>
              <SectionEyebrow>Tell us about your project</SectionEyebrow>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Fill this out — we'll reply on WhatsApp.</h2>
            </Reveal>
            <form onSubmit={submit} className="mt-10 space-y-5">
              <Field label="Your name">
                <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl bg-white px-5 py-4 text-base outline-none shadow-soft focus:shadow-glow-brand" placeholder="Jane Doe" />
              </Field>
              <Field label="Email">
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl bg-white px-5 py-4 text-base outline-none shadow-soft focus:shadow-glow-brand" placeholder="you@company.com" />
              </Field>
              <Field label="Service">
                <select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-2xl bg-white px-5 py-4 text-base outline-none shadow-soft focus:shadow-glow-brand">
                  {["Website Development", "AI SEO", "Social Media Management", "Google & Meta Ads", "AI Chatbot & Automation", "Content Writing", "Not sure yet"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Message">
                <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-2xl bg-white px-5 py-4 text-base outline-none shadow-soft focus:shadow-glow-brand" placeholder="Tell us where you are and where you'd like to go." />
              </Field>

              <button type="submit" className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-white shadow-glow-brand transition-shadow hover:shadow-[0_16px_60px_-10px_oklch(0.62_0.18_245/0.7)] md:w-auto">
                <span className="btn-shine absolute inset-0" aria-hidden />
                <span className="relative">Send & open WhatsApp</span>
                <Send size={16} className="relative" />
              </button>
            </form>
          </div>

          <aside className="md:col-span-2">
            <div className="space-y-5">
              <div className="rounded-3xl glass p-8">
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-blue">Business hours</div>
                <ul className="mt-4 space-y-2 text-foreground/80">
                  <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><Clock size={14} className="text-brand-blue" /> Mon – Fri</span><span>10:00 – 19:00 IST</span></li>
                  <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><Clock size={14} className="text-brand-blue" /> Saturday</span><span>11:00 – 16:00 IST</span></li>
                  <li className="flex items-center justify-between text-foreground/50"><span>Sunday</span><span>Closed</span></li>
                </ul>
              </div>
              <div className="rounded-3xl glass p-8">
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-blue">Studio</div>
                <div className="mt-4 flex items-start gap-3 text-foreground/85"><MapPin size={16} className="mt-1 text-brand-blue" /><span>F-186, Yamuna Vihar,<br />Delhi – 110053, India</span></div>
                <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <iframe title="Rankzio Studio map" src="https://www.google.com/maps?q=Yamuna+Vihar+Delhi&output=embed" className="h-full w-full border-0" loading="lazy" />
                </div>
              </div>
              <div className="rounded-3xl glass p-8">
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-blue">Follow</div>
                <div className="mt-4 flex gap-3">
                  {[
                    { Icon: Instagram, href: "https://www.instagram.com/rankzio", label: "Instagram" },
                    { Icon: Facebook, href: "https://www.facebook.com/share/1G7Gv3aX24/", label: "Facebook" },
                    { Icon: MessageCircle, href: waLink("Hi Rankzio!"), label: "WhatsApp" },
                  ].map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full glass hover:shadow-soft">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-3xl bg-white p-10 text-center shadow-float"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow-brand">
                <PartyPopper size={26} />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">🎉 Thanks!</h3>
              <p className="mt-2 text-foreground/70">Redirecting to WhatsApp…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground/60">{label}</span>
      {children}
    </label>
  );
}
