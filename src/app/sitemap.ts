// import { routing } from "@/i18n/routing";
// import { getPostsInfo } from "@/lib/server";
import { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const locales = routing.locales;

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          es: `${SITE_URL}/es`,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          es: `${SITE_URL}/es/blog`,
          en: `${SITE_URL}/en/blog`,
        },
      },
    },
  ];

  return entries;
}
