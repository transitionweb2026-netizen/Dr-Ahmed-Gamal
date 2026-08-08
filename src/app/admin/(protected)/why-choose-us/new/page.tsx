import { ChecklistItemForm } from "../ChecklistItemForm";
import { createChecklistItemAction } from "../actions";

export default function NewChecklistItemPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New checklist item</h1>
      <div className="mt-6">
        <ChecklistItemForm action={createChecklistItemAction} submitLabel="Create checklist item" />
      </div>
    </div>
  );
}
