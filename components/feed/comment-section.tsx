"use client";

import { useState, useEffect } from "react";
import { Smile, Send, MoreHorizontal as Ellipsis, ThumbsUp, Heart, Star, Sparkles, MessageSquare, Award, Clock, ChevronDown, User, Reply, Search, X, Flag, Trash2 } from "lucide-react";
import { useUser } from "../providers/user-provider";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likes_count?: number;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl: string | null;
    headline: string | null;
  };
}

interface CommentSectionProps {
  postId: string;
  onCommentAdded: () => void;
}

export function CommentSection({ postId, onCommentAdded }: CommentSectionProps) {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [activeMore, setActiveMore] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${postId}/comment`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
       console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();

    // Realtime subscription for new comments
    let channel: any = null;
    const initRealtime = async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;

        // Clean up any existing channel with same name to prevent "after subscribe" error
        const existing = supabase.getChannels().find(c => c.topic === `realtime:comments_${postId}`);
        if (existing) {
          await supabase.removeChannel(existing);
        }

        channel = supabase.channel(`comments_${postId}`)
          .on(
            'postgres_changes' as any,
            { event: 'INSERT', schema: 'public', table: 'Comment', filter: `postId=eq.${postId}` },
            async (payload: any) => {
               try {
                  const res = await fetch(`/api/comment/${payload.new.id}`);
                  if (res.ok) {
                     const fullComment = await res.json();
                     setComments(prev => {
                        if (prev.find(c => c.id === fullComment.id)) return prev;
                        return [fullComment, ...prev];
                     });
                  }
               } catch (e) {
                  console.error("Error fetching realtime comment:", e);
               }
            }
          );
        
        channel.subscribe();
      } catch (err) {
        console.error("Realtime comments error:", err);
      }
    };

    initRealtime();

    return () => {
      if (channel) {
        import("@/lib/supabase").then(({ supabase }) => {
          supabase.removeChannel(channel);
        });
      }
    };
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting || !user) return;

    setIsSubmitting(true);
    try {
      // Use the authenticated user ID, or fallback to 'demo-user' to match the backend's development pattern
      const senderId = user?.id || "demo-user";
      
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: senderId, content: newComment }),
      });
      if (res.ok) {
        const comment = await res.json();
        setComments(prev => [comment, ...prev]);
        setNewComment("");
        onCommentAdded();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (id: string) => {
    setLikedComments(prev => {
       const next = new Set(prev);
       if (next.has(id)) next.delete(id);
       else next.add(id);
       return next;
    });
    setComments(prev => prev.map(c => 
       c.id === id ? { ...c, likes_count: (c.likes_count || 0) + (likedComments.has(id) ? -1 : 1) } : c
    ));
  };

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const EMOJIS = ["💡", "🚀", "📈", "🤝", "🎯", "✨", "🔥", "💎", "✅", "🙌"];

  const addEmoji = (emoji: string) => {
    setNewComment(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="bg-[#F8FAFC]/50 px-4 md:px-8 py-8 space-y-8 animate-pro-fade">
      
      {/* Editorial Comment Hub */}
      <div className="flex gap-4 group/input">
         <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-white shadow-sm shrink-0">
            {user?.avatarUrl ? (
               <img src={user.avatarUrl} className="w-full h-full object-cover" alt="My Profile" />
            ) : (
               <div className="w-full h-full bg-primary/10 flex items-center justify-center font-bold text-primary uppercase text-[14px]">
                  {user?.firstName?.[0] || 'U'}
               </div>
            )}
         </div>
         
         <form onSubmit={handleSubmit} className="flex-1 relative">
            <div className="relative overflow-hidden rounded-xl border border-border bg-white focus-within:border-primary/50 transition-all shadow-sm">
               {showEmojiPicker && (
                  <div className="absolute bottom-14 left-2 p-2 bg-white rounded-xl shadow-premium border border-border flex gap-2 animate-in slide-in-from-bottom-2 z-50">
                     {EMOJIS.map(e => (
                        <button 
                           key={e} 
                           type="button" 
                           onClick={() => addEmoji(e)}
                           className="text-lg hover:scale-125 transition-transform p-1"
                        >
                           {e}
                        </button>
                     ))}
                     <button 
                        type="button" 
                        onClick={() => setShowEmojiPicker(false)} 
                        aria-label="Close emoji picker"
                        className="p-1 text-secondary/40 hover:text-foreground"
                     >
                        <X className="w-4 h-4" />
                     </button>
                  </div>
               )}
               <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Share a professional perspective..."
                  rows={2}
                  className="w-full p-3.5 pb-12 bg-transparent border-none focus:ring-0 text-[14px] font-medium text-foreground placeholder:text-secondary/60 resize-none leading-relaxed"
                  aria-label="Write a professional comment"
               />
               <div className="absolute bottom-2 inset-x-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                     <button 
                        type="button" 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        aria-label="Add emoji" 
                        className={`p-2 rounded-lg transition-colors ${showEmojiPicker ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-secondary/60 hover:text-primary'}`}
                     >
                        <Smile className="w-5 h-5" />
                     </button>
                     <button type="button" aria-label="Use AI Assistant" className="p-2 rounded-lg hover:bg-muted text-secondary/60 hover:text-accent transition-colors">
                        <Sparkles className="w-5 h-5" />
                     </button>
                  </div>
                  <button 
                     type="submit"
                     disabled={!newComment.trim() || isSubmitting}
                     className={`px-6 py-1.5 rounded-full font-bold text-[13px] transition-all shadow-premium active:scale-95 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                  >
                     {isSubmitting && <Clock className="w-3.5 h-3.5 animate-spin" />}
                     {isSubmitting ? "Posting..." : "Post insight"}
                  </button>
               </div>
            </div>
         </form>
      </div>

      {/* Stream Options */}
      <div className="flex items-center justify-between px-1">
         <div className="flex items-center gap-2 text-[12px] font-bold text-secondary">
            <span className="text-foreground">Most relevant</span>
            <ChevronDown className="w-3 h-3" />
         </div>
      </div>

      {/* Conversations Feed */}
      <div className="space-y-6">
         {loading ? (
            <div className="space-y-6">
               {[1, 2].map(i => (
                  <div key={i} className="flex gap-4 animate-pulse">
                     <div className="w-10 h-10 bg-muted rounded-lg shrink-0" />
                     <div className="flex-1 space-y-2.5">
                        <div className="h-4 bg-muted w-32 rounded-full" />
                        <div className="h-12 bg-muted w-full rounded-xl" />
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            comments.map(comment => (
               <div key={comment.id} className="group/comment flex gap-4 pr-1">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-border shrink-0 z-10 bg-white">
                     {comment.author.avatarUrl ? (
                        <img src={comment.author.avatarUrl} className="w-full h-full object-cover" alt="" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-primary/40 text-[12px] uppercase">
                           {(comment.author.firstName?.[0] || comment.author.username?.[0] || "U")}
                        </div>
                     )}
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                     <div className="bg-white rounded-2xl rounded-tl-none p-4 ring-1 ring-border shadow-sm group-hover/comment:ring-primary/20 transition-all">
                        <div className="flex justify-between items-start gap-4">
                           <div className="min-w-0">
                              <h5 className="text-[13px] font-bold text-foreground hover:text-primary transition-colors cursor-pointer truncate">
                                 {comment.author.firstName || comment.author.username} {comment.author.lastName || ""}
                              </h5>
                              <p className="text-[11px] font-semibold text-secondary line-clamp-1 leading-tight">
                                 {comment.author.headline || "Connect Plus Member"}
                              </p>
                           </div>
                           <div className="flex items-center gap-2 shrink-0 ml-4">
                              <span className="text-[10px] font-bold text-secondary/50 uppercase tracking-widest">{timeAgo(comment.createdAt)}</span>
                              <button 
                                 aria-label="Comment options"
                                 onClick={() => setActiveMore(activeMore === comment.id ? null : comment.id)}
                                 className="p-1 rounded-lg hover:bg-muted text-secondary/40 hover:text-foreground transition-colors"
                              >
                                 <Ellipsis className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                        <p className="text-[14px] leading-relaxed text-foreground/80 font-medium">
                           {comment.content}
                        </p>
                        
                        {/* Reaction count bubble */}
                        {(comment.likes_count || 0) > 0 && (
                           <div className="absolute -bottom-2 -left-2 px-2 py-0.5 bg-white border border-border rounded-full shadow-lg flex items-center gap-1 scale-90">
                              <div className="flex -space-x-1">
                                 <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center border border-white">
                                    <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                                 </div>
                              </div>
                              <span className="text-[11px] font-bold text-secondary">{comment.likes_count}</span>
                           </div>
                        )}
                     </div>

                     <div className="flex items-center gap-4 px-2 text-[12px] font-black uppercase tracking-widest text-secondary/60">
                        <button 
                           onClick={() => handleLikeComment(comment.id)}
                           className={`flex items-center gap-1.5 transition-colors ${likedComments.has(comment.id) ? 'text-primary' : 'hover:text-primary'}`}
                        >
                           Like
                        </button>
                        <span className="w-1 h-1 bg-border rounded-full" />
                        <button className="hover:text-primary transition-colors">Reply</button>
                     </div>
                  </div>
               </div>
            ))
         )}

         {!loading && comments.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-border animate-pro-fade">
               <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-secondary/30" />
               </div>
               <h6 className="text-[14px] font-bold text-foreground">No contributions yet</h6>
               <p className="text-[12px] text-secondary mt-1">Be the first to share an editorial insight.</p>
            </div>
         )}
      </div>

      {/* Floating Context Menu (for Delete/Report) */}
      {activeMore && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/5 backdrop-blur-[2px]">
           <div 
             className="w-full max-w-xs bg-white rounded-2xl shadow-premium border border-border overflow-hidden animate-in zoom-in-95 duration-200"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="p-2">
                 <button 
                  onClick={() => setActiveMore(null)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-[14px] font-bold text-foreground transition-all"
                 >
                    <Flag className="w-4 h-4 text-secondary" /> Report perspective
                 </button>
                 {user?.id === comments.find(c => c.id === activeMore)?.author.id && (
                    <button 
                     onClick={() => {
                        setComments(prev => prev.filter(c => c.id !== activeMore));
                        setActiveMore(null);
                     }}
                     className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-[14px] font-bold text-red-600 transition-all mt-1"
                    >
                       <Trash2 className="w-4 h-4" /> Delete contribution
                    </button>
                 )}
              </div>
              <div className="border-t border-border p-2">
                 <button 
                  onClick={() => setActiveMore(null)}
                  className="w-full py-2.5 text-[13px] font-bold text-secondary hover:text-foreground transition-all"
                 >
                    Cancel
                 </button>
              </div>
           </div>
           <div className="absolute inset-0 -z-10" onClick={() => setActiveMore(null)} />
        </div>
      )}
    </div>
  );
}
