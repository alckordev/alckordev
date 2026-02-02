import {
  createOGImage,
  ogSize,
  ogContentType,
} from "@/lib/server/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Privacy Policy | alckor.dev";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isSpanish = locale === "es";

  return createOGImage({
    title: isSpanish ? "Política de Privacidad" : "Privacy Policy",
    description: isSpanish
      ? "Información sobre la recopilación, uso y protección de tus datos."
      : "Information about the collection, use, and protection of your data.",
    badge: isSpanish ? "Legal" : "Legal",
    footerText: "Full Stack Engineer",
  });
}
