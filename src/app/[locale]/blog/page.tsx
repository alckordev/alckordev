import { FeaturedArticleCard } from "@/components/featured-article-card";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { InfiniteArticlesList } from "@/components/infinite-articles-list";
import { Link } from "@/i18n/navigation";
import { getPostsInfo, getAllTopics } from "@/lib/server/mdx";
import { RiBookOpenLine, RiPriceTag3Line } from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const title = `Blog - Isco`;
  const description = t("blog_description");

  return {
    title,
    description,
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
        <div className="animate-fade-up">
          <div className="mb-6 flex items-center gap-3">
            <RiBookOpenLine className="text-accent-500 h-6 w-6" />
            <span className="text-sm font-medium text-neutral-500">
              {t("technical_blog")}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {t("thoughts")} &{" "}
            <span className="text-accent-500">{t("tutorials")}</span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-neutral-500">
            {t("blog_description")}
          </p>
        </div>

        <div className="from-accent-500/20 to-accent-500/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent-500/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      {topics.length > 0 && (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("popular_topics")}
            </h2>
            <p className="text-sm text-neutral-500">
              {t("popular_topics_description")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/blog/tags/${topic.slug}`}
                className={cn(
                  "group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  "hover:bg-accent-500/10! bg-neutral-200/30 [.dark_&]:bg-neutral-800/30",
                  "hover:text-accent-500! text-neutral-500",
                  "hover:border-accent-500/30! border-neutral-300/50 [.dark_&]:border-neutral-800/50",
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
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("featured")}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-500/20 to-transparent" />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <FeaturedArticleCard article={featured} />
          </div>
        </section>
      )}

      {remaining.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("all_posts")}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-500/20 to-transparent" />
          </div>
          <InfiniteArticlesList articles={remaining} itemsPerPage={3} />
        </section>
      )}

      {posts.length === 0 && (
        <section
          className="animate-fade-up py-16 text-center"
          style={{ animationDelay: "300ms" }}
        >
          <div className="mx-auto max-w-md space-y-4">
            <RiBookOpenLine className="mx-auto h-12 w-12 opacity-30" />
            <h3 className="text-lg font-semibold">{t("no_posts_found")}</h3>
            <p className="text-sm text-neutral-500">
              {t("no_posts_found_description")}
            </p>
          </div>
        </section>
      )}

      <NewsletterCTA />
    </div>
  );
}
