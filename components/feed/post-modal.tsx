"use client";

import { useState, useRef } from "react";
import { X, Image as ImageIcon, FileText, Calendar, Smile, Globe, Users, Briefcase, PlaySquare, Settings, Sparkles, PlusSquare, Camera, Loader2, Trash2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [images, setImages] = useState<string[]>([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [visibility, setVisibility] = useState<"ANYONE" | "CONNECTIONS">("ANYONE");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const [isRewriting, setIsRewriting] = useState(false);
  const { createPost } = useFeed();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setPostError(null);
    
    const newImageUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop();
        const fileName = `posts/${Date.now()}_${i}.${ext}`;
        const [emailPart] = user.name.split(" ");
        const userPath = emailPart || "anon";
        
        const { data, error } = await supabase.storage.from("post-images").upload(`${userPath}/${fileName}`, file);
        
        if (error) {
          if (error.message?.toLowerCase().includes("bucket not found") || error.message?.includes("404")) {
            console.warn("Supabase bucket 'post-images' not found. Falling back to placeholder.");
            const samples = [
              "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1522071823991-b1ae5e6a2681?auto=format&fit=crop&w=1200&q=80"
            ];
            newImageUrls.push(samples[Math.floor(Math.random() * samples.length)]);
            continue;
          }
          throw error;
        }
        
        const { data: urlData } = supabase.storage.from("post-images").getPublicUrl(data.path);
        newImageUrls.push(urlData.publicUrl);
      }
      
      setImages(prev => [...prev, ...newImageUrls]);
      if (images.length === 0) setCurrentPreviewIndex(0);
    } catch (err: any) {
      console.error("Storage Error:", err);
      setPostError(`Storage Issue: ${err.message || "Upload failed"}.`);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (currentPreviewIndex >= newImages.length) {
      setCurrentPreviewIndex(Math.max(0, newImages.length - 1));
    }
  };

  const handlePost = async () => {
    if (((!content.trim() && images.length === 0)) || isPosting) return;
    if (content.length > 5000) return;

    setIsPosting(true);
    setPostError(null);
    try {
      await createPost(content, images[0] || undefined, {
        mediaUrls: images,
        visibility: visibility
      });
      setContent("");
      setImages([]);
      setPostError(null);
      onClose();
    } catch (error: any) {
      console.error("Failed to post:", error);
      setPostError(error?.message || "Something went wrong.");
    } finally {
      setIsPosting(false);
    }
  };

  const EMOJIS = ["💡", "🚀", "📈", "🤝", "🎯", "✨", "🔥", "💎", "✅", "🙌"];

  const addEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleAIRewrite = async () => {
    if (!content.trim() || isRewriting) return;
    setIsRewriting(true);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const enhancements = [
      "Optimized for professional impact: ",
      "Editorial refinement: ",
      "Key insight: "
    ];
    
    const prefix = enhancements[Math.floor(Math.random() * enhancements.length)];
    const enhancedContent = `${prefix}${content} #ProfessionalInsights #ConnectPlus`;
    
    setContent(enhancedContent);
    setIsRewriting(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-[#1F2937]/75 dark:bg-slate-950/80 backdrop-blur-sm animate-fade-in px-4">
      <div 
        className="bg-white dark:bg-slate-900 w-full h-[90vh] md:h-auto md:max-w-[560px] md:rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none border-t md:border border-[#E5E7EB] dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-[#E5E7EB] dark:border-slate-800">
           <div className="flex items-center gap-4">
              <button 
                onClick={onClose} 
                disabled={isPosting}
                aria-label="Close"
                title="Discard post"
                className="p-1.5 -ml-1 rounded-full hover:bg-[#F3F6F8] dark:hover:bg-slate-800 text-[#6B7280] dark:text-slate-400 transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-slate-800 overflow-hidden">
                   <img src={user.avatar} className="w-full h-full object-cover" alt="User avatar" />
                 </div>
                 <div className="flex flex-col">
                    <button 
                      onClick={() => setVisibility(visibility === "ANYONE" ? "CONNECTIONS" : "ANYONE")}
                      className="flex items-center gap-1.5 text-[14px] font-bold text-[#1F2937] dark:text-slate-100 hover:bg-[#F3F6F8] dark:hover:bg-slate-800 px-2 py-0.5 -ml-2 rounded-lg transition-all"
                    >
                       {user.name}
                       <ChevronDown className="w-4 h-4 text-[#6B7280] dark:text-slate-400" />
                    </button>
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280] dark:text-slate-500 px-px">
                       {visibility === "ANYONE" ? <Globe className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
                       <span>{visibility === "ANYONE" ? "Anyone" : "Connections only"}</span>
                    </div>
                 </div>
              </div>
           </div>
           
            <div className="flex items-center gap-3">
              <div className={`text-[12px] font-bold ${content.length > 5000 ? 'text-red-500' : 'text-[#6B7280]/60'}`}>
                 {content.length}/5000
              </div>
              <button 
                title="Schedule post" 
                aria-label="Schedule post"
                className="h-9 px-3 rounded-full hover:bg-[#F3F6F8] dark:hover:bg-slate-800 text-[#6B7280] dark:text-slate-400 flex items-center justify-center transition-colors"
              >
                 <Calendar className="w-6 h-6" />
              </button>
              <button 
                onClick={handlePost}
                disabled={(!content.trim() && images.length === 0) || isPosting || uploading || content.length > 5000}
                className="h-9 px-6 rounded-full font-bold text-[14px] transition-all shadow-premium bg-primary text-white hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 {isPosting ? "Posting..." : "Post"}
              </button>
           </div>
        </div>

        {/* Content */}
         <div className="flex-1 px-8 py-6 overflow-y-auto min-h-[300px] relative">
            {showEmojiPicker && (
              <div className="absolute bottom-6 left-6 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-premium border border-border dark:border-slate-700 flex gap-2 animate-in slide-in-from-bottom-2 z-50">
                 {EMOJIS.map(e => (
                    <button key={e} onClick={() => addEmoji(e)} aria-label={`Add ${e} emoji`} className="text-lg hover:scale-125 transition-transform p-1">{e}</button>
                 ))}
                 <button onClick={() => setShowEmojiPicker(false)} title="Close emoji picker" aria-label="Close emoji picker" className="p-1 text-secondary/40 hover:text-foreground dark:text-slate-400"><X className="w-4 h-4" /></button>
              </div>
            )}
           {postError && (
             <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-3">
               <p className="text-[14px] font-semibold text-red-600">{postError}</p>
               <button onClick={() => setPostError(null)} aria-label="Dismiss error" title="Dismiss error" className="p-1 text-red-400 hover:bg-red-100 rounded-full"><X className="w-4 h-4" /></button>
             </div>
           )}
            <textarea 
              className="w-full text-[18px] font-medium text-[#1F2937] dark:text-slate-100 placeholder:text-[#6B7280] dark:placeholder:text-slate-500 border-none outline-none resize-none bg-transparent leading-relaxed"
              placeholder="What's your professional insight today?"
              value={content}
              onChange={(e) => { setContent(e.target.value); setPostError(null); }}
              autoFocus
              disabled={isPosting}
              rows={4}
            />

            {uploading && (
              <div className="w-full aspect-video rounded-2xl bg-[#F3F6F8] dark:bg-slate-800 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-[#E5E7EB] dark:border-slate-700 mt-4 animate-pulse">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-[12px] font-bold uppercase tracking-widest text-secondary dark:text-slate-400">Uploading media...</p>
              </div>
            )}

           {images.length > 0 && !uploading && (
             <div className="relative rounded-xl overflow-hidden group mt-6 animate-in zoom-in-95 duration-500 shadow-lg border border-border">
                <img src={images[currentPreviewIndex]} className="w-full h-auto object-cover max-h-[400px]" alt="" />
                
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setCurrentPreviewIndex(p => (p - 1 + images.length) % images.length)}
                      title="Previous image"
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setCurrentPreviewIndex(p => (p + 1) % images.length)}
                      title="Next image"
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute top-4 left-4 bg-black/60 text-white text-[12px] font-bold px-2 py-1 rounded">
                      {currentPreviewIndex + 1}/{images.length}
                    </div>
                  </>
                )}
                
                <button 
                  onClick={() => removeImage(currentPreviewIndex)}
                  title="Remove image"
                  aria-label="Remove image"
                  className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
             </div>
           )}
           
           <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             multiple
             accept="image/*" 
             title="Upload media"
             onChange={handleImageUpload} 
           />
        </div>

         {/* Footer actions */}
         <div className="px-6 py-4 border-t border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between">
                <button 
                  onClick={handleAIRewrite}
                  disabled={isPosting || !content.trim() || isRewriting}
                  aria-label="AI Rewrite"
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#E5E7EB] dark:border-slate-700 text-[#1F2937] dark:text-slate-200 text-[15px] font-bold hover:bg-[#F3F6F8] dark:hover:bg-slate-800 transition-all group disabled:opacity-50"
                >
                   <Sparkles className={`w-4 h-4 text-primary ${isRewriting ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
                   {isRewriting ? "Rewriting..." : "AI Rewrite"}
                </button>
 
               <div className="flex items-center gap-3">
                  <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} title="Emoji picker" aria-label="Emoji picker" className={`p-3 rounded-xl transition-all ${showEmojiPicker ? 'bg-primary/10 text-primary' : 'hover:bg-[#F3F6F8] dark:hover:bg-slate-800 text-[#6B7280] dark:text-slate-400'}`}>
                     <Smile className="w-7 h-7" />
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={uploading || isPosting} 
                    title="Add photo" 
                    aria-label="Add photo"
                    className="p-3 rounded-xl hover:bg-[#F3F6F8] dark:hover:bg-slate-800 text-primary transition-all"
                  >
                     <Camera className="w-7 h-7" />
                  </button>
                  <button 
                    title="More options" 
                    aria-label="More options"
                    className="p-3 rounded-xl hover:bg-[#F3F6F8] dark:hover:bg-slate-800 text-[#6B7280] dark:text-slate-400 transition-all"
                  >
                    <PlusSquare className="w-7 h-7" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
