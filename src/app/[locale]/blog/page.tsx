import { FeaturedArticleCard } from "@/components/featured-article-card";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { PageHero, SectionHeader } from "@/components/ui";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";
import { getPostsInfo, getAllTopics } from "@/lib/server/mdx";
import { getOpenGraph, getTwitter } from "@/lib/server/og";
import { RiBookOpenLine, RiPriceTag3Line } from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";

const InfiniteArticlesList = dynamic(
  () =>
    import("@/components/infinite-articles-list").then((m) => ({
      default: m.InfiniteArticlesList,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-8">
        <span className="text-sm text-neutral-500 [.dark_&]:text-neutral-400">
          Loading articles...
        </span>
      </div>
    ),
  },
);

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("seo_blog");
  const { routing } = await import("@/i18n/routing");

  const title = t("seo_title");
  const description = t("seo_description");

  const canonicalUrl = `${process.env.SITE_URL}/${locale}/blog`;

  // Build alternates object for all locales
  const alternatesLanguages: Record<string, string> = {};
  for (const altLocale of routing.locales) {
    alternatesLanguages[altLocale] =
      `${process.env.SITE_URL}/${altLocale}/blog`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesLanguages,
    },
    openGraph: {
      ...getOpenGraph(title, description, locale, { includeImages: false }),
      url: canonicalUrl,
    },
    twitter: getTwitter(title, description, { includeImages: false }),
  };
}

export default async function Blog() {
  const locale = await getLocale();
  const t = await getTranslations();

  const posts = getPostsInfo(`blog/${locale}`).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const featured = posts.find((post) => post.featured === true) || posts[0];

  const remaining = posts.filter((post) => post.slug !== featured?.slug);

  const topics = getAllTopics(`blog/${locale}`).slice(0, 8);

  return (
    <div className="space-y-12 md:space-y-16">
      <section className="relative">
        <PageHero
          icon={<RiBookOpenLine className="h-6 w-6 text-accent-500" />}
          label={t("technical_blog")}
          title={
            <>
              {t("thoughts")} &{" "}
              <span className="text-accent-600 [.dark_&]:text-accent-400">
                {t("tutorials")}
              </span>
            </>
          }
          description={
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-500 [.dark_&]:text-neutral-400">
              {t("blog_description")}
            </p>
          }
        />
        <div className="from-accent-500/15 to-accent-500/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent-500/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      {topics.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title={t("popular_topics")}
            description={t("popular_topics_description")}
          />
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  "bg-neutral-100/80 text-neutral-600 hover:bg-accent-500/15 hover:text-accent-600 hover:border-accent-500/30",
                  "border-neutral-200/80 [.dark_&]:bg-neutral-800/60 [.dark_&]:text-neutral-400 [.dark_&]:hover:bg-accent-500/15 [.dark_&]:hover:text-accent-400 [.dark_&]:border-neutral-700/80",
                )}
              >
                <RiPriceTag3Line className="h-3 w-3" />
                <span>{topic.name}</span>
                <span className="text-[10px] opacity-60">({topic.count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {featured && (
        <section className="space-y-6">
          <SectionHeader title={t("featured")} />
          <div className="timeline-view animate-fade-in-up animate-range-[entry_10%_cover_45%]">
            <FeaturedArticleCard article={featured} />
          </div>
        </section>
      )}

      {remaining.length > 0 && (
        <section className="space-y-6">
          <SectionHeader title={t("all_posts")} />
          <InfiniteArticlesList articles={remaining} itemsPerPage={3} />
        </section>
      )}

      {posts.length === 0 && (
        <section className="timeline-view animate-fade-in-up animate-range-cover py-16 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <RiBookOpenLine className="mx-auto h-12 w-12 text-neutral-400 [.dark_&]:text-neutral-500" />
            <h3 className="text-lg font-semibold text-neutral-900 [.dark_&]:text-neutral-50">
              {t("no_posts_found")}
            </h3>
            <p className="text-sm text-neutral-500 [.dark_&]:text-neutral-400">
              {t("no_posts_found_description")}
            </p>
          </div>
        </section>
      )}

      <NewsletterCTA />
    </div>
  );
}
