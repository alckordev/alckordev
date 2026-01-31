"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations();

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-neutral-200/80 bg-white/60 text-neutral-700 [.dark_&]:border-neutral-800/80 [.dark_&]:bg-neutral-950/60 [.dark_&]:text-neutral-300",
        "transition-colors duration-300",
      )}
    >
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2 text-sm">
            <span>© {currentYear} alckor.dev</span>
            <span className="text-neutral-400 [.dark_&]:text-neutral-500">
              •
            </span>
            <span className="flex items-center space-x-1">
              {t("code_coffee_love")}
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
            "border-t border-neutral-200/80 [.dark_&]:border-neutral-800/80",
          )}
        >
          <Link
            href="/blog"
            className="text-sm text-neutral-600 transition-colors duration-200 hover:text-accent-600 [.dark_&]:text-neutral-400 [.dark_&]:hover:text-accent-400"
          >
            {t("blog")}
          </Link>
          <a
            href="mailto:alckordev@gmail.com"
            className="text-sm text-neutral-600 transition-colors duration-200 hover:text-accent-600 [.dark_&]:text-neutral-400 [.dark_&]:hover:text-accent-400"
          >
            {t("contact")}
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            className="text-sm text-neutral-600 transition-colors duration-200 hover:text-accent-600 [.dark_&]:text-neutral-400 [.dark_&]:hover:text-accent-400"
          >
            {t("sitemap")}
          </a>
        </div>

        {/* Subtle decoration */}
        <div className="mt-6 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
