"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, Repeat2, MessageSquare, PenLine, Clock, Search } from "lucide-react";

interface Article {
  id: string;
  title: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  author: { name: string; headline: string; avatar: string };
  publishedAt: string;
  likes: number;
  dislikes: number;
  reposts: number;
  comments: { id: string; author: string; text: string; time: string }[];
}

const SAMPLE_ARTICLES: Article[] = [
  {
    id: "sample_1",
    title: "The Future of AI in East African Business: Opportunities and Challenges",
    content: "<p>Artificial intelligence is rapidly transforming how businesses operate across East Africa. From fintech to agriculture, AI-driven tools are unlocking efficiencies previously unimaginable for small and medium enterprises in the region...</p>",
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&h=400&q=80",
    tags: ["AI", "Technology", "East Africa"],
    author: {
      name: "Dr. Catherine Namubiru",
      headline: "CIO at MTN Uganda | Tech Leadership",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
    },
    publishedAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    likes: 342,
    dislikes: 12,
    reposts: 78,
    comments: [
      { id: "c1", author: "Robert K.", text: "Brilliant perspective! AI adoption in Uganda has really picked up post-2023.", time: "1h ago" },
      { id: "c2", author: "Lillian N.", text: "The points on fintech disruption are particularly insightful.", time: "45m ago" },
    ]
  },
  {
    id: "sample_2",
    title: "Building Resilient Startups: Lessons from Kampala's Tech Scene",
    content: "<p>Kampala's startup ecosystem has matured significantly. With over 400 registered startups and growing VC interest, the city is positioning itself as East Africa's next major innovation hub...</p>",
    coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&h=400&q=80",
    tags: ["Startups", "Kampala", "Entrepreneurship"],
    author: {
      name: "Robert Kizito",
      headline: "Frontend Architect | Next.js GDE",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
    },
    publishedAt: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
    likes: 218,
    dislikes: 4,
    reposts: 41,
    comments: [
      { id: "c3", author: "Sarah M.", text: "Great read! The funding landscape section was eye-opening.", time: "3h ago" }
    ]
  }
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function ArticleCard({ article, onUpdate }: { article: Article; onUpdate: (updated: Article) => void }) {
  const [userReaction, setUserReaction] = useState<"liked" | "disliked" | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    if (userReaction === "liked") {
      setUserReaction(null);
      onUpdate({ ...article, likes: article.likes - 1 });
    } else {
      setUserReaction("liked");
      onUpdate({
        ...article,
        likes: article.likes + 1,
        dislikes: userReaction === "disliked" ? article.dislikes - 1 : article.dislikes
      });
    }
  };

  const handleDislike = () => {
    if (userReaction === "disliked") {
      setUserReaction(null);
      onUpdate({ ...article, dislikes: article.dislikes - 1 });
    } else {
      setUserReaction("disliked");
      onUpdate({
        ...article,
        dislikes: article.dislikes + 1,
        likes: userReaction === "liked" ? article.likes - 1 : article.likes
      });
    }
  };

  const handleRepost = () => {
    onUpdate({ ...article, reposts: article.reposts + 1 });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      author: "Marvin Muwereza",
      text: commentText.trim(),
      time: "Just now"
    };
    onUpdate({ ...article, comments: [...article.comments, newComment] });
    setCommentText("");
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D1D9D4] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {article.coverImage && (
        <div className="h-52 overflow-hidden">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      <div className="p-5">
        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D1D9D4]">
            <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1B5E20] leading-tight">{article.author.name}</p>
            <p className="text-[11px] text-[#435348] flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" /> {timeAgo(article.publishedAt)}
              {article.tags[0] && <> · <span className="text-[#4CAF50] font-medium">#{article.tags[0]}</span></>}
            </p>
          </div>
        </div>

        {/* Title */}
        <Link href={`/articles/${article.id}`}>
          <h2 className="text-lg font-bold text-slate-800 leading-snug mb-2 hover:text-[#1B5E20] transition-colors cursor-pointer">
            {article.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <div
          className="text-sm text-[#435348] leading-relaxed line-clamp-2 mb-3"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-[#F1F8F4] text-[#1B5E20] border border-[#4CAF50]/20 px-2 py-0.5 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between border-t border-[#D1D9D4] pt-3">
          <div className="flex items-center gap-1">
            {/* Like */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                userReaction === "liked"
                  ? "bg-[#1B5E20] text-white"
                  : "text-[#435348] hover:bg-[#F1F8F4] hover:text-[#1B5E20]"
              }`}
            >
              <ThumbsUp className="h-4 w-4" /> {article.likes}
            </button>

            {/* Dislike */}
            <button
              onClick={handleDislike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                userReaction === "disliked"
                  ? "bg-red-500 text-white"
                  : "text-[#435348] hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <ThumbsDown className="h-4 w-4" /> {article.dislikes}
            </button>

            {/* Repost */}
            <button
              onClick={handleRepost}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-[#435348] hover:bg-[#F1F8F4] hover:text-[#1B5E20] transition-all"
            >
              <Repeat2 className="h-4 w-4" /> {article.reposts}
            </button>

            {/* Comments */}
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                showComments
                  ? "bg-[#F1F8F4] text-[#1B5E20]"
                  : "text-[#435348] hover:bg-[#F1F8F4] hover:text-[#1B5E20]"
              }`}
            >
              <MessageSquare className="h-4 w-4" /> {article.comments.length}
            </button>
          </div>

          <Link
            href={`/articles/${article.id}`}
            className="text-xs font-bold text-[#1B5E20] hover:underline"
          >
            Read more →
          </Link>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="mt-4 space-y-3">
            <div className="h-px bg-[#D1D9D4]" />
            {article.comments.length === 0 && (
              <p className="text-sm text-[#435348] italic text-center py-2">No comments yet. Be the first!</p>
            )}
            {article.comments.map((c) => (
              <div key={c.id} className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E5ECE8] flex-shrink-0 flex items-center justify-center text-xs font-bold text-[#1B5E20]">
                  {c.author[0]}
                </div>
                <div className="flex-1 bg-[#F1F8F4] rounded-xl px-3 py-2">
                  <p className="text-[11px] font-bold text-[#1B5E20]">{c.author} <span className="font-normal text-[#435348]">· {c.time}</span></p>
                  <p className="text-sm text-slate-800 mt-0.5">{c.text}</p>
                </div>
              </div>
            ))}

            {/* Add Comment */}
            <form onSubmit={handleComment} className="flex gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D1D9D4] flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 text-sm border border-[#D1D9D4] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#1B5E20]/30 placeholder:text-[#c0c8c2]"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-[#1B5E20] text-white text-sm font-bold rounded-xl hover:bg-[#154d1a] transition-colors disabled:opacity-40"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    setArticles([...stored, ...SAMPLE_ARTICLES]);
  }, []);

  const updateArticle = (updated: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    // Persist user-authored articles (not samples)
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    const updatedStored = stored.map((a: Article) => (a.id === updated.id ? updated : a));
    localStorage.setItem("articles", JSON.stringify(updatedStored));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1B5E20]">Articles</h1>
          <p className="text-[#435348] text-sm mt-1">Insights and expertise from the Connect+ community</p>
        </div>
        <Link
          href="/articles/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B5E20] text-white text-sm font-bold rounded-xl hover:bg-[#154d1a] transition-colors shadow-sm"
        >
          <PenLine className="h-4 w-4" /> Write an Article
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#435348]" />
        <input
          type="text"
          placeholder="Search articles, topics, or authors..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D1D9D4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/30"
        />
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} onUpdate={updateArticle} />
        ))}
      </div>
    </div>
  );
}
