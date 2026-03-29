import { NetworkSidebar } from "./network-sidebar";
import { InvitationsCard } from "./invitations-card";
import { SuggestionsGrid } from "./suggestions-grid";

export default function NetworkPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left Sidebar */}
      <aside className="md:col-span-4 lg:col-span-3">
        <NetworkSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="md:col-span-8 lg:col-span-9 space-y-6">
        <InvitationsCard />
        <SuggestionsGrid />
        
        {/* Additional Suggestion Categories */}
        <div className="bg-white rounded-xl border border-[#e0e0e0] p-8 text-center shadow-sm">
           <div className="max-w-sm mx-auto space-y-4">
              <div className="w-16 h-16 bg-[#edf3f8] rounded-full mx-auto grid place-items-center">
                 <img src="/api/placeholder/64/64" alt="" className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Find more relevant connections</h2>
              <p className="text-sm text-[#666666]">
                Follow people with similar interests or in your industry to see more relevant posts and opportunities.
              </p>
              <button className="h-10 px-6 rounded-full bg-[#0a66c2] text-white font-bold hover:bg-[#004182] transition-colors">
                Explore popular topics
              </button>
           </div>
        </div>
      </main>
    </div>
  );
}
