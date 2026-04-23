"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle2, Globe, Users, X, Camera, Paperclip, Send, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { PostModal } from "./post-modal";
import { useUser } from "../providers/user-provider";
import { useFeed } from "../providers/feed-provider";

export function CreatePost() {
  const { user: contextUser, loading } = useUser();
  const { createPost } = useFeed();
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [visibility, setVisibility] = useState("ANYONE");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && content === "") {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [content]);

  if (loading) return null;

  const user = {
    avatar: contextUser?.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=U",
    name: contextUser ? `${contextUser.firstName} ${contextUser.lastName}` : "Professional User"
  };

  const handlePost = async () => {
    if (!content.trim() || isPosting) return;
    setIsPosting(true);
    try {
      await createPost(content, undefined, { visibility });
      setContent("");
      setIsExpanded(false);
      toast.success("Insight shared successfully!", {
        description: "Your post is now visible to your professional network.",
        duration: 4000,
      });
    } catch (err) {
      console.error("Failed to post inline:", err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleAIRewrite = async () => {
    if (!content.trim() || isRewriting) return;
    setIsRewriting(true);
    
    // Professional delay to simulate deep analysis
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const strategies = [
      (c: string) => `Refined Perspective: ${c} \n\nLooking forward to hearing thoughts from my network. #Leadership #Strategy`,
      (c: string) => `Editorial Insight: ${c} \n\nHow is your team approaching this? #ProfessionalGrowth #Innovation`,
      (c: string) => `Executive Summary: ${c} \n\nKey takeaways for Q2. #BusinessIntelligence #ConnectPlus`
    ];
    
    const generator = strategies[Math.floor(Math.random() * strategies.length)];
    const polished = generator(content);
    
    // Animated typing effect for the "AI" feel
    let i = 0;
    const interval = setInterval(() => {
      setContent(polished.slice(0, i));
      i++;
      if (i > polished.length) {
        clearInterval(interval);
        setIsRewriting(false);
      }
    }, 15);
  };

  return (
    <>
      <div 
        ref={containerRef}
        className={`bg-white dark:bg-slate-950 rounded-xl border border-border dark:border-slate-800 shadow-soft relative overflow-hidden transition-all duration-500 ease-in-out animate-pro-fade ${isExpanded ? 'p-0 shadow-premium' : 'p-6 hover:shadow-premium'}`}
      >
        {!isExpanded ? (
          <div className="flex items-center gap-4 relative z-10 transition-all duration-300">
            <div className="shrink-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-border dark:border-slate-800 shadow-sm transition-transform hover:scale-105 bg-muted dark:bg-slate-900">
                   <img src={user.avatar} alt="Me" className="w-full h-full object-cover" />
                </div>
            </div>
            
            <div className="flex-1">
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="w-full h-12 rounded-lg border border-border dark:border-slate-800 px-6 text-left bg-muted dark:bg-slate-900 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all text-secondary dark:text-slate-400 font-bold text-[14px]"
                >
                   Share an editorial insight...
                </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col animate-in slide-in-from-top-4 duration-500">
            <div className="p-4 border-b border-border/40 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                    <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-foreground leading-none">{user.name}</span>
                    <button 
                      onClick={() => setVisibility(v => v === "ANYONE" ? "CONNECTIONS" : "ANYONE")}
                      className="flex items-center gap-1 text-[11px] text-secondary/60 hover:text-primary transition-colors mt-1"
                    >
                       {visibility === "ANYONE" ? <Globe className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                       <span className="font-medium">{visibility === "ANYONE" ? "Anyone" : "Connections"}</span>
                    </button>
                  </div>
               </div>
               <button 
                 onClick={() => setIsExpanded(false)}
                 title="Collapse editor"
                 aria-label="Collapse editor"
                 className="p-1.5 rounded-full hover:bg-muted text-secondary/40 transition-colors"
               >
                 <X className="w-4 h-4" />
               </button>
            </div>
            
            <textarea
              ref={textareaRef}
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's your professional insight today?"
              className="w-full p-6 min-h-[140px] text-[16px] font-medium bg-transparent border-none focus:ring-0 placeholder:text-secondary/40 resize-none leading-relaxed"
            />

            <div className="p-4 flex items-center justify-between border-t border-border/40 bg-slate-50/30 dark:bg-slate-900/30">
               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    title="Add media/advanced post"
                    className="p-2.5 rounded-lg hover:bg-muted text-primary transition-all active:scale-90"
                  >
                     <Camera className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    title="Add document"
                    className="p-2.5 rounded-lg hover:bg-muted text-secondary/60 transition-all active:scale-90"
                  >
                     <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-border/60 mx-1" />
                  <button 
                    onClick={handleAIRewrite}
                    disabled={isRewriting || !content.trim()}
                    title="AI Rewrite"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 text-secondary text-[12px] font-bold hover:bg-white dark:hover:bg-slate-800 transition-all group disabled:opacity-40"
                  >
                     <Sparkles className={`w-3.5 h-3.5 text-accent ${isRewriting ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
                     <span>{isRewriting ? 'Polishing...' : 'AI Polish'}</span>
                  </button>
               </div>

               <button
                 onClick={handlePost}
                 disabled={!content.trim() || isPosting}
                 className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white font-bold text-[13px] hover:bg-primary/90 transition-all shadow-premium disabled:opacity-50 disabled:scale-100 active:scale-95"
               >
                  {isPosting ? 'Posting...' : 'Post Insight'}
                  <Send className="w-3.5 h-3.5" />
               </button>
            </div>
          </div>
        )}
        


        {/* Subtle decorative glow */}
        {!isExpanded && <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A66C2]/5 rounded-full blur-[60px] -z-0 pointer-events-none" />}
      </div>

      <PostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={user}
      />
    </>
  );
}
