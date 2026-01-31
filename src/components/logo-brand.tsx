import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useTheme } from "next-themes";
import Image from "next/image";

export const LogoBrand = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "group/logo flex items-center text-2xl font-semibold transition-all duration-200",
      )}
    >
      <Image
        src={isDark ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"}
        alt="alckor.dev"
        width={125}
        height={30}
        priority // Above-the-fold
        quality={100} // Maximum quality for SVG
      />
    </Link>
  );
};
