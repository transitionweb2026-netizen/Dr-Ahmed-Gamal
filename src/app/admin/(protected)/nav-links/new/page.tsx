import { NavLinkForm } from "../NavLinkForm";
import { createNavLinkAction } from "../actions";

export default function NewNavLinkPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New nav link</h1>
      <div className="mt-6">
        <NavLinkForm action={createNavLinkAction} submitLabel="Create nav link" />
      </div>
    </div>
  );
}
