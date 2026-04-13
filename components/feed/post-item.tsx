"use client";

import { useState, useRef, useEffect } from "react";
import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, Heart, MoreHorizontal as Ellipsis, Award, Lightbulb, Search, Bookmark, Share2, EyeOff, XCircle, Flag } from "lucide-react";
import { Post, useFeed } from "../providers/feed-provider";
import { useUser } from "../providers/user-provider";
import { CommentSection } from "./comment-section";

interface PostItemProps {
  post: Post;
}

const REACTION_TYPES = [
  { type: 'LIKE', label: 'Like', icon: ThumbsUp, color: 'text-primary', bg: 'bg-primary' },
  { type: 'LOVE', label: 'Love', icon: Heart, color: 'text-red-500', bg: 'bg-red-500' },
  { type: 'CELEBRATE', label: 'Celebrate', icon: Award, color: 'text-green-600', bg: 'bg-green-600' },
  { type: 'INSIGHTFUL', label: 'Insightful', icon: Lightbulb, color: 'text-yellow-600', bg: 'bg-yellow-600' },
  { type: 'CURIOUS', label: 'Curious', icon: Search, color: 'text-purple-600', bg: 'bg-purple-600' },
];

export function PostItem({ post }: PostItemProps) {
  const { reactToPost, sharePost, savePost, hidePost, unfollowUser, reportPost, incrementCommentCount } = useFeed();
  const { user } = useUser();
  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);
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

  const handleSend = () => {
    // Simulate real sharing by copying the link to clipboard
    const postUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      setIsSent(true);
      setTimeout(() => setIsSent(false), 2000);
    });
  };

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden transition-all duration-300 hover:shadow-premium animate-pro-fade group/card">
      
      {/* Header */}
      <div className="p-4 flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center shadow-sm shrink-0">
           {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.firstName || "User"} className="w-full h-full object-cover" />
           ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center font-bold text-primary uppercase text-[15px]">
                {post.author.firstName?.[0] ?? post.author.username?.[0] ?? "U"}
              </div>
           )}
        </div>
        <div className="flex-1 min-w-0">
           <div className="flex justify-between items-start">
              <div>
                 <h3 className="text-[15px] font-bold text-foreground hover:text-primary transition-colors cursor-pointer leading-tight">
                   {post.author.firstName || post.author.username} {post.author.lastName || ""}
                 </h3>
                 <p className="text-[12px] font-semibold text-secondary line-clamp-1 mt-0.5 leading-tight">{post.author.headline || "Connect Plus Member"}</p>
                 <div className="flex items-center gap-1.5 text-[11px] font-bold text-secondary/60 mt-1 uppercase tracking-wider">
                    <span>{timeAgo(post.createdAt)}</span>
                    <span className="w-1 h-1 bg-border rounded-full" />
                    <Globe className="h-3 w-3" />
                 </div>
              </div>
               <div className="relative" ref={optionsRef}>
                  <button 
                    onClick={() => setShowOptions(!showOptions)}
                    aria-label="Post options"
                    className={`p-2 rounded-lg transition-all ${showOptions ? 'bg-muted text-foreground' : 'hover:bg-muted text-secondary/60 hover:text-foreground'}`}
                  >
                    <Ellipsis className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
         <p className="text-[14px] text-foreground leading-relaxed whitespace-pre-line font-medium">
           {post.content.split(' ').map((word, i) => word.startsWith('#') ? <span key={i} className="text-primary font-bold cursor-pointer hover:underline">{word} </span> : word + ' ')}
         </p>
      </div>

      {/* Media */}
      {post.imageUrl && (
        <div className="mb-4 relative group/img overflow-hidden">
           <img src={post.imageUrl} className="w-full object-cover max-h-[512px]" alt="Post media" />
           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1">
               {post._count.likes > 0 && (
                 <div className="w-5 h-5 rounded-full bg-primary border-2 border-white flex items-center justify-center shadow-sm relative z-20">
                    <ThumbsUp className="h-2.5 w-2.5 text-white fill-white" />
                 </div>
               )}
               {post._count.likes > 10 && (
                 <div className="w-5 h-5 rounded-full bg-accent border-2 border-white flex items-center justify-center shadow-sm relative z-10">
                    <Heart className="h-2.5 w-2.5 text-white fill-white" />
                 </div>
               )}
            </div>
            <span className="text-[12px] text-secondary font-bold hover:text-primary hover:underline cursor-pointer">
              {post._count.likes > 0 ? post._count.likes : ''}
            </span>
         </div>
         <div className="flex items-center gap-3 text-[12px] font-bold text-secondary">
            <span onClick={() => setShowComments(!showComments)} className="hover:text-primary hover:underline cursor-pointer">{post._count.comments} comments</span>
            <span className="w-1 h-1 bg-border rounded-full" />
            <span className="hover:text-primary hover:underline cursor-pointer">{post._count.reposts} reposts</span>
         </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-2 py-1 border-t border-border">
         <div 
           className="flex-1 relative"
           onMouseEnter={() => { hoverTimeoutRef.current = setTimeout(() => setShowReactions(true), 500); }}
           onMouseLeave={() => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }}
         >
           {showReactions && (
             <div className="absolute bottom-[calc(100%+8px)] left-0 bg-white shadow-dropdown rounded-xl p-1.5 border border-border flex items-center gap-1 animate-pro-fade z-50">
                {REACTION_TYPES.map((r) => (
                   <button 
                     key={r.type} 
                     onClick={() => handleReactionClick(r.type)} 
                     aria-label={r.label}
                     className="p-2 rounded-lg hover:bg-muted transition-all hover:scale-110 active:scale-95"
                   >
                      <r.icon className={`h-6 w-6 ${r.color}`} />
                   </button>
                ))}
             </div>
           )}
           <button 
             onClick={() => handleReactionClick(userReaction ? userReaction : 'LIKE')}
             className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all active:scale-95 group/btn ${userReaction ? 'text-primary' : 'text-secondary hover:bg-muted hover:text-foreground'}`}
           >
              {userReaction ? (
                <activeReaction.icon className={`h-5 w-5 fill-current transition-transform`} />
              ) : (
                <ThumbsUp className="h-5 w-5 stroke-[2px] transition-transform" />
              )}
              <span className="text-[13px] font-bold">{userReaction ? activeReaction.label : 'Like'}</span>
           </button>
         </div>

         <button onClick={() => setShowComments(!showComments)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-secondary hover:bg-muted hover:text-foreground transition-all active:scale-95">
            <MessageSquare className="h-5 w-5 stroke-[2px]" />
            <span className="text-[13px] font-bold">Comment</span>
         </button>

         <button onClick={() => sharePost(post.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-secondary hover:bg-muted hover:text-foreground transition-all active:scale-95">
            <Repeat2 className="h-5 w-5 stroke-[2px]" />
            <span className="text-[13px] font-bold">Repost</span>
         </button>

         <button onClick={handleSend} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all active:scale-95 ${isSent ? 'text-green-600 bg-green-50' : 'text-secondary hover:bg-muted hover:text-foreground'}`}>
            <Send className={`h-5 w-5 stroke-[2px] ${isSent ? 'fill-current' : ''}`} />
            <span className="text-[13px] font-bold">{isSent ? 'Copied' : 'Send'}</span>
         </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-border bg-white animate-pro-fade">
           <CommentSection 
             postId={post.id} 
             onCommentAdded={() => {
                incrementCommentCount(post.id);
             }} 
           />
        </div>
      )}
    </div>
  );
}
