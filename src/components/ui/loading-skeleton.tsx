export function CardSkeleton() {
  return (
    <div className="bg-white border border-academic-border rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl skeleton flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-36 skeleton" />
          <div className="h-3 w-48 skeleton" />
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-24 skeleton rounded-full" />
            <div className="h-5 w-20 skeleton rounded-full" />
          </div>
          <div className="flex gap-4 mt-3">
            <div className="h-3 w-16 skeleton" />
            <div className="h-3 w-24 skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Banner */}
      <div className="h-16 rounded-xl skeleton" />
      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-academic-border p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full skeleton" />
            <div className="h-5 w-32 skeleton" />
            <div className="h-3 w-24 skeleton" />
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <div className="h-3 w-20 skeleton" />
              <div className="h-4 w-full skeleton" />
              <div className="h-4 w-3/4 skeleton" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-32 skeleton" />
              <div className="flex gap-2">
                <div className="h-6 w-24 skeleton rounded-full" />
                <div className="h-6 w-28 skeleton rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
