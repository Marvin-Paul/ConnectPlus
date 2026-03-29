import { JobsSidebar } from "./jobs-sidebar";
import { JobsSearch } from "./jobs-search";
import { JobCard } from "./job-card";

export default function JobsPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar for jobs */}
      <aside className="lg:col-span-3">
        <JobsSidebar />
      </aside>

      {/* Main search and jobs list */}
      <main className="lg:col-span-9 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Find your next job</h1>
        <JobsSearch />
        
        <div className="grid grid-cols-1 gap-6">
          <JobCard />
        </div>
        
        {/* Additional job categories or promotions */}
        <div className="bg-[#0a66c2] rounded-xl p-8 text-white relative overflow-hidden flex flex-col items-center text-center">
            <div className="relative z-10 max-w-lg space-y-4">
               <h2 className="text-2xl font-bold leading-tight">Land the job you want with Connect+ Premium</h2>
               <p className="text-white/80 text-sm font-medium">
                 See how you compare to other applicants and unlock more insights about your profile performance.
               </p>
               <button className="h-10 px-8 rounded-full bg-white text-[#0a66c2] font-extrabold hover:bg-white/90 transition-colors shadow-lg">
                 Try for free
               </button>
            </div>
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        </div>
      </main>
    </div>
  );
}
