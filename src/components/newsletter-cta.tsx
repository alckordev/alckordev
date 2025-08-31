"use client";

import { useState } from "react";
import { RiMailLine } from "@remixicon/react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function NewsletterCTA() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    console.log("Newsletter subscription:");
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm",
        "from-accent-500/10 to-accent-500/5 via-neutral-100/80 [.dark_&]:via-neutral-950/80",
        "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
      )}
    >
      <div className="relative space-y-6 p-6 md:p-8">
        <div className="space-y-2 text-center">
          <div className="bg-accent-500/10 text-accent-500 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <RiMailLine className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold">Stay Updated</h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-500">
            Get notified when I publish new articles about modern web
            development, React patterns, and developer productivity.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              required
              data-invalid={false}
              className={cn(
                "flex-1 rounded-lg px-4 py-2.5 text-sm backdrop-blur-sm transition-all placeholder:text-neutral-500",
                "bg-neutral-100/50 [.dark_&]:bg-neutral-950/50",
                "focus:border-accent-500! border border-neutral-300/50 [.dark_&]:border-neutral-800/50",
                "focus:ring-accent-500/80 focus:ring-2 focus:outline-none",
                "data-[invalid=true]:border-pink-500! data-[invalid=true]:focus:ring-pink-500/80!",
              )}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "inline-flex cursor-pointer items-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors",
                "bg-accent-600 hover:bg-accent-500 text-neutral-100!",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          <div className="flex items-start gap-2">
            <input
              id="policy"
              type="checkbox"
              data-invalid={false}
              className={cn(
                "h-5 w-5 appearance-none rounded backdrop-blur-sm transition-all",
                "bg-neutral-100/50 [.dark_&]:bg-neutral-950/50",
                "focus:border-accent-500! border border-neutral-300/50 [.dark_&]:border-neutral-800/50",
                "focus:ring-accent-500/80 focus:ring-2 focus:outline-none",
                "data-[invalid=true]:border-pink-500! data-[invalid=true]:focus:ring-pink-500/80!",
              )}
            />
            <label className="text-xs leading-relaxed" htmlFor="policy">
              I agree to receive email updates and accept the{" "}
              <Link
                href="/privacy"
                className="text-accent-500 hover:text-accent-500/80 underline underline-offset-2"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className="text-accent-500 hover:text-accent-500/80 underline underline-offset-2"
              >
                Terms of Service
              </Link>
              . You can unsubscribe at any time.
            </label>
          </div>
        </form>
      </div>

      <div className="from-accent-500/20 absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl" />
      <div className="from-accent-500/15 absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-gradient-to-tr to-transparent blur-xl" />
    </section>
  );
}
