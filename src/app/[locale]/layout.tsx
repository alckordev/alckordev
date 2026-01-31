import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/cn";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="preload"
          href="/assets/og.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/assets/logo-light.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/assets/logo-dark.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body
        className={cn(
          sans.variable,
          mono.variable,
          "min-h-screen scroll-smooth font-sans antialiased",
          "bg-neutral-50 text-neutral-900 [.dark_&]:bg-neutral-950 [.dark_&]:text-neutral-100",
          "selection:bg-accent-500/25 selection:text-neutral-900 [.dark_&]:selection:bg-accent-500/30 [.dark_&]:selection:text-neutral-50",
          "transition-colors duration-200",
        )}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_25%,transparent_100%)] bg-[size:4rem_4rem]" />

              <Header />

              <main className="flex-1 px-4 py-10 md:py-16 md:px-6">
                <div className="mx-auto max-w-3xl">{children}</div>
              </main>

              <Footer />

              <Analytics />
              <SpeedInsights />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
