"use client";

import { useState } from "react";
import { JobsSidebar } from "../jobs-sidebar";
import { FileText, Wand2, Plus, GripVertical, EyeOff, LayoutTemplate, Import, Download, History, Sparkles } from "lucide-react";

export default function ResumeBuilderPage() {
  const [sections, setSections] = useState([
    { id: "s1", name: "Summary", content: "Professional Full Stack Developer with 5+ years of experience..." },
    { id: "s2", name: "Experience", content: "Senior Developer at Chipper Cash (2021-Present)" },
    { id: "s3", name: "Education", content: "BSc Computer Science, Makerere University" }
  ]);

  const [isPrivacyOn, setIsPrivacyOn] = useState(true);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <JobsSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] shadow-sm overflow-hidden">
           {/* Header */}
           <div className="p-8 border-b border-[#e0e0e0] bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-[#0a66c2]" /> Resume Builder
                 </h1>
                 <p className="text-sm text-[#666666] mt-2 font-medium">Create a standardized, ATS-friendly resume in minutes.</p>
              </div>
              <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-slate-300 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm">
                    <LayoutTemplate className="w-4 h-4" /> Templates
                 </button>
                 <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#0a66c2] text-white font-bold text-sm hover:bg-[#004182] transition-colors shadow-blue-100 shadow-xl">
                    <Download className="w-4 h-4" /> Download PDF
                 </button>
              </div>
           </div>

           <div className="p-8">
              <div className="flex items-center justify-between mb-8 p-6 bg-[#edf3f8]/50 rounded-2xl border border-[#e0e0e0]/50 shadow-sm relative overflow-hidden group">
                 <div className="flex gap-4 items-center">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                       <Import className="w-6 h-6 text-[#0a66c2]" />
                    </div>
                    <div>
                       <h3 className="text-base font-bold text-slate-800">Import Profile Data</h3>
                       <p className="text-[11px] text-[#666666] font-bold uppercase tracking-widest mt-1">Populate resume with your professional profile</p>
                    </div>
                 </div>
                 <button className="px-6 py-2 rounded-full bg-white border border-slate-200 text-[#0a66c2] font-black text-xs hover:bg-[#0a66c2]/5 transition-colors shadow-sm relative z-10">
                    Auto-Import
                 </button>
                 <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-5 text-[#0a66c2]" />
              </div>

              {/* Builder Content Toggle */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                 <div className="lg:col-span-7 space-y-6">
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
                       <Plus className="w-4 h-4 text-[#0a66c2]" /> Add Section
                    </h2>
                    
                    {sections.map((section) => (
                      <div key={section.id} className="p-6 rounded-2xl border border-slate-100 group relative hover:border-[#0a66c2]/40 transition-all cursor-move bg-white">
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="w-5 h-5 text-slate-300" />
                         </div>
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">{section.name}</h4>
                            <div className="flex items-center gap-2">
                               <button className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#0a66c2] rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-blue-100 transition-colors">
                                  <Wand2 className="w-3.5 h-3.5" /> AI Suggest
                               </button>
                            </div>
                         </div>
                         <textarea 
                           rows={2}
                           className="w-full p-3 bg-[#f9fafb] rounded-xl border border-transparent text-sm font-medium focus:ring-1 focus:ring-[#0a66c2] focus:bg-white focus:border-[#0a66c2] outline-none transition-all resize-none"
                           defaultValue={section.content}
                         />
                      </div>
                    ))}
                 </div>

                 <div className="lg:col-span-5 space-y-8">
                    <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                       <h3 className="text-sm font-black uppercase tracking-widest opacity-80 mb-4">Privacy & Visibility</h3>
                       <div className="flex items-center justify-between mb-6">
                          <p className="text-xs font-bold leading-relaxed opacity-60 max-w-[150px]">Hide contact details until job application.</p>
                          <button 
                            onClick={() => setIsPrivacyOn(!isPrivacyOn)}
                            className={`w-14 h-7 rounded-full flex items-center px-1 transition-all ${isPrivacyOn ? "bg-green-500 justify-end" : "bg-slate-600 justify-start"}`}
                          >
                             <div className="w-5 h-5 bg-white rounded-full shadow-lg" />
                          </button>
                       </div>
                       <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-opacity ${isPrivacyOn ? "border-green-500/30 bg-green-500/10 opacity-100" : "border-white/10 opacity-50 transition-all group-hover:opacity-100"}`}>
                          <EyeOff className="w-5 h-5 text-green-400" />
                          <p className="text-[11px] font-black uppercase tracking-widest">Privacy {isPrivacyOn ? "Enabled" : "Disabled"}</p>
                       </div>
                       <History className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="p-8 rounded-3xl border border-slate-100 bg-white">
                       <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">ai suggestions</h3>
                       <div className="space-y-4">
                          <div className="p-4 bg-yellow-50/50 rounded-2xl border border-yellow-100 flex gap-4">
                             <div className="p-2 bg-white rounded-lg h-fit">
                                <Wand2 className="w-4 h-4 text-yellow-600" />
                             </div>
                             <div>
                                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-800 mb-1">Impact Analysis</h4>
                                <p className="text-xs text-[#666666] font-medium leading-relaxed italic">"Try adding Action Verbs like 'Launched', 'Reduced', or 'Improved' to your summary."</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

