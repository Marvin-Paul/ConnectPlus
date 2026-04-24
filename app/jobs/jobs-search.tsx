"use client";

import { Search, MapPin, ChevronDown, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";

interface JobsSearchProps {
  onSearch?: (query: string, location: string, filters: any) => void;
}

const FILTER_OPTIONS: Record<string, string[]> = {
  date: ["Anytime", "Past 24 hours", "Past week", "Past month"],
  exp: ["Internship", "Entry level", "Associate", "Mid-Senior level", "Director", "Executive"],
  remote: ["On-site", "Hybrid", "Remote"],
  type: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
  salary: ["Any", "$40,000+", "$60,000+", "$80,000+", "$100,000+", "$120,000+"]
};

const FILTER_LABELS: Record<string, string> = {
  date: "Date Posted",
  exp: "Experience Level",
  remote: "Remote",
  type: "Job Type",
  salary: "Salary"
};

export function JobsSearch({ onSearch }: JobsSearchProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    date: "Anytime",
    exp: "Any",
    remote: "Any",
    type: "Any",
    salary: "Any"
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, location, selectedFilters);
    }
  };

  const selectOption = (filterId: string, option: string) => {
    setSelectedFilters(prev => ({ ...prev, [filterId]: option }));
    setOpenDropdown(null);
  };

  const clearAll = () => {
    setQuery("");
    setLocation("");
    setSelectedFilters({
      date: "Anytime",
      exp: "Any",
      remote: "Any",
      type: "Any",
      salary: "Any"
    });
  };

  const isFilterActive = (id: string) => {
    const val = selectedFilters[id];
    return val !== "Anytime" && val !== "Any";
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e0e0e0] dark:border-slate-800 p-6 shadow-sm mb-6 relative transition-colors duration-500">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search Job Title */}
        <div className="relative flex-1 group">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${query ? 'text-[#0a66c2] dark:text-blue-400' : 'text-[#666666] dark:text-slate-500'}`} />
          <Input 
            id="job-title-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search job title, skill, or company"
            className="h-14 pl-12 bg-white dark:bg-slate-800 border-[#e0e0e0] dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#0a66c2] dark:focus-visible:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {query && (
            <button 
              onClick={() => setQuery("")} 
              aria-label="Clear search query"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Location */}
        <div className="relative flex-1 group">
          <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${location ? 'text-[#0a66c2] dark:text-blue-400' : 'text-[#666666] dark:text-slate-500'}`} />
          <Input 
            id="location-search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, state, or zip code"
            className="h-14 pl-12 bg-white dark:bg-slate-800 border-[#e0e0e0] dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#0a66c2] dark:focus-visible:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {location && (
            <button 
              onClick={() => setLocation("")} 
              aria-label="Clear location query"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button 
          onClick={handleSearch}
          className="h-14 px-12 rounded-full bg-[#0a66c2] dark:bg-blue-600 text-white font-bold hover:bg-[#004182] dark:hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/10 dark:shadow-blue-500/10"
        >
          Search
        </button>
      </div>
      
      {/* Filters Area */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800" ref={dropdownRef}>
        <div className="flex flex-wrap items-center gap-3">
          {Object.keys(FILTER_OPTIONS).map((id) => (
            <div key={id} className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[13px] font-bold transition-all duration-300 ${
                  isFilterActive(id)
                    ? 'bg-[#0a66c2] dark:bg-blue-600 border-[#0a66c2] dark:border-blue-600 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-[#666666] dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                {isFilterActive(id) ? selectedFilters[id] : FILTER_LABELS[id]}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openDropdown === id ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {openDropdown === id && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-[200] overflow-hidden animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
                  <div className="p-2.5">
                    {FILTER_OPTIONS[id].map((option) => (
                      <button
                        key={option}
                        onClick={() => selectOption(id, option)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-[14px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{option}</span>
                        {selectedFilters[id] === option && <Check className="w-4 h-4 text-[#0a66c2] dark:text-blue-400 stroke-[3px]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {(query || location || Object.values(selectedFilters).some(v => v !== "Anytime" && v !== "Any")) && (
          <button onClick={clearAll} className="text-[12px] font-black uppercase tracking-widest text-[#0a66c2] dark:text-blue-400 hover:underline">
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
