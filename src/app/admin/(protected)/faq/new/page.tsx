import { FaqItemForm } from "../FaqItemForm";
import { createFaqItemAction } from "../actions";

export default function NewFaqItemPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New FAQ item</h1>
      <div className="mt-6">
        <FaqItemForm action={createFaqItemAction} submitLabel="Create FAQ item" />
      </div>
    </div>
  );
}
