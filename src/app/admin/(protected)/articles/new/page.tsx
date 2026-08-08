import { ArticleForm } from "../ArticleForm";
import { createArticleAction } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New article</h1>
      <div className="mt-6">
        <ArticleForm action={createArticleAction} submitLabel="Create article" />
      </div>
    </div>
  );
}
