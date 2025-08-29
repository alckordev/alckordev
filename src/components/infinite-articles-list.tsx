"use client";

import { ArticleCard } from "@/components/article-card";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { RiLoaderLine } from "@remixicon/react";

interface Article {
  title: string;
  abstract: string;
  slug: string;
  publishedAt: string;
  topics?: { name: string; slug: string }[];
}

interface InfiniteArticlesListProps {
  articles: Article[];
  itemsPerPage?: number;
}

export function InfiniteArticlesList({
  articles,
  itemsPerPage = 3,
}: InfiniteArticlesListProps) {
  const { visibleItems, isLoading, hasMore, observerRef } = useInfiniteScroll({
    items: articles,
    itemsPerPage,
    rootMargin: "100px",
    threshold: 0.1,
  });

  // Transform articles for ArticleCard component
  const transformedArticles = visibleItems.map((article) => ({
    title: article.title,
    excerpt: article.abstract,
    slug: article.slug,
    date: article.publishedAt,
    readTime: "5 min read", // Could calculate based on content length
    tags: article.topics?.map((topic) => topic.name) || [],
  }));

  return (
    <div className="space-y-4">
      {transformedArticles.map((article, index) => (
        <div
          key={article.slug}
          className="animate-slide-up"
          style={{ animationDelay: `${(index % itemsPerPage) * 50}ms` }}
        >
          <ArticleCard article={article} />
        </div>
      ))}

      {/* Loading indicator / Observer target */}
      <div ref={observerRef} className="flex justify-center py-8">
        {isLoading && (
          <div className="text-muted-foreground flex items-center gap-2">
            <RiLoaderLine className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading more articles...</span>
          </div>
        )}
        {!hasMore && articles.length > 0 && (
          <div className="text-muted-foreground text-center">
            <div className="via-border mx-auto h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
            <p className="mt-4 text-sm">You've reached the end!</p>
          </div>
        )}
      </div>
    </div>
  );
}
