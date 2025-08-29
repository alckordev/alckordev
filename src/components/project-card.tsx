import {
  RiArrowRightUpLongLine,
  RiGithubLine,
  RiStarLine,
} from "@remixicon/react";
import Image from "next/image";

export const ProjectCard = () => {
  return (
    <div className="group/card border-border/50 bg-card/50 hover:border-border hover:bg-card hover:shadow-accent/5 relative overflow-hidden rounded-lg border backdrop-blur-sm duration-300 hover:shadow-lg">
      {/* Subtle gradient overlay on hover - similar to article card */}
      <div className="from-accent/5 to-accent/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

      <div className="relative space-y-4 p-4">
        {/* Header: Logo + Title + Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="relative flex-shrink-0">
              <Image
                src="https://placehold.co/32"
                alt="Project logo"
                width={32}
                height={32}
                className="border-border/50 h-8 w-8 rounded-md border"
              />
              <div className="bg-accent/20 absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
            </div>

            <div className="min-w-0 flex-1">
              <a
                href="/"
                target="_blank"
                rel="noopener"
                className="group/title text-foreground hover:text-accent flex items-center gap-2 font-semibold transition-colors"
              >
                <span className="truncate">culqi-nodejs</span>
                <RiArrowRightUpLongLine className="h-3.5 w-3.5 flex-shrink-0 opacity-60 transition-all duration-200 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:opacity-100" />
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <div className="border-border/50 animate-shine flex items-center gap-1 rounded-full border bg-[linear-gradient(110deg,hsl(var(--secondary)/0.5),45%,hsl(var(--secondary)/0.8),55%,hsl(var(--secondary)/0.5))] bg-[length:200%_100%] px-2 py-1 text-xs font-medium">
              <RiStarLine className="text-accent h-3 w-3" />
              <span>127</span>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              title="View on GitHub"
              className="text-muted-foreground hover:bg-secondary hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
            >
              <RiGithubLine className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground line-clamp-2 text-sm">
          🍞 A beautiful notification library for React and modern web apps with
          TypeScript support.
        </p>

        {/* Tech stack + Status */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {["TypeScript", "React", "Tailwind"].map((tech) => (
              <span
                key={tech}
                className="border-border/50 bg-secondary/30 text-muted-foreground inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span>Updated</span>
          </div>
        </div>
      </div>

      {/* Hover indicator - similar to article card */}
      <div className="from-accent via-accent/50 to-accent absolute right-0 bottom-0 left-0 h-0.5 scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover/card:scale-x-100" />
    </div>
  );
};
