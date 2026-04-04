"use client";

import { useState, useEffect } from "react";
import { Smile, Send, MoreHorizontal, ThumbsUp, Heart } from "lucide-react";
import { useUser } from "../providers/user-provider";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
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

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${postId}/comment`);
      const data = await res.json();
      setComments(data);
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
    <div className="px-4 md:px-10 pb-8 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-slate-50 bg-slate-50/10">
      <form onSubmit={handleSubmit} className="flex gap-4 items-start mt-6">
        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
          {user?.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" /> : <Smile className="text-slate-400" />}
        </div>
        <div className="flex-1 bg-white border border-slate-200 rounded-[1.5rem] p-1 focus-within:border-primary transition-all shadow-sm">
          <input 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a thought..."
            className="w-full px-5 py-3 text-sm focus:outline-none bg-transparent"
          />
        </div>
        <button 
          disabled={!newComment.trim() || isSubmitting}
          className="bg-primary text-white p-3 rounded-full shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-90 transition-all"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5 fill-current" />
          )}
        </button>
      </form>

      <div className="mt-8 space-y-6">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic border-b border-slate-100 pb-2">
          {loading ? "Discovering Conversations..." : `${comments.length} Thoughts Shared`}
        </p>

        {loading ? (
          <div className="space-y-4 py-4">
             {[1, 2].map(i => (
                <div key={i} className="flex gap-4 animate-pulse">
                   <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                   <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-100 w-24 rounded" />
                      <div className="h-4 bg-slate-100 w-full rounded" />
                   </div>
                </div>
             ))}
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-4 items-start group/comment">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                {comment.author.avatarUrl ? (
                  <img src={comment.author.avatarUrl} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center font-black text-slate-300">{comment.author.firstName[0]}</div>
                )}
              </div>
              <div className="flex-1">
                <div className="bg-slate-100/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 w-fit max-w-full">
                  <div className="flex justify-between items-start gap-8">
                     <div>
                        <p className="text-[12px] font-black text-slate-800">{comment.author.firstName} {comment.author.lastName}</p>
                        <p className="text-[11px] text-slate-400 font-bold italic line-clamp-1">{comment.author.headline}</p>
                     </div>
                     <span className="text-[10px] font-bold text-slate-300 shrink-0">{timeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">{comment.content}</p>
                </div>
                <div className="flex gap-4 px-2 mt-1">
                  <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1 group/like">
                    <ThumbsUp className="w-3 h-3 group-hover/like:scale-110 transition-transform" /> Like
                  </button>
                  <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))
        )}

        {!loading && comments.length === 0 && (
          <p className="text-center py-6 text-slate-300 text-[12px] font-bold italic">No thoughts shared yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
