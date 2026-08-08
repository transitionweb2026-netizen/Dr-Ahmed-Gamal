"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import type { Procedure } from "@/types/content";
import { contactFormSchema, type ContactFormValues } from "@/types/forms";
import { cn } from "@/utils/cn";
import { submitContactAction } from "@/app/[locale]/contact/actions";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-lg border border-white/10 bg-[#050505] px-4 py-3 text-brand-light placeholder:text-brand-light/40 transition-colors focus:border-brand-gold focus:outline-none";

export function ContactForm({ procedures }: { procedures: Procedure[] }) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("form");
  const cta = useTranslations("cta");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorReason, setErrorReason] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setErrorReason(undefined);
    try {
      const result = await submitContactAction(values);
      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorReason(result.reason);
      }
    } catch {
      setStatus("error");
      setErrorReason(undefined);
    }
  });

  if (status === "success") {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center sm:p-10" role="status">
        <Icon name="check_circle" className="mx-auto h-10 w-10 text-brand-gold" />
        <h3 className="mt-4 font-serif text-2xl text-brand-light">{t("success.title")}</h3>
        <p className="mt-2 leading-relaxed text-brand-light/70">{t("success.description")}</p>
      </div>
    );
  }

  return (
    <div>
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4"
        >
          <p className="font-serif text-lg text-brand-light">{t("error.title")}</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-light/70">
            {errorReason === "not_configured" ? t("error.notConfigured") : t("error.description")}
          </p>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-brand-light/80">
            {t("fullName")}
          </label>
          <input
            id="fullName"
            type="text"
            className={fieldClasses}
            aria-invalid={errors.fullName ? "true" : undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="mt-1.5 text-sm text-red-400">
              {t("errors.required")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-brand-light/80">
            {t("phone")}
          </label>
          <input
            id="phone"
            type="tel"
            className={fieldClasses}
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1.5 text-sm text-red-400">
              {t("errors.invalidPhone")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="mb-2 block text-sm font-medium text-brand-light/80">
              {t("age")}
            </label>
            <input
              id="age"
              type="number"
              className={fieldClasses}
              aria-invalid={errors.age ? "true" : undefined}
              aria-describedby={errors.age ? "age-error" : undefined}
              {...register("age")}
            />
            {errors.age && (
              <p id="age-error" role="alert" className="mt-1.5 text-sm text-red-400">
                {t("errors.invalidAge")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="procedure" className="mb-2 block text-sm font-medium text-brand-light/80">
              {t("procedure")}
            </label>
            <select
              id="procedure"
              defaultValue=""
              className={cn(fieldClasses, "appearance-none")}
              aria-invalid={errors.procedure ? "true" : undefined}
              aria-describedby={errors.procedure ? "procedure-error" : undefined}
              {...register("procedure")}
            >
              <option value="" disabled>
                {t("procedurePlaceholder")}
              </option>
              {procedures.map((procedure) => (
                <option key={procedure.slug} value={procedure.slug}>
                  {procedure.name[locale]}
                </option>
              ))}
            </select>
            {errors.procedure && (
              <p id="procedure-error" role="alert" className="mt-1.5 text-sm text-red-400">
                {t("errors.required")}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-2 block text-sm font-medium text-brand-light/80">
              {t("date")}
            </label>
            <input
              id="date"
              type="date"
              className={fieldClasses}
              aria-invalid={errors.date ? "true" : undefined}
              aria-describedby={errors.date ? "date-error" : undefined}
              {...register("date")}
            />
            {errors.date && (
              <p id="date-error" role="alert" className="mt-1.5 text-sm text-red-400">
                {t("errors.required")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="time" className="mb-2 block text-sm font-medium text-brand-light/80">
              {t("time")}
            </label>
            <input
              id="time"
              type="time"
              className={fieldClasses}
              aria-invalid={errors.time ? "true" : undefined}
              aria-describedby={errors.time ? "time-error" : undefined}
              {...register("time")}
            />
            {errors.time && (
              <p id="time-error" role="alert" className="mt-1.5 text-sm text-red-400">
                {t("errors.required")}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-brand-light/80">
            {t("message")}
          </label>
          <textarea id="message" rows={3} className={fieldClasses} {...register("message")} />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-gold py-4 text-button uppercase text-brand-darker shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-colors hover:bg-brand-gold/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {status === "submitting" ? cta("sending") : cta("sendMessage")}
        </button>
      </form>
    </div>
  );
}
