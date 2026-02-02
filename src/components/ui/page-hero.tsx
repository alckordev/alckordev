import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface PageHeroProps {
  icon?: ReactNode;
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  highlight?: ReactNode;
  className?: string;
}

export function PageHero({
  icon,
  label,
  title,
  description,
  highlight,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        "timeline-view animate-fade-in-up animate-range-cover max-w-2xl",
        className,
      )}
    >
      {(icon || label) && (
        <div className="mb-6 flex items-center gap-3">
          {icon && (
            <span className="text-2xl [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-accent-500">
              {icon}
            </span>
          )}
          {label && (
            <span className="text-sm font-medium text-neutral-500 [.dark_&]:text-neutral-400">
              {label}
            </span>
          )}
        </div>
      )}

      <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 [.dark_&]:text-neutral-50 md:text-5xl lg:text-6xl">
        {title}
      </h1>

      {(description || highlight) && (
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-neutral-500 [.dark_&]:text-neutral-400">
          {description}
          {highlight && (
            <div
              className={cn(
                "inline-flex items-center gap-3 rounded-xl ps-4 pe-5 py-3",
                "bg-accent-500/10 border border-accent-500/20 [.dark_&]:bg-accent-500/10 [.dark_&]:border-accent-500/20",
              )}
            >
              {highlight}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
