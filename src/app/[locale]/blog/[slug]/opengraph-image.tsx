import {
  createOGImage,
  ogSize,
} from "@/lib/server/og-image";
import { getPostInfo, listSlugs } from "@/lib/server/mdx";

export const size = ogSize;
export const contentType = "image/png";

/** Pre-generate OG images at build time (content/ is available then). In prod, on-demand runs may not have content/. */
export async function generateStaticParams() {
  const locales = ["en", "es"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = listSlugs(`blog/${locale}`);
    for (const slug of slugs) {
      params.push({
        locale,
        slug: slug.replace(`blog/${locale}/`, ""),
      });
    }
  }
  return params;
}

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
