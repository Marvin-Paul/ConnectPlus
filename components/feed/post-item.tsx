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
  { type: 'LIKE', label: 'Like', icon: ThumbsUp, color: 'text-[#0A66C2]', bg: 'bg-[#0A66C2]' },
  { type: 'LOVE', label: 'Love', icon: Heart, color: 'text-red-500', bg: 'bg-red-500' },
  { type: 'CELEBRATE', label: 'Celebrate', icon: Award, color: 'text-green-600', bg: 'bg-green-600' },
  { type: 'INSIGHTFUL', label: 'Insightful', icon: Lightbulb, color: 'text-yellow-600', bg: 'bg-yellow-600' },
  { type: 'CURIOUS', label: 'Curious', icon: Search, color: 'text-purple-600', bg: 'bg-purple-600' },
];

export function PostItem({ post }: PostItemProps) {
  const { reactToPost, sharePost, savePost, hidePost, unfollowUser, reportPost } = useFeed();
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
    setIsSent(true);
    setTimeout(() => setIsSent(false), 2000);
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
    <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] animate-fade-in group/card">
      
      {/* Refined Header - Spaced following 8px system */}
      <div className="p-4 md:p-5 flex items-start gap-4">
        <div className="w-12 h-12 rounded-[12px] overflow-hidden border border-[#E5E7EB] shadow-sm transform transition-hover hover:scale-105 shrink-0">
           {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.firstName || "User"} className="w-full h-full object-cover" />
           ) : (
              <div className="w-full h-full bg-[#0A66C2]/10 flex items-center justify-center font-bold text-[#0A66C2] uppercase">
                {post.author.firstName?.[0] ?? post.author.username?.[0] ?? "U"}
              </div>
           )}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
           <div className="flex justify-between items-start">
              <div className="flex flex-col">
                 <h3 className="text-[15px] font-bold text-[#1F2937] hover:text-[#0A66C2] hover:underline transition-all cursor-pointer leading-tight">
                   {post.author.firstName || post.author.username} {post.author.lastName || ""}
                 </h3>
                 <p className="text-[12px] font-medium text-[#6B7280] line-clamp-1 mt-0.5 leading-tight">{post.author.headline || "Connect+ Member"}</p>
                 <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#9CA3AF] mt-1">
                    <span>{timeAgo(post.createdAt)}</span>
                    <span className="w-0.5 h-0.5 bg-[#D1D5DB] rounded-full" />
                    <Globe className="h-3 w-3" />
                 </div>
              </div>
              <div className="relative" ref={optionsRef}>
                 <button 
                   onClick={() => setShowOptions(!showOptions)}
                   aria-label="Options"
                   className={`p-2 rounded-full transition-all ${showOptions ? 'bg-[#F3F6F8] text-[#1F2937]' : 'hover:bg-[#F3F6F8] text-[#6B7280] hover:text-[#1F2937]'}`}
                 >
                    <Ellipsis className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Insight Content - Body Text Spec: 15px regular */}
      <div className="px-4 md:px-5 pb-4">
         <p className="text-[15px] text-[#1F2937] leading-[1.6] whitespace-pre-line font-medium tracking-normal">
           {post.content.split(' ').map((word, i) => word.startsWith('#') ? <span key={i} className="text-[#0A66C2] font-bold cursor-pointer hover:underline">{word} </span> : word + ' ')}
         </p>
      </div>

      {/* Visual Resource */}
      {post.imageUrl && (
        <div className="mb-4 relative group/img overflow-hidden transition-all duration-300">
           <img src={post.imageUrl} className="w-full object-cover max-h-[500px]" alt="Post visual node" />
           <div className="absolute inset-0 bg-[#1F2937]/5 group-hover/img:bg-transparent transition-colors duration-300" />
        </div>
      )}

      {/* Professional Engagement Stats */}
      <div className="px-4 md:px-5 py-3 flex items-center justify-between border-t border-[#F3F6F8] bg-[#F9FAFB]/50">
         <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1.5">
               {post.reactions?.length > 0 && (
                 <div className="w-5 h-5 rounded-full bg-[#0A66C2] border border-white flex items-center justify-center shadow-sm relative z-20">
                    <ThumbsUp className="h-2.5 w-2.5 text-white fill-white" />
                 </div>
               )}
               {post._count.likes > 1 && (
                 <div className="w-5 h-5 rounded-full bg-[#EF4444] border border-white flex items-center justify-center shadow-sm relative z-10">
                    <Heart className="h-2.5 w-2.5 text-white fill-white" />
                 </div>
               )}
            </div>
            <span className="text-[12px] text-[#6B7280] font-bold hover:text-[#0A66C2] hover:underline cursor-pointer transition-colors">
              {post._count.likes > 0 ? post._count.likes : ''}
            </span>
         </div>
         <div className="flex items-center gap-3 text-[12px] font-bold text-[#6B7280]">
            <span onClick={() => setShowComments(!showComments)} className="hover:text-[#0A66C2] hover:underline cursor-pointer transition-colors">{post._count.comments} comments</span>
            <span className="w-0.5 h-0.5 bg-[#D1D5DB] rounded-full" />
            <span className="hover:text-[#0A66C2] hover:underline cursor-pointer transition-colors">{post._count.reposts} reposts</span>
         </div>
      </div>

      {/* Action Dock */}
      <div className="flex items-center justify-between px-1 md:px-2 py-1 border-t border-[#E5E7EB] bg-white relative">
         <div 
           className="flex-1 relative"
           onMouseEnter={() => { hoverTimeoutRef.current = setTimeout(() => setShowReactions(true), 500); }}
           onMouseLeave={() => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }}
         >
           {showReactions && (
             <div className="absolute bottom-[calc(100%+8px)] left-0 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.15)] rounded-full p-1.5 border border-[#E5E7EB] flex items-center gap-1 animate-fade-in z-50 transition-all">
               {REACTION_TYPES.map((r) => (
                  <button key={r.type} onClick={() => handleReactionClick(r.type)} className="p-2.5 rounded-full hover:bg-[#F3F6F8] transition-all hover:scale-125 transform active:scale-95 group/r" aria-label={r.label}>
                     <r.icon className={`h-6 w-6 ${r.color} group-hover/r:scale-110 transition-transform`} />
                  </button>
               ))}
             </div>
           )}
           <button 
             onClick={() => handleReactionClick(userReaction ? userReaction : 'LIKE')}
             className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-[8px] transition-all active:scale-95 group/btn ${userReaction ? 'text-[#0A66C2]' : 'text-[#6B7280] hover:bg-[#F3F6F8]'}`}
           >
              {userReaction ? (
                <activeReaction.icon className={`h-5 w-5 ${activeReaction.color} fill-current transition-transform`} />
              ) : (
                <ThumbsUp className="h-5 w-5 stroke-[1.8px] group-hover/btn:scale-110 transition-transform" />
              )}
              <span className="text-[13px] font-bold">{userReaction ? activeReaction.label : 'Like'}</span>
           </button>
         </div>

         <button onClick={() => setShowComments(!showComments)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[8px] text-[#6B7280] hover:bg-[#F3F6F8] transition-all active:scale-95 group/btn">
            <MessageSquare className="h-5 w-5 stroke-[1.8px] group-hover/btn:scale-110 transition-transform" />
            <span className="text-[13px] font-bold">Comment</span>
         </button>

         <button onClick={() => sharePost(post.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[8px] text-[#6B7280] hover:bg-[#F3F6F8] transition-all active:scale-95 group/btn">
            <Repeat2 className="h-5 w-5 stroke-[1.8px] group-hover/btn:scale-110 transition-transform" />
            <span className="text-[13px] font-bold">Repost</span>
         </button>

         <button onClick={handleSend} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[8px] transition-all active:scale-95 group/btn ${isSent ? 'text-green-600' : 'text-[#6B7280] hover:bg-[#F3F6F8]'}`}>
            <Send className={`h-5 w-5 stroke-[1.8px] ${isSent ? 'fill-current scale-110' : 'group-hover/btn:scale-110'} transition-all`} />
            <span className="text-[13px] font-bold">{isSent ? 'Sent!' : 'Send'}</span>
         </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="border-t border-[#F3F6F8] bg-white animate-fade-in">
           <CommentSection postId={post.id} onCommentAdded={() => {}} />
        </div>
      )}
    </div>
  );
}
