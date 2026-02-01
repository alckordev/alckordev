import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

const cardBase =
  "relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 " +
  "bg-white border border-neutral-200 shadow-sm shadow-neutral-200/60 " +
  "[.dark_&]:bg-neutral-900 [.dark_&]:border-neutral-700/80 [.dark_&]:shadow-lg [.dark_&]:shadow-black/20 " +
  "hover:shadow-md hover:shadow-accent-500/5 hover:-translate-y-0.5 " +
  "[.dark_&]:hover:border-neutral-600/80 [.dark_&]:hover:shadow-xl [.dark_&]:hover:shadow-black/30";

export function Card({
  children,
  className,
  as: Component = "div",
}: CardProps) {
  return (
    <Component className={cn(cardBase, className)}>{children}</Component>
  );
}

export const cardStyles = {
  base: cardBase,
  gradientOverlay:
    "from-accent-500/5 to-accent-500/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100",
  bottomLine:
    "from-accent-500 via-accent-500/50 to-accent-500 absolute right-0 bottom-0 left-0 h-0.5 scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover/card:scale-x-100",
} as const;
