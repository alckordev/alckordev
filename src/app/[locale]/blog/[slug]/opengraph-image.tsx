import {
  createOGImage,
  ogSize
} from "@/lib/server/og-image";
import { getPostInfo } from "@/lib/server/mdx";

export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostInfo(`blog/${locale}/${slug}`);

  if (!post) {
    return createOGImage({
      title: "Article not found",
      description: "The requested article could not be found.",
      footerText: "Full Stack Engineer",
    });
  }

  const topics = post.topics?.slice(0, 3).map((t) => t.name) ?? [];

  return createOGImage({
    title: post.title,
    description: post.abstract,
    badge: locale === "es" ? "Artículo" : "Article",
    tags: topics,
    footerText: "Full Stack Engineer",
  });
}

export function generateStaticParams() {
  // This will be handled by the page's generateStaticParams
  return [];
}
