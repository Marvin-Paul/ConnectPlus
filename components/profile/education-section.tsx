"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, PenLine } from "lucide-react"
import { EducationAddModal } from "./education-add-modal"

interface Education {
  id: string
  school: string
  degree?: string | null
  fieldOfStudy?: string | null
  startDate?: Date | null
  endDate?: Date | null
  grade?: string | null
  description?: string | null
}

interface EducationSectionProps {
  username: string
  educations?: Education[]
}

const defaultEducations: Education[] = [
  {
     id: "edu1",
     school: "Makerere University",
     degree: "Bachelor of Science",
     fieldOfStudy: "Computer Science",
     startDate: new Date("2016-01-01"),
     endDate: new Date("2020-01-01")
  }
]

export function EducationSection({ username, educations }: EducationSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const items = educations && educations.length > 0 ? educations : (username === "demo-user" ? defaultEducations : [])

  return (
    <>
      <Card className="mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Education</CardTitle>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-primary"
          >
            <Plus className="h-6 w-6" />
          </button>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2 space-y-6">
          {items.map((edu) => (
            <div key={edu.id} className="flex gap-4 border-b last:border-0 pb-6 last:pb-0 group relative">
              <div className="w-12 h-12 bg-muted rounded shrink-0 flex items-center justify-center font-bold text-muted-foreground text-xl">
                {edu.school[0]}
              </div>
              <div className="space-y-1 w-full pr-8">
                <h4 className="font-bold text-md leading-tight">{edu.school}</h4>
                <p className="text-sm text-foreground/90">
                  {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                </p>
                <p className="text-xs text-muted-foreground">
                  {edu.startDate ? new Date(edu.startDate).getFullYear() : ''} – 
                  {edu.endDate ? ` ${new Date(edu.endDate).getFullYear()}` : ' Present'}
                </p>
                {edu.grade && (
                  <p className="text-sm mt-1 font-medium text-foreground/80">Grade: {edu.grade}</p>
                )}
                {edu.description && (
                  <p className="text-sm mt-2 text-foreground/70 whitespace-pre-line leading-relaxed italic">
                    {edu.description}
                  </p>
                )}
              </div>
              <button className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted rounded-full text-primary">
                <PenLine className="h-4 w-4" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground italic">Add your education to complete your profile.</p>
          )}
        </CardContent>
      </Card>

      <EducationAddModal 
        username={username} 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  )
}
