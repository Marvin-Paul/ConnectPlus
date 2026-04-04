import { Skeleton } from "@/components/ui/skeleton";

export function JobSkeleton() {
  return (
    <div className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.05)] p-10 space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <Skeleton className="w-20 h-20 rounded-[2rem] shrink-0" />
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
          <Skeleton className="h-10 w-3/4 rounded-xl" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-6 w-48 rounded-lg" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-14 h-14 rounded-full" />
          <Skeleton className="h-14 w-32 rounded-full" />
        </div>
      </div>
      <div className="flex gap-8 pt-8 border-t border-slate-50">
        <div className="flex gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
