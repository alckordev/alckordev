import { ArticleCard } from "@/components/article-card";
import { ProjectCard } from "@/components/project-card";
import { Timeline } from "@/components/timeline";
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
    openGraph: getOpenGraph(title, description, locale),
    twitter: getTwitter(title, description),
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
        <div className="animate-fade-up max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="animate-wiggle animate-infinite text-2xl">👋</span>
            <span className="text-sm font-medium text-neutral-500">
              {t("greeting")}
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Isco, Tech Lead &
            <br />
            Senior{" "}
            <span className="from-accent-500 to-accent-500 bg-linear-to-r via-pink-500 bg-clip-text text-transparent">
              Fullstack
            </span>{" "}
            Developer
          </h1>

          <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-neutral-500">
            <p>
              <span className="text-accent-500 font-semibold">
                {t("years_experience", { count: 10 })}
              </span>
              . {t("hero_description")}
            </p>

            <div
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-3",
                "bg-neutral-200/30 [.dark_&]:bg-neutral-800/30",
                "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
              )}
            >
              <RiSparklingLine className="text-accent-500 h-4 w-4 animate-pulse" />
              <span className="flex-1 text-sm">
                {t("current_focus")}{" "}
                <span className="font-medium text-neutral-950 [.dark_&]:text-neutral-100">
                  Astro, Next.js, Nest.js & TypeScript
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="from-accent-500/20 to-accent-500/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent-500/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      <section className="group space-y-6">
        <div className="flex items-center justify-between md:px-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("featured_projects")}
            </h2>
            <p className="text-sm text-neutral-500">
              {t("featured_projects_description")}
            </p>
          </div>
          {/* <Link
            href="/projects"
            className="group/link hover:text-accent-500! flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors"
          >
            <span>{t("view_all")}</span>
            <RiArrowRightLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link> */}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {repos.map((repo, i) => (
            <div
              key={i}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <ProjectCard repo={repo} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-1 md:px-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("experience")}
          </h2>
          <p className="text-sm text-neutral-500">
            {t("experience_description")}
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
          <Timeline />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between md:px-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("latest_posts")}
            </h2>
            <p className="text-sm text-neutral-500">
              {t("latest_posts_description")}
            </p>
          </div>
          <Link
            href="/blog"
            className="group/link hover:text-accent-500! flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors"
          >
            <span>{t("view_all")}</span>
            <RiArrowRightLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 100 + 400}ms` }}
            >
              <ArticleCard article={post} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
