import { routing } from "@/i18n/routing";
import { getPostsInfo, getAllTopics } from "@/lib/server/mdx";
import { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL || "https://alckor.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}`]),
        ),
      },
    });
  }

  // Blog listing pages for each locale
  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}/blog`]),
        ),
      },
    });

    // Individual blog posts
    const posts = getPostsInfo(`blog/${locale}`);
    for (const post of posts) {
      const alternates: Record<string, string> = {};
      
      // Find corresponding posts in other locales
      for (const altLocale of routing.locales) {
        if (altLocale !== locale) {
          const altPosts = getPostsInfo(`blog/${altLocale}`);
          const altPost = altPosts.find((p) => p.slug === post.slug);
          if (altPost) {
            alternates[altLocale] = `${SITE_URL}/${altLocale}/blog/${post.slug}`;
          }
        }
      }

      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: {
            [locale]: `${SITE_URL}/${locale}/blog/${post.slug}`,
            ...alternates,
          },
        },
      });
    }

    // Topic pages
    const topics = getAllTopics(`blog/${locale}`);
    for (const topic of topics) {
      entries.push({
        url: `${SITE_URL}/${locale}/topics/${topic.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${SITE_URL}/${l}/topics/${topic.slug}`,
            ]),
          ),
        },
      });
    }

    // Topics listing page
    entries.push({
      url: `${SITE_URL}/${locale}/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}/topics`]),
        ),
      },
    });

    // Policy pages
    entries.push({
      url: `${SITE_URL}/${locale}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}/privacy-policy`]),
        ),
      },
    });

    entries.push({
      url: `${SITE_URL}/${locale}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}/terms-of-service`]),
        ),
      },
    });
  }

  return entries;
}
