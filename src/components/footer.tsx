"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
// import { RiHeartFill } from "@remixicon/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations();

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-neutral-100/50 text-neutral-800 [.dark_&]:bg-neutral-950/50 [.dark_&]:text-neutral-300",
        "border-t border-neutral-300/30 [.dark_&]:border-neutral-800/30",
        "transition-colors duration-300",
      )}
    >
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2 text-sm">
            <span>© {currentYear} alckor.dev</span>
            <span className="text-neutral-600/30 [.dark_&]:text-neutral-400/30">
              •
            </span>
            <span className="flex items-center space-x-1">
              {t("code_coffee_love")}
              {/* <span>{t("built_with")}</span>
              <RiHeartFill className="animate-jump animate-infinite animate-duration-[3000ms] h-3 w-3 text-pink-500" />
              <span>{t("for_a_better_web")}.</span> */}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1">
              <Image
                src="/assets/svg/nextjs.svg"
                alt="Next.js logo"
                width={16}
                height={16}
                loading="lazy" // Lazy load footer images
                fetchPriority="low"
                className="aspect-square object-contain"
              />
              <span>Next.js</span>
            </div>
            <span className="text-sm text-neutral-600/30 [.dark_&]:text-neutral-400/30">
              •
            </span>
            <div className="flex items-center space-x-1">
              <Image
                src="/assets/svg/tailwindcss.svg"
                alt="Tailwind CSS logo"
                width={16}
                height={16}
                loading="lazy" // Lazy load footer images
                fetchPriority="low"
                className="aspect-square object-contain"
              />
              <span>Tailwind CSS</span>
            </div>
            <span className="text-sm text-neutral-600/30 [.dark_&]:text-neutral-400/30">
              •
            </span>
            <div className="flex items-center space-x-1">
              <Image
                src="/assets/svg/typescript.svg"
                alt="TypeScript logo"
                width={16}
                height={16}
                loading="lazy" // Lazy load footer images
                fetchPriority="low"
                className="aspect-square object-contain"
              />
              <span>TypeScript</span>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-6 flex flex-col items-center justify-center space-y-2 pt-6 md:flex-row md:space-y-0 md:space-x-6",
            "border-t border-neutral-300/30 [.dark_&]:border-neutral-800/30",
          )}
        >
          <Link
            href="/blog"
            className="hover:text-accent-500 text-sm transition-colors duration-200"
          >
            {t("blog")}
          </Link>
          <a
            href="mailto:alckordev@gmail.com"
            className="hover:text-accent-500 text-sm transition-colors duration-200"
          >
            {t("contact")}
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            className="hover:text-accent-500 text-sm transition-colors duration-200"
          >
            {t("sitemap")}
          </a>
        </div>

        {/* Subtle decoration */}
        <div className="mt-6 flex justify-center">
          <div className="via-accent-500/50 h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
        </div>
      </div>
    </footer>
  );
}
