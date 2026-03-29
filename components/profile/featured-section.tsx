"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ExternalLink, Plus } from "lucide-react"
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
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Featured</CardTitle>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="text-sm font-bold text-primary hover:bg-primary/10 px-3 py-1 rounded-md transition-colors flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add featured
          </button>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2">
          {featured.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar scrollbar-hide">
              {featured.map((item) => (
                <div key={item.id} className="min-w-[300px] border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded-t-lg" />
                  )}
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-sm leading-tight line-clamp-2">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.linkUrl && (
                      <div className="flex items-center text-xs text-primary font-bold gap-1 mt-2">
                        <ExternalLink className="h-3 w-3" />
                        View details
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-2 text-sm text-muted-foreground italic">Add your work to showcase your best results.</p>
          )}
        </CardContent>
      </Card>

      <FeaturedAddModal 
        username={username} 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  )
}
