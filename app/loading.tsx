export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-[8.5rem]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Loading…
        </p>
      </div>
    </div>
  );
}
