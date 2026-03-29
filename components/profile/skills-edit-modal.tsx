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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Pin, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Skill {
  id: string
  name: string
  isPinned: boolean
}

interface SkillsEditModalProps {
  username: string
  skills: Skill[]
  isOpen: boolean
  onClose: () => void
}

export function SkillsEditModal({ username, skills, isOpen, onClose }: SkillsEditModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    setLoading(true)

    try {
      const res = await fetch("/api/profile/skills/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          name: newSkill.trim(),
        }),
      })

      if (res.ok) {
        setNewSkill("")
        router.refresh()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to add skill")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePin = async (skillId: string, currentPin: boolean) => {
    try {
      const res = await fetch("/api/profile/skills/toggle-pin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          skillId,
          isPinned: !currentPin,
        }),
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteSkill = async (skillId: string) => {
    if (!confirm("Are you sure you want to remove this skill?")) return

    try {
      const res = await fetch(`/api/profile/skills/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          skillId
        })
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Skills</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <form onSubmit={handleAddSkill} className="space-y-2">
            <Label htmlFor="newSkill">Add skill</Label>
            <div className="flex gap-2">
              <Input
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. Next.js, Project Management..."
              />
              <Button type="submit" disabled={loading || !newSkill.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Your skills ({skills.length})
              </h4>
              <p className="text-xs text-muted-foreground">Pin up to 3 skills to your top</p>
            </div>
            
            <div className="space-y-2 border rounded-lg p-4 bg-muted/20">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between group py-1.5 border-b last:border-0 border-white/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{skill.name}</span>
                    {skill.isPinned && (
                      <Badge variant="secondary" className="text-[10px] py-0 px-1 bg-primary/20 text-primary uppercase font-bold">
                        Pinned
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleTogglePin(skill.id, skill.isPinned)}
                      className={`p-1.5 rounded-full hover:bg-muted transition-colors ${skill.isPinned ? 'text-primary' : 'text-muted-foreground'}`}
                      title={skill.isPinned ? "Unpin skill" : "Pin skill"}
                    >
                      <Pin className={`h-4 w-4 ${skill.isPinned ? 'fill-current rotate-[45deg]' : ''}`} />
                    </button>
                    <button 
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-1.5 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors text-muted-foreground"
                      title="Delete skill"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {skills.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center py-4">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="pt-6">
          <Button variant="outline" onClick={onClose} className="rounded-full px-8">Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
