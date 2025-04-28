import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col space-y-4 p-4 md:p-6">
      <Skeleton className="h-12 w-1/4" />
      <Skeleton className="h-48 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         <Skeleton className="h-36 rounded-lg" />
         <Skeleton className="h-36 rounded-lg" />
         <Skeleton className="h-36 rounded-lg" />
      </div>
    </div>
  );
}
