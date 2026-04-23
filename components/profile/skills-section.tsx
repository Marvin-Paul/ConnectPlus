"use client"

import * as React from "react"
import { useState } from "react"
import { Plus } from "lucide-react"
import { SkillsEditModal } from "./skills-edit-modal"

interface Skill {
  id: string
  name: string
  isPinned: boolean
}

interface SkillsSectionProps {
  username: string
  skills?: Skill[]
}

const defaultSkills: Skill[] = [
  { id: "s1", name: "Next.js", isPinned: true },
  { id: "s2", name: "TypeScript", isPinned: true },
  { id: "s3", name: "PostgreSQL", isPinned: true },
  { id: "s4", name: "Tailwind CSS", isPinned: false },
  { id: "s5", name: "Prisma", isPinned: false },
]

export function SkillsSection({ username, skills }: SkillsSectionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const items = skills && skills.length > 0 ? skills : (username === "demo-user" ? defaultSkills : [])

  return (
    <>
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">Skills</h2>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              aria-label="Edit skills"
              title="Edit skills"
              className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <Plus className="h-5 w-5" />
            </button>
        </div>

        <div className="space-y-6">
          {items && items.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                 <div 
                   key={skill.id} 
                   className={`px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all border ${
                     skill.isPinned 
                     ? "bg-primary/5 dark:bg-green-950/20 text-primary dark:text-green-500 border-primary/20 dark:border-green-900/30" 
                     : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                   }`}
                 >
                  {skill.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium italic">Add your technical and soft skills to build digital trust.</p>
          )}
        </div>
        
        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-center">
           <button className="text-[14px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              Show all skills
           </button>
        </div>
      </div>

      <SkillsEditModal 
        username={username}
        skills={items}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  )
}
