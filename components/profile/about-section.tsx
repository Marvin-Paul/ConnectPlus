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
      <div className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 p-12 relative group/about animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover/about:rotate-6 transition-transform">
               <Quote className="w-6 h-6 text-blue-600" />
            </div>
            <div>
               <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.3em] italic">Professional Vision</h2>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">The core philosophy</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-blue-600 hover:scale-110 active:scale-95"
          >
            <PenLine className="h-4 w-4" />
          </button>
        </div>

        <div className="relative">
          <div className={cn(
            "relative overflow-hidden transition-all duration-700 ease-in-out",
            !isExpanded && "max-h-48"
          )}>
            <p className="whitespace-pre-line text-slate-600 leading-[1.8] font-black text-lg italic tracking-tight opacity-90 first-letter:text-5xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left">
              {bio}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-8 text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 hover:text-blue-800 transition-all flex items-center gap-2 group/btn"
          >
            {isExpanded ? "Collapse Intel" : "Read Full Directive"}
            <span className="w-6 h-px bg-blue-200 group-hover/btn:w-12 transition-all" />
          </button>
        </div>

        <Sparkles className="absolute bottom-10 right-10 w-24 h-24 opacity-5 text-blue-600 group-hover/about:scale-125 transition-transform duration-1000" />
      </div>

      <AboutEditModal user={{ username, bio: about }} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  )
}
