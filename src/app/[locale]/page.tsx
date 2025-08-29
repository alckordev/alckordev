import { ArticleCard } from "@/components/article-card";
import { ProjectCard } from "@/components/project-card";
import { Timeline } from "@/components/timeline";
import { Link } from "@/i18n/navigation";
import { RiArrowRightLongLine, RiSparklingLine } from "@remixicon/react";

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="animate-slide-up max-w-3xl">
          {/* Greeting with floating animation */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl">👋</span>
            <span className="text-muted-foreground text-sm font-medium">
              Hey there, I'm
            </span>
          </div>

          {/* Main title with gradient */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="gradient-text">Isco</span>
            <span className="text-foreground">, Tech Lead &</span>
            <br />
            <span className="text-foreground">Senior </span>
            <span className="gradient-text-accent">Fullstack</span>
            <span className="text-foreground"> Developer</span>
          </h1>

          {/* Description */}
          <div className="text-muted-foreground max-w-2xl space-y-4 text-lg leading-relaxed">
            <p>
              From Peru with{" "}
              <span className="text-accent font-semibold">
                +10 years of experience
              </span>
              . I'm passionate about modern web technologies, scalable
              architectures, and mentoring development teams to build impactful
              software.
            </p>

            {/* Current focus */}
            <div className="border-border/50 bg-secondary/30 flex items-center gap-2 rounded-lg border px-4 py-3">
              <RiSparklingLine className="text-accent h-4 w-4" />
              <span className="text-sm">
                Currently building amazing things with{" "}
                <span className="text-foreground font-medium">
                  Astro, Next.js, Nest.js & TypeScript
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="from-accent/20 to-accent/5 absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-accent/10 absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-2xl" />
      </section>

      {/* Projects Section */}
      <section className="group space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-sm">
              Some things I've built recently
            </p>
          </div>
          <Link
            href="/projects"
            className="group/link text-muted-foreground hover:text-accent flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <span>View all</span>
            <RiArrowRightLongLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <ProjectCard />
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
          <p className="text-muted-foreground text-sm">
            My professional journey
          </p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <Timeline />
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest Posts
            </h2>
            <p className="text-muted-foreground text-sm">
              Recent thoughts and tutorials
            </p>
          </div>
          <Link
            href="/blog"
            className="group/link text-muted-foreground hover:text-accent flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <span>View all</span>
            <RiArrowRightLongLine className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 100 + 400}ms` }}
            >
              <ArticleCard />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
