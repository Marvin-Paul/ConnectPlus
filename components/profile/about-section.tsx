"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PenLine } from "lucide-react"
import { AboutEditModal } from "./about-edit-modal"

interface AboutSectionProps {
  username: string
  about?: string | null
}

export function AboutSection({ username, about }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // A mockup bio if none exists
  const defaultBio = "I help businesses scale by leveraging modern web technologies and AI-driven workflows. Over the last 10 years, I've led cross-functional teams to deliver high-impact products that serve millions of users. My unique approach blends engineering excellence with product-led growth strategies. DM me for a consultation or reach out to explore potential collaborations."

  const bio = about || defaultBio

  return (
    <>
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">About</CardTitle>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 hover:bg-muted rounded-full transition-colors text-primary"
          >
            <PenLine className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2">
          <div className={cn(
            "relative overflow-hidden transition-all duration-300",
            !isExpanded && "max-h-[7.5rem]"
          )}>
            <p className="whitespace-pre-line text-foreground/90 leading-relaxed font-normal text-md">
              {bio}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
            )}
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-primary font-bold text-sm hover:underline"
          >
            {isExpanded ? "...see less" : "...see more"}
          </button>
        </CardContent>
      </Card>

      <AboutEditModal 
        user={{ username, bio: about }} 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </>
  )
}
