import { experiences } from "@/consts/experiences";
import { cn } from "@/lib/cn";
import { RiArrowRightUpLine, RiBriefcaseLine } from "@remixicon/react";
import { useTranslations } from "next-intl";

export const Timeline = () => {
  const t = useTranslations();

  return (
    <div className="relative">
      <div className="from-accent-500 absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b via-neutral-200 to-transparent [.dark_&]:via-neutral-800" />

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <div key={i} className="group relative pl-12">
            <div className="absolute top-4 left-0.25 flex h-8 w-8 items-center justify-center">
              <div className="border-accent-500 bg-background group-hover:border-accent-500 group-hover:shadow-accent-500/25 h-5 w-5 rounded-full border-2 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg">
                <div className="bg-accent-500/20 group-hover:bg-accent-500/40 h-full w-full rounded-full transition-all duration-300" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <RiBriefcaseLine className="text-accent h-4 w-4" />
              </div>
            </div>

            <div
              className={cn(
                "rounded-lg p-4 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md",
                "bg-neutral-50/50 hover:bg-neutral-50 [.dark_&]:bg-neutral-950/50 [.dark_&]:hover:bg-neutral-950",
                "group-hover:border-border border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
              )}
            >
              <div
                className={cn(
                  "mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs font-medium",
                  "bg-neutral-200 text-neutral-600 [.dark_&]:bg-neutral-900 [.dark_&]:text-neutral-400",
                  "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
                )}
              >
                <span>{exp.startYear}</span>
                <span className="text-neutral-600/30 [.dark_&]:text-neutral-400/30">
                  —
                </span>
                <span>{exp.endYear ? exp.endYear : t("present")}</span>
                {!exp.endYear && (
                  <div className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="group-hover:text-accent-500 text-lg font-semibold tracking-tight transition-colors">
                  {exp.role}
                </h3>

                <a
                  href={exp.company.url}
                  target="_blank"
                  rel="noopener"
                  className="group/company hover:text-accent-500! inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors [.dark_&]:text-neutral-400"
                >
                  <span>{exp.company.name}</span>
                  <RiArrowRightUpLine className="h-3 w-3 transition-transform group-hover/company:translate-x-0.5 group-hover/company:-translate-y-0.5" />
                </a>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {exp.description}
              </p>
            </div>

            {i < experiences.length - 1 && (
              <div className="from-accent-500 absolute top-12 left-4 h-8 w-0.5 bg-gradient-to-b to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
