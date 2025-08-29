import { experiences } from "@/consts/experiences";
import { RiArrowRightUpLongLine, RiBriefcaseLine } from "@remixicon/react";

export const Timeline = () => {
  return (
    <div className="relative">
      {/* Timeline line with gradient */}
      <div className="from-accent via-border absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b to-transparent" />

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <div key={i} className="group relative pl-12">
            {/* Timeline dot with animation */}
            <div className="absolute top-2 left-0 flex h-8 w-8 items-center justify-center">
              <div className="border-accent bg-background group-hover:border-accent group-hover:shadow-accent/25 h-4 w-4 rounded-full border-2 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg">
                <div className="bg-accent/20 group-hover:bg-accent/40 h-full w-full rounded-full transition-all duration-300" />
              </div>

              {/* Icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <RiBriefcaseLine className="text-accent h-3 w-3" />
              </div>
            </div>

            {/* Content card */}
            <div className="border-border/50 bg-card/30 group-hover:border-border group-hover:bg-card/60 rounded-lg border p-4 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md">
              {/* Date badge */}
              <div className="border-border/50 bg-secondary/50 text-muted-foreground mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-medium">
                <span>{exp.startYear}</span>
                <span className="text-border">—</span>
                <span>{exp.endYear ? exp.endYear : "Present"}</span>
                {!exp.endYear && (
                  <div className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                )}
              </div>

              {/* Role and company */}
              <div className="space-y-2">
                <h3 className="text-foreground group-hover:text-accent text-lg font-semibold tracking-tight transition-colors">
                  {exp.role}
                </h3>

                <a
                  href={exp.company.url}
                  target="_blank"
                  rel="noopener"
                  className="group/company text-muted-foreground hover:text-accent inline-flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  <span>{exp.company.name}</span>
                  <RiArrowRightUpLongLine className="h-3 w-3 transition-transform group-hover/company:translate-x-0.5 group-hover/company:-translate-y-0.5" />
                </a>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {exp.description}
              </p>

              {/* Skills/Technologies (if available) */}
              {exp.technologies && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="border-border/30 bg-secondary/20 text-muted-foreground inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.technologies.length > 4 && (
                    <span className="border-border/30 bg-secondary/20 text-muted-foreground inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">
                      +{exp.technologies.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Connecting line to next item */}
            {i < experiences.length - 1 && (
              <div className="from-border/50 absolute top-12 left-4 h-8 w-0.5 bg-gradient-to-b to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
