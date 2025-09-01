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
        "group/topic relative block overflow-hidden rounded-xl transition-all duration-300",
        "bg-neutral-50/50 hover:bg-neutral-50 [.dark_&]:bg-neutral-950/50 [.dark_&]:hover:bg-neutral-950",
        "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
        "hover:border-accent-500/30! hover:shadow-accent-500/10 hover:shadow-xl",
        "hover:-translate-y-1 hover:scale-[1.02]",
      )}
    >
      <div className="from-accent-500/10 to-accent-500/5 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover/topic:opacity-100" />

      <div className="relative space-y-4 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="group-hover/topic:text-accent-500 text-lg font-bold transition-colors">
              {topic.name}
            </h3>
            <p className="text-sm text-neutral-500">
              {t("count_articles", { count: topic.count })}
            </p>
          </div>

          <div className="bg-accent-500/10 text-accent-500 rounded-full p-2 transition-transform group-hover/topic:scale-110">
            <RiPriceTag3Line className="h-4 w-4" />
          </div>
        </div>

        <div className="via-accent-500/50 h-px bg-gradient-to-r from-transparent to-transparent" />

        <div className="text-xs text-neutral-500 group-hover/topic:text-neutral-950 [.dark_&]:group-hover/topic:text-neutral-100">
          {t("view_articles")}
        </div>
      </div>
    </Link>
  );
};
