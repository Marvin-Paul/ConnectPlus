"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bold, Italic, Underline, List, ListOrdered, Quote, Link2,
  Image as ImageIcon, AlignLeft, AlignCenter, AlignRight,
  ChevronLeft, Loader2, Eye, Send, Sparkles, BookOpen, Trash2, Zap, Save, Globe, Plus
} from "lucide-react";
import Link from "next/link";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [preview, setPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const execCmd = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCoverImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, "");
      if (!tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handlePublish = async () => {
    const editorContent = editorRef.current?.innerHTML || "";
    if (!title.trim() || !editorContent.trim()) {
      alert("Please add a title and some content before publishing.");
      return;
    }
    setPublishing(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: editorContent,
          coverImage,
          tags,
          username: "demo-user"
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to publish");
      }

      router.push("/articles");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setPublishing(false);
    }
  };

  const toolbarBtn = (label: string, icon: React.ReactNode, action: () => void) => (
    <button
      type="button"
      onClick={action}
      title={label}
      className="p-3.5 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all"
    >
      {icon}
    </button>
  );

  return (
    <div className="bg-[#F3F6F8] min-h-screen pb-32">
      {/* Top sticky bar */}
      <div className="bg-white/80 backdrop-blur-3xl border-b border-slate-100 sticky top-0 z-50 py-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <Link href="/articles" className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-800 transition-all">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-900/10">
                    <BookOpen className="w-5 h-5" />
                 </div>
                 <h1 className="text-xl font-black text-slate-800 tracking-tighter italic">Article Factory</h1>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-2 h-12 px-8 rounded-full border-2 border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all active:scale-95"
              >
                {preview ? <><Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600" /> Edit Node</> : <><Eye className="h-3.5 w-3.5" /> Force Preview</>}
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="flex items-center gap-3 h-12 px-10 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
              >
                {publishing ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Finalizing...</>
                ) : (
                  <><Send className="h-4 w-4" /> Deploy Article</>
                )}
              </button>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-16 px-6 space-y-12">
        {preview ? (
          <div className="bg-white rounded-[4rem] border border-slate-50 shadow-[0_50px_100px_rgba(0,0,0,0.05)] overflow-hidden animate-in zoom-in-95 duration-700">
            {coverImage && (
              <div className="h-96 overflow-hidden">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover scale-105" />
              </div>
            )}
            <div className="p-20 pt-16">
              <h1 className="text-6xl font-black text-slate-800 tracking-tighter leading-[0.9] italic mb-10">{title || "The Unwritten Narrative..."}</h1>
              <div className="flex items-center gap-5 mb-16 pb-10 border-b border-slate-50">
                <div className="w-16 h-16 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-800 italic">Marvin Muwereza</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Just now · {Math.ceil((editorRef.current?.innerText?.length || 100) / 700)} min read</p>
                </div>
              </div>
              <div
                className="prose prose-slate prose-xl max-w-none text-slate-700 leading-relaxed font-bold italic opacity-90"
                dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || "<p class='text-slate-300 italic'>Awaiting content stream...</p>" }}
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-16 pt-10 border-t border-slate-50">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50 text-slate-400 border border-slate-100 px-5 py-2 rounded-full shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Cover Image Upload */}
            <div
              className="relative w-full h-64 rounded-[3.5rem] border-4 border-dashed border-slate-200 overflow-hidden cursor-pointer hover:border-blue-600/30 bg-white/50 transition-all group flex flex-col items-center justify-center p-12 text-center"
              onClick={() => fileRef.current?.click()}
            >
              {coverImage ? (
                <>
                  <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                    <p className="text-white font-black uppercase tracking-widest text-xs">Switch Visual Anchor</p>
                  </div>
                </>
              ) : (
                <div className="space-y-4 text-slate-300 group-hover:text-blue-600 transition-all">
                  <ImageIcon className="h-16 w-16 mx-auto opacity-20 group-hover:opacity-100 group-hover:rotate-6 transition-transform" />
                  <div className="space-y-1">
                     <p className="text-sm font-black uppercase tracking-widest">Add Master Visual</p>
                     <p className="text-[10px] opacity-40">1200 × 630px · High Impact Recommended</p>
                  </div>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />

            {/* Title & Info */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 opacity-60">
                  <Sparkles className="w-4 h-4" /> Global Article Node
               </div>
               <textarea
                 placeholder="Title your professional breakthrough..."
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 rows={1}
                 className="w-full text-6xl font-black text-slate-800 placeholder:text-slate-100 border-none outline-none bg-transparent py-4 resize-none italic tracking-tighter leading-none hover:placeholder:text-slate-200 transition-colors"
               />
            </div>

            {/* Rich Text Editor Frame */}
            <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
               {/* Toolbar */}
               <div className="flex items-center flex-wrap gap-2 p-6 border-b border-slate-50 bg-slate-50/20 backdrop-blur-sm">
                  {toolbarBtn("Bold", <Bold className="h-5 w-5" />, () => execCmd("bold"))}
                  {toolbarBtn("Italic", <Italic className="h-5 w-5" />, () => execCmd("italic"))}
                  {toolbarBtn("Underline", <Underline className="h-5 w-5" />, () => execCmd("underline"))}
                  <div className="w-px h-8 bg-slate-200 mx-2" />
                  {toolbarBtn("H2", <span className="text-sm font-black tracking-tighter italic">H2</span>, () => execCmd("formatBlock", "h2"))}
                  {toolbarBtn("H3", <span className="text-sm font-black tracking-tighter italic">H3</span>, () => execCmd("formatBlock", "h3"))}
                  <div className="w-px h-8 bg-slate-200 mx-2" />
                  {toolbarBtn("Bullet List", <List className="h-5 w-5" />, () => execCmd("insertUnorderedList"))}
                  {toolbarBtn("Numbered List", <ListOrdered className="h-5 w-5" />, () => execCmd("insertOrderedList"))}
                  <div className="w-px h-8 bg-slate-200 mx-2" />
                  {toolbarBtn("Quote", <Quote className="h-5 w-5" />, () => execCmd("formatBlock", "blockquote"))}
                  {toolbarBtn("Link", <Link2 className="h-5 w-5" />, () => { const url = prompt("Enter URL:"); if(url) execCmd("createLink", url); })}
               </div>

               {/* Editor Content */}
               <div
                 ref={editorRef}
                 contentEditable
                 suppressContentEditableWarning
                 onInput={() => setContent(editorRef.current?.innerHTML || "")}
                 className="min-h-[500px] p-16 text-2xl font-black italic tracking-tight text-slate-600 leading-relaxed outline-none focus:ring-0 opacity-80"
                 data-placeholder="Stream your expertise into the professional global network..."
                 style={{ caretColor: "#2563eb" }}
               />
            </div>

            {/* Meta Control Rack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[3rem] border border-slate-100 p-10 space-y-8 flex flex-col justify-between shadow-xl">
                  <div className="space-y-4">
                     <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Plus className="w-4 h-4 text-blue-600" /> Taxonomy Labels
                     </h3>
                     <div className="flex flex-wrap gap-2">
                       {tags.map((tag) => (
                         <span key={tag} className="flex items-center gap-3 text-[10px] font-black bg-blue-50 text-blue-600 px-4 py-2 rounded-xl uppercase tracking-widest group/tag">
                           #{tag}
                           <button onClick={() => removeTag(tag)} className="hover:text-red-500 opacity-60 group-hover/tag:opacity-100 transition-opacity">×</button>
                         </span>
                       ))}
                     </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Add elite tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    disabled={tags.length >= 5}
                    className="w-full text-xs font-black uppercase tracking-[0.2em] border-none outline-none py-2 bg-transparent placeholder:text-slate-100"
                  />
               </div>

               <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1B5E20]">Network Optimization</h3>
                     </div>
                     <p className="text-sm font-black italic leading-tight text-slate-400">"Your article will be distributed to 50k+ nodes in your sector."</p>
                     <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-blue-400 transition-colors">
                        <Save className="w-4 h-4" /> Save as Legacy Draft
                     </button>
                  </div>
                  <Sparkles className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 text-blue-500 group-hover:scale-110 transition-transform duration-1000" />
               </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #f1f5f9;
          font-style: italic;
          pointer-events: none;
        }
        blockquote {
          border-left: 10px solid #2563eb;
          padding-left: 2rem;
          color: #1e293b;
          font-style: italic;
          margin: 3rem 0;
          font-size: 1.5rem;
          background: #f8fafc;
          padding-top: 2rem;
          padding-bottom: 2rem;
          border-radius: 0 2rem 2rem 0;
        }
        h2 { font-size: 3rem; font-weight: 900; color: #1e293b; margin: 3rem 0 1.5rem; letter-spacing: -0.05em; font-style: italic; }
        h3 { font-size: 2rem; font-weight: 900; color: #1e293b; margin: 2rem 0 1rem; letter-spacing: -0.05em; font-style: italic; }
      `}</style>
    </div>
  );
}
