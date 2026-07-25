import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.to ? (
              <Link to={c.to} className="link-underline hover:text-foreground">
                {c.label}
              </Link>
            ) : (
              <span className="text-foreground/80">{c.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight size={12} className="text-foreground/40" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
