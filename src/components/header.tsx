"use client";

import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { socials } from "@/consts/socials";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { LogoBrand } from "./logo-brand";

export function Header() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "bg-neutral-100/10 backdrop-blur-md [.dark_&]:bg-neutral-950/10",
        "border-b border-neutral-300/30 [.dark_&]:border-neutral-800/30",
        "transition-colors duration-300",
      )}
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between p-4">
        {/* Logo/Brand */}
        <LogoBrand />

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
                "hover:border-accent-500/50 border border-neutral-300/50 [.dark_&]:border-neutral-800/50 [.dark_&]:hover:border-transparent",
                "hover:bg-accent-500/10 [.dark_&]:hover:text-accent-500 text-neutral-500 hover:text-neutral-950",
                "before:from-accent-500/20 before:to-accent-500/20 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 [.dark_&]:before:hidden",
                "transition-all duration-200",
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
              "hover:border-accent-500/50 border border-neutral-300/50 [.dark_&]:border-neutral-800/50 [.dark_&]:hover:border-transparent",
              "hover:bg-accent-500/10 [.dark_&]:hover:text-accent-500 text-neutral-500 hover:text-neutral-950",
              "before:from-accent-500/20 before:to-accent-500/20 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 [.dark_&]:before:hidden",
              "cursor-pointer transition-all duration-200",
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
