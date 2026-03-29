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
    if (connectionStatus !== 'IDLE') return
    setConnectionStatus('PENDING')
    // Simulate API call
    setTimeout(() => setConnectionStatus('ACCEPTED'), 1500)
  }

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUploading(true)
    try {
      const ext = file.name.split(".").pop()
      const fileName = `avatars/${user.username}_${Date.now()}.${ext}`
      const { data, error } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true })
      if (error) throw error
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(data.path)
      setAvatarUrl(urlData.publicUrl)
    } catch (err) {
      console.error(err)
    } finally {
      setAvatarUploading(false)
    }
  }

  return (
    <>
      <div className="relative group/header animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="bg-white rounded-[4rem] border border-slate-100 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.06)] relative z-10">
          
          {/* BANNER SECTION */}
          <div className="relative h-72 bg-slate-900 group/banner">
            {user.bannerUrl ? (
              <img src={user.bannerUrl} alt="Banner" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[3000ms]" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-20 overflow-hidden">
                <Globe className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] opacity-10 text-primary rotate-12" />
                <Sparkles className="absolute top-10 left-10 w-24 h-24 opacity-20 text-accent" />
              </div>
            )}
            
            <div className="absolute top-8 right-8 flex items-center gap-3">
               <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white shadow-2xl hover:bg-white/20 hover:scale-110 transition-all active:scale-95 group/edit"
               >
                  <PenLine className="h-5 w-5" />
               </button>
            </div>

            {/* Premium Badge */}
            <div className="absolute top-8 left-8 p-3 px-6 rounded-2xl bg-accent text-slate-900 shadow-2xl flex items-center gap-2">
               <Star className="w-4 h-4 fill-current" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">ELITE MEMBER</span>
            </div>
          </div>

          <div className="relative pt-24 pb-16 px-12">
            
            {/* AVATAR OVERLAY */}
            <div className="absolute -top-24 left-16">
              <div className="relative group/avatar">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <button
                  onClick={handleAvatarClick}
                  disabled={avatarUploading}
                  className="w-48 h-48 rounded-[3.5rem] border-[10px] border-white overflow-hidden bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative focus:outline-none hover:scale-105 transition-all duration-500 group-hover/avatar:-rotate-3"
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
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none italic">
                      {user.firstName} <span className="text-primary">{user.lastName}</span>
                    </h1>
                    {user.pronouns && (
                      <span className="text-[12px] font-black text-slate-300 uppercase tracking-widest mt-2">{user.pronouns}</span>
                    )}
                    <button className="p-2 rounded-xl text-slate-300 hover:text-primary transition-colors mt-2">
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-2xl font-black text-slate-400 leading-tight tracking-tight italic opacity-80 max-w-xl">
                    "{user.headline || "Uncovering universal opportunities in regional tech."}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-8 pt-4">
                  {user.location && (
                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      <MapPin className="h-4 h-4 text-primary" /> {user.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[11px] font-black text-primary uppercase tracking-widest cursor-pointer hover:underline">
                    <LinkIcon className="h-4 w-4" /> Professional Node
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="text-slate-800">{connectionStatus === 'ACCEPTED' ? '501' : '500'}+</span> Core Links
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
                      className="flex-1 xl:flex-none h-14 px-10 rounded-full bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/30 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                    >
                      <Zap className="h-5 w-5 text-accent group-hover:animate-pulse" />
                      Configure Intro Node
                    </button>
                    <button
                      className="flex-1 xl:flex-none h-14 px-10 rounded-full border-2 border-slate-100 text-slate-800 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm"
                    >
                      Add Alliance Node
                    </button>
                    <button
                      className="h-14 px-6 rounded-full border border-slate-100 text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center"
                      title="More options"
                    >
                      <MoreHorizontal className="w-5 h-5" />
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

                    <button className="h-14 w-14 flex items-center justify-center rounded-full border border-slate-100 text-slate-300 hover:text-accent transition-all bg-white shadow-sm">
                       <Star className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative backdrop blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[150px] -z-10" />
      </div>

      <IntroEditModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  )
}
