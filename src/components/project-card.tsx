import { RiArrowRightUpLongLine, RiGithubLine } from "@remixicon/react";
import Image from "next/image";

export const ProjectCard = () => {
  return (
    <div className="relative flex flex-col rounded-md border-[1px] border-neutral-300 px-3 py-4 shadow-sm dark:border-neutral-800">
      <div className="flex flex-col space-y-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-[10px]">
            <Image
              src="https://placehold.co/24"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-[6px] font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] hover:underline"
            >
              <span>culqi-nodejs</span>
              <RiArrowRightUpLongLine className="h-3.5 w-3.5 opacity-50 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <div className="animate-shine inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-800 bg-[linear-gradient(110deg,#f5f5f5,45%,#d4d4d4,55%,#f5f5f5)] dark:bg-[linear-gradient(110deg,#171717,45%,#262626,55%,#171717)] bg-[length:200%_100%] px-2 py-0.5 text-[10px] font-medium text-neutral-700 dark:text-neutral-200 transition-colors">
              updated
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              title=""
              className="opacity-75 transition-opacity duration-100 hover:opacity-100"
            >
              <RiGithubLine className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="truncate text-sm dark:text-neutral-400">
          🍞 A beautiful notification library for React.
        </p>
        <div className="flex items-center space-x-1 overflow-y-auto">
          <span className="inline-flex cursor-default items-center space-x-2 rounded-md border border-neutral-300 bg-neutral-200/50 px-2 py-1 font-mono text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
            <span>1</span>
            <span>Turborepo</span>
          </span>
          <span className="inline-flex cursor-default items-center space-x-2 rounded-md border border-neutral-300 bg-neutral-200/50 px-2 py-1 font-mono text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
            <span>2</span>
            <span>Next.js</span>
          </span>
        </div>
      </div>
    </div>
  );
};
