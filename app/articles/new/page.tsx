"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bold, Italic, Underline, List, ListOrdered, Quote, Link2,
  Image as ImageIcon, AlignLeft, AlignCenter, AlignRight,
  ChevronLeft, Loader2, Eye, Send
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
      // Save article to localStorage for demo
      const articles = JSON.parse(localStorage.getItem("articles") || "[]");
      const newArticle = {
        id: `art_${Date.now()}`,
        title: title.trim(),
        content: editorContent,
        coverImage,
        tags,
        author: {
          name: "Marvin Muwereza",
          headline: "Senior Software Engineer | Full-Stack Architect",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
        },
        publishedAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        reposts: 0,
        comments: [],
      };
      articles.unshift(newArticle);
      localStorage.setItem("articles", JSON.stringify(articles));

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));
      router.push("/articles");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const toolbarBtn = (label: string, icon: React.ReactNode, action: () => void) => (
    <button
      type="button"
      onClick={action}
      title={label}
      className="p-2 rounded-lg text-[#435348] hover:bg-[#F1F8F4] hover:text-[#1B5E20] transition-colors"
    >
      {icon}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/articles" className="flex items-center gap-2 text-[#435348] hover:text-[#1B5E20] transition-colors font-bold text-sm">
          <ChevronLeft className="h-4 w-4" /> Back to Articles
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D1D9D4] text-sm font-bold text-[#435348] hover:bg-[#F1F8F4] transition-colors"
          >
            <Eye className="h-4 w-4" /> {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1B5E20] text-white text-sm font-bold hover:bg-[#154d1a] transition-colors disabled:opacity-50"
          >
            {publishing ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Publishing...</>
            ) : (
              <><Send className="h-4 w-4" /> Publish Article</>
            )}
          </button>
        </div>
      </div>

      {preview ? (
        // --- PREVIEW MODE ---
        <div className="bg-white rounded-2xl border border-[#D1D9D4] shadow-sm overflow-hidden">
          {coverImage && (
            <div className="h-72 overflow-hidden">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-[#1B5E20] leading-tight mb-4">{title || "Your article title..."}</h1>
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#D1D9D4]">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1B5E20]">Marvin Muwereza</p>
                <p className="text-xs text-[#435348]">Just now · {Math.ceil((editorRef.current?.innerText?.length || 100) / 700)} min read</p>
              </div>
            </div>
            <div
              className="prose prose-green max-w-none text-slate-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || "<p class='text-[#435348] italic'>Your article content will appear here...</p>" }}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#D1D9D4]">
                {tags.map((tag) => (
                  <span key={tag} className="text-sm bg-[#F1F8F4] text-[#1B5E20] border border-[#4CAF50]/20 px-3 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // --- EDIT MODE ---
        <div className="space-y-4">
          {/* Cover Image Upload */}
          <div
            className="relative w-full h-48 rounded-2xl border-2 border-dashed border-[#D1D9D4] overflow-hidden cursor-pointer hover:border-[#1B5E20] transition-colors group"
            onClick={() => fileRef.current?.click()}
          >
            {coverImage ? (
              <>
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <p className="text-white font-bold text-sm">Click to change cover image</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-[#435348] group-hover:text-[#1B5E20] transition-colors">
                <ImageIcon className="h-8 w-8" />
                <p className="text-sm font-bold">Click to add a cover image</p>
                <p className="text-xs opacity-60">Recommended: 1200 × 630px</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />

          {/* Title */}
          <input
            type="text"
            placeholder="Write a compelling title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={150}
            className="w-full text-3xl font-bold text-[#1B5E20] placeholder:text-[#D1D9D4] border-none outline-none bg-transparent py-2 resize-none"
          />

          {/* Rich Text Toolbar */}
          <div className="bg-white rounded-xl border border-[#D1D9D4] shadow-sm overflow-hidden">
            <div className="flex items-center flex-wrap gap-0.5 p-2 border-b border-[#D1D9D4] bg-[#F9FBF9]">
              {toolbarBtn("Bold", <Bold className="h-4 w-4" />, () => execCmd("bold"))}
              {toolbarBtn("Italic", <Italic className="h-4 w-4" />, () => execCmd("italic"))}
              {toolbarBtn("Underline", <Underline className="h-4 w-4" />, () => execCmd("underline"))}
              <div className="w-px h-5 bg-[#D1D9D4] mx-1" />
              {toolbarBtn("H2", <span className="text-xs font-bold">H2</span>, () => execCmd("formatBlock", "h2"))}
              {toolbarBtn("H3", <span className="text-xs font-bold">H3</span>, () => execCmd("formatBlock", "h3"))}
              <div className="w-px h-5 bg-[#D1D9D4] mx-1" />
              {toolbarBtn("Bullet List", <List className="h-4 w-4" />, () => execCmd("insertUnorderedList"))}
              {toolbarBtn("Numbered List", <ListOrdered className="h-4 w-4" />, () => execCmd("insertOrderedList"))}
              {toolbarBtn("Quote", <Quote className="h-4 w-4" />, () => execCmd("formatBlock", "blockquote"))}
              <div className="w-px h-5 bg-[#D1D9D4] mx-1" />
              {toolbarBtn("Align Left", <AlignLeft className="h-4 w-4" />, () => execCmd("justifyLeft"))}
              {toolbarBtn("Align Center", <AlignCenter className="h-4 w-4" />, () => execCmd("justifyCenter"))}
              {toolbarBtn("Align Right", <AlignRight className="h-4 w-4" />, () => execCmd("justifyRight"))}
            </div>

            {/* Content Editor */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={() => setContent(editorRef.current?.innerHTML || "")}
              className="min-h-[400px] p-6 text-slate-800 leading-relaxed outline-none focus:ring-0 text-base"
              data-placeholder="Write your article here. Share your expertise, thoughts, or story..."
              style={{ caretColor: "#1B5E20" }}
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-[#D1D9D4] p-4">
            <label className="text-sm font-bold text-[#1B5E20] mb-2 block">Add Tags (up to 5)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-sm bg-[#F1F8F4] text-[#1B5E20] border border-[#4CAF50]/20 px-3 py-1 rounded-full font-medium">
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="text-[#435348] hover:text-red-500 ml-1 font-bold">×</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type a tag and press Enter or comma..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              disabled={tags.length >= 5}
              className="w-full text-sm border border-[#D1D9D4] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1B5E20]/30 placeholder:text-[#D1D9D4] disabled:opacity-50"
            />
          </div>
        </div>
      )}

      {/* Placeholder CSS for content editable */}
      <style jsx global>{`
        [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #c0c8c2;
          pointer-events: none;
        }
        blockquote {
          border-left: 4px solid #4CAF50;
          padding-left: 1rem;
          color: #435348;
          font-style: italic;
          margin: 1rem 0;
        }
        h2 { font-size: 1.75rem; font-weight: bold; color: #1B5E20; margin: 1rem 0 0.5rem; }
        h3 { font-size: 1.25rem; font-weight: bold; color: #1B5E20; margin: 0.75rem 0 0.25rem; }
      `}</style>
    </div>
  );
}
