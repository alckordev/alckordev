import { TopicCard } from "@/components/topic-card";
import { TopicsStats } from "@/components/topics-stats";
import { cn } from "@/lib/cn";
import { getAllTopics } from "@/lib/server/mdx";
import { getOpenGraph, getTwitter } from "@/lib/server/og";
import { RiBookOpenLine, RiPriceTag3Line } from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("seo_topics");

  const title = t("seo_title");
  const description = t("seo_description");

  return {
    title,
    description,
    openGraph: {
      ...getOpenGraph(title, description, locale),
      url: `${process.env.SITE_URL}/${locale}/topics`,
    },
    twitter: getTwitter(title, description),
  };
}

export default async function Topics() {
  const locale = await getLocale();
  const t = await getTranslations();

  const topics = getAllTopics(`blog/${locale}`).sort(
    (a, b) => b.count - a.count,
  );

  return (
    <div className="space-y-12 md:space-y-16">
      <section className="relative">
        <div className="timeline-view animate-fade-in-up animate-range-cover">
          <div className="mb-6 flex items-center gap-3">
            <RiPriceTag3Line className="text-accent-500 h-6 w-6" />
            <span className="text-sm font-medium text-neutral-500">
              {t("browse_by_topics")}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {t("topics")} &{" "}
            <span className="text-accent-500">{t("categories")}</span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-neutral-500">
            {t("topics_description")}
          </p>
        </div>

        <div className="from-accent-500/20 to-accent-500/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent-500/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      {topics.length > 0 && (
        <section
          className="timeline-view animate-fade-in-up animate-range-[entry_10%_cover_45%]"
        >
          <TopicsStats topics={topics} />
        </section>
      )}

      {topics.length > 0 ? (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("all_topics")}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-500/20 to-transparent" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <div
                key={topic.slug}
                className={cn(
                  "timeline-view animate-fade-in-up",
                  index % 3 === 0 && "animate-range-[entry_5%_cover_40%]",
                  index % 3 === 1 && "animate-range-[entry_20%_cover_55%]",
                  index % 3 === 2 && "animate-range-[entry_35%_cover_70%]",
                )}
              >
                <TopicCard topic={topic} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section
          className="timeline-view animate-fade-in-up animate-range-cover py-16 text-center"
        >
          <div className="mx-auto max-w-md space-y-4">
            <RiBookOpenLine className="mx-auto h-12 w-12 opacity-30" />
            <h3 className="text-lg font-semibold">{t("no_topics_found")}</h3>
            <p className="text-sm text-neutral-500">
              {t("no_topics_found_description")}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
