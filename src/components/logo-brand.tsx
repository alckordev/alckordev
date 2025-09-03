import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import Image from "next/image";

export const LogoBrand = () => {
  return (
    <Link
      href="/"
      className={cn(
        "group/logo flex items-center text-2xl font-semibold transition-all duration-200",
      )}
    >
      <Image
        src="/assets/iso.svg"
        alt="Iso"
        width={14}
        height={20}
        className="me-2"
      />
      <span
        className={cn(
          "after:bg-accent-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 after:content-['']",
          "group-hover/logo:after:w-full hover:after:w-full",
        )}
      >
        <span className="text-neutral-950 [.dark_&]:text-neutral-100">
          alckor
        </span>
        <span className="text-accent-500">.dev</span>
      </span>
    </Link>
  );
};
