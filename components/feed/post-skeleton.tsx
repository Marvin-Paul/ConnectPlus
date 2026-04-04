import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-8 space-y-8 animate-pulse">
      <div className="flex items-center gap-5">
        <Skeleton className="w-16 h-16 rounded-2xl bg-slate-50" />
        <div className="space-y-2.5 flex-1">
          <Skeleton className="h-4 w-1/3 bg-slate-50 rounded-full" />
          <Skeleton className="h-3 w-1/2 bg-slate-50 rounded-full" />
        </div>
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-3 w-full bg-slate-50 rounded-full" />
        <Skeleton className="h-3 w-5/6 bg-slate-50 rounded-full" />
        <Skeleton className="h-3 w-3/4 bg-slate-50 rounded-full" />
      </div>

      <Skeleton className="h-64 md:h-80 w-full rounded-[2.5rem] bg-slate-50" />

      <div className="flex justify-between items-center pt-4 border-t border-slate-50">
        <Skeleton className="h-10 w-20 rounded-full bg-slate-50" />
        <Skeleton className="h-10 w-20 rounded-full bg-slate-50" />
        <Skeleton className="h-10 w-20 rounded-full bg-slate-50" />
        <Skeleton className="h-10 w-20 rounded-full bg-slate-50" />
      </div>
    </div>
  );
}
