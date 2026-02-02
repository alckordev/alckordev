import { Metadata } from "next";

export const getOpenGraph = (
  title: string,
  description: string,
  locale: string,
  options?: { includeImages?: boolean },
): Metadata["openGraph"] => {
  const base = {
    type: "website" as const,
    title,
    description,
    url: process.env.SITE_URL,
    locale,
  };

  if (options?.includeImages === false) {
    return base;
  }

  return {
    ...base,
    images: [
      {
        url: `${process.env.SITE_URL}/assets/og.jpg`,
      },
    ],
  };
};

export const getTwitter = (
  title: string,
  description: string,
  options?: { includeImages?: boolean },
): Metadata["twitter"] => {
  const base = {
    card: "summary_large_image" as const,
    site: "@alckordev",
    creator: "@alckordev",
    title,
    description,
  };

  if (options?.includeImages === false) {
    return base;
  }

  return {
    ...base,
    images: `${process.env.SITE_URL}/assets/og.jpg`,
  };
};
