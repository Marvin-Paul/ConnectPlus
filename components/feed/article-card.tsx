"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare, Repeat2, Send, BookOpen, MoreHorizontal, Bookmark, Share2 } from "lucide-react";
import { useUser } from "../providers/user-provider";
import { CommentSection } from "./comment-section";

interface ArticleCardProps {
  item: {
    id: string;
    timestamp: number;
    author?: { 
      name: string; 
      headline: string; 
      avatar: string; 
      isFollowed: boolean 
    };
    title: string;
    coverImage?: string | null;
    content: string;
    tags?: string[];
    likes: number;
    comments_count?: number;
    reposts: number;
  };
}

export function ArticleCard({ item }: ArticleCardProps) {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes);
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const timeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden mb-6 group/card hover:border-primary/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-50 shadow-md group-hover/card:scale-110 transition-transform duration-500">
            <img src={item.author?.avatar} alt={item.author?.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
               <h3 className="text-[14px] font-black text-slate-800 tracking-tight leading-none truncate">{item.author?.name}</h3>
               <span className="text-slate-300 font-bold">•</span>
               <span className="text-[10px] font-black text-primary uppercase tracking-widest">Follow</span>
            </div>
            <p className="text-[11px] text-slate-400 font-bold italic line-clamp-1 mt-1">{item.author?.headline}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
               <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{timeAgo(item.timestamp)}</span>
               <span className="w-1 h-1 bg-slate-200 rounded-full" />
               <BookOpen className="w-3 h-3 text-slate-300" />
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowOptions(true)}
          className="p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-2">
         <h2 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover/card:text-primary transition-colors italic tracking-tighter">
            {item.title}
         </h2>
         
         {item.coverImage && (
            <div className="relative h-56 md:h-72 rounded-[2rem] overflow-hidden mb-6 group/img border border-slate-50">
               <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
               <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="flex gap-2">
                     {item.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">#{tag}</span>
                     ))}
                  </div>
                  <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                     <Share2 className="w-4.5 h-4.5" />
                  </button>
               </div>
            </div>
         )}

         <p className="text-[15px] text-slate-600 leading-relaxed line-clamp-3 mb-6 font-medium">
            {item.content}
         </p>

         <button className="w-full py-4 rounded-full border-2 border-slate-100 text-slate-800 font-black text-[12px] uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95">
            Read Full Article <BookOpen className="w-4 h-4 text-primary" />
         </button>
      </div>

      {/* Interactions */}
      <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/20 flex items-center justify-between">
         <div className="flex items-center gap-6">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 group/btn transition-all ${isLiked ? 'text-primary' : 'text-slate-400'}`}
            >
               <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : 'group-hover/btn:scale-110'} transition-transform`} />
               <span className="text-[12px] font-black">{likesCount.toLocaleString()}</span>
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 group/btn text-slate-400 hover:text-slate-600 transition-all"
            >
               <MessageSquare className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
               <span className="text-[12px] font-black">{(item.comments_count || 0).toLocaleString()}</span>
            </button>
            <button className="flex items-center gap-2 group/btn text-slate-400 hover:text-slate-600 transition-all">
               <Repeat2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
               <span className="text-[12px] font-black">{item.reposts.toLocaleString()}</span>
            </button>
         </div>
         <button className="p-2 rounded-xl text-slate-300 hover:text-primary transition-colors">
            <Bookmark className="w-5 h-5" />
         </button>
      </div>

      {showComments && (
        <CommentSection 
          postId={item.id} 
          onCommentAdded={() => {}}
        />
      )}

      {showOptions && (
        <div className="fixed inset-0 z-[140]">
          <button
            type="button"
            aria-label="Close article options"
            onClick={() => setShowOptions(false)}
            className="absolute inset-0 bg-black/20"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] border-t border-slate-100 py-2 animate-in slide-in-from-bottom-4 duration-200">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto my-3" />
            <button onClick={() => setShowOptions(false)} className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Save article
            </button>
            <button onClick={() => setShowOptions(false)} className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Share via
            </button>
            <button onClick={() => setShowOptions(false)} className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Not interested
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
