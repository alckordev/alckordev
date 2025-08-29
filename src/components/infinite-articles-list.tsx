"use client";

import { ArticleCard } from "@/components/article-card";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Frontmatter } from "@/types/mdx";
import { RiLoaderLine } from "@remixicon/react";
import { useTranslations } from "next-intl";

interface InfiniteArticlesListProps {
  articles: Frontmatter[];
  itemsPerPage?: number;
}

export function InfiniteArticlesList({
  articles,
  itemsPerPage = 3,
}: InfiniteArticlesListProps) {
  const t = useTranslations();

  const { visibleItems, isLoading, hasMore, observerRef } = useInfiniteScroll({
    items: articles,
    itemsPerPage,
    rootMargin: "100px",
    threshold: 0.1,
  });

  return (
    <div className="space-y-4">
      {visibleItems.map((article, index) => (
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
            <span className="text-sm">{t("loading_more")}</span>
          </div>
        )}
        {!hasMore && articles.length > 0 && (
          <div className="text-muted-foreground text-center">
            <div className="via-border mx-auto h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
            <p className="mt-4 text-sm">{t("no_more_articles")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
