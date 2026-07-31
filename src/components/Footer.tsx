import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, MapPin, ArrowRight, Phone } from "lucide-react";
import { RankzioLogo } from "./RankzioLogo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl p-[1.5px] shadow-float">
          <span aria-hidden className="absolute inset-0 rounded-3xl" style={{ background: "var(--gradient-brand)" }} />
          <div className="relative rounded-[calc(1.5rem-1.5px)] glass p-10 md:p-14">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gradient-brand">Newsletter</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  The growth memo, monthly.
                </h3>
                <p className="mt-3 text-foreground/65">
                  One deeply useful email a month on AI, SEO, ads and brand — from our studio to your inbox.
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex w-full items-center gap-2 rounded-full bg-white p-2 shadow-soft">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 rounded-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-foreground/40"
                />
                <button className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-glow-brand" type="submit">
                  <span className="btn-shine absolute inset-0" aria-hidden />
                  <span className="relative">Subscribe</span>
                  <ArrowRight size={14} className="relative" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <RankzioLogo floating height={93} />
            <p className="mt-5 max-w-sm text-foreground/70">
              An AI-first digital growth studio building premium websites, marketing systems and brand experiences that compound.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/rankzio", label: "Instagram" },
                { Icon: Facebook, href: "https://www.facebook.com/share/1G7Gv3aX24/", label: "Facebook" },
                { Icon: Mail, href: "mailto:info@rankzio.com", label: "Email" },
                { Icon: Phone, href: "tel:+918287008400", label: "Phone" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-full glass transition-shadow duration-500 hover:shadow-glow-brand"
                >
                  <span aria-hidden className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "var(--gradient-brand)" }} />
                  <Icon size={17} className="relative transition-colors group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-sm font-semibold uppercase tracking-widest text-foreground/50">Quick Links</div>
            <ul className="mt-5 space-y-3 text-foreground/80">
              {[["About", "/about"], ["Services", "/services"], ["Portfolio", "/portfolio"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([l, h]) => (
                <li key={l}><Link to={h} className="link-underline">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-sm font-semibold uppercase tracking-widest text-foreground/50">Services</div>
            <ul className="mt-5 space-y-3 text-foreground/80">
              {[
                ["Website Development", "/services/website-development"],
                ["AI SEO", "/services/ai-seo"],
                ["Social Media", "/services/social-media-management"],
                ["Google & Meta Ads", "/services/google-meta-ads"],
                ["AI Chatbot & Automation", "/services/ai-chatbot-automation"],
                ["Content Writing", "/services/content-writing"],
              ].map(([l, h]) => (
                <li key={l}><Link to={h} className="link-underline">{l}</Link></li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 text-foreground/80">
              <li><a href="tel:+918287008400" className="flex items-start gap-3 hover:text-foreground"><Phone size={16} className="mt-1 text-brand-blue" />+91 82870 08400</a></li>
              <li className="flex items-start gap-3"><MapPin size={16} className="mt-1 text-brand-blue" /><span>F-186, Yamuna Vihar,<br />Delhi – 110053, India</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 py-8 text-sm text-foreground/55 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Rankzio Digital. Crafted with care.</div>
          <div className="flex gap-6">
            <a href="#" className="link-underline">Privacy</a>
            <a href="#" className="link-underline">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
