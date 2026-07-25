import { motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-44">
      {/* animated gradient mesh */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-mesh"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* floating glass shapes */}
      {[
        { s: 240, l: "8%", t: "20%", d: 0 },
        { s: 180, l: "80%", t: "10%", d: 0.6 },
        { s: 320, l: "60%", t: "60%", d: 1.2 },
        { s: 140, l: "20%", t: "70%", d: 0.3 },
      ].map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-full glass opacity-70"
          style={{ width: b.s, height: b.s, left: b.l, top: b.t }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: b.d, ease: "easeInOut" }}
        />
      ))}
      {/* particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span key={i} className="absolute h-1 w-1 rounded-full bg-gradient-brand" style={{ left: `${(i * 47) % 100}%`, top: `${(i * 29) % 100}%` }} animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.2 }} />
      ))}

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
            Ready to grow your business with <span className="text-gradient-brand text-drift">AI</span>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/70">
            Book a free consultation and walk away with a clear, opinionated
            roadmap — whether we work together or not.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={waLink("Hi Rank Zio, I'd like to book a free consultation.")} variant="primary">
              Book Free Consultation
            </MagneticButton>
            <MagneticButton href={waLink("Hi Rank Zio!")} variant="secondary">
              Chat on WhatsApp
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
