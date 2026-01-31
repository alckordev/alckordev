import { Card, cardStyles, Badge } from "@/components/ui";
import { cn } from "@/lib/cn";
import { GitHubRepository } from "@/types/github";
import {
  RiArrowRightUpLine,
  RiGithubLine,
  RiStackLine,
  RiStarFill,
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
    <Card className="group/card rounded-xl">
      <div className={cardStyles.gradientOverlay} />
      <div className="relative space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex-shrink-0 text-neutral-500 [.dark_&]:text-neutral-400">
              <RiStackLine className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <a
                href={repo.homepageUrl || repo.url}
                target="_blank"
                rel="noopener"
                className="group/title flex items-center gap-2 font-semibold text-neutral-900 transition-colors hover:text-accent-600 [.dark_&]:text-neutral-50 [.dark_&]:hover:text-accent-400"
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
              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700 [.dark_&]:hover:bg-neutral-800 [.dark_&]:hover:text-neutral-200"
            >
              <RiGithubLine className="h-4 w-4" />
            </a>
            <div
              className={cn(
                "animate-shine flex items-center gap-1 rounded-full bg-[length:200%_100%] px-2 py-1 text-xs font-medium",
                "bg-[linear-gradient(110deg,var(--color-neutral-200),45%,var(--color-neutral-100),55%,var(--color-neutral-200))] [.dark_&]:bg-[linear-gradient(110deg,var(--color-neutral-800),45%,var(--color-neutral-700),55%,var(--color-neutral-800))]",
                "border border-neutral-200/60 [.dark_&]:border-neutral-700/60",
              )}
            >
              <RiStarFill className="h-3 w-3 text-accent-500" />
              <span className="text-neutral-600 [.dark_&]:text-neutral-300">
                {repo.stargazerCount}
              </span>
            </div>
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-neutral-500 [.dark_&]:text-neutral-400">
          {repo.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {repo.languages.edges.map((edge, i) => (
              <Badge key={i} variant="muted">
                {edge.node.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 [.dark_&]:text-neutral-400">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                isRecentlyUpdated ? "animate-pulse bg-green-500" : "bg-accent-500",
              )}
            />
            <span>{isRecentlyUpdated ? t("updated") : t("stable")}</span>
          </div>
        </div>
      </div>
      <div className={cardStyles.bottomLine} />
    </Card>
  );
};
