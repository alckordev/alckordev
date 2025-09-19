import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useTheme } from "next-themes";
import Image from "next/image";

export const LogoBrand = () => {
  const { theme } = useTheme();

  return (
    <Link
      href="/"
      className={cn(
        "group/logo flex items-center text-2xl font-semibold transition-all duration-200",
      )}
    >
      {theme === "dark" ? (
        <Image src="/assets/logo-dark.svg" alt="Iso" width={125} height={30} />
      ) : (
        <Image src="/assets/logo-light.svg" alt="Iso" width={125} height={30} />
      )}
    </Link>
  );
};
