import { cn } from "@/lib/cn";
import { GitHubRepository } from "@/types/github";
import {
  RiArrowRightUpLine,
  RiGithubLine,
  RiStackLine,
  RiStarLine,
} from "@remixicon/react";
import { useTranslations } from "next-intl";

interface ProjectCardProps {
  repo: GitHubRepository;
}

export const ProjectCard = ({ repo }: ProjectCardProps) => {
  const t = useTranslations();

  const isRecentlyUpdated =
    Date.now() - new Date(repo.updatedAt).getTime() < 30 * 24 * 60 * 60 * 1000;

  return (
    <div
      className={cn(
        "group/card relative overflow-hidden rounded-lg backdrop-blur-sm duration-300",
        "bg-neutral-50/50 hover:bg-neutral-50 [.dark_&]:bg-neutral-950/50 [.dark_&]:hover:bg-neutral-950",
        "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
        "hover:shadow-accent-500/5 hover:shadow-lg",
      )}
    >
      <div className="from-accent-500/5 to-accent-500/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

      <div className="relative space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex-shrink-0">
              {/* <Image
                src="https://placehold.co/32"
                alt="Project logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-md"
              /> */}
              <RiStackLine className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <a
                href={repo.homepageUrl || repo.url}
                target="_blank"
                rel="noopener"
                className="group/title hover:text-accent-500 flex items-center gap-2 font-semibold transition-colors"
              >
                <span className="truncate">{repo.name}</span>
                <RiArrowRightUpLine className="h-3.5 w-3.5 flex-shrink-0 opacity-60 transition-all duration-200 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:opacity-100" />
              </a>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener"
              title={t("view_on_github")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                "hover:bg-neutral-200 [.dark_&]:hover:bg-neutral-900",
                "text-neutral-500",
              )}
            >
              <RiGithubLine className="h-4 w-4" />
            </a>
            <div
              className={cn(
                "animate-shine flex items-center gap-1 rounded-full bg-[length:200%_100%] px-2 py-1 text-xs font-medium",
                "bg-[linear-gradient(110deg,var(--color-neutral-200),45%,var(--color-neutral-100),55%,var(--color-neutral-200))]",
                "[.dark_&]:bg-[linear-gradient(110deg,var(--color-neutral-900),45%,var(--color-neutral-800),55%,var(--color-neutral-900))]",
                "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
              )}
            >
              <RiStarLine className="text-accent-500 h-3 w-3" />
              <span>{repo.stargazerCount}</span>
            </div>
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-neutral-500">
          {repo.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {repo.languages.edges.map((edge, i) => (
              <span
                key={i}
                className={cn(
                  "inline-flex items-center space-x-2 rounded-md px-2 py-1 text-xs font-medium text-neutral-500",
                  "bg-neutral-200/30 [.dark_&]:bg-neutral-800/30",
                  "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
                )}
              >
                <span>{edge.node.name}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                isRecentlyUpdated
                  ? "animate-pulse bg-green-500"
                  : "bg-blue-500",
              )}
            />
            <span>{isRecentlyUpdated ? t("updated") : t("stable")}</span>
          </div>
        </div>
      </div>

      <div className="from-accent-500 via-accent-500/50 to-accent-500 absolute right-0 bottom-0 left-0 h-0.5 scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover/card:scale-x-100" />
    </div>
  );
};
