import { components } from "@/lib/mdx-components";
import { getPostSource } from "@/lib/server/mdx";
import { getOpenGraph, getTwitter } from "@/lib/server/og";
import { Frontmatter, Scope } from "@/types/mdx";
import { RiArrowLeftLine, RiCalendarLine, RiTimeLine } from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("seo_terms");

  const title = t("seo_title");
  const description = t("seo_description");

  return {
    title,
    description,
    openGraph: {
      ...getOpenGraph(title, description, locale, { includeImages: false }),
      url: `${process.env.SITE_URL}/${locale}/terms-of-service`,
    },
    twitter: getTwitter(title, description, { includeImages: false }),
  };
}

export default async function TermsOfService() {
  const locale = await getLocale();
  const t = await getTranslations();

  const source = await getPostSource(`policy/${locale}/terms-of-service`);

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
          href="/"
          className="group hover:text-accent-500 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors"
        >
          <RiArrowLeftLine className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{t("back_to_home")}</span>
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
          </div>
        </header>

        <div className="max-w-none">{content}</div>
      </article>
    </div>
  );
}
