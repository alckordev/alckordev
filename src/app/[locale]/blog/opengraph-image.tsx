import {
  createOGImage,
  ogSize,
  ogContentType,
} from "@/lib/server/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog | alckor.dev";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isSpanish = locale === "es";

  return createOGImage({
    title: isSpanish ? "Blog Técnico" : "Technical Blog",
    description: isSpanish
      ? "Artículos sobre desarrollo de software, arquitectura, React, Next.js, NestJS y buenas prácticas."
      : "Articles about software development, architecture, React, Next.js, NestJS, and best practices.",
    badge: isSpanish ? "Artículos" : "Articles",
    tags: ["React", "Next.js", "NestJS", "Architecture"],
    footerText: "Full Stack Engineer",
  });
}
