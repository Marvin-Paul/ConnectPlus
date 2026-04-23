"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Globe, 
  Heart, 
  MoreHorizontal as Ellipsis, 
  Award, 
  Lightbulb, 
  Search, 
  Bookmark, 
  Share2, 
  EyeOff, 
  XCircle, 
  Flag, 
  Trash2, 
  UserMinus, 
  ChevronLeft, 
  ChevronRight, 
  UserPlus, 
  Link2, 
  Users 
} from "lucide-react";
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
  const { reactToPost, sharePost, savePost, hidePost, unfollowUser, reportPost, deletePost, incrementCommentCount } = useFeed();
  const { user: currentUser } = useUser();
  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
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

  const media = (post.mediaUrls && post.mediaUrls.length > 0) ? post.mediaUrls : (post.imageUrl ? [post.imageUrl] : []);
  const hasMultipleMedia = media.length > 1;

  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const isAuthor = currentUser?.id === post.authorId;
  const isAdmin = currentUser?.role === "ADMIN";
  const contentThreshold = 200;
  const shouldTruncate = post.content.length > contentThreshold && !isExpanded;
  const displayContent = shouldTruncate ? post.content.slice(0, contentThreshold) + "..." : post.content;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-border dark:border-slate-800 shadow-soft overflow-hidden transition-all duration-300 hover:shadow-premium animate-pro-fade group/card">
      
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-border dark:border-slate-800 bg-muted dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0 cursor-pointer">
            {post.author.avatarUrl ? (
               <img src={post.author.avatarUrl} alt={post.author.firstName || "User"} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-primary/10 flex items-center justify-center font-bold text-primary uppercase text-[15px]">
                 {(post.author.firstName && post.author.firstName[0]) || "U"}
               </div>
            )}
        </div>
        <div className="flex-1 min-w-0">
           <div className="flex justify-between items-start">
              <div className="flex flex-col">
                 <div className="flex items-center gap-1 flex-wrap">
                    <h3 className="text-[14px] font-bold text-foreground dark:text-slate-200 hover:text-primary transition-colors cursor-pointer leading-tight flex items-center gap-1">
                      {post.author.firstName} {post.author.lastName}
                      {post.author.verified && (
                        <span title="Verified Professional" className="text-blue-500 fill-blue-500">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="1" /></svg>
                        </span>
                      )}
                      {(post.author as any).isPremium && (
                        <span title="Premium Member" className="text-yellow-600">
                          <Award className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </h3>
                    <span className="text-[14px] text-secondary/60">•</span>
                    <span className="text-[14px] text-secondary/60 font-medium">
                      {post.author.id === currentUser?.id ? "You" : (post.author.connectionDegree || ["1st", "2nd", "3rd"][Math.floor(Math.random() * 3)])}
                    </span>
                 </div>
                 <p className="text-[12px] text-secondary/70 line-clamp-1 mt-0.5 leading-tight">{post.author.headline || "Connect Plus Member"}</p>
                 <div className="flex items-center gap-1.5 text-[11px] text-secondary/60 mt-1">
                    <span>{timeAgo(post.createdAt)}</span>
                    <span>•</span>
                    {post.visibility === "CONNECTIONS" ? (
                      <span title="Connections Only"><Users className="h-3 w-3" /></span>
                    ) : (
                      <span title="Public"><Globe className="h-3 w-3" /></span>
                    )}
                 </div>
              </div>

              <div className="flex items-center gap-1">
                  {!isAuthor && (
                    <button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      aria-label={isFollowing ? "Unfollow user" : "Follow user"}
                      title={isFollowing ? "Unfollow" : "Follow"}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all font-bold text-[14px] ${isFollowing ? 'bg-muted text-secondary hover:bg-slate-200 dark:hover:bg-slate-800' : 'hover:bg-muted text-primary'}`}
                    >
                      {isFollowing ? (
                        <><span>Following</span></>
                      ) : (
                        <><UserPlus className="w-4 h-4" /><span>Follow</span></>
                      )}
                    </button>
                  )}
                  <div className="relative" ref={optionsRef}>
                    <button 
                      onClick={() => setShowOptions(!showOptions)}
                      title="More options"
                      aria-label="More options"
                      className={`p-2 rounded-full transition-all ${showOptions ? 'bg-muted dark:bg-slate-800 text-foreground dark:text-slate-200' : 'hover:bg-muted dark:hover:bg-slate-800 text-secondary/60 dark:text-slate-500 hover:text-foreground dark:hover:text-slate-200'}`}
                    >
                      <Ellipsis className="w-5 h-5" />
                    </button>
                    {showOptions && (
                      <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-slate-800 shadow-dropdown rounded-xl border border-border dark:border-slate-700 py-2 z-[60] animate-in fade-in slide-in-from-top-2">
                        <button onClick={() => { savePost(post.id); setShowOptions(false); }} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted text-[14px] font-medium transition-colors">
                          <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-primary text-primary' : ''}`} />
                          <span>{post.isSaved ? 'Unsave post' : 'Save post'}</span>
                        </button>
                        <button onClick={() => { handleSend(); setShowOptions(false); }} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted text-[14px] font-medium transition-colors">
                          <Link2 className="w-4 h-4" />
                          <span>Copy link to post</span>
                        </button>
                        
                        {!isAuthor && (
                          <>
                            <button onClick={() => { unfollowUser(post.authorId); setShowOptions(false); }} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted text-[14px] font-medium transition-colors">
                              <UserMinus className="w-4 h-4" />
                              <span>Unfollow {post.author.firstName}</span>
                            </button>
                            <div className="h-px bg-border my-1" />
                            <button onClick={() => { hidePost(post.id); setShowOptions(false); }} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted text-[14px] font-medium transition-colors">
                              <EyeOff className="w-4 h-4" />
                              <span>I don't want to see this</span>
                            </button>
                            <button onClick={() => { reportPost(post.id); setShowOptions(false); }} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted text-[14px] font-bold text-red-600 transition-colors">
                              <Flag className="w-4 h-4" />
                              <span>Report post</span>
                            </button>
                          </>
                        )}

                        {(isAuthor || isAdmin) && (
                          <>
                            <div className="h-px bg-border my-1" />
                            <button 
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this post?")) {
                                  deletePost(post.id);
                                }
                                setShowOptions(false);
                              }}
                              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 text-[14px] font-bold text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete post</span>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
         <p className="text-[14px] text-foreground dark:text-slate-300 leading-[1.5] whitespace-pre-line font-normal">
           {displayContent.split(' ').map((word, i) => {
             if (word.startsWith('#')) return <span key={i} className="text-primary font-bold cursor-pointer hover:underline">{word} </span>;
             if (word.startsWith('@')) return <span key={i} className="text-primary font-bold cursor-pointer hover:underline">{word} </span>;
             return word + ' ';
           })}
           {shouldTruncate && (
             <button 
               onClick={() => setIsExpanded(true)}
               className="text-secondary font-bold hover:text-primary hover:underline ml-1"
             >
               ...see more
             </button>
           )}
         </p>
      </div>

      {/* Media Carousel */}
      {media.length > 0 && (
        <div className="mb-3 relative group/carousel bg-muted flex items-center justify-center min-h-[300px]">
           <img 
             src={media[currentMediaIndex]} 
             className="w-full object-cover max-h-[600px] bg-muted transition-opacity duration-300" 
             alt={`Media ${currentMediaIndex + 1}`} 
             onError={(e) => {
               (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80";
             }}
           />
           
           {hasMultipleMedia && (
             <>
                <button 
                  onClick={prevMedia}
                  title="Previous"
                  aria-label="Previous media"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/70 animate-in fade-in"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextMedia}
                  title="Next"
                  aria-label="Next media"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/70 animate-in fade-in"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute top-4 right-4 bg-black/50 text-white text-[12px] font-bold px-2 py-1 rounded theme-blur">
                  {currentMediaIndex + 1}/{media.length}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {media.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentMediaIndex ? 'bg-white scale-125' : 'bg-white/40'}`} 
                    />
                  ))}
                </div>
             </>
           )}
        </div>
      )}

      {/* Engagement Metrics */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-border/40 mx-2">
         <div className="flex items-center gap-1.5 group/likes cursor-pointer">
            <div className="flex items-center -space-x-1">
               <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center border border-white z-20">
                  <ThumbsUp className="h-2 w-2 text-white fill-white" />
               </div>
               <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white z-10">
                  <Heart className="h-2 w-2 text-white fill-white" />
               </div>
            </div>
            <span className="text-[12px] text-secondary font-medium group-hover:text-primary group-hover:underline">
               {post._count.likes > 0 ? `${post._count.likes.toLocaleString()} likes` : 'Be the first to like'}
            </span>
         </div>
         <div className="flex items-center gap-2 text-[12px] text-secondary font-medium">
            <button onClick={() => setShowComments(!showComments)} className="hover:text-primary hover:underline">
               {post._count.comments.toLocaleString()} comments
            </button>
            <span className="text-secondary/40">•</span>
            <button className="hover:text-primary hover:underline">
               {post._count.reposts.toLocaleString()} reposts
            </button>
         </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-2 pt-1 pb-1">
         <div 
           className="flex-1 relative"
           onMouseEnter={() => { hoverTimeoutRef.current = setTimeout(() => setShowReactions(true), 500); }}
           onMouseLeave={() => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }}
         >
           {showReactions && (
             <div className="absolute bottom-[calc(100%+8px)] left-0 bg-white dark:bg-slate-800 shadow-premium rounded-full p-1.5 border border-border dark:border-slate-700 flex items-center gap-1 animate-in zoom-in-50 duration-200 z-50">
                {REACTION_TYPES.map((r) => (
                   <button 
                     key={r.type} 
                     onClick={() => handleReactionClick(r.type)} 
                     title={r.label}
                     aria-label={r.label}
                     className="w-10 h-10 rounded-full hover:bg-muted dark:hover:bg-slate-700 transition-all flex items-center justify-center hover:scale-125 active:scale-95 duration-200 group/react"
                   >
                      <r.icon className={`h-6 w-6 ${r.color} transition-transform group-hover/react:-translate-y-1`} />
                   </button>
                ))}
             </div>
           )}
           <button 
             onClick={() => handleReactionClick(userReaction ? userReaction : 'LIKE')}
             className={`w-full flex items-center justify-center gap-2 py-3 rounded hover:bg-muted dark:hover:bg-slate-800 transition-all active:scale-95 group/btn ${userReaction ? 'text-primary' : 'text-secondary font-semibold hover:text-foreground dark:hover:text-slate-200'}`}
           >
              {userReaction ? (
                <activeReaction.icon className={`h-5 w-5 fill-current transition-transform group-hover/btn:scale-110`} />
              ) : (
                <ThumbsUp className="h-5 w-5 stroke-[2px] transition-transform group-hover/btn:scale-110" />
              )}
              <span className="text-[14px] font-bold">{userReaction ? activeReaction.label : 'Like'}</span>
           </button>
         </div>

         <button 
           onClick={() => setShowComments(!showComments)} 
           aria-label="Comment on post"
           title="Comment"
           className="flex-1 flex items-center justify-center gap-2 py-3 rounded hover:bg-muted dark:hover:bg-slate-800 text-secondary font-semibold hover:text-foreground dark:hover:text-slate-200 transition-all active:scale-95 group/cmnt"
         >
            <MessageSquare className="h-5 w-5 stroke-[2px] group-hover/cmnt:scale-110 transition-transform" />
            <span className="text-[14px] font-bold">Comment</span>
         </button>

         <button 
           onClick={() => sharePost(post.id)} 
           aria-label="Repost this post"
           title="Repost"
           className="flex-1 flex items-center justify-center gap-2 py-3 rounded hover:bg-muted dark:hover:bg-slate-800 text-secondary font-semibold hover:text-foreground dark:hover:text-slate-200 transition-all active:scale-95 group/rp"
         >
            <Repeat2 className="h-5 w-5 stroke-[2px] group-hover/rp:scale-110 transition-transform" />
            <span className="text-[14px] font-bold">Repost</span>
         </button>

         <button 
           onClick={handleSend} 
           aria-label="Send post via link"
           title="Send"
           className={`flex-1 flex items-center justify-center gap-2 py-3 rounded transition-all active:scale-95 group/sd ${isSent ? 'text-green-600 bg-green-50 dark:bg-green-950/20' : 'text-secondary font-semibold hover:bg-muted dark:hover:bg-slate-800 hover:text-foreground dark:hover:text-slate-200'}`}
         >
            <Send className={`h-5 w-5 stroke-[2px] group-hover/sd:scale-110 transition-transform ${isSent ? 'fill-current' : ''}`} />
            <span className="text-[14px] font-bold">{isSent ? 'Sent' : 'Send'}</span>
         </button>
      </div>

      {/* Comments Expansion */}
      {showComments && (
        <div className="border-t border-border dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 animate-in slide-in-from-top-4 duration-300">
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
