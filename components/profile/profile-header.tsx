"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Link as LinkIcon, Volume2, PenLine, UserPlus, MessageCircle, Check, Camera, Loader2, Sparkles, Star, Globe, ShieldCheck, Mail } from "lucide-react"
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
                <Globe className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] opacity-10 text-blue-400 rotate-12" />
                <Sparkles className="absolute top-10 left-10 w-24 h-24 opacity-20 text-yellow-400" />
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
            <div className="absolute top-8 left-8 p-3 px-6 rounded-2xl bg-yellow-400/90 backdrop-blur-sm border border-yellow-300 text-slate-900 shadow-2xl flex items-center gap-2">
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
                      <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
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
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center">
                   <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-start gap-12">
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none italic">
                      {user.firstName} <span className="text-blue-600">{user.lastName}</span>
                    </h1>
                    {user.pronouns && (
                      <span className="text-[12px] font-black text-slate-300 uppercase tracking-widest mt-2">{user.pronouns}</span>
                    )}
                    <button className="p-2 rounded-xl text-slate-300 hover:text-blue-600 transition-colors mt-2">
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
                      <MapPin className="h-4 h-4 text-blue-600" /> {user.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-widest cursor-pointer hover:underline">
                    <LinkIcon className="h-4 w-4" /> Professional Node
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="text-slate-800">{connectionStatus === 'ACCEPTED' ? '501' : '500'}+</span> Core Links
                  </div>
                </div>

                {user.isHiring && (
                  <div className="pt-4 flex items-center gap-4">
                     <div className="px-6 py-2 rounded-xl bg-green-50 border border-green-100 text-[#1B5E20] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Open to Deploy
                     </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-4 w-full xl:w-auto">
                {connectionStatus === 'IDLE' ? (
                  <button
                    onClick={handleConnect}
                    className="flex-1 xl:flex-none h-14 px-10 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <UserPlus className="h-5 w-5" />
                    Deploy Link
                  </button>
                ) : (
                  <button className={`flex-1 xl:flex-none h-14 px-10 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${connectionStatus === 'PENDING' ? 'bg-slate-100 text-slate-400' : 'bg-green-600 text-white shadow-xl shadow-green-100'}`}>
                    {connectionStatus === 'PENDING' ? 'Link Pending' : <><Check className="h-5 w-5" /> Linked</>}
                  </button>
                )}

                <button className="flex-1 xl:flex-none h-14 px-10 rounded-full border-2 border-slate-100 text-slate-800 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95">
                  <Mail className="h-5 w-5" />
                  Direct Node
                </button>
                <button className="h-14 w-14 flex items-center justify-center rounded-full border border-slate-100 text-slate-300 hover:text-slate-600 transition-all">
                   <Star className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative backdrop blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 rounded-full blur-[150px] -z-10" />
      </div>

      <IntroEditModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  )
}
