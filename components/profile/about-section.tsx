"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { PenLine, Quote, Sparkles } from "lucide-react"
import { AboutEditModal } from "./about-edit-modal"

interface AboutSectionProps {
  username: string
  about?: string | null
}

export function AboutSection({ username, about }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const defaultBio = "I help businesses scale by leveraging modern web technologies and AI-driven workflows. Over the last 10 years, I've led cross-functional teams to deliver high-impact products that serve millions of users. My unique approach blends engineering excellence with product-led growth strategies."

  const bio = about || defaultBio

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 md:p-8 relative group/about animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">About</h2>
           <button 
             onClick={() => setIsEditModalOpen(true)}
             className="p-2 hover:bg-slate-50 rounded-lg transition-all text-slate-400 hover:text-slate-600"
           >
             <PenLine className="h-4 w-4" />
           </button>
        </div>

        <div className="relative">
          <div className={cn(
            "relative overflow-hidden transition-all duration-700 ease-in-out",
            !isExpanded && "max-h-48"
          )}>
            <p className="whitespace-pre-line text-[14px] leading-relaxed text-slate-600 font-medium">
              {bio}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-[14px] font-bold text-[#0A66C2] hover:text-[#004182] transition-all flex items-center gap-1 group/btn"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        </div>


      </div>

      <AboutEditModal user={{ username, bio: about }} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  )
}
