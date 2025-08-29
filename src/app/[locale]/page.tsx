import { ArticleCard } from "@/components/article-card";
import { ProjectCard } from "@/components/project-card";
import { Timeline } from "@/components/timeline";
import { Link } from "@/i18n/navigation";
import { RiArrowRightLongLine } from "@remixicon/react";

export default function Home() {
  return (
    <main className="mx-auto grid max-w-4xl items-center gap-14 p-4">
      <section className="animate-fade-up animate-duration-1000 animate-delay-500 max-w-2xl">
        <div className="py-4 leading-loose tracking-tight">
          I'm <span className="font-bold">Isco</span>, a Tech Lead & Senior
          Fullstack Developer from Peru with +10 years of experience. I’m
          passionate about modern web technologies, scalable architectures, and
          mentoring development teams to build impactful software.
        </div>
      </section>
      <section className="animate-fade-up animate-duration-1000 animate-delay-500 flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-medium">Projects</h2>
          <Link
            href="/projects"
            className="group flex items-center space-x-2 text-sm font-medium text-neutral-500 duration-100 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            <span>More</span>
            <RiArrowRightLongLine className="h-4 w-4 opacity-70 duration-200 group-hover:translate-x-[2px] group-hover:opacity-100" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProjectCard key={i} />
          ))}
        </div>
      </section>
      <section className="animate-fade-up animate-duration-1000 animate-delay-500 flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-medium">Experience</h2>
        </div>
        <Timeline />
      </section>
      <section className="animate-fade-up animate-duration-1000 animate-delay-500 flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-medium">Latest posts</h2>
          <Link
            href="/projects"
            className="group flex items-center space-x-2 text-sm font-medium text-neutral-500 duration-100 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            <span>More</span>
            <RiArrowRightLongLine className="h-4 w-4 opacity-70 duration-200 group-hover:translate-x-[2px] group-hover:opacity-100" />
          </Link>
        </div>
        <div className="grid gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCard key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
