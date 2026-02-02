import {
  createOGImage,
  ogSize,
  ogContentType,
} from "@/lib/server/og-image";
import { getAllTopics } from "@/lib/server/mdx";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Topics | alckor.dev";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isSpanish = locale === "es";
  const topics = getAllTopics(`blog/${locale}`).slice(0, 4);
  const topicNames = topics.map((t) => t.name);

  return createOGImage({
    title: isSpanish ? "Temas" : "Topics",
    description: isSpanish
      ? "Explora artículos organizados por tecnología y tema."
      : "Explore articles organized by technology and topic.",
    badge: isSpanish ? "Categorías" : "Categories",
    tags: topicNames,
    footerText: "Full Stack Engineer",
  });
}
