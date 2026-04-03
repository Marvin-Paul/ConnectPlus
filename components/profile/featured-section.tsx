"use client"

import * as React from "react"
import { useState } from "react"
import { Plus } from "lucide-react"
import { FeaturedAddModal } from "./featured-add-modal"

interface FeaturedItem {
  id: string
  title: string
  description?: string | null
  linkUrl?: string | null
  imageUrl?: string | null
  type: string
}

interface FeaturedSectionProps {
  username: string
  items?: FeaturedItem[]
}

const defaultItems: FeaturedItem[] = [
  {
    id: "1",
    title: "Mastering Prisma 5 with Supabase",
    description: "Deep dive into performance optimizations and connection pooling.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    type: "POST"
  },
  {
    id: "2",
    title: "My Engineering Portfolio 2026",
    description: "Explore my latest case studies in AI-driven web apps.",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
    type: "LINK"
  }
]

export function FeaturedSection({ username, items }: FeaturedSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const featured = items && items.length > 0 ? items : (username === "demo-user" ? defaultItems : [])

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Featured</h2>
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="p-2 hover:bg-slate-50 rounded-lg transition-all text-slate-400 hover:text-slate-600"
           >
             <Plus className="h-5 w-5" />
           </button>
        </div>

        <div className="space-y-6">
          {featured && featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-lg bg-white hover:border-slate-300 transition-all cursor-pointer group shadow-sm flex flex-col overflow-hidden">
                  {item.imageUrl && (
                    <div className="h-32 overflow-hidden border-b border-slate-100">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bold text-[14px] text-slate-900 leading-tight line-clamp-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.linkUrl && (
                      <div className="flex items-center text-[12px] text-[#0A66C2] font-bold gap-1 mt-3">
                        View content
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-slate-500 font-medium italic">Add your work to showcase your best results.</p>
          )}
        </div>
      </div>

      <FeaturedAddModal 
        username={username} 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  )
}
