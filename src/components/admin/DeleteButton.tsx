"use client";

import { useTransition } from "react";

interface DeleteButtonProps {
  action: () => Promise<void>;
  label?: string;
  confirmMessage?: string;
}

export function DeleteButton({ action, label = "Delete", confirmMessage = "Delete this item?" }: DeleteButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "…" : label}
    </button>
  );
}
