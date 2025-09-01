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
        "from-accent-500/10 to-accent-500/5 via-neutral-100/80 [.dark_&]:via-neutral-950/80",
        "border border-neutral-200/50 [.dark_&]:border-neutral-800/50",
      )}
    >
      <div className="relative space-y-6 p-6 md:p-8">
        <div className="space-y-2 text-center">
          <div className="bg-accent-500/10 text-accent-500 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <RiMailLine className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold">{t("stay_updated")}</h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-500">
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
                  "flex-1 rounded-lg px-4 py-2.5 text-sm backdrop-blur-sm transition-all placeholder:text-neutral-500",
                  "bg-neutral-100/50 [.dark_&]:bg-neutral-950/50",
                  "focus:border-accent-500! border border-neutral-300/50 [.dark_&]:border-neutral-800/50",
                  "focus:ring-accent-500/80 focus:ring-2 focus:outline-none",
                  "data-[invalid=true]:border-pink-500! data-[invalid=true]:focus:ring-pink-500/80!",
                )}
                {...register("email")}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "hidden cursor-pointer items-center justify-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors md:inline-flex",
                  "bg-accent-600 hover:bg-accent-500 text-neutral-100!",
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
                  "h-5 w-5 appearance-none rounded backdrop-blur-sm transition-all",
                  "bg-neutral-100/50 [.dark_&]:bg-neutral-950/50",
                  "focus:border-accent-500! border border-neutral-300/50 [.dark_&]:border-neutral-800/50",
                  "focus:ring-accent-500/80 focus:ring-2 focus:outline-none",
                  "data-[invalid=true]:border-pink-500! data-[invalid=true]:focus:ring-pink-500/80!",
                )}
                {...register("policy")}
              />
              <label
                className="flex-1 text-xs leading-relaxed"
                htmlFor="policy"
              >
                {t.rich("policy_label", {
                  privacy: (chunks) => (
                    <Link
                      href="/privacy-policy"
                      className="text-accent-500 hover:text-accent-500/80 underline underline-offset-2"
                    >
                      {chunks}
                    </Link>
                  ),
                  terms: (chunks) => (
                    <Link
                      href="/terms-of-service"
                      className="text-accent-500 hover:text-accent-500/80 underline underline-offset-2"
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
              "flex cursor-pointer items-center justify-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors md:hidden",
              "bg-accent-600 hover:bg-accent-500 text-neutral-100!",
              "w-full disabled:cursor-not-allowed disabled:opacity-50",
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
