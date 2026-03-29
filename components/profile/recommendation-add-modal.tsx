"use client"

import * as React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Quote } from "lucide-react"
import { useRouter } from "next/navigation"

interface RecommendationAddModalProps {
  receiverUsername: string
  isOpen: boolean
  onClose: () => void
}

export function RecommendationAddModal({ receiverUsername, isOpen, onClose }: RecommendationAddModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    authorName: "", // In a real app, this would be the logged-in user
    headline: "",
    relationship: "",
    content: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/profile/recommendations/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverUsername,
          ...formData,
        }),
      })

      if (res.ok) {
        router.refresh()
        onClose()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to submit recommendation")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" />
            Write a recommendation
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="authorName">Your Name*</Label>
            <Input
              id="authorName"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              required
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Your Headline</Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              placeholder="e.g. Senior Product Manager"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship*</Label>
            <Input
              id="relationship"
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              required
              placeholder="e.g. Managed you directly at TechCorp"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Recommendation Content*</Label>
            <textarea
              id="content"
              className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              placeholder="Describe their skills, achievements, and why you recommend them..."
            />
            <p className="text-xs text-muted-foreground text-right italic">Maximum 2,500 characters</p>
          </div>

          <DialogFooter className="pt-4 border-t sticky bottom-0 bg-background py-4">
            <Button 
              type="submit" 
              className="rounded-full bg-primary font-bold px-8 shadow-md hover:shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Recommendation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
