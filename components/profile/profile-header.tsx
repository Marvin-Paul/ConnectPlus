"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Link as LinkIcon, Volume2, PenLine, UserPlus, MessageCircle, Check, Camera, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IntroEditModal } from "./intro-edit-modal"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface ProfileHeaderProps {
  user: {
    firstName: string
    lastName: string
    username: string
    headline?: string | null
    location?: string | null
    pronouns?: string | null
    avatarUrl?: string | null
    bannerUrl?: string | null
    isHiring?: boolean
  }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const router = useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'IDLE' | 'PENDING' | 'ACCEPTED'>('IDLE')
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || null)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleConnect = async () => {
    if (connectionStatus !== 'IDLE') return
    setLoading(true)
    try {
      const res = await fetch("/api/network/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterUsername: "demo-user",
          addresseeUsername: user.username,
          action: "CONNECT"
        })
      })
      if (res.ok) {
        setConnectionStatus('PENDING')
        router.refresh()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to connect")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type and size (5MB max)
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.")
      return
    }

    setAvatarUploading(true)

    try {
      // Generate unique filename
      const ext = file.name.split(".").pop()
      const fileName = `avatars/${user.username}_${Date.now()}.${ext}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true })

      if (error) throw error

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(data.path)

      const publicUrl = urlData.publicUrl

      // Save URL to DB
      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, avatarUrl: publicUrl }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to save avatar")
      }

      // Update local state instantly for optimistic UI
      setAvatarUrl(publicUrl)
      router.refresh()
    } catch (err: any) {
      console.error("Avatar upload error:", err)
      alert(err.message || "Failed to upload photo. Please try again.")
    } finally {
      setAvatarUploading(false)
      // Reset file input so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <>
      <Card className="overflow-hidden mb-6">
        <div className="relative h-48 bg-muted">
          {user.bannerUrl ? (
            <img src={user.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#1B5E20]/20 to-[#1B5E20]/10" />
          )}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white border shadow-sm group transition-all"
            onClick={() => setIsEditModalOpen(true)}
          >
            <PenLine className="h-4 w-4 group-hover:scale-110 transition-transform text-[#1B5E20]" />
          </Button>
        </div>

        <CardContent className="relative pt-16 pb-6 px-8">

          {/* Clickable Avatar with Camera Overlay */}
          <div className="absolute -top-16 left-8">
            <div className="relative group">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />

              {/* Avatar circle */}
              <button
                onClick={handleAvatarClick}
                disabled={avatarUploading}
                className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-background shadow-lg relative focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 transition-all"
                title="Click to change profile photo"
              >
                {avatarUploading ? (
                  <div className="w-full h-full flex items-center justify-center bg-[#E5ECE8]">
                    <Loader2 className="h-8 w-8 text-[#1B5E20] animate-spin" />
                  </div>
                ) : avatarUrl ? (
                  <img src={avatarUrl} alt={user.firstName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#E5ECE8] text-4xl font-bold text-[#1B5E20]">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                )}

                {/* Camera hover overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Camera className="h-7 w-7 text-white mb-1" />
                  <span className="text-white text-[10px] font-bold">Change Photo</span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#1B5E20]">
                  {user.firstName} {user.lastName}
                </h1>
                {user.pronouns && (
                  <span className="text-sm text-[#435348] font-normal">
                    ({user.pronouns})
                  </span>
                )}
                <Volume2 className="h-4 w-4 text-[#435348] cursor-pointer hover:text-[#1B5E20] transition-colors" />
              </div>

              <p className="text-lg leading-snug font-normal text-slate-800 italic">
                {user.headline || "Digital handshakes begin with a great headline."}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#435348] mt-2">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <span className="text-[#1B5E20] font-bold cursor-pointer hover:underline">
                    Contact info
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#1B5E20] font-bold cursor-pointer hover:underline">
                    {connectionStatus === 'ACCEPTED' ? '501' : '500'}+ connections
                  </span>
                </div>
              </div>

              {user.isHiring && (
                <Badge variant="secondary" className="mt-4 py-1 px-3 bg-[#4CAF50]/10 text-[#1B5E20] hover:bg-[#4CAF50]/20 border-[#4CAF50]/20 rounded-md font-bold uppercase tracking-wider text-[10px]">
                  #OpenToWork
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
              {connectionStatus === 'IDLE' ? (
                <Button
                  onClick={handleConnect}
                  disabled={loading}
                  className="rounded-full px-6 bg-[#1B5E20] text-white font-bold shadow-md hover:bg-[#154d1a] transition-all flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Connect
                </Button>
              ) : connectionStatus === 'PENDING' ? (
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-[#D1D9D4] text-[#435348] font-bold flex items-center gap-2 cursor-default"
                >
                  Pending
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-[#4CAF50] text-[#1B5E20] font-bold flex items-center gap-2 cursor-default"
                >
                  <Check className="h-4 w-4" />
                  Connected
                </Button>
              )}

              <Button variant="outline" className="rounded-full px-6 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20]/5 font-bold shadow-sm flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>
              <Button variant="outline" className="rounded-full px-4 font-bold border-[#D1D9D4] text-[#435348]">
                More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <IntroEditModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  )
}
