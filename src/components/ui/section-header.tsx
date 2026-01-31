import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 md:flex-row md:items-end md:justify-between md:px-4",
        className,
      )}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 [.dark_&]:text-neutral-50">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-neutral-500 [.dark_&]:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
