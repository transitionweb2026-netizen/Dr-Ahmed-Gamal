import { MilestoneForm } from "../MilestoneForm";
import { createMilestoneAction } from "../actions";

export default function NewMilestonePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New milestone</h1>
      <div className="mt-6">
        <MilestoneForm action={createMilestoneAction} submitLabel="Create milestone" />
      </div>
    </div>
  );
}
