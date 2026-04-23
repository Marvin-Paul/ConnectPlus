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
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">Experience</h2>
           <button 
             onClick={() => setIsAddModalOpen(true)}
             aria-label="Add experience"
             title="Add experience"
             className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
           >
             <Plus className="h-5 w-5" />
           </button>
        </div>

        <div className="space-y-8">
          {items.map((exp) => (
            <div key={exp.id} className="flex gap-4 group relative">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-[18px] shadow-sm overflow-hidden">
                {exp.company[0]}
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="space-y-1">
                   <div className="flex items-center gap-2">
                      <h4 className="text-[16px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none">{exp.title}</h4>
                   </div>
                   <div className="text-[14px] font-medium text-slate-700 dark:text-slate-300">
                      {exp.company} {exp.isCurrent && <span className="text-slate-400 text-[13px] font-normal"> · Full-time</span>}
                   </div>
                   <div className="text-[13px] font-medium text-slate-500">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – 
                      {exp.isCurrent ? ' Present' : ` ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}`}
                   </div>
                   {exp.location && <div className="text-[13px] font-medium text-slate-500">{exp.location}</div>}
                </div>

                {exp.description && (
                  <div className="mt-3">
                     <p className="text-[14px] text-slate-600 dark:text-slate-400 font-medium whitespace-pre-line leading-relaxed italic opacity-80">
                       {exp.description}
                     </p>
                  </div>
                )}
              </div>

              <button 
                aria-label="Edit experience"
                title="Edit experience"
                className="p-2 opacity-0 group-hover:opacity-100 transition-all rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <PenLine className="h-4 w-4" />
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <div className="py-12 border-2 border-dashed border-slate-50 dark:border-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-center px-6">
                <Zap className="w-8 h-8 text-slate-200 dark:text-slate-800 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 italic opacity-80">No historical deployments linked <br /> to this profile segment.</p>
            </div>
          )}
        </div>

         <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <button className="text-[14px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
               Show all experiences
            </button>
         </div>
      </div>

      <ExperienceAddModal username={username} isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  )
}
