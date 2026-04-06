"use client";

import { useState, useRef, useEffect } from "react";
import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, Plus, Heart, MoreHorizontal as Ellipsis, Smile, Award, Lightbulb, Search, X, Bookmark, Share2, EyeOff, XCircle, Flag } from "lucide-react";
import { Post, useFeed } from "../providers/feed-provider";
import { useUser } from "../providers/user-provider";
import { CommentSection } from "./comment-section";

interface PostItemProps {
  post: Post;
}

const REACTION_TYPES = [
  { type: 'LIKE', label: 'Like', icon: ThumbsUp, color: 'text-blue-500', bg: 'bg-blue-500' },
  { type: 'LOVE', label: 'Love', icon: Heart, color: 'text-red-500', bg: 'bg-red-500' },
  { type: 'CELEBRATE', label: 'Celebrate', icon: Award, color: 'text-green-500', bg: 'bg-green-500' },
  { type: 'INSIGHTFUL', label: 'Insightful', icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500' },
  { type: 'CURIOUS', label: 'Curious', icon: Search, color: 'text-purple-500', bg: 'bg-purple-500' },
];

export function PostItem({ post }: PostItemProps) {
  const { reactToPost, commentOnPost, sharePost, savePost, hidePost, unfollowUser, reportPost } = useFeed();
  const { user } = useUser();
  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const userReaction = post.reactions?.[0]?.type;
  const activeReaction = REACTION_TYPES.find(r => r.type === userReaction) || REACTION_TYPES[0];

  const handleReactionClick = (type: string) => {
    reactToPost(post.id, type);
    setShowReactions(false);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await commentOnPost(post.id, commentText);
      setCommentText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => setIsSent(false), 2000);
  };

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl md:shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-1000 group/card relative">
      {/* Header */}
      <div className="p-4 md:p-8 flex items-start gap-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-slate-50 shadow-md group-hover/card:scale-105 transition-transform duration-500 shrink-0">
           {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.firstName} className="w-full h-full object-cover" />
           ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center font-black text-primary uppercase">
                {post.author.firstName[0]}
              </div>
           )}
        </div>
        <div className="flex-1 min-w-0 pt-1">
           <div className="flex justify-between items-start">
              <div className="space-y-1">
                 <h3 className="text-xl font-black text-slate-800 hover:text-primary transition-colors cursor-pointer leading-none tracking-tight">
                   {post.author.firstName} {post.author.lastName}
                 </h3>
                 <p className="text-[12px] font-bold text-slate-400 line-clamp-1 leading-tight tracking-tight italic opacity-80">{post.author.headline}</p>
                 <div className="flex items-center gap-2 text-[11px] font-black text-slate-300 uppercase tracking-widest mt-1">
                    <span>{timeAgo(post.createdAt)}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <Globe className="h-3 w-3" />
                 </div>
              </div>
              <div className="relative" ref={optionsRef}>
                 <button 
                   onClick={() => setShowOptions(!showOptions)}
                   className={`p-3 rounded-full transition-all ${showOptions ? 'bg-slate-100 text-slate-700' : 'hover:bg-slate-50 text-slate-300 hover:text-slate-500'}`}
                 >
                    <Ellipsis className="w-5 h-5" />
                 </button>
   
              </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 md:px-10 pb-4 md:pb-6">
         <p className="text-[17px] text-slate-700 leading-[1.6] whitespace-pre-line font-medium tracking-tight italic">
           {post.content.split(' ').map((word, i) => word.startsWith('#') ? <span key={i} className="text-primary font-black cursor-pointer hover:underline">{word} </span> : word + ' ')}
         </p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="mx-2 md:mx-6 mb-4 md:mb-6 rounded-[1rem] md:rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-inner group/img relative">
           <img src={post.imageUrl} className="w-full max-h-[600px] object-cover group-hover/img:scale-105 transition-transform duration-1000" alt="Post content" />
           <div className="absolute inset-0 bg-slate-900/5 group-hover/img:bg-slate-900/0 transition-colors" />
        </div>
      )}

      {/* Stats Summary */}
      <div className="px-4 md:px-10 py-4 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-slate-50 bg-slate-50/20">
         <div className="flex items-center gap-4">
            <div className="flex items-center -space-x-2">
               {post.reactions?.length > 0 && (
                 <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center shadow-lg relative z-20">
                    <ThumbsUp className="h-3.5 w-3.5 text-white" />
                 </div>
               )}
               {post._count.likes > 1 && (
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-pink-500 border-2 border-white flex items-center justify-center shadow-lg relative z-10">
                    <Heart className="h-3.5 w-3.5 text-white" />
                 </div>
               )}
            </div>
            <span className="text-[13px] text-slate-500 font-black tracking-tight">
              {post._count.likes > 0 ? `${post._count.likes} professional reactions` : 'Be the first to react'}
            </span>
         </div>
         <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
            <span onClick={() => setShowComments(!showComments)} className="hover:text-primary hover:underline cursor-pointer">{post._count.comments} comments</span>
            <span>·</span>
            <span className="hover:text-primary hover:underline cursor-pointer">{post._count.reposts} shares</span>
         </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-2 md:px-6 py-2 md:py-4 border-t border-slate-50 bg-white shadow-inner relative">
         {/* Reaction Slider */}
         {showReactions && (
           <div 
             className="absolute bottom-[calc(100%+12px)] left-0 md:left-6 bg-white shadow-2xl rounded-full p-2 border border-slate-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 z-50 overflow-hidden"
             onMouseLeave={() => setShowReactions(false)}
           >
             {REACTION_TYPES.map((r) => (
                <button
                  key={r.type}
                  onClick={() => handleReactionClick(r.type)}
                  className="p-3 rounded-full hover:bg-slate-50 group/reaction transition-all hover:scale-125 hover:-translate-y-1 active:scale-95"
                >
                   <r.icon className={`h-6 w-6 ${r.color}`} />
                   <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/reaction:opacity-100 transition-opacity font-black uppercase tracking-widest">
                     {r.label}
                   </span>
                </button>
             ))}
           </div>
         )}

         <div 
           className="flex-1 relative"
           onMouseEnter={() => {
             hoverTimeoutRef.current = setTimeout(() => setShowReactions(true), 500);
           }}
           onMouseLeave={() => {
             if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
           }}
         >
           <button 
             onClick={() => handleReactionClick(userReaction ? userReaction : 'LIKE')}
             className={`w-full flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 px-1 md:px-2 rounded-xl md:rounded-2xl transition-all group/btn active:scale-95 ${userReaction ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
           >
              {userReaction ? (
                <activeReaction.icon className={`h-5 w-5 md:h-6 md:w-6 transition-all ${activeReaction.color} fill-current scale-110`} />
              ) : (
                <ThumbsUp className={`h-5 w-5 md:h-6 md:w-6 transition-all text-slate-400 group-hover/btn:text-blue-500 group-hover/btn:scale-110`} />
              )}
              <span className={`hidden md:block text-[11px] font-black uppercase tracking-widest ${userReaction ? activeReaction.color : 'text-slate-400 group-hover/btn:text-slate-800'}`}>
                {userReaction ? activeReaction.label : 'Like'}
              </span>
           </button>
         </div>

         <button 
           onClick={() => setShowComments(!showComments)}
           className="flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 px-1 md:px-2 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-all group/btn active:scale-95"
         >
            <MessageSquare className={`h-5 w-5 md:h-6 md:w-6 transition-all ${showComments ? 'text-green-500 fill-green-500' : 'text-slate-400 group-hover/btn:text-green-500 group-hover/btn:scale-110'}`} />
            <span className={`hidden md:block text-[11px] font-black uppercase tracking-widest ${showComments ? 'text-slate-800' : 'text-slate-400 group-hover/btn:text-slate-800'}`}>Comment</span>
         </button>

         <button 
           onClick={() => sharePost(post.id)}
           className="flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 px-1 md:px-2 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-all group/btn active:scale-95"
         >
            <Repeat2 className="h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover/btn:text-purple-500 group-hover/btn:scale-110 transition-all" />
            <span className="hidden md:block text-[11px] font-black text-slate-400 group-hover/btn:text-slate-800 uppercase tracking-widest">Share</span>
         </button>

         <button 
            onClick={handleSend}
            className="flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 px-1 md:px-2 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-all group/btn active:scale-95"
          >
            <Send className={`h-5 w-5 md:h-6 md:w-6 transition-all ${isSent ? 'text-green-500 scale-125' : 'text-slate-400 group-hover:btn:text-orange-500 group-hover:btn:scale-110'}`} />
            <span className={`hidden md:block text-[11px] font-black uppercase tracking-widest ${isSent ? 'text-slate-800' : 'text-slate-400 group-hover:btn:text-slate-800'}`}>
              {isSent ? 'Sent!' : 'Send'}
            </span>
          </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <CommentSection 
          postId={post.id} 
          onCommentAdded={() => {
            // Context update for comment count is already handled in FeedProvider,
            // but we could refresh local state here if needed.
          }} 
        />
      )}

      {showOptions && (
        <div className="fixed inset-0 z-[120]">
          <button
            type="button"
            aria-label="Close options"
            onClick={() => setShowOptions(false)}
            className="absolute inset-0 bg-black/20"
          />
          <div
            ref={optionsRef}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] border-t border-slate-100 py-2 animate-in slide-in-from-bottom-4 duration-200"
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto my-3" />
            <button onClick={() => { savePost(post.id); setShowOptions(false); }} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left group/item">
              <Bookmark className={`w-5 h-5 ${post.isSaved ? 'text-primary fill-current' : 'text-slate-500'} group-hover/item:text-slate-700 transition-colors`} />
              <div className="flex-1">
                <span className={`block text-[18px] font-medium ${post.isSaved ? 'text-primary' : 'text-slate-700'}`}>{post.isSaved ? 'Saved' : 'Save'}</span>
              </div>
            </button>
            <button onClick={() => { sharePost(post.id); setShowOptions(false); }} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left group/item">
              <Share2 className="w-5 h-5 text-slate-500 group-hover/item:text-slate-700 transition-colors" />
              <div className="flex-1">
                <span className="block text-[18px] font-medium text-slate-700">Share via</span>
              </div>
            </button>
            <button onClick={() => { hidePost(post.id); setShowOptions(false); }} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left group/item">
              <EyeOff className="w-5 h-5 text-slate-500 group-hover/item:text-slate-700 transition-colors" />
              <div className="flex-1">
                <span className="block text-[18px] font-medium text-slate-700">Not interested</span>
              </div>
            </button>
            <button onClick={() => { unfollowUser(post.authorId); setShowOptions(false); }} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left group/item">
              <XCircle className="w-5 h-5 text-slate-500 group-hover/item:text-slate-700 transition-colors" />
              <div className="flex-1">
                <span className="block text-[18px] font-medium text-slate-700">Unfollow {post.author.firstName} {post.author.lastName}</span>
              </div>
            </button>
            <button onClick={() => { reportPost(post.id); setShowOptions(false); }} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left group/item">
              <Flag className="w-5 h-5 text-slate-500 group-hover/item:text-slate-700 transition-colors" />
              <div className="flex-1">
                <span className="block text-[18px] font-medium text-slate-700">Report post</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
