// src/hooks/use-infinite-scroll.ts
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps<T> {
  items: T[];
  itemsPerPage?: number;
  rootMargin?: string;
  threshold?: number;
}

interface UseInfiniteScrollReturn<T> {
  visibleItems: T[];
  isLoading: boolean;
  hasMore: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
}

export function useInfiniteScroll<T>({
  items,
  itemsPerPage = 5,
  rootMargin = "100px",
  threshold = 0.1,
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Calculate visible items based on current page
  const visibleItems = items.slice(0, currentPage * itemsPerPage);
  const hasMore = visibleItems.length < items.length;

  // Load more items with useCallback to prevent recreating the function
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate loading delay for UX
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsLoading(false);
    }, 1000);
  }, [isLoading, hasMore]);

  // Intersection Observer effect - remove hasMore and isLoading from dependencies
  useEffect(() => {
    const currentObserverRef = observerRef.current;

    if (!currentObserverRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(currentObserverRef);

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loadMore, threshold, rootMargin]); // Only depend on stable values

  // Reset pagination when items change
  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(false);
  }, [items]);

  return {
    visibleItems,
    isLoading,
    hasMore,
    observerRef,
  };
}
