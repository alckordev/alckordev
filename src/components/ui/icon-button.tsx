"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "ghost" | "bordered";
  size?: "sm" | "md";
  className?: string;
}

const base =
  "inline-flex items-center justify-center rounded-lg transition-all duration-200 " +
  "text-neutral-600 hover:text-accent-600 [.dark_&]:text-neutral-400 [.dark_&]:hover:text-accent-400 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white [.dark_&]:focus-visible:ring-offset-neutral-950";

const variants = {
  ghost:
    "hover:bg-accent-500/10 [.dark_&]:hover:bg-accent-500/15",
  bordered:
    "border border-neutral-300/70 hover:border-accent-500/40 hover:bg-accent-500/10 [.dark_&]:border-neutral-700/70 [.dark_&]:hover:border-accent-500/40 [.dark_&]:hover:bg-accent-500/15",
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
};

export function IconButton({
  children,
  variant = "bordered",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
