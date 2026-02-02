import {
  createOGImage,
  ogSize,
  ogContentType,
} from "@/lib/server/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Terms of Service | alckor.dev";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isSpanish = locale === "es";

  return createOGImage({
    title: isSpanish ? "Términos de Servicio" : "Terms of Service",
    description: isSpanish
      ? "Términos y condiciones de uso del sitio alckor.dev."
      : "Terms and conditions for using the alckor.dev website.",
    badge: isSpanish ? "Legal" : "Legal",
    footerText: "Full Stack Engineer",
  });
}
