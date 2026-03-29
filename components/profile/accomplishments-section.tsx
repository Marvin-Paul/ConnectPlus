"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Award, FolderKanban, Heart, Trophy, Plus, PenLine, Briefcase } from "lucide-react"
import { AccomplishmentsAddModal } from "./accomplishments-add-modal"

interface Certification {
  id: string
  name: string
  issuingOrg: string
  issueDate?: Date | null
}

interface Project {
  id: string
  name: string
  description?: string | null
}

interface VolunteerExperience {
  id: string
  organization: string
  role: string
}

interface Honor {
  id: string
  title: string
  issuer: string
}

interface AccomplishmentsSectionProps {
  username: string
  certifications?: Certification[]
  projects?: Project[]
  volunteering?: VolunteerExperience[]
  honors?: Honor[]
}

const defaultCerts = [{ id: "c1", name: "AWS Certified Developer", issuingOrg: "Amazon Web Services", issueDate: new Date("2023-01-01") }]
const defaultProjects = [{ id: "p1", name: "Connect+ Professional Network", description: "Built a high-fidelity professional platform with Next.js and Supabase." }]

export function AccomplishmentsSection({
  username,
  certifications,
  projects,
  volunteering,
  honors
}: AccomplishmentsSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const certs = certifications && certifications.length > 0 ? certifications : (username === "demo-user" ? defaultCerts : [])
  const projs = projects && projects.length > 0 ? projects : (username === "demo-user" ? defaultProjects : [])
  const vols = volunteering && volunteering.length > 0 ? volunteering : []
  const hons = honors && honors.length > 0 ? honors : []

  if (!mounted) {
    return null // Prevent hydration mismatch by not rendering on server/first client pass
  }

  return (
    <>
      <Card className="mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Accomplishments</CardTitle>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-primary"
          >
            <Plus className="h-6 w-6" />
          </button>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-4 divide-y space-y-8">
          {/* Certifications */}
          <div className="flex flex-col gap-4 py-4 first:pt-0 group border-b border-white/5">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-primary fill-current fill-primary/10" />
              <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground/80">Licenses & Certifications</h4>
            </div>
            {certs.length > 0 ? (
              <div className="space-y-4 pt-1">
                {certs.map(cert => (
                  <div key={cert.id} className="flex flex-col relative group/item">
                    <span className="font-bold text-md text-foreground group-hover/item:text-primary transition-colors cursor-pointer">{cert.name}</span>
                    <span className="text-sm text-foreground/80">{cert.issuingOrg}</span>
                    {cert.issueDate && <span className="text-xs text-muted-foreground mt-0.5">Issued {new Date(cert.issueDate).toLocaleDateString()}</span>}
                    <button className="absolute right-0 top-0 p-1 opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-muted rounded-full text-primary">
                      <PenLine className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic pl-9">Crucial for technical roles (AWS, PMP, AI certifications).</p>
            )}
          </div>

          {/* Projects */}
          <div className="flex flex-col gap-4 py-8 group border-b border-white/5">
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary fill-current fill-primary/10" />
              <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground/80">Projects</h4>
            </div>
            {projs.length > 0 ? (
              <div className="space-y-4 pt-1">
                {projs.map(proj => (
                  <div key={proj.id} className="flex flex-col relative group/item">
                    <span className="font-bold text-md text-foreground group-hover/item:text-primary transition-colors cursor-pointer">{proj.name}</span>
                    {proj.description && <p className="text-sm text-foreground/80 mt-1 line-clamp-2 italic leading-relaxed">{proj.description}</p>}
                    <button className="absolute right-0 top-0 p-1 opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-muted rounded-full text-primary">
                      <PenLine className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic pl-9">Detailed deep dives into specific tasks or teammate links.</p>
            )}
          </div>

          {/* Volunteer */}
          <div className="flex flex-col gap-4 py-8 group border-b border-white/5">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary fill-current fill-primary/10" />
              <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground/80">Volunteer Experience</h4>
            </div>
            {vols.length > 0 ? (
              <div className="space-y-4 pt-1">
                {vols.map(vol => (
                  <div key={vol.id} className="flex flex-col relative group/item">
                    <span className="font-bold text-md text-foreground group-hover/item:text-primary transition-colors cursor-pointer">{vol.role}</span>
                    <span className="text-sm text-foreground/80">{vol.organization}</span>
                    <button className="absolute right-0 top-0 p-1 opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-muted rounded-full text-primary">
                      <PenLine className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic pl-9">Showcase your cultural fit through volunteer work.</p>
            )}
          </div>

          {/* Honors & Awards */}
          <div className="flex flex-col gap-4 py-8 group last:pb-0">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary fill-current fill-primary/10" />
              <h4 className="text-md font-bold uppercase tracking-widest text-muted-foreground/80">Honors, Awards & Publications</h4>
            </div>
            {hons.length > 0 ? (
              <div className="space-y-4 pt-1">
                {hons.map(honor => (
                  <div key={honor.id} className="flex flex-col relative group/item">
                    <span className="font-bold text-md text-foreground group-hover/item:text-primary transition-colors cursor-pointer">{honor.title}</span>
                    <span className="text-sm text-foreground/80">{honor.issuer}</span>
                    <button className="absolute right-0 top-0 p-1 opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-muted rounded-full text-primary">
                      <PenLine className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic pl-9">Academic or industry-wide recognition.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <AccomplishmentsAddModal 
        username={username}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  )
}
