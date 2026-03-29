"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Video, X, Plus, Grid, List, Search, Camera, Play, Share2, Trash2, Bookmark, Download, Sparkles } from "lucide-react";

const SAMPLE_MEDIA = [
  { id: "m1", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=300&q=80", type: "image", caption: "Building the future", date: "Mar 2026", category: "Code" },
  { id: "m2", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&h=300&q=80", type: "image", caption: "Team brainstorm", date: "Feb 2026", category: "Strategy" },
  { id: "m3", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=300&q=80", type: "image", caption: "Code session", date: "Feb 2026", category: "Code" },
  { id: "m4", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&h=300&q=80", type: "image", caption: "Pitch night", date: "Jan 2026", category: "Networking" },
  { id: "m5", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&h=300&q=80", type: "image", caption: "Tech summit", date: "Jan 2026", category: "Events" },
  { id: "m6", url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&h=300&q=80", type: "image", caption: "Women in Tech panel", date: "Dec 2025", category: "Leadership" },
];

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  caption: string;
  date: string;
  category: string;
}

export default function MediaGalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>(SAMPLE_MEDIA as MediaItem[]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const categories = ["All", ...Array.from(new Set(media.map(m => m.category)))];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    await new Promise((r) => setTimeout(r, 600));
    const newItems: MediaItem[] = files.map((f) => ({
      id: `m_${Date.now()}_${Math.random()}`,
      url: URL.createObjectURL(f),
      type: f.type.startsWith("video/") ? "video" : "image",
      caption: f.name.replace(/\.[^/.]+$/, ""),
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      category: "Uploads"
    }));
    setMedia((prev) => [...newItems, ...prev]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const filteredMedia = media.filter(m => activeFilter === "All" || m.category === activeFilter);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-[#0a66c2]/5 text-[#0a66c2] w-fit rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#0a66c2]/10">
              <Sparkles className="w-3 h-3" /> professional assets
           </div>
           <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
              Media <span className="text-[#0a66c2]">Gallery</span>
           </h1>
           <p className="text-lg text-slate-500 font-medium max-w-xl italic">
              A curated space for your professional updates, project milestones, and networking highlights.
           </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-[#0a66c2] transition-colors shadow-sm"
          >
            {view === "grid" ? <List className="h-6 w-6" /> : <Grid className="h-6 w-6" />}
          </button>
          <button 
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#0a66c2] text-white font-black text-sm hover:scale-105 transition-all shadow-2xl shadow-blue-900/20 tracking-wider disabled:opacity-60"
          >
            <Upload className="w-5 h-5" />
            {uploading ? "Uploading..." : "Publish Media"}
          </button>
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleUpload} />

      {/* Filter Navigation */}
      <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
         {categories.map(cat => (
           <button 
             key={cat}
             onClick={() => setActiveFilter(cat)}
             className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === cat ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}`}
           >
             {cat}
           </button>
         ))}
      </div>

      {/* Gallery Content */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
           {filteredMedia.map((item) => (
             <div 
               key={item.id} 
               className="group relative h-[320px] rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-100 hover:shadow-2xl hover:border-[#0a66c2]/20 transition-all duration-700 cursor-pointer"
               onClick={() => setSelected(item)}
             >
                <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt="" />
                
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                     <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-xl group-hover:scale-125 transition-transform duration-500">
                        <Play className="w-6 h-6 fill-current" />
                     </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                   <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{item.category}</p>
                      <h4 className="text-xl font-black text-white tracking-tight leading-tight">{item.caption}</h4>
                      <div className="flex items-center gap-4 text-white/60 text-[10px] uppercase font-black tracking-widest">
                         <span>{item.date}</span>
                         <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> Share</span>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="space-y-4 pb-32">
           {filteredMedia.map((item) => (
             <div 
               key={item.id} 
               className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 hover:shadow-xl hover:border-[#0a66c2]/20 transition-all duration-300 cursor-pointer group"
               onClick={() => setSelected(item)}
             >
                <div className="w-32 h-24 rounded-2xl overflow-hidden shadow-md shrink-0">
                   <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div className="flex-1 space-y-2">
                   <div className="flex items-center gap-3">
                      <p className="text-[10px] font-black text-[#0a66c2] uppercase tracking-widest">{item.category}</p>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</p>
                   </div>
                   <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-[#0a66c2] transition-colors">{item.caption}</h4>
                </div>
                <div className="flex items-center gap-2 pr-4">
                   <button className="p-3 text-slate-400 hover:text-blue-500 transition-colors"><Share2 className="w-5 h-5" /></button>
                   <button className="p-3 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Premium Lightbox */}
      {selected && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-3xl flex items-center justify-center p-8 transition-all animate-in fade-in"
          onClick={() => setSelected(null)}
        >
           <button 
             className="absolute top-10 right-10 p-4 text-white/50 hover:text-white transition-all hover:scale-125 bg-white/5 rounded-full"
             onClick={() => setSelected(null)}
           >
              <X className="w-8 h-8 font-black" />
           </button>
           
           <div 
             className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-12"
             onClick={e => e.stopPropagation()}
           >
              <img 
                src={selected.url} 
                className="max-h-[70vh] rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-4 border-white/10 group animate-in zoom-in" 
                alt="" 
              />
              
              <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
                 <div className="space-y-4">
                    <p className="text-[#0a66c2] font-black text-xs uppercase tracking-[0.4em]">{selected.category}</p>
                    <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{selected.caption}</h3>
                    <p className="text-white/40 font-bold text-sm tracking-widest uppercase">{selected.date} • Created in Connect+</p>
                 </div>
                 
                 <div className="flex items-center gap-6 pt-4">
                    <button className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-white/10 shadow-xl">
                       <Download className="w-4 h-4" /> Download Original
                    </button>
                    <button className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">
                       <Share2 className="w-4 h-4" /> Share Asset
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
