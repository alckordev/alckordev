import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "muted";
  className?: string;
}

const variants = {
  default:
    "bg-neutral-200/80 text-neutral-700 border-neutral-300/60 [.dark_&]:bg-neutral-800/80 [.dark_&]:text-neutral-300 [.dark_&]:border-neutral-700/60",
  primary:
    "bg-accent-500/15 text-accent-600 border-accent-500/25 [.dark_&]:text-accent-400 [.dark_&]:border-accent-500/30",
  muted:
    "bg-neutral-100 text-neutral-600 border-neutral-200/80 [.dark_&]:bg-neutral-800/50 [.dark_&]:text-neutral-400 [.dark_&]:border-neutral-700/50",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-medium transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
