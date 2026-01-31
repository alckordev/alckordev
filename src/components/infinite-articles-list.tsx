"use client";

import { ArticleCard } from "@/components/article-card";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { cn } from "@/lib/cn";
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
          className={cn(
            "timeline-view animate-fade-in-up",
            index % 3 === 0 && "animate-range-[entry_0%_cover_40%]",
            index % 3 === 1 && "animate-range-[entry_15%_cover_55%]",
            index % 3 === 2 && "animate-range-[entry_30%_cover_70%]",
          )}
        >
          <ArticleCard article={article} />
        </div>
      ))}

      <div ref={observerRef} className="flex justify-center py-8">
        {isLoading && (
          <div className="flex items-center gap-2 text-neutral-500">
            <RiLoaderLine className="h-5 w-5 animate-spin" />
            <span className="text-sm">{t("loading_more")}</span>
          </div>
        )}
        {!hasMore && articles.length > 0 && (
          <div className="text-center text-neutral-500">
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-neutral-500/20 to-transparent" />
            <p className="mt-4 text-sm">{t("no_more_articles")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
