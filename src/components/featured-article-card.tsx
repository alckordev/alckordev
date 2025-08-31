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
        "group/card relative overflow-hidden rounded-lg backdrop-blur-sm duration-300",
        "bg-neutral-50/50 hover:bg-neutral-50 [.dark_&]:bg-neutral-950/50 [.dark_&]:hover:bg-neutral-950",
        "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
        "hover:shadow-accent-500/5 hover:shadow-lg",
      )}
    >
      <div
        className={cn(
          "animate-shine absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-[length:200%_100%] px-3 py-1 text-xs font-medium",
          "bg-[linear-gradient(110deg,#ffe29c4d,45%,#d6961608,55%,#ffe29c4d)]",
          "[.dark_&]:bg-[linear-gradient(110deg,#fbb20323,45%,#ffa50033,55%,#fbb20323)]",
          "border-accent-500/20 text-accent-500 border",
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
            <h3 className="group-hover/title:text-accent line-clamp-2 text-2xl leading-tight font-bold transition-colors duration-200 md:text-3xl">
              {article.title}
            </h3>
          </Link>

          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500">
            {article.abstract}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {article.topics?.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/topics/${tag.slug}`}
                className={cn(
                  "group inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium transition-colors",
                  "hover:bg-accent-500/10! bg-neutral-200/30 [.dark_&]:bg-neutral-800/30",
                  "hover:text-accent-500! text-neutral-500",
                  "hover:border-accent-500/30! border-neutral-300/50 [.dark_&]:border-neutral-800/50",
                )}
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="group/link text-accent-500 hidden items-center gap-2 text-sm font-medium transition-colors md:flex"
          >
            <span>{t("read_more")}</span>
            <RiArrowRightLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className={cn(
            "group/link hover:text-accent-500 flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition-colors md:hidden",
            "hover:bg-accent-500/10! bg-neutral-300/30 [.dark_&]:bg-neutral-800/30",
            "hover:border-accent-500/50! border-neutral-300/50 [.dark_&]:border-neutral-800/50",
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
