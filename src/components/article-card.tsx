import { Link } from "@/i18n/navigation";
import { RiArrowRightLongLine } from "@remixicon/react";

export const ArticleCard = () => {
  return (
    <div className="relative flex flex-col rounded-md border-[1px] border-neutral-300 px-3 py-4 shadow-sm dark:border-neutral-800">
      <div className="flex flex-col space-y-3">
        <div className="mb-3 flex flex-col space-y-1">
          <Link
            href="/"
            className="group line-clamp-2 text-balance flex items-center gap-[6px] font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] hover:underline"
          >
            How to Fix Hydration Errors with next-themes in Next.js (App Router)
          </Link>
          <p className="text-pretty text-sm dark:text-neutral-400 line-clamp-2">
            Resolve the hydration mismatch warnings caused by next-themes in
            Next 13/14 projects using the App Router. Learn how to create an
            SSR-friendly ThemeProvider and consume it in any client component
            via the useTheme hook.
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
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
          <Link
            href="/"
            className="group hidden items-center space-x-[4px] text-sm tracking-tight opacity-70 transition-opacity duration-100 hover:opacity-100 md:flex"
          >
            <span>Read more</span>
            <RiArrowRightLongLine className="h-4 w-4 opacity-70 duration-200 group-hover:translate-x-[2px] group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </div>
  );
};
