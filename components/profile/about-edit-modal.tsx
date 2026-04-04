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
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface AboutEditModalProps {
  user: {
    username: string
    bio?: string | null
  }
  isOpen: boolean
  onClose: () => void
}

export function AboutEditModal({ user, isOpen, onClose }: AboutEditModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [bio, setBio] = useState(user.bio || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          bio,
        }),
      })

      if (res.ok) {
        router.refresh()
        onClose()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to update bio")
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit about</DialogTitle>
          <DialogDescription>
            Update your professional summary to highlight your achievements and goals.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Summary</Label>
            <textarea
              id="bio"
              className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a summary about yourself..."
            />
            <p className="text-[11px] text-muted-foreground text-right">
              {bio.length} / 2600
            </p>
          </div>

          <DialogFooter className="pt-4 border-t">
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
