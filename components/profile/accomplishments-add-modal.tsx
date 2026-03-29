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
import { Award, FolderKanban, Heart, Trophy } from "lucide-react"
import { useRouter } from "next/navigation"

type AccomplishmentType = "CERTIFICATION" | "PROJECT" | "VOLUNTEER" | "HONOR"

interface AccomplishmentsAddModalProps {
  username: string
  isOpen: boolean
  onClose: () => void
}

export function AccomplishmentsAddModal({ username, isOpen, onClose }: AccomplishmentsAddModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<AccomplishmentType>("CERTIFICATION")
  
  const [formData, setFormData] = useState({
    title: "", // used for certification name, project name, honor title, or volunteer role
    organization: "", // used for issuing org, organization, or issuer
    description: "",
    date: "",
    linkUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/profile/accomplishments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          type,
          ...formData,
        }),
      })

      if (res.ok) {
        router.refresh()
        onClose()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to add accomplishment")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const types = [
    { id: "CERTIFICATION", label: "Certification", icon: Award },
    { id: "PROJECT", label: "Project", icon: FolderKanban },
    { id: "VOLUNTEER", label: "Volunteer", icon: Heart },
    { id: "HONOR", label: "Honor/Award", icon: Trophy },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add accomplishment</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-wrap gap-2 py-4">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id as AccomplishmentType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-semibold ${
                type === t.id 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-muted/50 border-border hover:bg-muted"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title">
              {type === "CERTIFICATION" && "Certification Name*"}
              {type === "PROJECT" && "Project Name*"}
              {type === "VOLUNTEER" && "Role/Position*"}
              {type === "HONOR" && "Award Title*"}
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">
              {type === "CERTIFICATION" && "Issuing Organization*"}
              {type === "PROJECT" && "Case/Organization"}
              {type === "VOLUNTEER" && "Organization*"}
              {type === "HONOR" && "Issuer*"}
            </Label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              required={type !== "PROJECT"}
            />
          </div>

          {(type === "CERTIFICATION" || type === "HONOR") && (
            <div className="space-y-2">
              <Label htmlFor="date">Issue Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          )}

          {type === "PROJECT" && (
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe your project..."
              />
            </div>
          )}

          <DialogFooter className="pt-4 border-t sticky bottom-0 bg-background py-4">
            <Button 
              type="submit" 
              className="rounded-full bg-primary font-bold px-8"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
