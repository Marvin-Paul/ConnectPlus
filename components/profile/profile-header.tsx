"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Link as LinkIcon, Volume2, PenLine, UserPlus, MessageCircle, Check, Camera, Loader2, Sparkles, Star, Globe, ShieldCheck, Mail, Zap, MoreHorizontal, ChevronDown, Plus, GraduationCap, Briefcase, Award, FolderGit2, MessageSquareQuote, Heart, ScrollText, Trophy, Send, FileDown, FileText, Info } from "lucide-react"
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
  const [showAddSection, setShowAddSection] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const addSectionRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)

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
    if (!file || !isOwner) return
    setAvatarUploading(true)
    try {
      const ext = file.name.split(".").pop()
      const fileName = `avatars/${user.username}_${Date.now()}.${ext}`
      
      let publicUrl = "";

      // 1. Upload to Supabase Storage
      const { data, error } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true })
      
      if (error) {
        // Fallback for configuration issues (RLS, Missing Bucket, Permissions)
        const isConfigError = 
          error.message?.toLowerCase().includes("security policy") || 
          error.message?.toLowerCase().includes("bucket not found") || 
          error.message?.includes("404") ||
          error.message?.includes("403");

        if (isConfigError) {
          console.warn("Supabase Storage configuration issue detected. Using local blob for preview.", error.message);
          publicUrl = URL.createObjectURL(file);
          alert("Note: Profile picture updated locally. To enable permanent storage, please ensure your Supabase 'avatars' bucket has the correct RLS policies.");
        } else {
          throw error
        }
      } else {
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(data.path)
        publicUrl = urlData.publicUrl;
      }
      
      setAvatarUrl(publicUrl)

      // 2. Persist URL to Database
      const updateRes = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: publicUrl })
      });

      if (updateRes.ok) {
        // 3. Refresh user state across the app
        router.refresh();
      }

    } catch (err: any) {
      console.error("Avatar Storage Upload Failed. Attempting Base64 Fallback...", err);
      
      // PROFESSIONAL FALLBACK: Base64 Persistence
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          
          const fallbackRes = await fetch('/api/profile/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatarUrl: base64data })
          });

          if (fallbackRes.ok) {
            setAvatarUrl(base64data);
            router.refresh();
            console.log("Successfully persisted avatar via Base64 fallback.");
          } else {
            alert("Failed to update profile picture even with fallback. Please check your network.");
          }
        };
      } catch (fallbackErr) {
        console.error("Base64 Fallback Failed:", fallbackErr);
        alert("Failed to update profile picture. Please try again.");
      }
    } finally {
      setAvatarUploading(false)
    }
  }

  return (
    <>
      <div className="relative group/header animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm relative z-10">
          
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
                  disabled={avatarUploading || !isOwner}
                  className={`w-40 h-40 rounded-2xl border-[4px] border-white dark:border-slate-900 overflow-hidden bg-white dark:bg-slate-800 shadow-sm relative focus:outline-none transition-all duration-300 ${isOwner ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}`}
                >
                  {avatarUploading ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                      <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    </div>
                  ) : avatarUrl ? (
                    <img src={avatarUrl} alt={user.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-4xl font-black text-white italic">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                  )}

                  {isOwner && (
                    <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                      <Camera className="h-8 w-8 text-white mb-2" />
                      <span className="text-white text-[9px] font-black uppercase tracking-widest">Update Portrait</span>
                    </div>
                  )}
                </button>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center">
                   <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-start gap-12">
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-[32px] font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                      {user.firstName} {user.lastName}
                    </h1>
                    <button 
                      aria-label="Listen to name pronunciation"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-[18px] font-medium text-slate-600 dark:text-slate-400 leading-tight tracking-tight">
                    {user.headline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  {user.location && (
                    <div className="flex items-center gap-1 text-[13px] font-medium text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {user.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[13px] font-bold text-[#0A66C2] dark:text-green-500 hover:underline cursor-pointer">
                    Contact info
                  </div>
                  <div className="flex items-center gap-1 text-[13px] font-bold text-slate-500">
                    <span className="text-slate-900 dark:text-slate-200">{connectionStatus === 'ACCEPTED' ? '501' : '500'}+</span> connections
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
                       className="px-6 h-10 rounded-full bg-[#0A66C2] dark:bg-[#1B5E20] text-white font-bold text-[14px] hover:bg-[#004182] dark:hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                     >
                       Open to
                     </button>
                      <div className="relative" ref={addSectionRef}>
                        <button
                          onClick={() => setShowAddSection(!showAddSection)}
                          className={`px-6 h-10 rounded-full border border-[#0A66C2] dark:border-green-600 font-bold text-[14px] transition-all flex items-center justify-center gap-2 ${
                            showAddSection 
                            ? "bg-blue-50 dark:bg-green-900/20 ring-2 ring-[#0A66C2]/20" 
                            : "text-[#0A66C2] dark:text-green-500 hover:bg-blue-50 dark:hover:bg-green-900/10"
                          }`}
                        >
                          Add profile section
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAddSection ? "rotate-180" : ""}`} />
                        </button>

                        {showAddSection && (
                          <div className="absolute top-full left-0 mt-2 w-[320px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                            <div className="p-2 space-y-1">
                              {/* CORE CATEGORY */}
                              <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-3 h-3" /> Core
                              </div>
                              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                  <GraduationCap className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Add education</div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">Showcase your academic background</div>
                                </div>
                              </button>
                              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                                  <Briefcase className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Add position</div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">Highlight your professional roles</div>
                                </div>
                              </button>

                              {/* RECOMMENDED */}
                              <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-2">
                                <Star className="w-3 h-3" /> Recommended
                              </div>
                              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                  <Award className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Add licenses & certifications</div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">Validate your expertise</div>
                                </div>
                              </button>
                              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                                  <FolderGit2 className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Add projects</div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">Showcase specific achievements</div>
                                </div>
                              </button>

                              {/* ADDITIONAL */}
                              <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-2">
                                <Plus className="w-3 h-3" /> Additional
                              </div>
                              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600">
                                  <Trophy className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Add honors & awards</div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">Share your formal recognition</div>
                                </div>
                              </button>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex justify-center">
                              <button className="text-[11px] font-black text-[#0A66C2] dark:text-green-500 uppercase tracking-widest hover:underline">
                                View all options
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="relative" ref={moreMenuRef}>
                        <button
                          onClick={() => setShowMoreMenu(!showMoreMenu)}
                          className={`px-6 h-10 rounded-full border font-bold text-[14px] transition-all flex items-center justify-center ${
                            showMoreMenu
                            ? "bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-500 text-slate-900 dark:text-white"
                            : "border-slate-400 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          More
                        </button>

                        {showMoreMenu && (
                          <div className="absolute top-full right-0 mt-2 w-[240px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                            <div className="p-2 space-y-1">
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group text-left">
                                <Send className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">Send profile in a message</span>
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group text-left">
                                <FileDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">Save to PDF</span>
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group text-left">
                                <FileText className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">Build a resume</span>
                              </button>
                              <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2" />
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group text-left">
                                <Info className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">About this profile</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
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

                    <Link href="/messaging" className="flex-1 xl:flex-none h-14 px-10 rounded-full border-2 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 group shadow-sm bg-white dark:bg-slate-900">
                      <Mail className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                      Direct Node
                    </Link>

                    <button 
                      aria-label="Save profile to favorites"
                      className="h-14 w-14 flex items-center justify-center rounded-full border border-slate-100 dark:border-slate-800 text-slate-300 hover:text-accent transition-all bg-white dark:bg-slate-900 shadow-sm"
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
