import { StatForm } from "../StatForm";
import { createStatAction } from "../actions";

export default function NewStatPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New stat</h1>
      <div className="mt-6">
        <StatForm action={createStatAction} submitLabel="Create stat" />
      </div>
    </div>
  );
}
