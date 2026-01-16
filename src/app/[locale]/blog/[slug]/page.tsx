import { SupportCTA } from "@/components/support-cta";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { components } from "@/lib/mdx-components";
import { getPostInfo, getPostSource, listSlugs } from "@/lib/server/mdx";
import { getOpenGraph, getTwitter } from "@/lib/server/og";
import { Frontmatter, Scope } from "@/types/mdx";
import {
  RiArrowLeftLine,
  RiCalendarLine,
  RiPriceTag3Line,
  RiTimeLine,
} from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import readingTime from "reading-time";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateStaticParams() {
  const locales = ["en", "es"];
  const params = [];

  for (const locale of locales) {
    const slugs = listSlugs(`blog/${locale}`);

    for (const slug of slugs) {
      params.push({ slug: slug.replace(`blog/${locale}/`, "") });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("seo_article");
  const { routing } = await import("@/i18n/routing");

  const { slug } = await params;

  const source = getPostInfo(`blog/${locale}/${slug}`);

  const title = t("seo_title", { article: source?.title ?? "Test" });
  const description = source?.abstract || t("seo_description");
  const publishedAt = source?.publishedAt
    ? new Date(source.publishedAt)
    : new Date();

  const canonicalUrl = `${process.env.SITE_URL}/${locale}/blog/${slug}`;

  // Build alternates object for all locales
  const alternatesLanguages: Record<string, string> = {};
  for (const altLocale of routing.locales) {
    const altPost = getPostInfo(`blog/${altLocale}/${slug}`);
    if (altPost) {
      alternatesLanguages[altLocale] =
        `${process.env.SITE_URL}/${altLocale}/blog/${slug}`;
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesLanguages,
    },
    openGraph: {
      ...getOpenGraph(title, description, locale),
      url: canonicalUrl,
      type: "article",
      authors: "@alckordev",
      publishedTime: publishedAt.toISOString(),
      tags: source?.topics?.map((t) => t.name).join(", "),
    },
    twitter: getTwitter(title, description),
  };
}

function ArticleContentSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-4 w-3/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      <div className="h-4 w-4/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      <div className="h-4 w-4/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      <div className="h-4 w-2/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      <div className="my-6 h-32 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      <div className="h-4 w-3/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      <div className="h-4 w-4/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      <div className="h-4 w-4/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      <div className="h-4 w-2/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
    </div>
  );
}

async function ArticleContent({ source }: { source: string }) {
  const readingTimeMinutes = readingTime(source).minutes;

  const options: EvaluateOptions<Scope> = {
    parseFrontmatter: true,
    scope: {
      readingTime: readingTimeMinutes,
    },
    mdxOptions: {
      remarkPlugins: [remarkFlexibleToc, remarkGfm],
    },
    vfileDataIntoScope: "toc",
  };

  const { content } = await evaluate<Frontmatter, Scope>({
    source,
    options,
    components,
  });

  return <div className="max-w-none">{content}</div>;
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations();

  const { slug } = await params;

  const frontmatter = getPostInfo(`blog/${locale}/${slug}`);
  if (!frontmatter) notFound();

  const source = await getPostSource(`blog/${locale}/${slug}`);
  if (!source) notFound();

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
              <span>{Math.ceil(frontmatter.readingTime || 0)} min read</span>
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

        <Suspense fallback={<ArticleContentSkeleton />}>
          <ArticleContent source={source} />
        </Suspense>

        <footer className="border-t border-neutral-500/20 pt-8">
          <div className="space-y-6">
            <SupportCTA />
          </div>
        </footer>
      </article>
    </div>
  );
}
