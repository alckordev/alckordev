import { Metadata } from "next";

export const getOpenGraph = (
  title: string,
  description: string,
  locale: string,
): Metadata["openGraph"] => {
  return {
    type: "website",
    title,
    description,
    url: process.env.SITE_URL,
    locale,
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
): Metadata["twitter"] => {
  return {
    card: "summary_large_image",
    site: "@alckordev",
    creator: "@alckordev",
    title,
    description,
    images: `${process.env.SITE_URL}/assets/og.jpg`,
  };
};
