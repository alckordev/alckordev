import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export const LogoBrand = () => {
  return (
    <Link
      href="/"
      className={cn(
        "group text-xl font-semibold transition-all duration-200",
        "after:bg-accent-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 after:content-[''] hover:after:w-full",
      )}
    >
      <span className="text-neutral-950 [.dark_&]:text-neutral-100">
        alckor
      </span>
      <span className="text-accent-500">.dev</span>
    </Link>
  );
};
