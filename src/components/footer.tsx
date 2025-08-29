"use client";

import { Link } from "@/i18n/navigation";
import { RiHeartFill } from "@remixicon/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/50 bg-background/50 border-t backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Main footer content */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Left side - Copyright */}
          <div className="text-muted-foreground flex items-center space-x-2 text-sm">
            <span>© {currentYear} alckor.dev</span>
            <span className="text-border">•</span>
            <span className="flex items-center space-x-1">
              <span>{t("built_with")}</span>
              <RiHeartFill className="animate-jump animate-infinite animate-duration-[3000ms] h-3 w-3 text-red-500" />
              <span>{t("for_a_better_web")}.</span>
            </span>
          </div>

          {/* Right side - Tech stack */}
          <div className="text-muted-foreground flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1">
              <Image
                src="/assets/svg/nextjs.svg"
                alt="Next.js logo"
                width={16}
                height={16}
                className="aspect-square object-contain"
              />
              <span>Next.js</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center space-x-1">
              <Image
                src="/assets/svg/tailwindcss.svg"
                alt="Next.js logo"
                width={16}
                height={16}
                className="aspect-square object-contain"
              />
              <span>Tailwind CSS</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center space-x-1">
              <Image
                src="/assets/svg/typescript.svg"
                alt="Next.js logo"
                width={16}
                height={16}
                className="aspect-square object-contain"
              />
              <span>TypeScript</span>
            </div>
          </div>
        </div>

        {/* Bottom section - Links */}
        <div className="border-border/30 mt-6 flex flex-col items-center justify-center space-y-2 border-t pt-6 md:flex-row md:space-y-0 md:space-x-6">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200"
          >
            {t("blog")}
          </Link>
          <Link
            href="/projects"
            className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200"
          >
            {t("projects")}
          </Link>
          <a
            href="mailto:tu@email.com"
            className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200"
          >
            {t("contact")}
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200"
          >
            {t("sitemap")}
          </a>
        </div>

        {/* Subtle decoration */}
        <div className="mt-6 flex justify-center">
          <div className="via-accent/30 h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
        </div>
      </div>
    </footer>
  );
}
