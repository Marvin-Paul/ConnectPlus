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
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Skills</h2>
           <button 
             onClick={() => setIsEditModalOpen(true)}
             className="p-2 hover:bg-slate-50 rounded-lg transition-all text-slate-400 hover:text-slate-600"
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
                    ? "bg-blue-50 text-[#0A66C2] border-blue-100" 
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-slate-500 font-medium italic">Add your technical and soft skills to build digital trust.</p>
          )}
        </div>
        
        <div className="pt-6 mt-6 border-t border-slate-100 text-center">
           <button className="text-[14px] font-bold text-slate-500 hover:text-slate-700 transition-colors">
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
