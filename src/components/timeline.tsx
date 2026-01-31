import { experiences } from "@/consts/experiences";
import { cn } from "@/lib/cn";
import { RiArrowRightUpLine, RiBriefcaseLine } from "@remixicon/react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "./ui";

export const Timeline = () => {
  const t = useTranslations();
  const locale = useLocale() as "en" | "es";

  return (
    <div className="relative">
      <div className="from-accent-500 absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b via-neutral-200 to-transparent [.dark_&]:via-neutral-800" />

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <div key={i} className="group relative pl-12">
            <div className="absolute top-4 left-0.25 flex h-8 w-8 items-center justify-center">
              <div className="border-accent-500 group-hover:border-accent-500 group-hover:shadow-accent-500/25 h-5 w-5 rounded-full border-2 bg-neutral-100 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg [.dark_&]:bg-neutral-950">
                <div className="bg-accent-500/20 group-hover:bg-accent-500/40 h-full w-full rounded-full transition-all duration-300" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <RiBriefcaseLine className="text-accent-500 h-4 w-4" />
              </div>
            </div>

            <div
              className={cn(
                "rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md",
                "bg-white/80 border-neutral-200/80 [.dark_&]:bg-neutral-900/80 [.dark_&]:border-neutral-800/80",
                "group-hover:border-accent-500/30 [.dark_&]:group-hover:border-accent-500/20",
              )}
            >
              <div
                className={cn(
                  "mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-medium",
                  "bg-neutral-100 text-neutral-600 [.dark_&]:bg-neutral-800 [.dark_&]:text-neutral-400",
                  "border-neutral-200/80 [.dark_&]:border-neutral-700/80",
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
                <h3 className="text-lg font-semibold tracking-tight text-neutral-900 transition-colors group-hover:text-accent-600 [.dark_&]:text-neutral-50 [.dark_&]:group-hover:text-accent-400">
                  {exp.role}
                </h3>

                <a
                  href={exp.company.url}
                  target="_blank"
                  rel="noopener"
                  className="group/company inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-accent-600 [.dark_&]:text-neutral-400 [.dark_&]:group-hover/company:text-accent-400"
                >
                  <span>{exp.company.name}</span>
                  <RiArrowRightUpLine className="h-3 w-3 transition-transform group-hover/company:translate-x-0.5 group-hover/company:-translate-y-0.5" />
                </a>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-500 [.dark_&]:text-neutral-400">
                {exp.description[locale]}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="muted">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
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
