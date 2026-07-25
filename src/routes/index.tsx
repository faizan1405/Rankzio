import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { HeroStats } from "@/components/HeroStats";
import { BrandStory } from "@/components/BrandStory";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { CaseStudies } from "@/components/CaseStudies";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { faqJsonLd } from "@/lib/structured-data";

import { SITE } from "@/lib/site-url";

const homepageFaq = [
  { q: "What makes Rank Zio Digital different from other agencies?", a: "We combine editorial-grade craft with AI-native workflows. Every deliverable is stress-tested by models and shipped by senior humans — so you get agency taste at studio speed." },
  { q: "How is AI used inside your services?", a: "AI handles research, drafting, testing and reporting so our strategists spend their time on positioning, story and conversion. It compresses timelines, not quality." },
  { q: "Do you offer a free consultation?", a: "Yes. Every engagement starts with a free 30-minute call where we audit your current setup, identify quick wins and outline a growth roadmap." },
  { q: "How quickly can we get started?", a: "Most clients kick off within a week of the initial call. Websites launch in 3–6 weeks; SEO and paid engagements go live in the first 7 days." },
  { q: "What industries do you specialise in?", a: "We work across DTC, SaaS, fintech, real estate, legal, wellness and creative services — anywhere premium storytelling and measurable growth matter." },
  { q: "How do you measure success?", a: "Every engagement ships with clear KPIs — revenue, pipeline, ROAS, organic growth or LTV — and a live dashboard you can check anytime." },
  { q: "Do I own the work you produce?", a: "Absolutely. All websites, content and creative assets are transferred to you at full ownership on project completion." },
  { q: "Can you work with existing teams or agencies?", a: "Yes. We frequently plug into in-house marketing teams as an extension — augmenting strategy, execution or creative firepower." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankzio — AI Marketing, SEO, Web & Automation That Compound" },
      { name: "description", content: "AI-first growth studio building premium websites, SEO systems, paid campaigns and automation that turn traffic into revenue. Based in Delhi, working worldwide." },
      { property: "og:title", content: "Rankzio — AI Marketing, SEO, Web & Automation That Compound" },
      { property: "og:url", content: `${SITE}/` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(homepageFaq)) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <HeroStats />
      <BrandStory />
      <WhyChooseUs />
      <Services />
      <Process />
      <Portfolio />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
