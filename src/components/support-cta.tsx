import { RiCupLine, RiGithubLine, RiHeartLine } from "@remixicon/react";

export function SupportCTA() {
  return (
    <div className="border-border/50 from-accent/5 via-card/80 to-accent/10 my-8 overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm">
      <div className="relative p-6 md:p-8">
        {/* Background decoration */}
        <div className="from-accent/20 absolute top-0 right-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl" />
        <div className="from-accent/15 absolute bottom-0 left-0 -z-10 h-16 w-16 rounded-full bg-gradient-to-tr to-transparent blur-xl" />

        <div className="space-y-6">
          {/* Header with icon */}
          <div className="space-y-3 text-center">
            <div className="bg-accent/10 text-accent mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <RiHeartLine className="h-6 w-6" />
            </div>
            <h3 className="text-foreground text-xl font-semibold">Support</h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-sm leading-relaxed">
            Enjoyed this article? Consider supporting my work!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://buymeacoffee.com/alckordev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/25"
            >
              <RiCupLine className="h-4 w-4" />
              <span>Buy me a coffee</span>
            </a>

            <a
              href="https://github.com/sponsors/alckordev"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border/50 bg-card/50 text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <RiGithubLine className="h-4 w-4" />
              <span>Sponsor on github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
