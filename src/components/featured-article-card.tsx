import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Frontmatter } from "@/types/mdx";
import { RiArrowRightLine, RiCalendarLine, RiTimeLine } from "@remixicon/react";
import { useLocale, useTranslations } from "next-intl";

interface FeaturedArticleCardProps {
  article: Frontmatter;
}

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <article
      className={cn(
        "group/card relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300",
        "bg-white border-neutral-200 shadow-sm [.dark_&]:bg-neutral-900 [.dark_&]:border-neutral-700/80 [.dark_&]:shadow-lg [.dark_&]:shadow-black/20",
        "hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent-500/5 [.dark_&]:hover:shadow-xl [.dark_&]:hover:shadow-black/30",
      )}
    >
      <div
        className={cn(
          "animate-shine absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full border bg-[length:200%_100%] px-3 py-1 text-xs font-medium",
          "bg-accent-500/15 text-accent-600 border-accent-500/25 [.dark_&]:text-accent-400 [.dark_&]:border-accent-500/30",
        )}
      >
        {t("featured")}
      </div>

      <div className="from-accent-500/5 to-accent-500/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

      <div className="relative z-10 space-y-4 p-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <RiCalendarLine className="h-4 w-4" />
            <time>
              {new Date(article.publishedAt).toLocaleDateString(locale, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <RiTimeLine className="h-4 w-4" />
            <span>
              {t("reading_time", {
                count: Math.max(1, Math.round(article.readingTime || 0)),
              })}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href={`/blog/${article.slug}`}
            className="group/title block cursor-pointer"
          >
            <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-neutral-900 transition-colors duration-200 group-hover/title:text-accent-600 md:text-3xl [.dark_&]:text-neutral-50 [.dark_&]:group-hover/title:text-accent-400">
              {article.title}
            </h3>
          </Link>

          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500 [.dark_&]:text-neutral-400">
            {article.abstract}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {article.topics?.map((tag) => (
              <Link
                key={tag.slug}
                href={`/topics/${tag.slug}`}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium transition-colors",
                  "bg-neutral-100/80 text-neutral-600 hover:bg-accent-500/15 hover:text-accent-600 hover:border-accent-500/30",
                  "border-neutral-200/80 [.dark_&]:bg-neutral-800/60 [.dark_&]:text-neutral-400 [.dark_&]:hover:bg-accent-500/15 [.dark_&]:hover:text-accent-400 [.dark_&]:border-neutral-700/80",
                )}
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="group/link hidden items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent-600 md:flex [.dark_&]:text-neutral-400 [.dark_&]:hover:text-accent-400"
          >
            <span>{t("read_more")}</span>
            <RiArrowRightLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className={cn(
            "group/link flex items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition-colors md:hidden",
            "border-neutral-300/70 bg-neutral-100/80 text-neutral-600 hover:border-accent-500/40 hover:bg-accent-500/10 hover:text-accent-600",
            "[.dark_&]:border-neutral-700/70 [.dark_&]:bg-neutral-800/50 [.dark_&]:text-neutral-300 [.dark_&]:hover:border-accent-500/40 [.dark_&]:hover:bg-accent-500/15 [.dark_&]:hover:text-accent-400",
          )}
        >
          <span>{t("read_more")}</span>
          <RiArrowRightLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>

      <div className="border-accent-500/20 pointer-events-none absolute inset-0 rounded-xl border opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
    </article>
  );
}
