"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, GraduationCap, Briefcase, Award, FolderGit2, X, ChevronRight, Sparkles } from "lucide-react"

export function SuggestedForYou() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  const items = [
    {
      title: "Add education",
      description: "Members with education get 7x more profile views.",
      icon: GraduationCap,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20",
    },
    {
      title: "Add experience",
      description: "Showcase your professional journey and achievements.",
      icon: Briefcase,
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20",
    },
    {
      title: "Add certifications",
      description: "Validate your skills with official certifications.",
      icon: Award,
      color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20",
    }
  ]

  return (
    <Card className="mb-6 overflow-hidden border-primary/10 dark:border-primary/5 shadow-soft hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="pb-0 pt-6 px-8 flex flex-row items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold">Suggested for you</CardTitle>
            <div className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest border border-accent/20">
              Private to you
            </div>
          </div>
          <p className="text-[13px] text-muted-foreground flex items-center gap-1.5 font-medium italic">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Complete these steps to unlock more opportunities.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </CardHeader>
      
      <CardContent className="px-8 pb-8 pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="flex-1 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-[15px] font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{item.title}</h4>
              <p className="text-[12px] text-muted-foreground leading-relaxed font-medium mb-4">{item.description}</p>
              
              <button className="flex items-center gap-1 text-[11px] font-black text-primary uppercase tracking-widest hover:gap-2 transition-all">
                Add section <ChevronRight className="w-3 h-3" />
              </button>

              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
