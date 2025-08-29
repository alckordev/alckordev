// src/app/api/articles/route.ts
import { getPostsInfo } from "@/lib/server/mdx";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "en";
  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = parseInt(searchParams.get("limit") || "3");

  try {
    // Get all posts for the locale
    const allPosts = getPostsInfo(`blog/${locale}`);

    // Sort by publishedAt (newest first)
    const sortedPosts = allPosts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    // Calculate pagination using offset
    const endIndex = offset + limit;
    const paginatedPosts = sortedPosts.slice(offset, endIndex);

    // Transform to match expected format
    const articles = paginatedPosts.map((post) => ({
      title: post.title,
      abstract: post.abstract,
      slug: post.slug,
      publishedAt: post.publishedAt,
      topics: post.topics || [],
    }));

    return NextResponse.json({
      articles,
      totalCount: sortedPosts.length,
      currentOffset: offset,
      hasMore: endIndex < sortedPosts.length,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
