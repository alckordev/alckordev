import { Card, cardStyles, Badge } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Frontmatter } from "@/types/mdx";
import { RiArrowRightLine, RiCalendarLine, RiTimeLine } from "@remixicon/react";
import { useLocale, useTranslations } from "next-intl";
import { memo } from "react";

interface ArticleCardProps {
  article: Frontmatter;
}

const topicLinkClass =
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium transition-colors " +
  "bg-neutral-200/60 text-neutral-600 hover:bg-accent-500/15 hover:text-accent-600 hover:border-accent-500/30 " +
  "border-neutral-300/50 [.dark_&]:bg-neutral-800/60 [.dark_&]:text-neutral-400 [.dark_&]:hover:bg-accent-500/15 [.dark_&]:hover:text-accent-400 [.dark_&]:hover:border-accent-500/30 [.dark_&]:border-neutral-700/50";

export const ArticleCard = memo(function ArticleCard({
  article,
}: ArticleCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <Card as="article" className="group/card rounded-xl">
      <div className={cardStyles.gradientOverlay} />
      <div className="relative space-y-4 p-4">
        <div className="flex items-center gap-4 text-xs text-neutral-500 [.dark_&]:text-neutral-400">
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
          {article.highlighted && (
            <Badge variant="primary" className="ml-auto">
              {t("new")}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <Link href={`/blog/${article.slug}`} className="group/title block">
            <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-neutral-900 transition-colors group-hover/title:text-accent-600 [.dark_&]:text-neutral-50 [.dark_&]:group-hover/title:text-accent-400">
              {article.title}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 [.dark_&]:text-neutral-400">
            {article.abstract}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {article.topics?.map((tag) => (
              <Link
                key={tag.slug}
                href={`/topics/${tag.slug}`}
                className={topicLinkClass}
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
      <div className={cardStyles.bottomLine} />
    </Card>
  );
}, (prev, next) => prev.article.slug === next.article.slug);
