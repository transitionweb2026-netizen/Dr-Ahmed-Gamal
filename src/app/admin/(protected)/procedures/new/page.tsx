import { ProcedureForm } from "../ProcedureForm";
import { createProcedureAction } from "../actions";

export default function NewProcedurePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New procedure</h1>
      <div className="mt-6">
        <ProcedureForm action={createProcedureAction} submitLabel="Create procedure" />
      </div>
    </div>
  );
}
