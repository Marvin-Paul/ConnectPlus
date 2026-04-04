"use client"

import * as React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useUser } from "../providers/user-provider"

interface IntroEditModalProps {
  user: {
    firstName: string
    lastName: string
    username: string
    headline?: string | null
    location?: string | null
    pronouns?: string | null
  }
  isOpen: boolean
  onClose: () => void
}

export function IntroEditModal({ user, isOpen, onClose }: IntroEditModalProps) {
  const router = useRouter()
  const { refreshUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    headline: user.headline || "",
    location: user.location || "",
    pronouns: user.pronouns || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          ...formData,
        }),
      })

      if (res.ok) {
        await refreshUser()
        router.refresh()
        onClose()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to update profile")
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
          <DialogTitle className="text-xl font-bold">Edit intro</DialogTitle>
          <DialogDescription>
            Update your basic information and profile headline.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name*</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name*</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pronouns">Pronouns</Label>
            <Input
              id="pronouns"
              value={formData.pronouns}
              onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
              placeholder="e.g. He/Him, She/Her, They/Them"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline*</Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              required
              placeholder="e.g. Senior Software Engineer at TechFlow"
            />
            <p className="text-[11px] text-muted-foreground">
              Formula: [What you do] + [Who you help] + [Proof/Result]
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Kampala, Uganda"
            />
          </div>

          <DialogFooter className="pt-4 border-t sticky bottom-0 bg-background py-4">
            <Button 
              type="submit" 
              className="rounded-full bg-primary font-bold px-8"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
