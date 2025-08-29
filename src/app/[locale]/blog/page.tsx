import { FeaturedArticleCard } from "@/components/featured-article-card";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { InfiniteArticlesList } from "@/components/infinite-articles-list";
import { Link } from "@/i18n/navigation";
import { getPostsInfo, getAllTopics } from "@/lib/server/mdx";
import {
  RiBookOpenLine,
  RiPriceTag3Line,
  RiArrowRightLine,
} from "@remixicon/react";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Blog - Isco`;
  const description =
    "Deep dives into modern web development, React patterns, TypeScript best practices, and the latest tools that make building great software more enjoyable.";

  return {
    title,
    description,
  };
}

export default async function Blog() {
  const locale = await getLocale();

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
  const popularTopics = getAllTopics(`blog/${locale}`).slice(0, 8);

  // Transform featured post for FeaturedArticleCard
  const transformedFeaturedPost = featuredPost
    ? {
        title: featuredPost.title,
        excerpt: featuredPost.abstract,
        slug: featuredPost.slug,
        date: featuredPost.publishedAt,
        readTime: "5 min read", // Could calculate based on content
        tags: featuredPost.topics?.map((topic) => topic.name) || [],
        featured: true,
      }
    : null;

  return (
    <main className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="animate-slide-up">
          <div className="mb-6 flex items-center gap-3">
            <RiBookOpenLine className="text-accent h-6 w-6" />
            <span className="text-muted-foreground text-sm font-medium">
              Technical Blog
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            <span className="gradient-text">Thoughts</span>
            <span className="text-foreground"> & </span>
            <span className="gradient-text-accent">Tutorials</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Deep dives into modern web development, React patterns, TypeScript
            best practices, and the latest tools that make building great
            software more enjoyable.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="from-accent/20 to-accent/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      {/* Popular Topics */}
      {popularTopics.length > 0 && (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Popular Topics</h2>
            <p className="text-muted-foreground text-sm">
              Browse articles by technology and subject
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {popularTopics.map((topic) => (
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
      {transformedFeaturedPost && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Featured</h2>
            <div className="from-border h-px flex-1 bg-gradient-to-r to-transparent" />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <FeaturedArticleCard article={transformedFeaturedPost} />
          </div>
        </section>
      )}

      {/* All Articles with Infinite Scroll */}
      {remainingPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">All Articles</h2>
              <p className="text-muted-foreground text-sm">
                {allPosts.length} articles total
              </p>
            </div>

            <Link
              href="/blog/archive"
              className="group/link text-muted-foreground hover:text-accent flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <span>View Archive</span>
              <RiArrowRightLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
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
              No articles yet
            </h3>
            <p className="text-muted-foreground text-sm">
              Check back soon for technical insights and tutorials.
            </p>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </main>
  );
}
