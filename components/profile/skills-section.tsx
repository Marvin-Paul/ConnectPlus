"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pin, CheckCircle2 } from "lucide-react"
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

  const pinnedSkills = (items || []).filter(s => s.isPinned)
  const remainingSkills = (items || []).filter(s => !s.isPinned)

  return (
    <>
      <Card className="mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Skills</CardTitle>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-primary"
          >
            <Plus className="h-6 w-6" />
          </button>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2 space-y-4">
          {pinnedSkills.length > 0 && (
            <div className="space-y-3 pb-4 border-b border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 leading-none">
                <Pin className="h-3 w-3 fill-current rotate-[45deg]" />
                Top pinned skills
              </h4>
              <div className="flex flex-wrap gap-2 pt-1 transition-all">
                {pinnedSkills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="px-4 py-1.5 text-sm font-semibold rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-2">
            {remainingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {remainingSkills.map((skill) => (
                  <Badge key={skill.id} variant="outline" className="px-3 py-1 text-sm font-medium rounded-full text-foreground/80 hover:bg-muted/30 transition-colors">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            ) : (
              pinnedSkills.length === 0 && (
                <p className="py-2 text-sm text-muted-foreground italic">Add your technical and soft skills to build digital trust.</p>
              )
            )}
          </div>
        </CardContent>
      </Card>

      <SkillsEditModal 
        username={username}
        skills={items}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  )
}
