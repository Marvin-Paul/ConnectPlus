"use client"

import * as React from "react"
import { useState } from "react"
import { Plus, PenLine, Building2, Briefcase, Calendar, MapPin, Zap } from "lucide-react"
import { ExperienceAddModal } from "./experience-add-modal"

interface Experience {
  id: string
  title: string
  company: string
  location?: string | null
  startDate: Date
  endDate?: Date | null
  description?: string | null
  isCurrent: boolean
}

interface ExperienceSectionProps {
  username: string
  experiences?: Experience[]
}

const defaultExperiences: Experience[] = [
  {
    id: "e1",
    title: "Chief Technology Officer",
    company: "Connect+ Professional",
    location: "Kampala, Uganda",
    startDate: new Date("2023-01-01"),
    isCurrent: true,
    description: "• Leading the architectural vision and engineering team for the region's premier professional networking platform.\n• Architected a high-performance distributed systems model serving 10M+ operations daily.\n• Successfully closed $2M Seed Series through technical vision and market viability analysis."
  },
  {
    id: "e2",
    title: "Senior Lead Engineer",
    company: "SafeBoda",
    location: "Kampala, Uganda",
    startDate: new Date("2020-05-01"),
    endDate: new Date("2022-12-01"),
    isCurrent: false,
    description: "• Engineered the cross-border expansion services for courier and logistics nodes.\n• Optimized the real-time matching algorithm reducing latency by 35% in high-traffic urban zones."
  }
]

export function ExperienceSection({ username, experiences }: ExperienceSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  
  const items = experiences && experiences.length > 0 
    ? experiences 
    : (username === "demo-user" || !experiences?.length ? defaultExperiences : [])

  return (
    <>
      <div className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 p-12 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100">
               <Briefcase className="w-6 h-6 text-orange-600" />
            </div>
            <div>
               <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.3em] italic">Operational Ledger</h2>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">Verified career track</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-800 hover:scale-110 active:scale-95 border border-slate-100 shadow-sm"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-12 relative">
          {/* Vertical Timeline line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-50" />

          {items.map((exp) => (
            <div key={exp.id} className="flex gap-10 group relative z-10">
              <div className="w-12 h-12 bg-white rounded-2xl border-2 border-slate-100 shrink-0 flex items-center justify-center font-black text-slate-400 text-lg group-hover:border-orange-500 group-hover:scale-110 transition-all duration-500 shadow-sm overflow-hidden">
                {exp.company[0]}
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex-1 min-w-0 pt-1 space-y-4 pr-12">
                <div className="space-y-1">
                   <div className="flex items-center gap-3">
                      <h4 className="text-2xl font-black text-slate-800 tracking-tighter italic leading-none">{exp.title}</h4>
                      {exp.isCurrent && (
                        <div className="px-2 py-0.5 rounded bg-green-50 border border-green-100 text-[8px] font-black text-green-600 uppercase tracking-widest">Active</div>
                      )}
                   </div>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
                      <span className="text-slate-800">{exp.company}</span>
                      {exp.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-orange-500" /> {exp.location}</span>}
                   </div>
                   <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
                      <Calendar className="w-3 h-3" />
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – 
                      {exp.isCurrent ? ' PRESENT' : ` ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}`}
                   </div>
                </div>

                {exp.description && (
                  <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-50 group-hover:bg-white group-hover:border-slate-100 transition-all">
                     <p className="text-[13px] text-slate-600 italic leading-[1.8] font-bold opacity-80 whitespace-pre-line group-hover:text-slate-800">
                       {exp.description}
                     </p>
                  </div>
                )}
              </div>

              <button className="absolute right-0 top-1 p-3 opacity-0 group-hover:opacity-100 transition-all border border-slate-100 rounded-xl text-slate-300 hover:text-orange-500 hover:bg-orange-50 shadow-sm">
                <PenLine className="h-4 w-4" />
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <div className="py-12 border-2 border-dashed border-slate-50 rounded-[2rem] flex flex-col items-center justify-center text-center px-6">
                <Zap className="w-8 h-8 text-slate-200 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 italic opacity-80">No historical deployments linked <br /> to this profile segment.</p>
            </div>
          )}
        </div>

        <div className="pt-10 border-t border-slate-50 text-center">
           <button className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-orange-500 transition-colors italic">
              View Extended Professional Repository
           </button>
        </div>
      </div>

      <ExperienceAddModal username={username} isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  )
}
