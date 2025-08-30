import { Link } from "@/i18n/navigation";
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 xl:gap-12">
        {/* Main Content */}
        <main className="lg:col-span-3">
          <article className="space-y-8">
            {/* Article Header */}
            <header className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {frontmatter.title}
                </h1>

                {frontmatter.abstract && (
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {frontmatter.abstract}
                  </p>
                )}
              </div>

              {/* Article Meta */}
              <div className="border-border/50 flex flex-wrap items-center gap-4 border-b pb-6">
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <RiCalendarLine className="h-4 w-4" />
                  <time dateTime={frontmatter.publishedAt}>
                    {new Date(frontmatter.publishedAt).toLocaleDateString(
                      locale,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
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
            <div className="prose prose-neutral dark:prose-invert max-w-none">
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
                      // href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border/50 text-muted-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent flex h-10 w-10 items-center justify-center rounded-lg border transition-colors"
                      title="Share on Twitter"
                    >
                      <RiTwitterXLine className="h-4 w-4" />
                    </a>
                    <a
                      // href={linkedinShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border/50 text-muted-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent flex h-10 w-10 items-center justify-center rounded-lg border transition-colors"
                      title="Share on LinkedIn"
                    >
                      <RiLinkedinLine className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Back to Blog */}
                <div className="border-border/50 bg-secondary/20 rounded-lg border p-6">
                  <div className="space-y-3 text-center">
                    <h3 className="text-foreground text-lg font-semibold">
                      Enjoyed this article?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Check out more articles about web development, React, and
                      modern JavaScript.
                    </p>
                    <Link
                      href="/blog"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    >
                      <span>More Articles</span>
                      <RiArrowLeftLine className="h-4 w-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </article>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Table of Contents */}
            {scope.toc && (
              <div className="border-border/50 bg-card/30 rounded-lg border p-4">
                <h3 className="text-foreground mb-4 text-sm font-semibold">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {/* TOC will be rendered here based on your remarkFlexibleToc configuration */}
                  <div className="text-muted-foreground text-sm">
                    {/* This would need to be implemented based on your TOC structure */}
                    <p className="text-xs opacity-75">
                      TOC implementation needed
                    </p>
                  </div>
                </nav>
              </div>
            )}

            {/* Article Info */}
            <div className="border-border/50 bg-card/30 rounded-lg border p-4">
              <h3 className="text-foreground mb-4 text-sm font-semibold">
                Article Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span className="text-foreground">
                    {new Date(frontmatter.publishedAt).toLocaleDateString(
                      locale,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reading time</span>
                  <span className="text-foreground">
                    {Math.ceil(scope.readingTime || 0)} min
                  </span>
                </div>
                {frontmatter.topics && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Topics</span>
                    <span className="text-foreground">
                      {frontmatter.topics.length}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="border-border/50 bg-card/30 rounded-lg border p-4">
              <h3 className="text-foreground mb-4 text-sm font-semibold">
                Share
              </h3>
              <div className="flex gap-2">
                <a
                  // href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border/50 bg-secondary/30 text-muted-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-colors"
                >
                  <RiTwitterXLine className="h-3 w-3" />
                  <span>Twitter</span>
                </a>
                <a
                  // href={linkedinShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border/50 bg-secondary/30 text-muted-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-colors"
                >
                  <RiLinkedinLine className="h-3 w-3" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
