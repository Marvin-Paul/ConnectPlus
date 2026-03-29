"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, PenLine } from "lucide-react"
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
    title: "Senior Full Stack Developer",
    company: "Innovate Solutions",
    location: "Kampala, Uganda",
    startDate: new Date("2021-01-01"),
    isCurrent: true,
    description: "• Spearheaded the migration to a microservices architecture, reducing deployment times by 40%.\n• Built an AI-powered analytics engine that increased customer retention by 15% in 6 months.\n• Mentored a team of 10+ developers to ensure high code quality and best practices."
  }
]

export function ExperienceSection({ username, experiences }: ExperienceSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  
  const items = experiences && experiences.length > 0 
    ? experiences 
    : (username === "demo-user" ? defaultExperiences : [])

  return (
    <>
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Experience</CardTitle>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-primary"
          >
            <Plus className="h-6 w-6" />
          </button>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2 space-y-6">
          {items.map((exp) => (
            <div key={exp.id} className="flex gap-4 border-b last:border-0 pb-6 last:pb-0 group relative">
              <div className="w-12 h-12 bg-muted rounded shrink-0 flex items-center justify-center font-bold text-muted-foreground text-xl">
                {exp.company[0]}
              </div>
              <div className="space-y-1 pr-8 w-full">
                <h4 className="font-bold text-md leading-tight">{exp.title}</h4>
                <p className="text-sm text-foreground/90">{exp.company} • {exp.location}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – 
                  {exp.isCurrent ? ' Present' : ` ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}`}
                </p>
                {exp.description && (
                  <p className="text-sm mt-3 text-foreground/80 whitespace-pre-line leading-relaxed italic">
                    {exp.description}
                  </p>
                )}
              </div>
              <button className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted rounded-full text-primary">
                <PenLine className="h-4 w-4" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground italic">Add your work experience to show your results.</p>
          )}
        </CardContent>
      </Card>

      <ExperienceAddModal 
        username={username} 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  )
}
