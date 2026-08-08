import { VideoForm } from "../VideoForm";
import { createVideoAction } from "../actions";

export default function NewVideoPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New video</h1>
      <div className="mt-6">
        <VideoForm action={createVideoAction} submitLabel="Create video" />
      </div>
    </div>
  );
}
