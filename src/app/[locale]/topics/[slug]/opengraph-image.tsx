import {
  createOGImage,
  ogSize,
  ogContentType,
} from "@/lib/server/og-image";
import { getAllTopics, getPostsByTopic } from "@/lib/server/mdx";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const isSpanish = locale === "es";
  const topics = getAllTopics(`blog/${locale}`);
  const topic = topics.find((t) => t.slug === slug);
  const posts = getPostsByTopic(slug, `blog/${locale}`);

  if (!topic) {
    return createOGImage({
      title: isSpanish ? "Tema no encontrado" : "Topic not found",
      footerText: "Full Stack Engineer",
    });
  }

  return createOGImage({
    title: topic.name,
    description: isSpanish
      ? `${posts.length} artículo${posts.length !== 1 ? "s" : ""} sobre ${topic.name}`
      : `${posts.length} article${posts.length !== 1 ? "s" : ""} about ${topic.name}`,
    badge: isSpanish ? "Tema" : "Topic",
    footerText: "Full Stack Engineer",
  });
}
