interface BilingualFieldProps {
  label: string;
  name: string;
  defaultValue?: { en?: string; ar?: string };
  multiline?: boolean;
  required?: boolean;
}

/**
 * Renders a side-by-side EN/AR pair of inputs sharing one `name` prefix —
 * submits as `${name}_en` / `${name}_ar` in FormData, which every admin
 * Server Action re-assembles into `{ en, ar }` before writing to a JSONB
 * bilingual column.
 */
export function BilingualField({ label, name, defaultValue, multiline, required }: BilingualFieldProps) {
  const Field = multiline ? "textarea" : "input";
  const fieldProps = multiline ? { rows: 4 } : { type: "text" };

  return (
    <div>
      <p className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </p>
      <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${name}_en`} className="text-xs text-slate-500">
            English
          </label>
          <Field
            id={`${name}_en`}
            name={`${name}_en`}
            defaultValue={defaultValue?.en}
            required={required}
            {...fieldProps}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <div>
          <label htmlFor={`${name}_ar`} className="text-xs text-slate-500">
            Arabic
          </label>
          <Field
            id={`${name}_ar`}
            name={`${name}_ar`}
            dir="rtl"
            defaultValue={defaultValue?.ar}
            required={required}
            {...fieldProps}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
      </div>
    </div>
  );
}
