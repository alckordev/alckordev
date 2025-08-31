import { SupportCTA } from "@/components/support-cta";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { components } from "@/lib/mdx-components";
import { getPostSource } from "@/lib/server/mdx";
import { Frontmatter, Scope } from "@/types/mdx";
import {
  RiArrowLeftLine,
  RiCalendarLine,
  RiLinkedinLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiTwitterXLine,
} from "@remixicon/react";
import { getLocale } from "next-intl/server";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const { slug } = await params;

  const source = await getPostSource(`blog/${locale}/${slug}`);

  if (!source) notFound();

  const options: EvaluateOptions<Scope> = {
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source).minutes,
    },
    mdxOptions: {
      remarkPlugins: [remarkFlexibleToc, remarkGfm],
    },
    vfileDataIntoScope: "toc",
  };

  const { frontmatter, scope, content } = await evaluate<Frontmatter, Scope>({
    source,
    options,
    components,
  });

  return (
    <div className="relative">
      {/* Back Navigation */}
      <nav className="mb-8">
        <Link
          href="/blog"
          className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
        >
          <RiArrowLeftLine className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Blog</span>
        </Link>
      </nav>

      <article className="space-y-8">
        {/* Article Header */}
        <header className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {frontmatter.title}
            </h1>
          </div>

          {/* Article Meta */}
          <div className="border-border/50 flex flex-wrap items-center gap-4 border-b pb-6">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <RiCalendarLine className="h-4 w-4" />
              <time dateTime={frontmatter.publishedAt}>
                {new Date(frontmatter.publishedAt).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <RiTimeLine className="h-4 w-4" />
              <span>{Math.ceil(scope.readingTime || 0)} min read</span>
            </div>

            {frontmatter.topics && frontmatter.topics.length > 0 && (
              <div className="flex items-center gap-2">
                <RiPriceTag3Line className="text-muted-foreground h-4 w-4" />
                <div className="flex flex-wrap gap-1">
                  {frontmatter.topics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/blog/tags/${topic.slug}`}
                      className="border-border/50 bg-secondary/30 text-muted-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent rounded-md border px-2 py-1 text-xs font-medium transition-colors"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-neutral [.dark_&]:prose-invert max-w-none">
          {content}
        </div>

        {/* Article Footer */}
        <footer className="border-border/50 border-t pt-8">
          <div className="space-y-6">
            {/* Share Section */}
            <div className="flex items-center justify-between">
              <h3 className="text-foreground text-lg font-semibold">
                Share this article
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative inline-flex h-9 w-9 items-center justify-center rounded-lg",
                    "border-border/50 hover:border-accent/50 border",
                    "text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200",
                    "before:from-accent/20 before:to-accent/20 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 [.dark_&]:before:hidden",
                  )}
                  title="Share on Twitter"
                >
                  <RiTwitterXLine className="h-4 w-4" />
                </a>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border/50 text-muted-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent flex h-10 w-10 items-center justify-center rounded-lg border transition-colors"
                  title="Share on LinkedIn"
                >
                  <RiLinkedinLine className="h-4 w-4" />
                </a>
              </div>
            </div>

            <SupportCTA />
          </div>
        </footer>
      </article>
    </div>
  );
}
