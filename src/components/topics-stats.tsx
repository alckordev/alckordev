import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

export const TopicsStats = ({ topics }: { topics: any[] }) => {
  const t = useTranslations();

  const totalArticles = topics.reduce((acc, topic) => acc + topic.count, 0);

  return (
    <div
      className={cn(
        "mb-8 flex items-center justify-between rounded-lg p-4",
        "bg-neutral-200/30 [.dark_&]:bg-neutral-800/30",
        "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
      )}
    >
      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-accent-500 text-lg font-bold">
            {topics.length}
          </div>
          <div className="text-xs text-neutral-500">{t("topics")}</div>
        </div>

        <div className="text-center">
          <div className="text-accent-500 text-lg font-bold">
            {totalArticles / 2}
          </div>
          <div className="text-xs text-neutral-500">{t("articles")}</div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm font-medium">{topics[0]?.name || "N/A"}</div>
        <div className="text-xs text-neutral-500">{t("most_popular")}</div>
      </div>
    </div>
  );
};
