import { CaseForm } from "../CaseForm";
import { createCaseAction } from "../actions";

export default function NewCasePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New before/after case</h1>
      <div className="mt-6">
        <CaseForm action={createCaseAction} submitLabel="Create case" />
      </div>
    </div>
  );
}
