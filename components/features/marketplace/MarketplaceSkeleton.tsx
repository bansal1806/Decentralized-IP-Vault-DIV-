import { AssetCardSkeleton } from "@/components/ui/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function MarketplaceSkeleton() {
  return (
    <div className="container py-8 max-w-screen-2xl mx-auto space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>

      {/* Search Skeleton */}
      <Skeleton className="h-12 w-full" />

      {/* Filters Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <AssetCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
