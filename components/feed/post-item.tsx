import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, Plus, Heart, MoreHorizontal, Share2 } from "lucide-react";

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
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-1000 group/card">
      {/* Header */}
      <div className="p-8 flex items-start gap-4">
        <div className="w-16 h-16 rounded-[2rem] overflow-hidden border-2 border-slate-50 shadow-md group-hover/card:scale-105 transition-transform duration-500 shrink-0">
           <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0 pt-1">
           <div className="flex justify-between items-start">
              <div className="space-y-1">
                 <h3 className="text-xl font-black text-slate-800 hover:text-[#1B5E20] transition-colors cursor-pointer leading-none tracking-tight">
                   {author.name}
                 </h3>
                 <p className="text-[12px] font-bold text-slate-400 line-clamp-1 leading-tight tracking-tight italic opacity-80">{author.headline}</p>
                 <div className="flex items-center gap-2 text-[11px] font-black text-slate-300 uppercase tracking-widest mt-1">
                    <span>{time}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <Globe className="h-3 w-3" />
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 {!author.isFollowed && (
                   <button className="flex items-center gap-2 text-[11px] font-black text-[#1B5E20] bg-green-50/50 hover:bg-green-100 px-5 py-2 rounded-full border border-green-100 transition-all uppercase tracking-widest active:scale-95 shadow-sm shadow-green-100/20">
                      <Plus className="h-3.5 w-3.5" /> Follow
                   </button>
                 )}
                 <button className="p-3 rounded-full hover:bg-slate-50 text-slate-300 hover:text-slate-500 transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-10 pb-6">
         <p className="text-[17px] text-slate-700 leading-[1.6] whitespace-pre-line font-medium tracking-tight italic">
           {content.split(' ').map((word, i) => word.startsWith('#') ? <span key={i} className="text-[#1B5E20] font-black cursor-pointer hover:underline">{word} </span> : word + ' ')}
         </p>
      </div>

      {/* Image */}
      {image && (
        <div className="mx-6 mb-6 rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-inner group/img relative">
           <img src={image} className="w-full max-h-[600px] object-cover group-hover/img:scale-105 transition-transform duration-1000" alt="Post content" />
           <div className="absolute inset-0 bg-slate-900/5 group-hover/img:bg-slate-900/0 transition-colors" />
        </div>
      )}

      {/* Stats Summary */}
      <div className="px-10 py-6 flex items-center justify-between border-t border-slate-50 bg-slate-50/20">
         <div className="flex items-center gap-4">
            <div className="flex items-center -space-x-2">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white flex items-center justify-center shadow-lg transform -rotate-12 group-hover/card:rotate-0 transition-transform">
                  <ThumbsUp className="h-3.5 w-3.5 text-white" />
               </div>
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-pink-500 border-2 border-white flex items-center justify-center shadow-lg transform rotate-12 group-hover/card:rotate-0 transition-transform">
                  <Heart className="h-3.5 w-3.5 text-white" />
               </div>
            </div>
            <span className="text-[13px] text-slate-500 font-black tracking-tight">{stats.likes.toLocaleString()} professional reactions</span>
         </div>
         <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
            <span className="hover:text-[#1B5E20] hover:underline cursor-pointer">{stats.comments} comments</span>
            <span>·</span>
            <span className="hover:text-[#1B5E20] hover:underline cursor-pointer">{stats.reposts} shares</span>
         </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50 bg-white shadow-inner">
         <button className="flex-1 flex items-center justify-center gap-3 py-4 px-2 rounded-2xl hover:bg-slate-50 transition-all group/btn active:scale-95">
            <ThumbsUp className="h-6 w-6 text-slate-400 group-hover/btn:text-blue-500 group-hover/btn:scale-110 transition-all" />
            <span className="text-[11px] font-black text-slate-400 group-hover/btn:text-slate-800 uppercase tracking-widest">Like</span>
         </button>
         <button className="flex-1 flex items-center justify-center gap-3 py-4 px-2 rounded-2xl hover:bg-slate-50 transition-all group/btn active:scale-95">
            <MessageSquare className="h-6 w-6 text-slate-400 group-hover/btn:text-green-500 group-hover/btn:scale-110 transition-all" />
            <span className="text-[11px] font-black text-slate-400 group-hover/btn:text-slate-800 uppercase tracking-widest">Comment</span>
         </button>
         <button className="flex-1 flex items-center justify-center gap-3 py-4 px-2 rounded-2xl hover:bg-slate-50 transition-all group/btn active:scale-95">
            <Repeat2 className="h-6 w-6 text-slate-400 group-hover/btn:text-purple-500 group-hover/btn:scale-110 transition-all" />
            <span className="text-[11px] font-black text-slate-400 group-hover/btn:text-slate-800 uppercase tracking-widest">Share</span>
         </button>
         <button className="flex-1 flex items-center justify-center gap-3 py-4 px-2 rounded-2xl hover:bg-slate-50 transition-all group/btn active:scale-95">
            <Send className="h-6 w-6 text-slate-400 group-hover/btn:text-orange-500 group-hover/btn:scale-110 transition-all" />
            <span className="text-[11px] font-black text-slate-400 group-hover/btn:text-slate-800 uppercase tracking-widest">Send</span>
         </button>
      </div>
    </div>
  );
}
