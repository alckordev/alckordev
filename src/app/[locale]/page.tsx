import { ArticleCard } from "@/components/article-card";
import { ProjectCard } from "@/components/project-card";
import { Timeline } from "@/components/timeline";
import { PageHero, SectionHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { getGitHubRepositories } from "@/lib/server/github";
import { getPostsInfo } from "@/lib/server/mdx";
import { getOpenGraph, getTwitter } from "@/lib/server/og";
import { RiArrowRightLine, RiSparklingLine } from "@remixicon/react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("seo_home");
  const { routing } = await import("@/i18n/routing");

  const title = t("seo_title");
  const description = t("seo_description");

  const canonicalUrl = `${process.env.SITE_URL}/${locale}`;

  // Build alternates object for all locales
  const alternatesLanguages: Record<string, string> = {};
  for (const altLocale of routing.locales) {
    alternatesLanguages[altLocale] = `${process.env.SITE_URL}/${altLocale}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesLanguages,
    },
    openGraph: getOpenGraph(title, description, locale, { includeImages: false }),
    twitter: getTwitter(title, description, { includeImages: false }),
  };
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations();

  const repos = await getGitHubRepositories();

  const posts = getPostsInfo(`blog/${locale}`)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="relative md:px-4">
        <PageHero
          icon={<span className="animate-wiggle animate-infinite">👋</span>}
          label={t("greeting")}
          title={
            <>
              Fran,{" "}
              <span className="bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600 bg-clip-text text-transparent">
                Full Stack
              </span>{" "}
              Engineer
            </>
          }
          description={
            <p>
              <span className="font-semibold text-accent-600 [.dark_&]:text-accent-400">
                {t("years_experience", { count: 10 })}
              </span>
              . {t("hero_description")}
            </p>
          }
          highlight={
            <>
              <RiSparklingLine className="h-5 w-5 flex-shrink-0 text-accent-500 animate-pulse" />
              <span className="flex-1 text-sm text-neutral-600 [.dark_&]:text-neutral-300">
                {t("current_focus")}{" "}
                <span className="font-semibold text-neutral-900 [.dark_&]:text-neutral-100">
                  NestJS, Go, Vue, Nuxt & TypeScript
                </span>
              </span>
            </>
          }
        />

        <div className="from-accent-500/15 to-accent-500/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent-500/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      <section className="group space-y-6">
        <SectionHeader
          title={t("featured_projects")}
          description={t("featured_projects_description")}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {repos.map((repo, i) => (
            <div
              key={i}
              className={cn(
                "timeline-view animate-fade-in-up",
                i === 0 && "animate-range-[entry_0%_cover_35%]",
                i === 1 && "animate-range-[entry_15%_cover_50%]",
              )}
            >
              <ProjectCard repo={repo} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title={t("experience")}
          description={t("experience_description")}
        />

        <div className="timeline-view animate-slide-in-up animate-range-[entry_10%_contain_40%]">
          <Timeline />
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title={t("latest_posts")}
          description={t("latest_posts_description")}
          action={
            <Link
              href="/blog"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent-600 [.dark_&]:hover:text-accent-400"
            >
              <span>{t("view_all")}</span>
              <RiArrowRightLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          }
        />

        <div className="space-y-4">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className={cn(
                "timeline-view animate-fade-in-up",
                i === 0 && "animate-range-[entry_5%_cover_40%]",
                i === 1 && "animate-range-[entry_20%_cover_55%]",
                i === 2 && "animate-range-[entry_35%_cover_70%]",
              )}
            >
              <ArticleCard article={post} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
