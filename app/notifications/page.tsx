import { NotificationSidebar } from "./notification-sidebar";
import { NotificationFeed } from "./notification-feed";

export default function NotificationsPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar */}
      <aside className="lg:col-span-3">
        <NotificationSidebar />
      </aside>

      {/* Main Content area */}
      <main className="lg:col-span-6 space-y-6">
        <NotificationFeed />
      </main>

      {/* Right Sidebar */}
      <aside className="lg:col-span-3 space-y-4">
        <div className="bg-white rounded-xl border border-[#e0e0e0] p-4 text-center shadow-sm">
           <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" className="w-full h-32 rounded-lg object-cover mb-4" alt="" />
           <h3 className="text-sm font-bold text-slate-800">Learn new skills with Connect+ Learning</h3>
           <p className="text-xs text-[#666666] mt-1 mb-4">Master AI integration in Next.js with our top courses.</p>
           <button className="h-9 px-6 rounded-full border border-[#0a66c2] text-[#0a66c2] font-bold text-sm hover:border-2 hover:bg-[#0a66c2]/5 transition-all">
             Try 1 month for free
           </button>
        </div>

        <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Profile Insights</h3>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">WEEKLY</span>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Profile views</span>
              <span className="text-sm font-black text-[#0a66c2]">42</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Post impressions</span>
              <span className="text-sm font-black text-[#0a66c2]">1,284</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-50">
            <button className="w-full text-xs font-black text-slate-500 hover:text-[#0a66c2] transition-colors uppercase tracking-widest">
              View all analytics
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
