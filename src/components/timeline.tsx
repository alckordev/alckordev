import { experiences } from "@/consts/experiences";
import { RiArrowRightUpLongLine } from "@remixicon/react";

export const Timeline = () => {
  return (
    <ol className="relative space-y-6 border-s-2 border-neutral-300 dark:border-neutral-800">
      {experiences.map((exp, i) => (
        <li key={i} className="ms-5 mt-1">
          <div className="absolute -start-[6.5px] mt-2 h-3 w-3 rounded-full border border-neutral-400 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800"></div>
          <time className="mb-2 font-mono text-xs leading-none font-normal text-neutral-600 dark:text-neutral-400">
            {exp.startYear} - {exp.endYear ? exp.endYear : "Present"}
          </time>
          <div className="mt-2 flex flex-col space-y-0.5">
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {exp.role}
            </h3>
            <a
              href={exp.company.url}
              target="_blank"
              rel="noopener"
              className="group flex w-max items-center text-sm text-pretty text-neutral-600 transition-colors duration-150 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white"
            >
              <span>{exp.company.name}</span>
              <RiArrowRightUpLongLine className="ms-1 h-3 w-3 duration-150 group-hover:translate-x-[1.5px]" />
            </a>
          </div>
          <p className="mt-3 text-sm text-pretty dark:text-neutral-400">
            {exp.description}
          </p>
        </li>
      ))}
    </ol>
  );
};
