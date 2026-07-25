import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { ArrowRight, Clock } from "lucide-react";
import blogImg from "@/assets/blog-hero.jpg";
import { posts } from "@/lib/blog";

import { SITE } from "@/lib/site-url";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Growth, SEO & AI Insights | Rankzio" },
      { name: "description", content: "Long-form essays on AI-first SEO, performance ads, brand craft and the future of digital marketing — from the studio at Rankzio." },
      { property: "og:title", content: "Blog — Growth, SEO & AI Insights | Rankzio" },
      { property: "og:url", content: `${SITE}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/blog` }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={<>Ideas worth <span className="text-gradient-brand text-drift">reading twice.</span></>}
        description="Long-form essays on AI-first SEO, performance ads, brand craft and the future of digital marketing — written for founders and marketing leaders."
        image={blogImg}
        imageAlt="Editorial workspace with open journal and laptop"
        variant="split"
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        primary={{ label: "Newsletter", href: "#newsletter" }}
        secondary={{ label: "See our work", href: "/portfolio" }}
      />

      {/* Featured */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group block">
              <div className="grid grid-cols-1 items-center gap-10 rounded-3xl glass p-6 md:grid-cols-2 md:p-8">
                <motion.div
                  className="overflow-hidden rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">Featured · {featured.category}</div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl group-hover:text-gradient-brand">{featured.title}</h2>
                  <p className="mt-4 text-foreground/70">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-foreground/60">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                    Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="h-full overflow-hidden rounded-3xl glass p-3 transition-shadow duration-500 hover:shadow-glow-brand"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                      <img
                        src={p.cover}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `radial-gradient(circle at 50% 60%, oklch(0.72 0.19 155 / 0.25), oklch(0.62 0.18 245 / 0.15) 50%, transparent 75%)` }}
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-xs font-semibold uppercase tracking-widest text-brand-blue">{p.category}</div>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-gradient-brand">{p.title}</h3>
                      <p className="mt-3 text-foreground/70">{p.excerpt}</p>
                      <div className="mt-5 flex items-center gap-3 text-xs text-foreground/60">
                        <span>{p.date}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1"><Clock size={12} /> {p.readTime}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="relative py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-[1.5px] shadow-float">
              <span aria-hidden className="absolute inset-0 rounded-3xl" style={{ background: "var(--gradient-brand)" }} />
              <div className="relative rounded-[calc(1.5rem-1.5px)] glass p-10 text-center md:p-14">
                <SectionEyebrow>The growth memo</SectionEyebrow>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">One useful email per month.</h2>
                <p className="mx-auto mt-3 max-w-lg text-foreground/70">Deep insights on AI, SEO, ads and brand — from our studio to your inbox.</p>
                <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full bg-white p-2 shadow-soft">
                  <label htmlFor="blog-newsletter" className="sr-only">Email</label>
                  <input id="blog-newsletter" type="email" required placeholder="you@company.com" className="flex-1 rounded-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-foreground/40" />
                  <button type="submit" className="rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-glow-brand">Subscribe</button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
