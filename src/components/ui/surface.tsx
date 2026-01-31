import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Highlighted box (callout, focus) — soft background and subtle border */
interface SurfaceProps {
  children: ReactNode;
  className?: string;
}

export function Surface({ children, className }: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        "bg-neutral-100/80 border-neutral-200/60 [.dark_&]:bg-neutral-800/50 [.dark_&]:border-neutral-700/60",
        className,
      )}
    >
      {children}
    </div>
  );
}
