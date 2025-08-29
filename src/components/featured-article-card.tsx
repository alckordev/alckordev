import { Link } from "@/i18n/navigation";
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
    <article className="group border-border/50 from-card/80 to-card/40 hover:border-accent/30 hover:shadow-accent/5 relative overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      {/* Featured badge */}
      <div className="border-accent/30 text-accent animate-shine absolute top-4 right-4 z-10 rounded-full border bg-[linear-gradient(110deg,hsl(var(--accent)/0.1),35%,hsl(var(--accent)/0.3),50%,hsl(var(--accent)/0.3),65%,hsl(var(--accent)/0.1))] bg-[length:200%_100%] px-3 py-1 text-xs font-medium">
        {t("featured")}
      </div>

      {/* Gradient overlay */}
      <div className="from-accent/5 to-accent/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 space-y-4 p-4">
        {/* Metadata */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
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

        {/* Content */}
        <div className="space-y-3">
          <Link
            href={`/blog/${article.slug}`}
            className="group/title block cursor-pointer"
          >
            <h3 className="text-foreground group-hover/title:text-accent line-clamp-2 text-2xl leading-tight font-bold transition-colors duration-200 md:text-3xl">
              {article.title}
            </h3>
          </Link>

          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {article.abstract}
          </p>
        </div>

        {/* Tags and Read More */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {article.topics?.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/topics/${tag.slug}`}
                className="border-border/30 bg-secondary/20 text-muted-foreground hover:border-accent/30 hover:bg-accent/10 hover:text-accent cursor-pointer rounded-md border px-2 py-1 text-xs font-medium transition-colors duration-200"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="group/read text-accent hover:text-accent/80 hidden cursor-pointer items-center gap-2 text-sm font-medium transition-colors duration-200 md:flex"
          >
            <span>{t("read_more")}</span>
            <RiArrowRightLine className="h-4 w-4 transition-transform duration-200 group-hover/read:translate-x-1" />
          </Link>
        </div>

        {/* Mobile read more */}
        <Link
          href={`/blog/${article.slug}`}
          className="border-border/50 bg-secondary/30 text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition-colors md:hidden"
        >
          <span>{t("read_more")}</span>
          <RiArrowRightLine className="h-4 w-4" />
        </Link>
      </div>

      {/* Hover border effect */}
      <div className="border-accent/20 pointer-events-none absolute inset-0 rounded-xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
