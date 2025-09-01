import { SupportCTA } from "@/components/support-cta";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { components } from "@/lib/mdx-components";
import { getPostInfo, getPostSource } from "@/lib/server/mdx";
import { getOpenGraph, getTwitter } from "@/lib/server/og";
import { Frontmatter, Scope } from "@/types/mdx";
import {
  RiArrowLeftLine,
  RiCalendarLine,
  RiLinkedinLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiTwitterXLine,
} from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("seo_article");

  const { slug } = await params;

  const source = getPostInfo(`blog/${locale}/${slug}`);

  const title = t("seo_title", { article: source?.title ?? "Test" });
  const description = source?.abstract || t("seo_description");
  const publishedAt = source?.publishedAt
    ? new Date(source.publishedAt)
    : new Date();

  return {
    title,
    description,
    openGraph: {
      ...getOpenGraph(title, description, locale),
      url: `${process.env.SITE_URL}/${locale}/blog/${slug}`,
      type: "article",
      authors: "@alckordev",
      publishedTime: publishedAt.toISOString(),
      tags: source?.topics?.map((t) => t.name).join(", "),
    },
    twitter: getTwitter(title, description),
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations();

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
      <nav className="mb-8">
        <Link
          href="/blog"
          className="group hover:text-accent-500 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors"
        >
          <RiArrowLeftLine className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{t("back_to_blog")}</span>
        </Link>
      </nav>

      <article className="space-y-8">
        <header className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {frontmatter.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-b border-neutral-500/20 pb-6">
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <RiCalendarLine className="h-4 w-4" />
              <time dateTime={frontmatter.publishedAt}>
                {new Date(frontmatter.publishedAt).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <RiTimeLine className="h-4 w-4" />
              <span>{Math.ceil(scope.readingTime || 0)} min read</span>
            </div>
            {frontmatter.topics && frontmatter.topics.length > 0 && (
              <div className="flex items-center gap-2">
                <RiPriceTag3Line className="h-4 w-4 text-neutral-500" />
                <div className="flex flex-wrap gap-1">
                  {frontmatter.topics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className={cn(
                        "group inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium transition-colors",
                        "hover:bg-accent-500/10! bg-neutral-200/30 [.dark_&]:bg-neutral-800/30",
                        "hover:text-accent-500! text-neutral-500",
                        "hover:border-accent-500/30! border-neutral-300/50 [.dark_&]:border-neutral-800/50",
                      )}
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="max-w-none">{content}</div>

        <footer className="border-t border-neutral-500/20 pt-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <h3 className="text-foreground text-lg font-semibold">
                {t("share_this_article")}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative inline-flex h-9 w-9 items-center justify-center rounded-lg",
                    "hover:border-accent-500/50 border border-neutral-300/50 [.dark_&]:border-neutral-800/50 [.dark_&]:hover:border-transparent",
                    "hover:bg-accent-500/10 [.dark_&]:hover:text-accent-500 text-neutral-500 hover:text-neutral-950",
                    "before:from-accent-500/20 before:to-accent-500/20 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 [.dark_&]:before:hidden",
                    "transition-all duration-200",
                  )}
                  title="Share on Twitter"
                >
                  <RiTwitterXLine className="h-4 w-4" />
                </a>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative inline-flex h-9 w-9 items-center justify-center rounded-lg",
                    "hover:border-accent-500/50 border border-neutral-300/50 [.dark_&]:border-neutral-800/50 [.dark_&]:hover:border-transparent",
                    "hover:bg-accent-500/10 [.dark_&]:hover:text-accent-500 text-neutral-500 hover:text-neutral-950",
                    "before:from-accent-500/20 before:to-accent-500/20 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 [.dark_&]:before:hidden",
                    "transition-all duration-200",
                  )}
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
