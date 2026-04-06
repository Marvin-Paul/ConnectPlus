"use client";

import { useState, useRef } from "react";
import { X, Image as ImageIcon, FileText, Calendar, Smile, Globe, Users, Briefcase, PlaySquare, Settings, Sparkles, PlusSquare, Camera, Loader2, Trash2, ChevronDown } from "lucide-react";
import { useFeed } from "../providers/feed-provider";
import { supabase } from "@/lib/supabase";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    avatar: string;
    name: string;
  };
}

export function PostModal({ isOpen, onClose, user }: PostModalProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [visibility, setVisibility] = useState<"anyone" | "connections">("anyone");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const { createPost } = useFeed();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `posts/${Date.now()}.${ext}`;
      const [emailPart] = user.name.split(" ");
      const userPath = emailPart || "anon";
      const { data, error } = await supabase.storage.from("post-images").upload(`${userPath}/${fileName}`, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("post-images").getPublicUrl(data.path);
      setImage(urlData.publicUrl);
    } catch (err: any) {
      console.error(err);
      setPostError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handlePost = async () => {
    if ((!content.trim() && !image) || isPosting) return;
    setIsPosting(true);
    setPostError(null);
    try {
      await createPost(content, image || undefined);
      setContent("");
      setImage(null);
      setPostError(null);
      onClose();
    } catch (error: any) {
      console.error("Failed to post:", error);
      setPostError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-[#1F2937]/75 backdrop-blur-sm animate-fade-in px-4">
      <div 
        className="bg-white w-full h-[90vh] md:h-auto md:max-w-[560px] md:rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Professional Header - Spaced following 8px system */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-[#E5E7EB]">
           <div className="flex items-center gap-4">
              <button 
                onClick={onClose} 
                disabled={isPosting}
                aria-label="Close"
                className="p-1.5 -ml-1 rounded-full hover:bg-[#F3F6F8] text-[#6B7280] transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full border border-[#E5E7EB] overflow-hidden">
                   <img src={user.avatar} className="w-full h-full object-cover" alt="" />
                 </div>
                 <div className="flex flex-col">
                    <button 
                      onClick={() => setVisibility(visibility === "anyone" ? "connections" : "anyone")}
                      aria-label="Visibility"
                      className="flex items-center gap-1.5 text-[14px] font-bold text-[#1F2937] hover:bg-[#F3F6F8] px-2 py-0.5 -ml-2 rounded-lg transition-all"
                    >
                       {user.name}
                       <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                    </button>
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280] px-px">
                       <Globe className="w-3.5 h-3.5" />
                       <span>{visibility === "anyone" ? "Anyone" : "Connections"}</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
              <button className="h-9 px-3 rounded-full hover:bg-[#F3F6F8] text-[#6B7280] flex items-center justify-center transition-colors" title="Schedule post">
                 <Calendar className="w-6 h-6" />
              </button>
              <button 
                onClick={handlePost}
                disabled={(!content.trim() && !image) || isPosting || uploading}
                className={`h-9 px-6 rounded-full font-bold text-[14px] transition-all shadow-sm ${(content.trim() || image) && !isPosting && !uploading ? "bg-[#0A66C2] text-white hover:bg-[#004182] active:scale-95" : "bg-[#F3F6F8] text-[#6B7280] cursor-not-allowed"}`}
              >
                 {isPosting ? "Posting..." : "Post"}
              </button>
           </div>
        </div>

        {/* Dynamic Content Area - Breathing whitespace */}
        <div className="flex-1 px-8 py-6 overflow-y-auto min-h-[300px]">
           {postError && (
             <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
               <p className="text-[14px] font-semibold text-red-600 leading-snug">{postError}</p>
               <button onClick={() => setPostError(null)} aria-label="Dismiss error" className="p-1 rounded-full hover:bg-red-100 text-red-400 transition-colors shrink-0">
                 <X className="w-4 h-4" />
               </button>
             </div>
           )}
           <textarea 
             className="w-full text-[18px] font-medium text-[#1F2937] placeholder:text-[#6B7280] border-none outline-none resize-none bg-transparent leading-relaxed"
             placeholder="What's your professional insight today?"
             value={content}
             onChange={(e) => { setContent(e.target.value); if (postError) setPostError(null); }}
             autoFocus
             disabled={isPosting}
             rows={6}
           />

           {uploading && (
             <div className="w-full aspect-video rounded-2xl bg-[#F3F6F8] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-[#E5E7EB] mt-4 animate-pulse">
               <Loader2 className="w-8 h-8 text-[#0A66C2] animate-spin" />
               <p className="text-[12px] font-bold uppercase tracking-widest text-[#6B7280]">Uploading media...</p>
             </div>
           )}

           {image && !uploading && (
             <div className="relative rounded-xl overflow-hidden group mt-6 animate-in zoom-in-95 duration-500 shadow-lg ring-1 ring-[#E5E7EB]">
                <img src={image} className="w-full h-auto object-cover max-h-[450px]" alt="Visual Insight" />
                <button 
                  onClick={() => setImage(null)}
                  aria-label="Remove image"
                  className="absolute top-4 right-4 p-2.5 bg-[#1F2937]/80 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-all active:scale-90 shadow-xl opacity-0 group-hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>
           )}
           
           <input 
             type="file" 
             ref={fileInputRef} 
             title="Select image resource"
             className="hidden" 
             accept="image/*" 
             onChange={handleImageUpload} 
           />
        </div>

        {/* Premium Tool Dock - 8px-based elements */}
        <div className="px-6 py-4 border-t border-[#E5E7EB] bg-white">
           <div className="flex items-center justify-between">
              <button 
                disabled={isPosting || !content.trim()}
                onClick={async () => {
                  if (!content.trim()) return;
                  const res = await fetch("/api/generate/tone", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: content, targetTone: "professional" }),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    setContent(data.optimizedText);
                  }
                }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#E5E7EB] text-[#1F2937] text-[15px] font-bold hover:bg-[#F3F6F8] transition-all active:scale-95 shadow-sm group disabled:opacity-50"
              >
                 <Sparkles className="w-4 h-4 text-[#0A66C2] group-hover:animate-pulse" />
                 Professional Rewrite
              </button>

              <div className="flex items-center gap-3">
                 <button 
                   onClick={() => fileInputRef.current?.click()}
                   disabled={uploading || isPosting}
                   aria-label="Upload photo"
                   title="Add media"
                   className="p-3 rounded-xl hover:bg-[#F3F6F8] text-[#0A66C2] transition-all active:scale-90"
                 >
                    <Camera className="w-7 h-7" />
                 </button>
                 <button className="p-3 rounded-xl hover:bg-[#F3F6F8] text-[#6B7280] transition-all" title="More options">
                    <PlusSquare className="w-7 h-7" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
