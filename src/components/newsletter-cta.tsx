"use client";

import { RiLoaderLine, RiMailLine } from "@remixicon/react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { toast, Toaster } from "sonner";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v4";
import { useTranslations } from "next-intl";

export function NewsletterCTA() {
  const t = useTranslations();

  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.email({
          error: t("email_validation"),
        }),
        policy: z.coerce.boolean().refine((val) => val === true, {
          message: t("policy_validation"),
        }),
      }),
    ),
  });

  const { errors, isSubmitting } = useFormState({ control });

  const onSubmit = handleSubmit(async (values) => {
    const fetched = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, status: "subscribed" }),
    });

    const res = await fetched.json();

    if ([200, 400].includes(res.status)) {
      toast.success(
        res.status === 200 ? t("subscribe_success") : t("subscribe_already"),
      );

      reset();

      return;
    }

    toast.error(t("server_error"));
  });

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm",
        "from-accent-500/10 to-accent-500/5 via-white/90 [.dark_&]:via-neutral-950/90",
        "border-neutral-200/80 [.dark_&]:border-neutral-800/80",
      )}
    >
      <div className="relative space-y-6 p-6 md:p-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/15 text-accent-600 [.dark_&]:text-accent-400">
            <RiMailLine className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 [.dark_&]:text-neutral-50">
            {t("stay_updated")}
          </h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-500 [.dark_&]:text-neutral-400">
            {t("stay_updated_description")}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                data-invalid={!!errors.email}
                autoComplete="off"
                className={cn(
                  "flex-1 rounded-lg border px-4 py-2.5 text-sm transition-all placeholder:text-neutral-500",
                  "bg-neutral-100/80 border-neutral-200/80 [.dark_&]:bg-neutral-900/80 [.dark_&]:border-neutral-700/80",
                  "focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none",
                  "data-[invalid=true]:border-red-500 data-[invalid=true]:focus:ring-red-500/20",
                )}
                {...register("email")}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "hidden cursor-pointer items-center justify-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors md:inline-flex",
                  "bg-accent-600 hover:bg-accent-500",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {isSubmitting ? (
                  <RiLoaderLine className="h-5 w-5 animate-spin" />
                ) : (
                  t("subscribe")
                )}
              </button>
            </div>
            {errors.email && (
              <p className="text-xs text-pink-500">{errors.email?.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <input
                id="policy"
                type="checkbox"
                data-invalid={!!errors.policy}
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded border-2 transition-all duration-200",
                  "bg-white border-neutral-300 [.dark_&]:bg-neutral-900 [.dark_&]:border-neutral-600",
                  "hover:border-accent-400 [.dark_&]:hover:border-accent-500",
                  "checked:bg-accent-500 checked:border-accent-500",
                  "focus:border-accent-500 focus:ring-2 focus:ring-accent-500/25 focus:ring-offset-0 focus:outline-none",
                  "data-[invalid=true]:border-red-500 data-[invalid=true]:focus:ring-red-500/25",
                )}
                {...register("policy")}
              />
              <label
                className="flex-1 text-xs leading-relaxed text-neutral-600 [.dark_&]:text-neutral-400"
                htmlFor="policy"
              >
                {t.rich("policy_label", {
                  privacy: (chunks) => (
                    <Link
                      href="/privacy-policy"
                      className="text-accent-600 underline underline-offset-2 hover:text-accent-500 [.dark_&]:text-accent-400 [.dark_&]:hover:text-accent-300"
                    >
                      {chunks}
                    </Link>
                  ),
                  terms: (chunks) => (
                    <Link
                      href="/terms-of-service"
                      className="text-accent-600 underline underline-offset-2 hover:text-accent-500 [.dark_&]:text-accent-400 [.dark_&]:hover:text-accent-300"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </label>
            </div>
            {errors.policy && (
              <p className="text-xs text-pink-500">{errors.policy?.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors md:hidden",
              "bg-accent-600 hover:bg-accent-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isSubmitting ? (
              <RiLoaderLine className="h-5 w-5 animate-spin" />
            ) : (
              t("subscribe")
            )}
          </button>
        </form>
      </div>

      <div className="from-accent-500/20 absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl" />
      <div className="from-accent-500/15 absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-gradient-to-tr to-transparent blur-xl" />

      <Toaster position="top-center" />
    </section>
  );
}
