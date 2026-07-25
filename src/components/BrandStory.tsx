import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import storyDashboard from "@/assets/story-dashboard.jpg";
import storyTeam from "@/assets/story-team.jpg";

function TiltImage({ src, alt, delay = 0, offsetY = 0 }: { src: string; alt: string; delay?: number; offsetY?: number }) {
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
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", y: offsetY }}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.3, delay, ease: [0.77, 0, 0.175, 1] }}
      className="group relative overflow-hidden rounded-3xl shadow-float will-change-transform"
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="block h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay }}
      />
      {/* glass reflection sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full"
      />
      {/* soft gradient ring on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-inset ring-white/30 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  );
}




export function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-32 md:py-44">
      {/* morphing white to gradient */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <Reveal>
            <SectionEyebrow>Our Story</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
              Traditional marketing is <span className="text-gradient-brand">breaking</span>.
              <br />
              We rebuilt it around AI.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-lg text-foreground/70">
              Rank Zio Digital was founded on a simple truth — attention is
              cheaper than ever, but trust has never been more expensive.
              Generic campaigns, guesswork budgets and dashboards nobody reads
              stopped working years ago.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 max-w-lg text-lg text-foreground/70">
              So we built a modern growth studio where machine intelligence
              writes, tests and optimises at scale — while our humans obsess
              over craft, story and conversion. The result is marketing that
              compounds, not campaigns that expire.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                ["AI-native", "workflows baked into every deliverable"],
                ["Human craft", "senior strategists on every account"],
                ["Compounding", "systems that improve week over week"],
              ].map(([t, s]) => (
                <div key={t} className="max-w-[180px]">
                  <div className="text-sm font-semibold text-gradient-brand">{t}</div>
                  <div className="mt-1 text-sm text-foreground/60">{s}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-2 gap-4 [perspective:1400px] md:gap-6">
          <TiltImage src={storyDashboard} alt="AI marketing analytics dashboard" />
          <TiltImage src={storyTeam} alt="Creative strategy team collaborating" delay={0.2} offsetY={40} />
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-gradient-brand opacity-20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
