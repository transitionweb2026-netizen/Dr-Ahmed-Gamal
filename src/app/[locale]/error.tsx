"use client";

import { useTranslations } from "next-intl";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-serif text-3xl text-brand-gold">{t("title")}</h1>
      <p className="max-w-md text-brand-light/70">{t("description")}</p>
      <button
        onClick={() => reset()}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-brand-darker transition-colors hover:bg-white"
      >
        {t("retry")}
      </button>
    </main>
  );
}
