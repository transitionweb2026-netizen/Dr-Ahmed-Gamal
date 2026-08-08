"use client";

import { useActionState, useState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { updateContactInfoAction, type ContactInfoFormResult } from "./actions";

interface WorkingHourRow {
  days: { en: string; ar: string };
  hours: { en: string; ar: string };
}

interface ContactInfoFormProps {
  defaultValues: {
    phone_display: string;
    phone_href: string;
    emergency_phone_display: string;
    emergency_phone_href: string;
    whatsapp_display: string;
    whatsapp_href: string;
    email_display: string;
    email_href: string;
    address: { en: string; ar: string };
    maps_url: string;
    working_hours: WorkingHourRow[];
    social: { instagram?: string; facebook?: string; tiktok?: string; youtube?: string };
  };
}

const EMPTY_ROW: WorkingHourRow = { days: { en: "", ar: "" }, hours: { en: "", ar: "" } };

function TextField({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        required
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
      />
    </div>
  );
}

export function ContactInfoForm({ defaultValues }: ContactInfoFormProps) {
  const [state, formAction, pending] = useActionState<ContactInfoFormResult | null, FormData>(
    updateContactInfoAction,
    null,
  );
  const [hours, setHours] = useState<WorkingHourRow[]>(defaultValues.working_hours);

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Phone &amp; WhatsApp</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Phone (display)" name="phone_display" defaultValue={defaultValues.phone_display} />
          <TextField label="Phone (tel: link)" name="phone_href" defaultValue={defaultValues.phone_href} />
          <TextField
            label="Emergency phone (display)"
            name="emergency_phone_display"
            defaultValue={defaultValues.emergency_phone_display}
          />
          <TextField
            label="Emergency phone (tel: link)"
            name="emergency_phone_href"
            defaultValue={defaultValues.emergency_phone_href}
          />
          <TextField
            label="WhatsApp (display)"
            name="whatsapp_display"
            defaultValue={defaultValues.whatsapp_display}
          />
          <TextField
            label="WhatsApp (wa.me link)"
            name="whatsapp_href"
            defaultValue={defaultValues.whatsapp_href}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Email</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Email (display)" name="email_display" defaultValue={defaultValues.email_display} />
          <TextField label="Email (mailto: link)" name="email_href" defaultValue={defaultValues.email_href} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Address</h2>
        <BilingualField label="Address" name="address" defaultValue={defaultValues.address} multiline required />
        <TextField label="Google Maps URL" name="maps_url" defaultValue={defaultValues.maps_url} />
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Working hours</h2>
          <button
            type="button"
            onClick={() => setHours((h) => [...h, EMPTY_ROW])}
            className="text-xs font-medium text-slate-600 underline hover:text-slate-900"
          >
            + Add row
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {hours.map((row, i) => (
            <div key={i} className="rounded-md border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">Row {i + 1}</p>
                <button
                  type="button"
                  onClick={() => setHours((h) => h.filter((_, idx) => idx !== i))}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <HoursSubField
                  label="Days (EN)"
                  value={row.days.en}
                  onChange={(v) => setHours((h) => h.map((r, idx) => (idx === i ? { ...r, days: { ...r.days, en: v } } : r)))}
                />
                <HoursSubField
                  label="Days (AR)"
                  dir="rtl"
                  value={row.days.ar}
                  onChange={(v) => setHours((h) => h.map((r, idx) => (idx === i ? { ...r, days: { ...r.days, ar: v } } : r)))}
                />
                <HoursSubField
                  label="Hours (EN)"
                  value={row.hours.en}
                  onChange={(v) =>
                    setHours((h) => h.map((r, idx) => (idx === i ? { ...r, hours: { ...r.hours, en: v } } : r)))
                  }
                />
                <HoursSubField
                  label="Hours (AR)"
                  dir="rtl"
                  value={row.hours.ar}
                  onChange={(v) =>
                    setHours((h) => h.map((r, idx) => (idx === i ? { ...r, hours: { ...r.hours, ar: v } } : r)))
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <input type="hidden" name="working_hours" value={JSON.stringify(hours)} />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Social links <span className="font-normal normal-case text-slate-400">(leave blank to hide)</span>
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <TextFieldOptional label="Instagram URL" name="social_instagram" defaultValue={defaultValues.social.instagram} />
          <TextFieldOptional label="Facebook URL" name="social_facebook" defaultValue={defaultValues.social.facebook} />
          <TextFieldOptional label="TikTok URL" name="social_tiktok" defaultValue={defaultValues.social.tiktok} />
          <TextFieldOptional label="YouTube URL" name="social_youtube" defaultValue={defaultValues.social.youtube} />
        </div>
      </section>

      {state && !state.ok && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state?.ok && <p className="text-sm text-green-600">Saved.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function TextFieldOptional({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="url"
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
      />
    </div>
  );
}

function HoursSubField({
  label,
  value,
  onChange,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  dir?: "rtl";
}) {
  return (
    <div>
      <label className="text-[11px] text-slate-500">{label}</label>
      <input
        type="text"
        dir={dir}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-sm"
      />
    </div>
  );
}
