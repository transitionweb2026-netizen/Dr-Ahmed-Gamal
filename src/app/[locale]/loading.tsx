export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-brand-gold/30 border-t-brand-gold"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
