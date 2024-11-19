export default function MovieCardSkeleton() {
    return (
      <div className="animate-pulse">
        <div className="aspect-[2/3] rounded-lg bg-gray-200" />
        <div className="mt-2 space-y-2">
          <div className="h-6 w-3/4 rounded bg-gray-200" />
          <div className="flex justify-between">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="h-4 w-1/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }