import { cn } from "@/lib/cn";
import { RiCupLine, RiGithubLine, RiHeartLine } from "@remixicon/react";
import { useTranslations } from "next-intl";

export function SupportCTA() {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "my-8 overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm",
        "from-accent-500/5 to-accent-500/10 via-neutral-100/80 [.dark_&]:via-neutral-950/80",
        "border-neutral-200/50 [.dark_&]:border-neutral-800/50",
      )}
    >
      <div className="relative p-6 md:p-8">
        <div className="from-accent-500/20 absolute top-0 right-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl" />
        <div className="from-accent-500/15 absolute bottom-0 left-0 -z-10 h-16 w-16 rounded-full bg-gradient-to-tr to-transparent blur-xl" />

        <div className="space-y-6">
          <div className="space-y-3 text-center">
            <div className="bg-accent-500/10 text-accent-500 mx-auto flex h-10 w-10 items-center justify-center rounded-full">
              <RiHeartLine className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold">{t("support")}</h3>
          </div>

          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-neutral-500">
            {t("support_description")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://buymeacoffee.com/alckordev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/25"
            >
              <RiCupLine className="h-4 w-4" />
              <span>{t("buy_me_a_coffee")}</span>
            </a>

            <a
              href="https://github.com/sponsors/alckordev"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105",
                "hover:border-accent-500/50! hover:bg-accent-500/10! hover:text-accent-500!",
                "border-neutral-400/50 bg-neutral-300/50 [.dark_&]:border-neutral-800/50 [.dark_&]:bg-neutral-950/50",
              )}
            >
              <RiGithubLine className="h-4 w-4" />
              <span>{t("sponsor_on_github")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
