"use client";

import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { socials } from "@/consts/socials";
import { IconButton } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { LogoBrand } from "./logo-brand";

export function Header() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md",
        "bg-white/70 border-b border-neutral-200/80 [.dark_&]:bg-neutral-950/70 [.dark_&]:border-neutral-800/80",
        "transition-colors duration-300",
      )}
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <LogoBrand />

        <div className="flex items-center gap-1">
          {socials.map(({ name, url, icon: Icon }, i) => (
            <a
              key={i}
              href={url}
              title={name}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200",
                "text-neutral-600 hover:text-accent-600 [.dark_&]:text-neutral-400 [.dark_&]:hover:text-accent-400",
                "border border-neutral-300/70 hover:border-accent-500/40 hover:bg-accent-500/10 [.dark_&]:border-neutral-700/70 [.dark_&]:hover:border-accent-500/40 [.dark_&]:hover:bg-accent-500/15",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:ring-offset-2",
              )}
            >
              <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            </a>
          ))}
          <IconButton
            className="group"
            variant="bordered"
            size="md"
            title={
              theme === "light"
                ? t("switch_to_dark_mode")
                : t("switch_to_light_mode")
            }
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <span className="sr-only">{t("toggle_theme")}</span>
            {theme === "light" ? (
              <RiMoonLine className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            ) : (
              <RiSunLine className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            )}
          </IconButton>
        </div>
      </nav>
    </header>
  );
}
