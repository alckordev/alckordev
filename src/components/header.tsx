"use client";

import { useTheme } from "next-themes";
import { Link } from "@/i18n/navigation";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { socials } from "@/consts/socials";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

export function Header() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  return (
    <header className="border-border/50 bg-background/50 sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300">
      <nav className="mx-auto flex max-w-4xl items-center justify-between p-4">
        {/* Logo/Brand */}
        <Link
          href="/"
          className={cn(
            "group text-lg font-semibold transition-all duration-200",
            "hover:text-accent",
            "after:bg-accent relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 after:content-[''] hover:after:w-full",
          )}
        >
          <span className="gradient-text">alckor</span>
          <span className="text-accent">.dev</span>
        </Link>

        <div className="flex items-center space-x-1">
          {/* Social Links */}
          {socials.map(({ name, url, icon: Icon }, i) => (
            <a
              key={i}
              href={url}
              title={name}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative inline-flex h-9 w-9 items-center justify-center rounded-lg",
                "border-border/50 hover:border-accent/50 border",
                "text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200",
                "before:from-accent/20 before:to-accent/20 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 [.dark_&]:before:hidden",
              )}
            >
              <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            </a>
          ))}
          {/* Theme Toggle */}
          <button
            type="button"
            title={
              theme === "light"
                ? t("switch_to_dark_mode")
                : t("switch_to_light_mode")
            }
            className={cn(
              "group relative inline-flex h-9 w-9 items-center justify-center rounded-lg",
              "border-border/50 hover:border-accent/50 border",
              "text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200",
              "cursor-pointer",
              "before:from-accent/20 before:to-accent/20 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 [.dark_&]:before:hidden",
            )}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <span className="sr-only">{t("toggle_theme")}</span>
            {theme === "light" ? (
              <RiMoonLine className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            ) : (
              <RiSunLine className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
