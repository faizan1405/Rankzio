import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Brain, Code2, Search, Target, Bot, PenTool, ArrowRight } from "lucide-react";

const items = [
  { icon: Brain, title: "AI-First Strategies", body: "Every plan is stress-tested by models trained on thousands of winning campaigns." },
  { icon: Code2, title: "Premium Website Development", body: "Sites engineered for speed, story and search — not templates dressed up as design." },
  { icon: Search, title: "Organic SEO Growth", body: "Topical authority, technical excellence and content velocity that compounds." },
  { icon: Target, title: "Performance Marketing", body: "Meta, Google and beyond — creative and bidding tuned by data, not vibes." },
  { icon: Bot, title: "Automation & Chatbots", body: "24/7 assistants that qualify, answer and book — trained on your business." },
  { icon: PenTool, title: "Creative Content", body: "Editorial-grade copy, video and design produced at agency-plus-AI speed." },
];

function TiltCard({ i, item }: { i: number; item: typeof items[number] }) {
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

  const Icon = item.icon;
  return (
    <Reveal delay={i * 0.06}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8 }}
        className="group relative h-full rounded-3xl p-[1.5px] transition-shadow duration-500 hover:shadow-glow-brand"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div className="relative h-full rounded-[calc(1.5rem-1.5px)] glass p-8 [transform:translateZ(0)]">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-brand transition-transform duration-500 group-hover:rotate-6">
            <Icon size={26} strokeWidth={1.75} />
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/65">{item.body}</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground/50 transition-colors group-hover:text-foreground">
            <span className="opacity-0 -translate-x-2 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">Learn more</span>
            <ArrowRight size={16} className="opacity-0 -translate-x-4 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function WhyChooseUs() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal><SectionEyebrow>Why Rank Zio</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
              Built for brands that refuse to <span className="text-gradient-brand">plateau</span>.
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <TiltCard key={it.title} i={i} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}
