"use client";

import { useTheme } from "next-themes";
// import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { socials } from "@/consts/socials";
import { cn } from "@/lib/cn";

export function Header() {
  const { theme, setTheme } = useTheme();
  // const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md">
      <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link href="/">alckor.dev</Link>
        <div className="flex items-center space-x-2">
          {socials.map(({ name, url, icon: Icon }, i) => (
            <a
              key={i}
              href={url}
              title={name}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 opacity-80 transition-opacity duration-150",
                "disabled:pointer-events-none disabled:opacity-50",
                "focus-visible:outline-none focus-visible:ring-1 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500",
                "hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 hover:opacity-100",
              )}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <button
            type="button"
            tabIndex={0}
            title="Change theme"
            className={cn(
              "group inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 opacity-80 transition-opacity duration-150 cursor-pointer",
              "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-1 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500",
              "hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 hover:opacity-100",
            )}
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
          >
            <span className="sr-only">Toggle theme</span>
            {theme === "light" ? (
              <RiMoonLine className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
            ) : (
              <RiSunLine className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
