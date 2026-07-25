import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { Clock, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { posts, type BlogPost } from "@/lib/blog";

const SITE = "https://rank-zio-canvas.lovable.app";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ params, loaderData }) => {
    const post = loaderData;
    return {
      meta: [
        { title: post ? `${post.title} — Rankzio Journal` : "Article — Rankzio" },
        { name: "description", content: post?.excerpt ?? "" },
        { property: "og:title", content: post?.title ?? "Article" },
        { property: "og:description", content: post?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE}/blog/${params.slug}` },
        ...(post ? [{ property: "og:image" as const, content: `${SITE}${post.cover}` }] : []),
      ],
      links: [{ rel: "canonical", href: `${SITE}/blog/${params.slug}` }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                image: `${SITE}${post.cover}`,
                author: { "@type": "Person", name: post.author },
                datePublished: post.date,
                publisher: { "@type": "Organization", name: "Rankzio" },
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: post.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            },
          ]
        : [],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block link-underline">Back to blog</Link>
      </div>
    </div>
  ),
});

function PostPage() {
  const post = Route.useLoaderData() as BlogPost;
  const { scrollYProgress } = useScroll();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const [copied, setCopied] = useState(false);
  const articleSections = [...post.body, ...buildArticleExpansion(post)];

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 1800);
      return () => clearTimeout(t);
    }
  }, [copied]);

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
        className="fixed inset-x-0 top-0 z-[70] h-1 bg-gradient-brand"
      />

      <PageHero
        eyebrow={post.category}
        title={<>{post.title}</>}
        description={post.excerpt}
        image={post.cover}
        imageAlt={post.title}
        variant="showcase"
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]}
      />

      <article className="relative mx-auto max-w-3xl px-6 pb-24 lg:px-10">
        {/* Meta */}
        <div className="mb-10 flex flex-wrap items-center gap-4 text-sm text-foreground/60">
          <span>By <span className="font-semibold text-foreground/85">{post.author}</span></span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
        </div>

        {/* TOC */}
        <div className="mb-10 rounded-2xl glass p-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-blue">Table of contents</div>
          <ol className="mt-3 space-y-2 text-sm">
            {articleSections.map((s, i) => (
              <li key={i}><a href={`#s-${i}`} className="link-underline text-foreground/80">{i + 1}. {s.heading}</a></li>
            ))}
          </ol>
        </div>

        {/* Body */}
        <div className="prose-lg space-y-10">
          {articleSections.map((s, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <section id={`s-${i}`}>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{s.heading}</h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="mt-4 text-lg leading-relaxed text-foreground/80">{p}</p>
                ))}
                {i === Math.floor(articleSections.length / 3) && (
                  <motion.figure
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 overflow-hidden rounded-3xl shadow-float"
                  >
                    <img
                      src={post.midImage}
                      alt={`${post.title} — mid visual`}
                      loading="lazy"
                      className="h-auto w-full object-cover"
                    />
                  </motion.figure>
                )}
                {i === Math.floor((articleSections.length * 2) / 3) && (
                  <motion.figure
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 overflow-hidden rounded-3xl shadow-float"
                  >
                    <img
                      src={post.secondary}
                      alt={`${post.title} — supporting visual`}
                      loading="lazy"
                      className="h-auto w-full object-cover"
                    />
                  </motion.figure>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <SectionEyebrow>Frequently asked</SectionEyebrow>
          <div className="mt-6 space-y-3">
            {post.faq.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl glass p-6 transition-shadow open:shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground/90">
                  {f.q}
                  <span className="ml-4 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-brand text-white transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-foreground/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-16 rounded-3xl p-[1.5px] shadow-float">
          <span aria-hidden className="absolute inset-0 rounded-3xl" style={{ background: "var(--gradient-brand)" }} />
          <div className="relative rounded-[calc(1.5rem-1.5px)] glass p-8 text-center md:p-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">Ready to apply this?</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Turn the insight into a growth system.</h2>
            <p className="mx-auto mt-3 max-w-xl text-foreground/70">
              Rankzio can audit your current setup and map the fastest path from this playbook to measurable revenue.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-white shadow-glow-brand"
            >
              Book a strategy call
            </Link>
          </div>
        </div>

        {/* Share */}
        <div className="mt-14 border-t border-foreground/10 pt-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-foreground/50">Share</div>
          <div className="mt-3 flex gap-3">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" aria-label="Share on X" className="flex h-11 w-11 items-center justify-center rounded-full glass hover:shadow-soft"><Twitter size={16} /></a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${SITE}/blog/${post.slug}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full glass hover:shadow-soft"><Linkedin size={16} /></a>
            <button aria-label="Copy link" onClick={() => { navigator.clipboard?.writeText(`${SITE}/blog/${post.slug}`); setCopied(true); }} className="flex h-11 w-11 items-center justify-center rounded-full glass hover:shadow-soft"><LinkIcon size={16} /></button>
            {copied && <span className="self-center text-xs text-brand-green">Copied!</span>}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionEyebrow>Keep reading</SectionEyebrow>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <motion.div whileHover={{ y: -4 }} className="overflow-hidden rounded-3xl glass p-6 transition-shadow duration-500 hover:shadow-float">
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                    <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-widest text-brand-blue">{p.category}</div>
                  <div className="mt-2 text-xl font-semibold group-hover:text-gradient-brand">{p.title}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function buildArticleExpansion(post: BlogPost) {
  return [
    {
      heading: "How we validate this in real client work",
      paragraphs: [
        `At Rankzio, we treat every ${post.category.toLowerCase()} recommendation as a hypothesis until the market proves it. Before a client commits budget, we review analytics, search behaviour, conversion paths, CRM notes, creative history and sales objections. That evidence tells us whether the problem is demand, trust, speed, message-market fit, distribution or measurement. The distinction matters. A brand with a tracking problem does not need more content yet; a brand with weak authority does not need another landing-page redesign first. The correct sequence is what protects budget and builds trust.`,
        `The senior review is practical rather than ceremonial. A strategist checks the business logic, a specialist checks the channel assumptions, and an editor checks whether the argument is clear enough for a busy founder to act on. If the idea cannot survive those three reviews, it does not become a client recommendation. This is the EEAT standard we use internally: experience from real campaigns, expertise from people who operate the channels, authority from documented evidence, and trust from explaining the trade-offs without hiding behind jargon.`,
      ],
    },
    {
      heading: "What teams should do next",
      paragraphs: [
        `Start with a focused audit instead of a broad brainstorm. Pick one page, one funnel, one campaign, or one content cluster and ask three questions: what is the buyer trying to decide, what proof are we giving them, and where does the measurement become unreliable? Most growth problems become easier once those answers are visible. The next step is usually not a bigger plan; it is a cleaner signal. Clean signal lets you choose the next experiment with confidence.`,
        `Then build a 30-day operating rhythm. Assign one owner, define one success metric, document every change, and review progress weekly. The brands that win are rarely the ones with the most complicated dashboards. They are the ones that make fewer, better decisions and repeat them consistently. Whether you are applying this article to SEO, ads, content, social or automation, the principle is the same: make the work measurable, make the owner clear, and make the learning visible enough that the next decision gets easier.`,
      ],
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: [
        `The first mistake is copying a tactic without copying the context that made it work. A competitor's content cadence, ad format, chatbot flow or website structure may look attractive, but their audience, price point, proof, brand awareness and sales cycle may be completely different. Borrow the principle, not the surface pattern. In our audits, the expensive failures usually come from teams imitating the visible output while ignoring the invisible operating system underneath it.`,
        `The second mistake is judging too early. Many worthwhile systems need enough impressions, crawls, conversations or conversions before the signal is useful. That does not mean waiting blindly. It means setting a fair test window, agreeing on leading indicators, and changing direction only when the evidence is strong. Good growth work is decisive, but it is not impulsive. The goal is to learn faster than competitors without letting noise masquerade as insight.`,
      ],
    },
  ];
}

