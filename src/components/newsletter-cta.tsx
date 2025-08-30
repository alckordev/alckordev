"use client";

import { useState } from "react";
import { RiMailLine, RiCheckLine } from "@remixicon/react";
import { Link } from "@/i18n/navigation";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !acceptTerms) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setEmail("");
    setAcceptTerms(false);
    setIsSubmitting(false);

    console.log("Newsletter subscription:", { email, acceptTerms });
  };

  return (
    <section className="border-border/50 from-accent/10 via-card/80 to-accent/5 relative overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm">
      <div className="relative space-y-6 p-6 md:p-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="bg-accent/10 text-accent mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <RiMailLine className="h-6 w-6" />
          </div>
          <h3 className="text-foreground text-xl font-semibold">
            Stay Updated
          </h3>
          <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
            Get notified when I publish new articles about modern web
            development, React patterns, and developer productivity.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="border-border/50 bg-background/50 placeholder:text-muted-foreground focus:border-accent/50 focus:ring-accent/20 flex-1 rounded-lg border px-4 py-2.5 text-sm backdrop-blur-sm transition-colors focus:ring-2 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!email || !acceptTerms || isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => setAcceptTerms(!acceptTerms)}
              className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                acceptTerms
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border/50 bg-background/50 hover:border-accent/50"
              }`}
            >
              {acceptTerms && <RiCheckLine className="h-3 w-3" />}
            </button>
            <label className="text-muted-foreground text-xs leading-relaxed">
              I agree to receive email updates and accept the{" "}
              <Link
                href="/privacy"
                className="text-accent hover:text-accent/80 underline underline-offset-2"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className="text-accent hover:text-accent/80 underline underline-offset-2"
              >
                Terms of Service
              </Link>
              . You can unsubscribe at any time.
            </label>
          </div>
        </form>

        {/* Stats */}
        <div className="text-muted-foreground flex items-center justify-center gap-6 pt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>1,200+ subscribers</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-accent h-2 w-2 rounded-full" />
            <span>Weekly updates</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span>No spam</span>
          </div>
        </div>
      </div>

      {/* Decorative gradients */}
      <div className="from-accent/20 absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl" />
      <div className="from-accent/15 absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-gradient-to-tr to-transparent blur-xl" />
    </section>
  );
}
