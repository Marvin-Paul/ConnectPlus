"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Link as LinkIcon, Volume2, PenLine, UserPlus, MessageCircle, Check, Camera, Loader2, Sparkles, Star, Globe, ShieldCheck, Mail, Zap, MoreHorizontal } from "lucide-react"
import { IntroEditModal } from "./intro-edit-modal"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useUser } from "../providers/user-provider"
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
  const { user: currentUser } = useUser()
  const isOwner = currentUser?.username === user.username
  const router = useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'IDLE' | 'PENDING' | 'ACCEPTED' | 'CONNECTED'>('IDLE')
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || null)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleConnect = async () => {
    if (!currentUser || connectionStatus !== 'IDLE') return;
    setConnectionStatus('PENDING');
    
    try {
      // Find the user ID of the profile we're viewing
      const resUser = await fetch(`/api/profile/${user.username}`);
      if (!resUser.ok) throw new Error("User not found");
      const targetUser = await resUser.json();

      await fetch('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterId: currentUser.id,
          addresseeId: targetUser.id
        })
      });
    } catch (err) {
      console.error("Connect error:", err);
      setConnectionStatus('IDLE');
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUploading(true)
    try {
      const ext = file.name.split(".").pop()
      const fileName = `avatars/${user.username}_${Date.now()}.${ext}`
      const { data, error } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true })
      
      if (error) {
        // Fallback for missing bucket in development
        if (error.message?.toLowerCase().includes("bucket not found") || error.message?.includes("404")) {
          console.warn("Supabase bucket 'avatars' not found. Falling back to local preview.");
          const localUrl = URL.createObjectURL(file);
          setAvatarUrl(localUrl);
          return;
        }
        throw error
      }
      
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(data.path)
      setAvatarUrl(urlData.publicUrl)
    } catch (err: any) {
      console.error("Avatar Upload Error:", err);
      // Optional: Add a toast or UI error message here
    } finally {
      setAvatarUploading(false)
    }
  }

  return (
    <>
      <div className="relative group/header animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm relative z-10">
          
          {/* BANNER SECTION */}
          <div className="relative h-64 bg-slate-100 divide-x divide-slate-200 flex items-center justify-center">
            {user.bannerUrl ? (
              <img src={user.bannerUrl} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" />
            ) : (
              <div className="w-full h-full bg-slate-900 border-b border-slate-800" />
            )}
            
             <div className="absolute top-6 right-6 flex items-center gap-3">
                <button 
                   onClick={() => setIsEditModalOpen(true)}
                   aria-label="Edit introduction"
                   className="p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all active:scale-95"
                >
                   <PenLine className="h-5 w-5" />
                </button>
             </div>
          </div>

          <div className="relative pt-24 pb-16 px-12">
            
            {/* AVATAR OVERLAY */}
            <div className="absolute -top-16 left-8">
              <div className="relative group/avatar">
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange} 
                  aria-label="Upload avatar portrait"
                />
                <button
                  onClick={handleAvatarClick}
                  disabled={avatarUploading}
                  className="w-40 h-40 rounded-2xl border-[4px] border-white overflow-hidden bg-white shadow-sm relative focus:outline-none hover:scale-105 transition-all duration-300"
                >
                  {avatarUploading ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50">
                      <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    </div>
                  ) : avatarUrl ? (
                    <img src={avatarUrl} alt={user.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-4xl font-black text-white italic">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                    <Camera className="h-8 w-8 text-white mb-2" />
                    <span className="text-white text-[9px] font-black uppercase tracking-widest">Update Portait</span>
                  </div>
                </button>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl border-4 border-white shadow-xl flex items-center justify-center">
                   <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-start gap-12">
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-[32px] font-bold text-slate-900 tracking-tight leading-none">
                      {user.firstName} {user.lastName}
                    </h1>
                    <button 
                      aria-label="Listen to name pronunciation"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-[18px] font-medium text-slate-600 leading-tight tracking-tight">
                    {user.headline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  {user.location && (
                    <div className="flex items-center gap-1 text-[13px] font-medium text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {user.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[13px] font-bold text-[#0A66C2] hover:underline cursor-pointer">
                    Contact info
                  </div>
                  <div className="flex items-center gap-1 text-[13px] font-bold text-slate-500">
                    <span className="text-slate-900">{connectionStatus === 'ACCEPTED' ? '501' : '500'}+</span> connections
                  </div>
                </div>

                {user.isHiring && (
                  <div className="pt-4 flex items-center gap-4">
                     <div className="px-6 py-2 rounded-xl bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Open to Deploy
                     </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-8 w-full xl:w-auto items-center">
                {isOwner ? (
                  <>
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="px-6 h-10 rounded-full bg-[#0A66C2] text-white font-bold text-[14px] hover:bg-[#004182] transition-all flex items-center justify-center gap-2"
                    >
                      Open to
                    </button>
                    <button
                      className="px-6 h-10 rounded-full border border-[#0A66C2] text-[#0A66C2] font-bold text-[14px] hover:bg-blue-50 transition-all flex items-center justify-center"
                    >
                      Add profile section
                    </button>
                    <button
                      className="px-6 h-10 rounded-full border border-slate-400 text-slate-500 font-bold text-[14px] hover:bg-slate-50 transition-all flex items-center justify-center"
                    >
                      More
                    </button>
                  </>
                ) : (
                  <>
                    {connectionStatus === 'IDLE' ? (
                      <button
                        onClick={handleConnect}
                        className="flex-1 xl:flex-none h-14 px-10 rounded-full bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 active:scale-95"
                      >
                        <UserPlus className="h-5 w-5" />
                        Deploy Alliance Link
                      </button>
                    ) : (
                      <button className={`flex-1 xl:flex-none h-14 px-10 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${connectionStatus === 'PENDING' ? 'bg-slate-100 text-slate-400' : 'bg-primary text-white shadow-xl shadow-primary/20'}`}>
                        {connectionStatus === 'PENDING' ? 'Link Pending' : <><Check className="h-5 w-5" /> Linked</>}
                      </button>
                    )}

                    <Link href="/messaging" className="flex-1 xl:flex-none h-14 px-10 rounded-full border-2 border-slate-100 text-slate-800 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95 group shadow-sm bg-white">
                      <Mail className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                      Direct Node
                    </Link>

                    <button 
                      aria-label="Save profile to favorites"
                      className="h-14 w-14 flex items-center justify-center rounded-full border border-slate-100 text-slate-300 hover:text-accent transition-all bg-white shadow-sm"
                    >
                       <Star className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>


      </div>

      <IntroEditModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  )
}
