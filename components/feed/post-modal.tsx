import { useState, useRef } from "react";
import { X, Image as ImageIcon, FileText, Calendar, Smile, Globe, Users, Briefcase, PlaySquare, Settings, Sparkles, PlusSquare, Camera, Loader2, Trash2 } from "lucide-react";
import { useFeed } from "../providers/feed-provider";
import { supabase } from "@/lib/supabase";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    avatar: string;
    name: string;
  };
}

export function PostModal({ isOpen, onClose, user }: PostModalProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [visibility, setVisibility] = useState<"anyone" | "connections">("anyone");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const { createPost } = useFeed();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `posts/${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage.from("post-images").upload(fileName, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("post-images").getPublicUrl(data.path);
      setImage(urlData.publicUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handlePost = async () => {
    if ((!content.trim() && !image) || isPosting) return;
    setIsPosting(true);
    setPostError(null);
    try {
      await createPost(content, image || undefined);
      setContent("");
      setImage(null);
      setPostError(null);
      onClose();
    } catch (error: any) {
      console.error("Failed to post:", error);
      setPostError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full h-full md:h-auto md:max-w-[600px] md:rounded-[2rem] shadow-2xl flex flex-col md:max-h-[95vh] overflow-hidden">
        
        {/* Modern Header */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-slate-50">
           <div className="flex items-center gap-4">
              <button 
                onClick={onClose} 
                disabled={isPosting}
                className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-600 transition-all disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                 <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-slate-50" alt="" />
                 <button 
                   onClick={() => setVisibility(visibility === "anyone" ? "connections" : "anyone")}
                   className="flex items-center gap-1.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 px-2 py-0.5 rounded-lg transition-all"
                 >
                    {visibility === "anyone" ? "Anyone" : "Connections"}
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                 </button>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-slate-50 text-slate-500">
                 <Calendar className="w-6 h-6" />
              </button>
              <button 
                onClick={handlePost}
                disabled={(!content.trim() && !image) || isPosting || uploading}
                className={`px-6 py-1.5 rounded-full font-bold text-[14px] transition-all ${(content.trim() || image) && !isPosting && !uploading ? "bg-[#0A66C2] text-white shadow-md active:scale-95" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
              >
                 {isPosting ? "Posting..." : "Post"}
              </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-5 py-6 overflow-y-auto min-h-[250px]">
           {postError && (
             <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
               <p className="text-[13px] font-semibold text-red-600">{postError}</p>
               <button onClick={() => setPostError(null)} className="p-1 rounded-full hover:bg-red-100 text-red-400 transition-colors shrink-0">
                 <X className="w-4 h-4" />
               </button>
             </div>
           )}
           <textarea 
             className="w-full text-[18px] font-medium text-slate-800 placeholder:text-slate-400 border-none outline-none resize-none bg-transparent"
             placeholder="What's your professional insight today?"
             value={content}
             onChange={(e) => { setContent(e.target.value); if (postError) setPostError(null); }}
             autoFocus
             disabled={isPosting}
             rows={4}
           />

           {uploading && (
             <div className="w-full aspect-video rounded-2xl bg-slate-50 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-200">
               <Loader2 className="w-10 h-10 text-[#0A66C2] animate-spin" />
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Processing visual node...</p>
             </div>
           )}

           {image && !uploading && (
             <div className="relative rounded-2xl overflow-hidden group/img mt-4 animate-in zoom-in-95 duration-500">
                <img src={image} className="w-full h-auto object-cover max-h-[400px]" alt="Preview" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md text-white rounded-full hover:bg-red-500 transition-all active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>
           )}
           
           <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             accept="image/*" 
             onChange={handleImageUpload} 
           />
        </div>

        {/* Action Toolbar (Bottom Sticky) */}
        <div className="px-5 py-4 border-t border-slate-100 bg-white safe-area-bottom">
           <div className="flex items-center justify-between">
              <button 
                disabled={isPosting || !content.trim()}
                onClick={async () => {
                  if (!content.trim()) return;
                  const res = await fetch("/api/generate/tone", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: content, targetTone: "professional" }),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    setContent(data.optimizedText);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 text-slate-700 text-[14px] font-semibold hover:bg-slate-50 transition-all active:scale-95 shadow-sm group disabled:opacity-50"
              >
                 <Sparkles className="w-4 h-4 text-orange-500 group-hover:rotate-12 transition-transform" />
                 Professional Rewrite
              </button>

              <div className="flex items-center gap-4">
                 <button 
                   onClick={() => fileInputRef.current?.click()}
                   disabled={uploading || isPosting}
                   className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-all active:scale-90"
                 >
                    <Camera className="w-6 h-6 text-[#378FE9]" />
                 </button>
                 <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-all">
                    <PlusSquare className="w-6 h-6 text-[#70B5F9]" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
