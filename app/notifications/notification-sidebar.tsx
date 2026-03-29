import { Settings, Rss } from "lucide-react";

export function NotificationSidebar() {
  const filters = [
    { label: "All", count: 17, active: true },
    { label: "My Posts", count: 2, active: false },
    { label: "Mentions", count: 1, active: false }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden shadow-sm">
        <div className="p-4 bg-white border-b border-[#f0f2f5]">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Manage</h2>
        </div>
        
        <div className="flex flex-col">
          {filters.map((f) => (
            <button key={f.label} className={`flex items-center justify-between px-4 py-3 text-sm font-bold border-l-4 transition-all ${f.active ? 'border-[#0a66c2] bg-blue-50/50 text-[#0a66c2]' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              {f.label}
              <span className="text-[10px] font-black opacity-60 bg-slate-100 px-1.5 py-0.5 rounded-md">{f.count}</span>
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-[#f0f2f5] bg-slate-50/20">
           <button className="flex items-start gap-3 w-full text-left group">
              <Settings className="h-4 w-4 text-slate-400 group-hover:text-[#0a66c2] transition-colors mt-0.5" />
              <div className="flex-1">
                 <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest group-hover:text-[#0a66c2] transition-colors">Notification Settings</h3>
                 <p className="text-[10px] text-slate-500 font-medium mt-0.5">Control your preferences</p>
              </div>
           </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e0e0e0] p-4 shadow-sm text-center">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect+ Professional</p>
         <h3 className="text-xs font-bold text-slate-800 mt-2">Get notified about new jobs before others.</h3>
         <button className="mt-4 w-full py-2 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">
           Set Alert
         </button>
      </div>
    </div>
  );
}
