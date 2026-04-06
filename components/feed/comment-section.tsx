"use client";

import { useState, useEffect } from "react";
import { Smile, Send, MoreHorizontal as Ellipsis, ThumbsUp, Heart, Star, Sparkles, MessageSquare, Award, Clock, ChevronDown, User, Reply, Search, X } from "lucide-react";
import { useUser } from "../providers/user-provider";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likes_count?: number;
  author: {
    firstName: string;
    lastName: string;
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
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting || !user) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, content: newComment }),
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

  return (
    <div className="px-4 md:px-10 pb-12 pt-8 animate-in fade-in slide-in-from-top-6 duration-700 bg-slate-50/20 backdrop-blur-3xl border-t border-slate-100/50">
      
      {/* Premium Input Hub */}
      <div className="relative mb-12 group/input">
         <div className="absolute inset-x-0 -top-12 flex justify-between items-center px-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Share your professional perspective</h4>
            <div className="flex items-center gap-2">
               <Smile className="w-4 h-4 text-slate-300 hover:text-primary transition-colors cursor-pointer" />
               <Sparkles className="w-4 h-4 text-slate-300 hover:text-accent transition-colors cursor-pointer" />
            </div>
         </div>
         
         <form onSubmit={handleSubmit} className="flex gap-4 items-center bg-white p-2 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-xl transition-all duration-500 hover:border-primary/20">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
               {user?.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-slate-300" />}
            </div>
            <div className="flex-1">
               <input 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Drop a professional insight..."
                  className="w-full bg-transparent border-none focus:ring-0 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 pl-2"
               />
            </div>
            <button 
               disabled={!newComment.trim() || isSubmitting}
               className="bg-primary text-white p-3 rounded-full shadow-lg shadow-primary/25 hover:bg-slate-900 transition-all active:scale-90 disabled:opacity-30 flex items-center justify-center group/send"
            >
               {isSubmitting ? (
                  <Clock className="w-5 h-5 animate-spin" />
               ) : (
                  <Send className="w-5 h-5 group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform" />
               )}
            </button>
         </form>
      </div>

      {/* Conversations Stream */}
      <div className="space-y-10">
         <div className="flex items-center gap-3">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-slate-100" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] italic">
               {loading ? "Discovering Insights..." : `${comments.length} Elite Contributions`}
            </span>
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-slate-100" />
         </div>

         {loading ? (
            <div className="space-y-8">
               {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 animate-pulse px-4">
                     <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full" />
                     <div className="flex-1 space-y-3">
                        <div className="h-4 bg-slate-50 w-32 rounded-full" />
                        <div className="h-4 bg-slate-50 w-full rounded-full opacity-60" />
                        <div className="h-4 bg-slate-50 w-2/3 rounded-full opacity-30" />
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            comments.map(comment => (
               <div key={comment.id} className="relative flex gap-5 group/comment">
                  {/* Continuity Line */}
                  <div className="absolute left-6 top-14 bottom-[-40px] w-[2px] bg-gradient-to-b from-slate-100 to-transparent opacity-50 group-last/comment:hidden" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden shrink-0 group-hover/comment:scale-110 transition-transform duration-500 z-10">
                     {comment.author.avatarUrl ? (
                        <img src={comment.author.avatarUrl} className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center font-black text-slate-200 bg-slate-50">{comment.author.firstName[0]}</div>
                     )}
                  </div>

                  <div className="flex-1 min-w-0">
                     <div className="relative bg-white/60 backdrop-blur-xl border border-slate-100 rounded-[2rem] rounded-tl-none p-6 shadow-sm group-hover/comment:shadow-xl transition-all duration-500 group-hover/comment:border-primary/10">
                        <div className="flex justify-between items-start mb-3">
                           <div>
                              <p className="text-[13px] font-black text-slate-900 tracking-tight leading-none mb-1">{comment.author.firstName} {comment.author.lastName}</p>
                              <p className="text-[10px] font-bold text-slate-400 italic line-clamp-1">{comment.author.headline || "Industry Expert"}</p>
                           </div>
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{timeAgo(comment.createdAt)}</span>
                        </div>
                        <p className="text-[14px] text-slate-600 leading-relaxed font-medium italic">
                           "{comment.content}"
                        </p>
                        
                        {/* Interactive Reaction Plate */}
                        <div className="absolute -bottom-4 right-6 flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-100 shadow-xl opacity-0 group-hover/comment:opacity-100 transition-all translate-y-2 group-hover/comment:translate-y-0 duration-500">
                           <button onClick={() => handleLikeComment(comment.id)} className="hover:scale-125 transition-transform text-red-500"><Heart className="w-3.5 h-3.5 fill-current" /></button>
                           <button className="hover:scale-125 transition-transform text-primary"><Award className="w-3.5 h-3.5" /></button>
                           <button className="hover:scale-125 transition-transform text-blue-500"><MessageSquare className="w-3.5 h-3.5" /></button>
                        </div>
                     </div>

                     <div className="flex gap-8 px-6 mt-3">
                        <button 
                           onClick={() => handleLikeComment(comment.id)}
                           className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${likedComments.has(comment.id) ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
                        >
                           <ThumbsUp className={`w-3.5 h-3.5 ${likedComments.has(comment.id) ? 'fill-current' : ''}`} />
                           <span>{(comment.likes_count || 0) > 0 ? comment.likes_count : 'Endorse'}</span>
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.2em]">
                           <Reply className="w-3.5 h-3.5" />
                           <span>Answer</span>
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.2em]">
                           <Award className="w-3.5 h-3.5" />
                           <span>Award</span>
                        </button>
                        <div className="flex-1" />
                        <div className="relative">
                           <button 
                             onClick={() => setActiveMore(prev => prev === comment.id ? null : comment.id)}
                             className={`p-1 rounded-full transition-colors ${activeMore === comment.id ? 'text-slate-500 bg-slate-100' : 'text-slate-200 hover:text-slate-400'}`}
                           >
                              <Ellipsis className="w-4 h-4" />
                           </button>

                        </div>
                     </div>
                  </div>
               </div>
            ))
         )}

         {!loading && comments.length === 0 && (
            <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-100 animate-in fade-in zoom-in-95 duration-1000">
               <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <MessageSquare className="w-8 h-8 text-slate-200" />
               </div>
               <h5 className="text-[14px] font-black text-slate-800 uppercase tracking-widest leading-none mb-2">No conversations yet</h5>
               <p className="text-[11px] text-slate-400 font-bold italic">Initiate the dialog with your professional perspective.</p>
            </div>
         )}
      </div>

      <button className="w-full py-8 mt-12 bg-white rounded-[2rem] border border-slate-100 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-primary hover:bg-slate-50 transition-all shadow-sm">
         Discover deeper conversations
      </button>

      {activeMore && (
        <div className="fixed inset-0 z-[140]">
          <button
            type="button"
            aria-label="Close comment options"
            onClick={() => setActiveMore(null)}
            className="absolute inset-0 bg-black/20"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] border-t border-slate-100 py-2 animate-in slide-in-from-bottom-4 duration-200">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto my-3" />
            <button onClick={() => setActiveMore(null)} className="w-full px-6 py-4 text-left text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Report
            </button>
            <button
              onClick={() => {
                setComments(prev => prev.filter(c => c.id !== activeMore));
                setActiveMore(null);
              }}
              className="w-full px-6 py-4 text-left text-[18px] font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
