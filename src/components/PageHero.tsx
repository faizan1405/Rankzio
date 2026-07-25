import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { MagneticButton } from "./MagneticButton";

interface Props {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  crumbs: Crumb[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  variant?: "split" | "center" | "showcase";
}

/**
 * Unified page hero — three composition variants so each route can look
 * completely different while sharing type/color/animation language.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  crumbs,
  primary,
  secondary,
  variant = "split",
}: Props) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-80" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.62 0.18 245 / 0.25), transparent 70%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.72 0.19 155 / 0.25), transparent 70%)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Breadcrumbs items={crumbs} />

        {variant === "center" ? (
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Ctas primary={primary} secondary={secondary} center />
            <MaskedImage src={image} alt={imageAlt} className="mt-16" />
          </div>
        ) : variant === "showcase" ? (
          <div>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Title>{title}</Title>
              <Description>{description}</Description>
              <Ctas primary={primary} secondary={secondary} center />
            </div>
            <MaskedImage src={image} alt={imageAlt} className="mt-14" aspect="aspect-[16/8]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <Title>{title}</Title>
              <Description>{description}</Description>
              <Ctas primary={primary} secondary={secondary} />
            </div>
            <MaskedImage src={image} alt={imageAlt} aspect="aspect-[5/4]" />
          </div>
        )}
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground/75"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
      {children}
    </motion.div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
    >
      {children}
    </motion.h1>
  );
}

function Description({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15 }}
      className="mt-6 text-lg text-foreground/70 md:text-xl"
    >
      {children}
    </motion.p>
  );
}

function Ctas({
  primary,
  secondary,
  center,
}: {
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  center?: boolean;
}) {
  if (!primary && !secondary) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3 }}
      className={`mt-9 flex flex-wrap items-center gap-4 ${center ? "justify-center" : ""}`}
    >
      {primary && (
        <MagneticButton href={primary.href} variant="primary" className="px-7 py-4 text-sm">
          {primary.label}
        </MagneticButton>
      )}
      {secondary && (
        <MagneticButton href={secondary.href} variant="secondary" className="px-7 py-4 text-sm">
          {secondary.label}
        </MagneticButton>
      )}
    </motion.div>
  );
}

function MaskedImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[5/4]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl shadow-float ${className}`}
    >
      <div className={`${aspect} w-full`}>
        <img
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 60%, oklch(0.995 0.003 220 / 0.35))",
        }}
      />
    </motion.div>
  );
}
