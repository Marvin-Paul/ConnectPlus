"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Eye, BarChart3, Search, Bookmark, Briefcase, DollarSign } from "lucide-react"
import Link from "next/link"

export function DashboardSection() {
  const stats = [
    {
      id: "views",
      label: "Profile views",
      value: "148",
      icon: Eye,
      description: "Increase of 12% from last week"
    },
    {
      id: "impressions",
      label: "Post impressions",
      value: "2,041",
      icon: BarChart3,
      description: "Check your content performance"
    },
    {
      id: "searches",
      label: "Search appearances",
      value: "42",
      icon: Search,
      description: "How often you appear in search results"
    }
  ]

  const resources = [
    { label: "My items", icon: Bookmark, description: "Keep track of your saved posts and jobs" },
    { label: "Salary insights", icon: DollarSign, description: "See how your salary compares to others" },
    { label: "Job seeker guidance", icon: Briefcase, description: "Get personalized career advice" }
  ]

  return (
    <Card className="mb-6 overflow-hidden bg-muted/30 border-primary/20 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-0 pt-6 px-8 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Your Dashboard</CardTitle>
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1.5 italic">
            Private to you
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-8 pt-6 space-y-8">
        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Link 
              href="/premium/analytics"
              key={stat.id} 
              className="bg-background p-5 rounded-xl border border-border shadow-sm group hover:border-primary/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-foreground/80">{stat.label}</span>
              </div>
              <div className="text-2xl font-black text-primary mb-1">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground font-medium leading-none">{stat.description}</p>
            </Link>
          ))}
        </div>

        {/* Resources Section */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Manage your career
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {resources.map((res, i) => (
              <div key={i} className="flex gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <res.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {res.label}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-tight italic">
                    {res.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
