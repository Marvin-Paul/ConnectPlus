import { Search, MapPin, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export function JobsSearch() {
  return (
    <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search Job Title */}
        <div className="relative flex-1 group">
          <label htmlFor="job-title-search" className="sr-only">Search job title, skill, or company</label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#666666] group-focus-within:text-[#0a66c2] transition-colors" />
          <Input 
            id="job-title-search"
            placeholder="Search job title, skill, or company"
            className="h-12 pl-12 bg-white border-[#e0e0e0] rounded-lg text-sm focus-visible:ring-1 focus-visible:ring-[#0a66c2]"
          />
        </div>

        {/* Search Location */}
        <div className="relative flex-1 group">
          <label htmlFor="location-search" className="sr-only">City, state, or zip code</label>
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#666666] group-focus-within:text-[#0a66c2] transition-colors" />
          <Input 
            id="location-search"
            placeholder="City, state, or zip code"
            className="h-12 pl-12 bg-white border-[#e0e0e0] rounded-lg text-sm focus-visible:ring-1 focus-visible:ring-[#0a66c2]"
          />
        </div>

        {/* Search Button */}
        <button className="h-12 px-8 rounded-full bg-[#0a66c2] text-white font-bold hover:bg-[#004182] transition-colors w-full md:w-auto">
          Search
        </button>
      </div>
      
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 text-sm font-bold text-[#666666] hover:bg-slate-50">
           Date Posted <ChevronDown className="h-4 w-4" />
         </button>
         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 text-sm font-bold text-[#666666] hover:bg-slate-50">
           Experience Level <ChevronDown className="h-4 w-4" />
         </button>
         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 text-sm font-bold text-[#666666] hover:bg-slate-50">
           Remote <ChevronDown className="h-4 w-4" />
         </button>
         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 text-sm font-bold text-[#666666] hover:bg-slate-50">
           Job Type <ChevronDown className="h-4 w-4" />
         </button>
         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 text-sm font-bold text-[#666666] hover:bg-slate-50">
           Salary <ChevronDown className="h-4 w-4" />
         </button>
      </div>
    </div>
  );
}
