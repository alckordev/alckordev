import {
  createOGImage,
  ogSize,
  ogContentType,
} from "@/lib/server/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Fran - Full Stack Engineer | alckor.dev";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isSpanish = locale === "es";

  return createOGImage({
    title: isSpanish
      ? "Fran, Full Stack Engineer"
      : "Fran, Full Stack Engineer",
    description: isSpanish
      ? "+10 años de experiencia diseñando y construyendo sistemas escalables. React, Next.js, NestJS, Go, Vue, Nuxt & TypeScript."
      : "+10 years of experience designing and building scalable systems. React, Next.js, NestJS, Go, Vue, Nuxt & TypeScript.",
    badge: isSpanish ? "Blog Técnico" : "Technical Blog",
    tags: ["React", "Next.js", "TypeScript", "NestJS"],
  });
}
