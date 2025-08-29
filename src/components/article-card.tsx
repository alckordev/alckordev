import { Link } from "@/i18n/navigation";
import {
  RiArrowRightLongLine,
  RiCalendarLine,
  RiTimeLine,
} from "@remixicon/react";

interface Article {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface ArticleCardProps {
  article?: Article;
}

const defaultArticle: Article = {
  title: "How to Fix Hydration Errors with next-themes in Next.js (App Router)",
  excerpt:
    "Resolve the hydration mismatch warnings caused by next-themes in Next 13/14 projects using the App Router. Learn how to create an SSR-friendly ThemeProvider and consume it in any client component via the useTheme hook.",
  slug: "hydration-errors-next-themes",
  date: "2024-12-15",
  readTime: "5 min read",
  tags: ["Next.js", "React", "SSR"],
};

export function ArticleCard({ article = defaultArticle }: ArticleCardProps) {
  return (
    <article className="group border-border/50 bg-card/30 hover:border-border hover:bg-card/60 relative overflow-hidden rounded-lg border backdrop-blur-sm transition-all duration-300 hover:shadow-md">
      {/* Subtle gradient overlay on hover */}
      <div className="from-accent/5 to-accent/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative space-y-4 p-4">
        {/* Article metadata */}
        <div className="text-muted-foreground flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <RiCalendarLine className="h-3 w-3" />
            <time>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <RiTimeLine className="h-3 w-3" />
            <span>{article.readTime}</span>
          </div>
          <div className="bg-accent/10 text-accent ml-auto rounded-full px-2 py-0.5 font-medium">
            New
          </div>
        </div>

        {/* Title and description */}
        <div className="space-y-2">
          <Link href={`/blog/${article.slug}`} className="group/title block">
            <h3 className="text-foreground group-hover/title:text-accent line-clamp-2 text-lg leading-tight font-semibold transition-colors">
              {article.title}
            </h3>
          </Link>

          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Tags and read more */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${tag.toLowerCase().replace(".", "")}`}
                className="border-border/30 bg-secondary/20 text-muted-foreground hover:border-accent/30 hover:bg-accent/10 hover:text-accent inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Read more button */}
          <Link
            href={`/blog/${article.slug}`}
            className="group/read text-muted-foreground hover:text-accent hidden items-center gap-1 text-sm font-medium transition-colors md:flex"
          >
            <span>Read</span>
            <RiArrowRightLongLine className="h-4 w-4 transition-transform group-hover/read:translate-x-1" />
          </Link>
        </div>

        {/* Mobile read more */}
        <Link
          href={`/blog/${article.slug}`}
          className="border-border/50 bg-secondary/30 text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition-colors md:hidden"
        >
          <span>Read Article</span>
          <RiArrowRightLongLine className="h-4 w-4" />
        </Link>
      </div>

      {/* Hover indicator */}
      <div className="from-accent via-accent/50 to-accent absolute right-0 bottom-0 left-0 h-0.5 scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100" />
    </article>
  );
}
