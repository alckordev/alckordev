import { ArticleCard } from "@/components/article-card";
import { FeaturedArticleCard } from "@/components/featured-article-card";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { Link } from "@/i18n/navigation";
import {
  RiBookOpenLine,
  RiPriceTag3Line,
  RiArrowRightLine,
} from "@remixicon/react";

const featuredPost = {
  title:
    "Building Modern Web Applications with Next.js 15 and React Server Components",
  excerpt:
    "Explore the latest features in Next.js 15, including enhanced Server Components, improved caching strategies, and the new App Router patterns that make building full-stack applications more intuitive than ever.",
  slug: "nextjs-15-server-components",
  date: "2024-12-20",
  readTime: "12 min read",
  tags: ["Next.js", "React", "Server Components"],
  featured: true,
};

const recentPosts = [
  {
    title: "How to Fix Hydration Errors with next-themes in Next.js",
    excerpt:
      "Resolve hydration mismatch warnings caused by next-themes in Next 13/14 projects using the App Router.",
    slug: "fix-hydration-errors-next-themes",
    date: "2024-12-15",
    readTime: "5 min read",
    tags: ["Next.js", "SSR", "Hydration"],
  },
  {
    title: "TypeScript Best Practices for React Applications in 2024",
    excerpt:
      "Learn advanced TypeScript patterns, utility types, and best practices for building type-safe React applications.",
    slug: "typescript-react-best-practices-2024",
    date: "2024-12-10",
    readTime: "8 min read",
    tags: ["TypeScript", "React", "Best Practices"],
  },
  {
    title: "Optimizing React Performance with Concurrent Features",
    excerpt:
      "Deep dive into React 18's concurrent features like Suspense, useTransition, and useDeferredValue.",
    slug: "react-concurrent-features-performance",
    date: "2024-12-05",
    readTime: "10 min read",
    tags: ["React", "Performance", "Concurrent"],
  },
  {
    title: "Building a Design System with Tailwind CSS and Radix UI",
    excerpt:
      "Create a scalable design system using Tailwind CSS utilities and Radix UI primitives.",
    slug: "design-system-tailwind-radix",
    date: "2024-11-28",
    readTime: "15 min read",
    tags: ["Design System", "Tailwind", "Radix"],
  },
  {
    title: "Advanced Git Workflows for Team Development",
    excerpt:
      "Master Git branching strategies, conventional commits, and automation workflows for better team collaboration.",
    slug: "advanced-git-workflows-teams",
    date: "2024-11-20",
    readTime: "7 min read",
    tags: ["Git", "Workflow", "DevOps"],
  },
];

const popularTags = [
  { name: "Next.js", count: 12 },
  { name: "React", count: 18 },
  { name: "TypeScript", count: 15 },
  { name: "Tailwind", count: 8 },
  { name: "Performance", count: 6 },
  { name: "DevOps", count: 4 },
  { name: "Design System", count: 5 },
  { name: "Best Practices", count: 9 },
];

export default function Blog() {
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
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Popular Topics</h2>
          <p className="text-muted-foreground text-sm">
            Browse articles by technology and subject
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/blog/tags/${tag.name.toLowerCase().replace(".", "")}`}
              className="group border-border/50 bg-secondary/30 text-muted-foreground hover:border-accent/30 hover:bg-accent/10 hover:text-accent flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <RiPriceTag3Line className="h-3 w-3" />
              <span>{tag.name}</span>
              <span className="text-[10px] opacity-60">({tag.count})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Featured</h2>
          <div className="from-border h-px flex-1 bg-gradient-to-r to-transparent" />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <FeaturedArticleCard article={featuredPost} />
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Recent Articles</h2>
            <p className="text-muted-foreground text-sm">
              Latest thoughts and technical deep dives
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

        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <div
              key={post.slug}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <ArticleCard article={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </main>
  );
}
