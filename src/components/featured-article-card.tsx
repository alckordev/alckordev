// src/components/featured-article-card.tsx
import { Link } from "@/i18n/navigation";
import { RiArrowRightLine, RiCalendarLine, RiTimeLine } from "@remixicon/react";

interface Article {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

interface FeaturedArticleCardProps {
  article: Article;
}

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  return (
    <article className="group border-border/50 from-card/80 to-card/40 hover:border-accent/30 hover:shadow-accent/5 relative overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      {/* Featured badge */}
      <div className="border-accent/30 bg-accent/10 text-accent absolute top-4 right-4 z-10 rounded-full border px-3 py-1 text-xs font-medium">
        Featured
      </div>

      {/* Gradient overlay */}
      <div className="from-accent/5 to-accent/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 space-y-4 p-6 md:p-8">
        {/* Metadata */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <RiCalendarLine className="h-3 w-3" />
            <time>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <RiTimeLine className="h-3 w-3" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <Link
            href={`/blog/${article.slug}`}
            className="group/title block cursor-pointer"
          >
            <h3 className="text-foreground group-hover/title:text-accent text-2xl leading-tight font-bold transition-colors duration-200 md:text-3xl">
              {article.title}
            </h3>
          </Link>

          <p className="text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Tags and Read More */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${tag.toLowerCase().replace(".", "").replace(" ", "-")}`}
                className="border-border/30 bg-secondary/20 text-muted-foreground hover:border-accent/30 hover:bg-accent/10 hover:text-accent cursor-pointer rounded-md border px-2 py-1 text-xs font-medium transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="group/read text-accent hover:text-accent/80 flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors duration-200"
          >
            <span>Read Article</span>
            <RiArrowRightLine className="h-4 w-4 transition-transform duration-200 group-hover/read:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="border-accent/20 pointer-events-none absolute inset-0 rounded-xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
