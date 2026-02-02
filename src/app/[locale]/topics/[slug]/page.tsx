import { InfiniteArticlesList } from "@/components/infinite-articles-list";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { getAllTopics, getPostsInfo } from "@/lib/server/mdx";
import { getOpenGraph, getTwitter } from "@/lib/server/og";
import { RiPriceTag3Line } from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("seo_topic");

  const { slug } = await params;

  const topics = getAllTopics(`blog/${locale}`);
  const topic = topics.find((t) => t.slug === slug);

  const title = t("seo_title", { topic: topic?.name ?? "404" });
  const description = t("seo_description", { topic: topic?.name ?? "" });

  return {
    title,
    description,
    openGraph: {
      ...getOpenGraph(title, description, locale, { includeImages: false }),
      url: `${process.env.SITE_URL}/${locale}/topics/${slug}`,
    },
    twitter: getTwitter(title, description, { includeImages: false }),
  };
}

export default async function Topic({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations();
  const { slug } = await params;

  const topics = getAllTopics(`blog/${locale}`);

  const topic = topics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const allPosts = getPostsInfo(`blog/${locale}`).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const posts = allPosts.filter((post) =>
    post.topics?.some((topic) => topic.slug === slug),
  );

  const relatedTopics = topics
    .filter((t) => t.slug !== slug)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-12 md:space-y-16">
      <section className="relative">
        <div className="timeline-view animate-fade-in-up animate-range-cover">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-accent-500/10 rounded-lg p-2">
              <RiPriceTag3Line className="text-accent-500 h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-neutral-500">
                {t("topic")}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{topic.name}</span>
              </div>
            </div>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-neutral-500">
            {t("topic_description")}{" "}
            <span className="text-accent-500 font-medium">
              {topic.name.toLowerCase()}
            </span>
            . {t("topic_tagline")}.
          </p>
        </div>

        <div className="from-accent-500/20 to-accent-500/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent-500/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      {posts.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("articles_on", { topic: topic.name })}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-500/20 to-transparent" />
          </div>

          <InfiniteArticlesList articles={posts} itemsPerPage={3} />
        </section>
      )}

      {relatedTopics.length > 0 && (
        <section
          className="timeline-view animate-fade-in-up animate-range-[entry_10%_contain_50%] space-y-6"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("related_topics")}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-500/20 to-transparent" />
          </div>

          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className={cn(
                  "group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  "hover:bg-accent-500/10! bg-neutral-200/30 [.dark_&]:bg-neutral-800/30",
                  "hover:text-accent-500! text-neutral-500",
                  "hover:border-accent-500/30! border-neutral-300/50 [.dark_&]:border-neutral-800/50",
                )}
              >
                <RiPriceTag3Line className="h-3 w-3" />
                <span>{topic.name}</span>
                <span className="text-[10px] opacity-60">({topic.count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
