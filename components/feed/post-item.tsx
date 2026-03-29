import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, Plus, Heart } from "lucide-react";

interface PostItemProps {
  author: {
    name: string;
    headline: string;
    avatar: string;
    isFollowed: boolean;
  };
  time: string;
  content: string;
  image?: string;
  stats: {
    likes: number;
    comments: number;
    reposts: number;
  };
}

export function PostItem({ author, time, content, image, stats }: PostItemProps) {
  return (
    <div className="bg-white rounded-xl border border-[#D1D9D4] shadow-sm overflow-hidden">
      <div className="p-4 flex gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D1D9D4]">
           <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
           <div className="flex justify-between items-start">
              <div>
                 <h3 className="text-sm font-bold text-[#1B5E20] hover:underline cursor-pointer leading-tight">
                   {author.name}
                 </h3>
                 <p className="text-[11px] text-[#435348] line-clamp-1 leading-tight">{author.headline}</p>
                 <p className="text-[11px] text-[#435348] mt-1">{time} • <Globe className="h-2.5 w-2.5 inline" /></p>
              </div>
              {!author.isFollowed && (
                <button className="flex items-center gap-1.5 text-sm font-bold text-[#1B5E20] hover:bg-[#F1F8F4] px-3 py-1.5 rounded-md transition-colors">
                   <Plus className="h-4 w-4" /> Follow
                </button>
              )}
           </div>
        </div>
      </div>

      <div className="px-4 pb-3">
         <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">{content}</p>
      </div>

      {image && (
        <div className="w-full border-y border-[#D1D9D4] bg-[#F1F8F4]">
           <img src={image} className="w-full max-h-[500px] object-cover" alt="Post content" />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-[#D1D9D4]">
         <div className="flex items-center -space-x-1">
            <div className="w-4 h-4 rounded-full bg-[#1B5E20] border border-white flex items-center justify-center">
               <ThumbsUp className="h-2 w-2 text-white" />
            </div>
            <div className="w-4 h-4 rounded-full bg-[#FFC107] border border-white flex items-center justify-center">
               <Heart className="h-2 w-2 text-[#1B5E20]" />
            </div>
            <span className="text-[11px] text-[#435348] ml-5 font-medium">{stats.likes.toLocaleString()}</span>
         </div>
         <div className="flex items-center gap-2 text-[11px] text-[#435348]">
            <span className="hover:text-[#1B5E20] hover:underline cursor-pointer">{stats.comments} comments</span>
            <span>•</span>
            <span className="hover:text-[#1B5E20] hover:underline cursor-pointer">{stats.reposts} reposts</span>
         </div>
      </div>

      {/* Social Actions */}
      <div className="flex items-center justify-between px-2 py-1">
         <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-md hover:bg-[#F1F8F4] transition-colors group">
            <ThumbsUp className="h-5 w-5 text-slate-600 group-hover:text-[#1B5E20]" />
            <span className="text-sm font-bold text-slate-600 group-hover:text-[#1B5E20]">Like</span>
         </button>
         <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-md hover:bg-[#F1F8F4] transition-colors group">
            <MessageSquare className="h-5 w-5 text-slate-600 group-hover:text-[#1B5E20]" />
            <span className="text-sm font-bold text-slate-600 group-hover:text-[#1B5E20]">Comment</span>
         </button>
         <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-md hover:bg-[#F1F8F4] transition-colors group">
            <Repeat2 className="h-5 w-5 text-slate-600 group-hover:text-[#1B5E20]" />
            <span className="text-sm font-bold text-slate-600 group-hover:text-[#1B5E20]">Repost</span>
         </button>
         <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-md hover:bg-[#F1F8F4] transition-colors group">
            <Send className="h-5 w-5 text-slate-600 group-hover:text-[#1B5E20]" />
            <span className="text-sm font-bold text-slate-600 group-hover:text-[#1B5E20]">Send</span>
         </button>
      </div>
    </div>
  );
}
