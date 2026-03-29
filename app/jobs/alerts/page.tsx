"use client";

import { useState } from "react";
import { JobsSidebar } from "../jobs-sidebar";
import { Plus, Bell, Trash2, Settings, Mail } from "lucide-react";

export default function JobAlertsPage() {
  const [alerts, setAlerts] = useState([
    { id: "al1", query: "Senior software engineer", location: "Kampala, Uganda", frequency: "DAILY" },
    { id: "al2", query: "Product Lead", location: "Remote", frequency: "WEEKLY" }
  ]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <JobsSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm">
           <div className="p-6 border-b border-[#e0e0e0] flex items-center justify-between">
              <div>
                 <h1 className="text-2xl font-bold text-slate-800">Job alerts</h1>
                 <p className="text-sm text-[#666666] mt-1">Get an email alert when a new job matches your search criteria.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-[#0a66c2] text-[#0a66c2] font-bold text-sm hover:bg-[#0a66c2]/5 transition-colors shadow-sm">
                 <Plus className="w-4 h-4" /> Create alert
              </button>
           </div>

           <div className="divide-y divide-slate-100">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                   <div className="flex gap-4 items-center">
                      <div className="p-3 bg-[#f3f6f8] rounded-full">
                         <Bell className="w-6 h-6 text-[#0a66c2]" />
                      </div>
                      <div>
                         <h3 className="text-base font-bold text-slate-800">{alert.query}</h3>
                         <p className="text-sm text-[#666666]">{alert.location}</p>
                         <div className="flex items-center gap-3 mt-1.5 ">
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-[#666666] uppercase tracking-wide">
                              {alert.frequency}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-[#057642] font-bold uppercase tracking-wider">
                              <Mail className="w-3 h-3" /> Notifications On
                            </span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="p-2.5 rounded-full text-[#666666] hover:bg-slate-200 transition-colors" title="Settings">
                         <Settings className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                        className="p-2.5 rounded-full text-[#666666] hover:bg-red-50 hover:text-red-500 transition-colors" 
                        title="Delete alert"
                      >
                         <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}
