import { FeaturedArticleCard } from "@/components/featured-article-card";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { InfiniteArticlesList } from "@/components/infinite-articles-list";
import { Link } from "@/i18n/navigation";
import { getPostsInfo, getAllTopics } from "@/lib/server/mdx";
import { RiBookOpenLine, RiPriceTag3Line } from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

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

  // Get all posts and sort by date
  const allPosts = getPostsInfo(`blog/${locale}`).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  // Find featured post (first post with featured: true, or fallback to newest)
  const featuredPost =
    allPosts.find((post) => post.featured === true) || allPosts[0];

  // Get remaining posts (excluding featured)
  const remainingPosts = allPosts.filter(
    (post) => post.slug !== featuredPost?.slug,
  );

  // Get popular topics with real data
  const topics = getAllTopics(`blog/${locale}`).slice(0, 8);

  return (
    <main className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="animate-slide-up">
          <div className="mb-6 flex items-center gap-3">
            <RiBookOpenLine className="text-accent h-6 w-6" />
            <span className="text-muted-foreground text-sm font-medium">
              {t("technical_blog")}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            <span className="gradient-text">Thoughts</span>
            <span className="text-foreground"> & </span>
            <span className="gradient-text-accent">Tutorials</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            {t("blog_description")}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="from-accent/20 to-accent/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      {/* Popular Topics */}
      {topics.length > 0 && (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{t("popular_topics")}</h2>
            <p className="text-muted-foreground text-sm">
              {t("popular_topics_description")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/blog/tags/${topic.slug}`}
                className="group border-border/50 bg-secondary/30 text-muted-foreground hover:border-accent/30 hover:bg-accent/10 hover:text-accent flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                <RiPriceTag3Line className="h-3 w-3" />
                <span>{topic.name}</span>
                <span className="text-[10px] opacity-60">({topic.count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{t("featured")}</h2>
            <div className="from-border h-px flex-1 bg-gradient-to-r to-transparent" />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <FeaturedArticleCard article={featuredPost} />
          </div>
        </section>
      )}

      {/* All Articles with Infinite Scroll */}
      {remainingPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{t("all_posts")}</h2>
            <div className="from-border h-px flex-1 bg-gradient-to-r to-transparent" />
          </div>
          <InfiniteArticlesList articles={remainingPosts} itemsPerPage={3} />
        </section>
      )}

      {/* Empty state */}
      {allPosts.length === 0 && (
        <section className="py-12 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <RiBookOpenLine className="text-muted-foreground/50 mx-auto h-12 w-12" />
            <h3 className="text-foreground text-lg font-semibold">
              {t("no_posts_found")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("no_posts_found_description")}
            </p>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </main>
  );
}
