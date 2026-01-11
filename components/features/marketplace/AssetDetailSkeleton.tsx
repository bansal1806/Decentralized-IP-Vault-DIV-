import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AssetDetailSkeleton() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Skeleton */}
      <div className="relative h-[400px] w-full bg-muted/20">
        <Skeleton className="absolute inset-0" />
        <div className="container relative z-10 h-full flex flex-col justify-end pb-8 max-w-screen-xl mx-auto">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <Skeleton className="w-48 h-72 rounded-lg hidden md:block" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-32 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6 mt-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-2 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
