"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, ThumbsUp, Medal, MessageSquare, Quote } from "lucide-react"
import { RecommendationAddModal } from "./recommendation-add-modal"

interface Recommendation {
  id: string
  author: {
    firstName: string
    lastName: string
    headline?: string | null
    avatarUrl?: string | null
  }
  content: string
  relationship?: string | null
  createdAt?: string | Date
}

interface SocialProofSectionProps {
  username: string
  recommendations?: Recommendation[]
}

const defaultRecommendations: Recommendation[] = [
  {
    id: "1",
    author: {
      firstName: "Sarah",
      lastName: "Johnson",
      headline: "Senior Engineering Manager @ TechFlow"
    },
    content: "Working with this person over the last two years was a privilege. Their ability to solve architectural challenges while keeping the team aligned and productive is remarkable. Highly recommended for any leadership role.",
    relationship: "Sarah managed them directly"
  }
]

export function SocialProofSection({ username, recommendations }: SocialProofSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const items = recommendations && recommendations.length > 0 ? recommendations : (username === "demo-user" ? defaultRecommendations : [])

  return (
    <>
      <Card className="mb-6 overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Social Proof</CardTitle>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            aria-label="Give a recommendation"
            title="Give a recommendation"
            className="p-2 hover:bg-muted dark:hover:bg-slate-800 rounded-full transition-colors text-primary dark:text-green-500 flex items-center gap-1 text-sm font-bold"
          >
            <Plus className="h-4 w-4" />
            Give a recommendation
          </button>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-4 divide-y space-y-6">
          <div className="space-y-6 pb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 leading-none shadow-sm/5 py-1">
              <MessageSquare className="h-4 w-4 text-primary" />
              Recommendations
            </h4>
            {items.map((rec) => (
              <div key={rec.id} className="group border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted dark:bg-slate-900 rounded-full flex items-center justify-center shrink-0 border border-border dark:border-slate-800 group-hover:border-primary/30 transition-colors bg-gradient-to-br from-primary/5 to-primary/20">
                    <span className="text-xs font-bold text-primary dark:text-green-500">{rec.author.firstName[0]}{rec.author.lastName[0]}</span>
                  </div>
                  <div className="space-y-2 w-full">
                    <div className="flex justify-between items-start w-full">
                      <h5 className="text-md font-bold text-foreground group-hover:text-primary transition-colors">
                        {rec.author.firstName} {rec.author.lastName}
                      </h5>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">{rec.author.headline}</p>
                    {rec.relationship && <p className="text-[11px] font-medium text-foreground/40 italic">{rec.relationship}</p>}
                    
                     <div className="mt-4 text-sm text-foreground/80 dark:text-slate-300 leading-relaxed font-normal italic bg-muted/10 dark:bg-slate-900/50 p-5 rounded-xl border-l-4 border-primary/20 relative shadow-inner">
                      <Quote className="absolute -top-3 -left-2 h-6 w-6 text-primary/10 rotate-180" />
                      "{rec.content}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center py-4 bg-muted/5 rounded-lg border border-dashed border-primary/10">
                    Publicly vouch for peers to build social credit and professional trust.
                </p>
            )}
          </div>
          
          <div className="pt-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 leading-none">
              <ThumbsUp className="h-4 w-4 text-primary" />
              Endorsements
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
                {/* Visual placeholder for endorsements */}
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex -space-x-2">
                         {[...Array(3)].map((_, j) => (
                             <div key={j} className="h-6 w-6 rounded-full border-2 border-background dark:border-slate-950 bg-muted dark:bg-slate-800 overflow-hidden">
                                 <span className="text-[8px] flex items-center justify-center h-full font-bold opacity-30">U</span>
                             </div>
                         ))}
                        <div className="h-6 px-2 rounded-full bg-primary/5 text-primary text-[10px] items-center flex border border-primary/10 ml-2 font-bold cursor-pointer hover:bg-primary/20">
                            + 12 more
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium bg-primary/5 p-4 rounded-lg flex items-center gap-3 border border-primary/10">
              <Medal className="h-5 w-5 text-primary shrink-0" />
              Endorsements build digital trust and prove technical skills through peer verification.
            </p>
          </div>
        </CardContent>
      </Card>

      <RecommendationAddModal 
        receiverUsername={username}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  )
}
