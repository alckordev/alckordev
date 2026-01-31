import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Topic } from "@/types/mdx";
import { RiPriceTag3Line } from "@remixicon/react";
import { useTranslations } from "next-intl";

export const TopicCard = ({ topic }: { topic: Topic & { count: number } }) => {
  const t = useTranslations();

  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={cn(
        "group/topic relative block overflow-hidden rounded-xl border transition-all duration-300",
        "bg-white/80 border-neutral-200/80 [.dark_&]:bg-neutral-900/80 [.dark_&]:border-neutral-800/80",
        "hover:-translate-y-0.5 hover:border-accent-500/30 hover:shadow-md hover:shadow-accent-500/5 [.dark_&]:hover:border-accent-500/20",
      )}
    >
      <div className="from-accent-500/10 to-accent-500/5 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover/topic:opacity-100" />

      <div className="relative space-y-4 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900 transition-colors group-hover/topic:text-accent-600 [.dark_&]:text-neutral-50 [.dark_&]:group-hover/topic:text-accent-400">
              {topic.name}
            </h3>
            <p className="text-sm text-neutral-500 [.dark_&]:text-neutral-400">
              {t("count_articles", { count: topic.count })}
            </p>
          </div>
          <div className="rounded-full bg-accent-500/15 p-2 text-accent-600 transition-transform group-hover/topic:scale-110 [.dark_&]:text-accent-400">
            <RiPriceTag3Line className="h-4 w-4" />
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />
        <div className="text-xs text-neutral-500 [.dark_&]:text-neutral-400 [.dark_&]:group-hover/topic:text-neutral-100 group-hover/topic:text-neutral-700">
          {t("view_articles")}
        </div>
      </div>
    </Link>
  );
};
