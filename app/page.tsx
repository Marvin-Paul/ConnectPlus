"use client";

import { useState, useEffect } from "react";
import { ProfileCard } from "@/components/feed/profile-card";
import { CreatePost } from "@/components/feed/create-post";
import { PostItem } from "@/components/feed/post-item";
import { NewsSidebar } from "@/components/feed/news-sidebar";
import Link from "next/link";
import {
  ThumbsUp, ThumbsDown, MessageSquare, Repeat2, Clock,
  Calendar, MapPin, Users, BookOpen, Send
} from "lucide-react";

import { useUser } from "@/components/providers/user-provider";

// ─── Types ───────────────────────────────────────────────────────────────────
type FeedItemType = "post" | "article" | "event";

interface FeedItem {
  id: string;
  type: FeedItemType;
  timestamp: number;
  // post fields
  author?: { name: string; headline: string; avatar: string; isFollowed: boolean };
  time?: string;
  content?: string;
  image?: string;
  stats?: { likes: number; comments: number; reposts: number };
  // article fields
  title?: string;
  coverImage?: string | null;
  tags?: string[];
  likes?: number;
  dislikes?: number;
  reposts?: number;
  articleComments?: { id: string; author: string; text: string; time: string }[];
  // event fields
  organizer?: string;
  organizerLogo?: string;
  date?: string;
  eventTime?: string;
  location?: string;
  isOnline?: boolean;
  attendees?: number;
  category?: string;
  price?: string;
  isFree?: boolean;
  description?: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED_POSTS: FeedItem[] = [
  {
    id: "p1", type: "post", timestamp: Date.now() - 2 * 3600000,
    author: { name: "Dr. Catherine Namubiru", headline: "CIO at MTN Uganda | Tech Leader | Women in STEM", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", isFollowed: false },
    time: "2h", content: "Excited to share that I've been promoted to CIO at MTN Uganda! 🚀 I'm incredibly grateful for the team and looking forward to driving our digital transformation initiatives.\n\nThank you to everyone who has supported me on this journey. Let's build the future together!",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=450",
    stats: { likes: 1240, comments: 85, reposts: 32 }
  },
  {
    id: "p2", type: "post", timestamp: Date.now() - 5 * 3600000,
    author: { name: "Robert Kizito", headline: "Frontend Architect | Next.js GDE | Helping devs build fast apps", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", isFollowed: true },
    time: "5h", content: "Next.js 14 is a game changer for server components. Here's why you should start shipping with it today:\n\n1. Server Actions make forms incredibly simple.\n2. Partial Prerendering is the future of hybrid performance.\n3. The DX is better than ever.",
    stats: { likes: 842, comments: 42, reposts: 15 }
  },
  {
    id: "p3", type: "post", timestamp: Date.now() - 24 * 3600000,
    author: { name: "Lillian Nsereko", headline: "Product Lead @ PayWay | Simplifying payments across Africa", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", isFollowed: false },
    time: "1d", content: "We just hit 1 million active users on PayWay! 🌍 Financial inclusion isn't just a goal; it's a reality we're building every day.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=450",
    stats: { likes: 2104, comments: 112, reposts: 54 }
  },
];

const SEED_ARTICLES: FeedItem[] = [
  {
    id: "sa1", type: "article", timestamp: Date.now() - 3 * 3600000,
    author: { name: "Dr. Catherine Namubiru", headline: "CIO at MTN Uganda", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", isFollowed: false },
    title: "The Future of AI in East African Business",
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&h=400&q=80",
    content: "Artificial intelligence is rapidly transforming how businesses operate across East Africa. From fintech to agriculture, AI-driven tools are unlocking efficiencies previously unimaginable for SMEs in the region...",
    tags: ["AI", "Technology", "East Africa"],
    likes: 342, dislikes: 12, reposts: 78, articleComments: []
  },
  {
    id: "sa2", type: "article", timestamp: Date.now() - 8 * 3600000,
    author: { name: "Robert Kizito", headline: "Frontend Architect | Next.js GDE", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", isFollowed: true },
    title: "Building Resilient Startups: Lessons from Kampala's Tech Scene",
    coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&h=400&q=80",
    content: "Kampala's startup ecosystem has matured significantly. With over 400 registered startups and growing VC interest, the city is positioning itself as East Africa's next major innovation hub...",
    tags: ["Startups", "Kampala", "Entrepreneurship"],
    likes: 218, dislikes: 4, reposts: 41, articleComments: []
  }
];

const SEED_EVENTS: FeedItem[] = [
  {
    id: "se1", type: "event", timestamp: Date.now() - 1 * 3600000,
    organizer: "Uganda Tech Association", organizerLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=64&h=64&q=80",
    title: "East Africa Tech Summit 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&h=400&q=80",
    date: "April 15, 2026", eventTime: "9:00 AM – 5:00 PM EAT", location: "Kampala Serena Hotel, Uganda",
    isOnline: false, attendees: 1240, category: "Technology", price: "UGX 150,000", isFree: false,
    description: "The premier annual gathering of East Africa's brightest tech minds. Featuring keynotes on AI, fintech, and the future of digital infrastructure.",
    tags: ["AI", "Fintech", "Innovation"]
  },
  {
    id: "se2", type: "event", timestamp: Date.now() - 6 * 3600000,
    organizer: "MTN Uganda Foundation", organizerLogo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=64&h=64&q=80",
    title: "Women in Leadership Forum 2026",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&h=400&q=80",
    date: "April 22, 2026", eventTime: "10:00 AM – 3:00 PM EAT", location: "Online (Zoom)",
    isOnline: true, attendees: 3800, category: "Leadership", price: "Free", isFree: true,
    description: "Empowering women across East Africa to break barriers in leadership with panel discussions and networking.",
    tags: ["Women", "Leadership", "Networking"]
  }
];

// ─── Article Card for Feed ──────────────────────────────────────────────────
function FeedArticleCard({ item, onUpdate }: { item: FeedItem; onUpdate: (u: FeedItem) => void }) {
  const { user } = useUser();
  const [reaction, setReaction] = useState<"liked" | "disliked" | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const userName = user ? `${user.firstName} ${user.lastName}` : "Marvin Muwereza";

  const handleLike = () => {
    if (reaction === "liked") { setReaction(null); onUpdate({ ...item, likes: (item.likes || 0) - 1 }); }
    else { setReaction("liked"); onUpdate({ ...item, likes: (item.likes || 0) + 1, dislikes: reaction === "disliked" ? (item.dislikes || 0) - 1 : item.dislikes }); }
  };
  const handleDislike = () => {
    if (reaction === "disliked") { setReaction(null); onUpdate({ ...item, dislikes: (item.dislikes || 0) - 1 }); }
    else { setReaction("disliked"); onUpdate({ ...item, dislikes: (item.dislikes || 0) + 1, likes: reaction === "liked" ? (item.likes || 0) - 1 : item.likes }); }
  };
  const handleRepost = () => onUpdate({ ...item, reposts: (item.reposts || 0) + 1 });
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const nc = { id: `c_${Date.now()}`, author: userName, text: commentText.trim(), time: "Just now" };
    onUpdate({ ...item, articleComments: [...(item.articleComments || []), nc] });
    setCommentText("");
  };

  return (
    <div className="bg-white rounded-xl border border-[#D1D9D4] shadow-sm overflow-hidden">
      {/* Author */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D1D9D4]">
          <img src={item.author?.avatar} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-primary">{item.author?.name}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> Published an Article
            <span className="text-border">·</span>
            <Clock className="h-2.5 w-2.5" /> {Math.round((Date.now() - item.timestamp) / 3600000)}h ago
          </p>
        </div>
      </div>

      {/* Cover */}
      {item.coverImage && (
        <div className="h-48 overflow-hidden mx-4 rounded-xl mb-3">
          <img src={item.coverImage} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      <div className="px-4 pb-2">
        <Link href={`/articles/${item.id}`}>
          <h3 className="text-base font-bold text-slate-800 hover:text-primary transition-colors cursor-pointer leading-snug mb-1">
            {item.title}
          </h3>
        </Link>
        <p className="text-sm text-[#435348] line-clamp-2 leading-relaxed">{item.content}</p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.tags.map(t => (
              <span key={t} className="text-[10px] bg-accent/10 text-primary border border-accent/20 px-2 py-0.5 rounded-full font-medium">#{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-[#D1D9D4] mx-4" />
      <div className="flex items-center px-2 py-1 gap-1">
        <button onClick={handleLike} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all ${reaction === "liked" ? "bg-primary text-white" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"}`}>
          <ThumbsUp className="h-4 w-4" /> {item.likes}
        </button>
        <button onClick={handleDislike} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all ${reaction === "disliked" ? "bg-red-500 text-white" : "text-muted-foreground hover:bg-red-50 hover:text-red-500"}`}>
          <ThumbsDown className="h-4 w-4" /> {item.dislikes}
        </button>
        <button onClick={handleRepost} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all">
          <Repeat2 className="h-4 w-4" /> {item.reposts}
        </button>
        <button onClick={() => setShowComments(!showComments)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all ${showComments ? "bg-primary/5 text-primary" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"}`}>
          <MessageSquare className="h-4 w-4" /> {item.articleComments?.length || 0}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-4 space-y-2 border-t border-[#D1D9D4]">
          {(item.articleComments || []).length === 0 && (
            <p className="text-xs text-[#435348] italic text-center py-2">No comments yet — be first!</p>
          )}
          {(item.articleComments || []).map(c => (
            <div key={c.id} className="flex gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-primary">{c.author[0]}</div>
              <div className="flex-1 bg-muted rounded-xl px-3 py-2">
                <p className="text-[11px] font-bold text-primary">{c.author} <span className="font-normal text-muted-foreground">· {c.time}</span></p>
                <p className="text-sm text-slate-800">{c.text}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleComment} className="flex gap-2 mt-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D1D9D4] flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-full h-full object-cover" alt="" />
            </div>
            <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." className="flex-1 text-sm border border-border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50" />
            <button type="submit" disabled={!commentText.trim()} className="px-3 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 disabled:opacity-40 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// ─── Event Card for Feed ─────────────────────────────────────────────────────
function FeedEventCard({ item }: { item: FeedItem }) {
  const [going, setGoing] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-[#D1D9D4] shadow-sm overflow-hidden">
      {/* Organizer Row */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D1D9D4]">
          <img src={item.organizerLogo} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-bold text-primary">{item.organizer}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Upcoming Event
            <span className="text-border">·</span>
            <Clock className="h-2.5 w-2.5" /> {Math.round((Date.now() - item.timestamp) / 3600000)}h ago
          </p>
        </div>
        <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${item.isOnline ? "bg-accent text-black" : "bg-accent/10 text-primary border border-accent/30"}`}>
          {item.isOnline ? "🌐 Online" : "📍 In-Person"}
        </span>
      </div>

      {/* Event Image */}
      {item.image && (
        <div className="h-44 overflow-hidden mx-4 rounded-xl mb-3">
          <img src={item.image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      <div className="px-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-slate-800 leading-snug">{item.title}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${item.isFree ? "bg-[#FFC107]/20 text-[#A57C00]" : "bg-slate-100 text-[#435348]"}`}>
            {item.price}
          </span>
        </div>
        <p className="text-sm text-[#435348] line-clamp-2 mb-3">{item.description}</p>

        <div className="grid grid-cols-2 gap-1 text-[11px] text-muted-foreground mb-3">
          <div className="flex items-center gap-1"><Calendar className="h-3 w-3 text-primary" /> {item.date}</div>
          <div className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary" /> {item.eventTime}</div>
          <div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-primary" /> {item.location}</div>
          <div className="flex items-center gap-1"><Users className="h-3 w-3 text-primary" /> {item.attendees?.toLocaleString()} attending</div>
        </div>

        {item.tags && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.map(t => (
              <span key={t} className="text-[10px] bg-accent/10 text-primary border border-accent/20 px-2 py-0.5 rounded-full font-medium">#{t}</span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#D1D9D4] mx-4" />
      <div className="flex gap-2 px-4 py-3">
        <button
          onClick={() => setGoing(!going)}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${going ? "bg-accent text-black" : "bg-primary text-white hover:bg-primary/90"}`}
        >
          {going ? "✓ Going" : "Register"}
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${saved ? "border-[#FFC107] text-[#A57C00] bg-[#FFC107]/10" : "border-border text-muted-foreground hover:bg-primary/5"}`}
        >
          {saved ? "★ Saved" : "Save"}
        </button>
        <Link href="/events" className="px-4 py-2 rounded-xl text-sm font-bold border border-border text-muted-foreground hover:bg-primary/5 transition-colors">
          Details
        </Link>
      </div>
    </div>
  );
}

// ─── Home Feed Page ────────────────────────────────────────────────────────────
export default function FeedPage() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    // Standardize seed data timestamps to avoid hydration mismatches
    const baseTime = Date.now();
    const localizedPosts = SEED_POSTS.map((p, idx) => ({ ...p, timestamp: baseTime - (idx + 1) * 3600000 }));
    const localizedArticles = SEED_ARTICLES.map((a, idx) => ({ ...a, timestamp: baseTime - (idx + 2) * 3600000 }));
    const localizedEvents = SEED_EVENTS.map((e, idx) => ({ ...e, timestamp: baseTime - (idx + 3) * 3600000 }));

    // Load user-authored articles from localStorage
    const storedArticles: FeedItem[] = (JSON.parse(localStorage.getItem("articles") || "[]") as any[]).map((a: any) => ({
      id: a.id, type: "article" as FeedItemType, timestamp: new Date(a.publishedAt).getTime(),
      author: a.author, title: a.title, coverImage: a.coverImage,
      content: a.content?.replace(/<[^>]+>/g, "").slice(0, 200),
      tags: a.tags, likes: a.likes, dislikes: a.dislikes, reposts: a.reposts,
      articleComments: a.comments || []
    }));

    // Merge all feed items and sort newest first
    const all = [...storedArticles, ...localizedPosts, ...localizedArticles, ...localizedEvents]
      .sort((a, b) => b.timestamp - a.timestamp);

    setFeedItems(all);
  }, []);

  const updateItem = (updated: FeedItem) => {
    setFeedItems(prev => prev.map(i => i.id === updated.id ? updated : i));
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
      {/* Left Sidebar */}
      <aside className="md:col-span-4 lg:col-span-3 h-fit">
        <ProfileCard />
      </aside>

      {/* Middle Feed */}
      <main className="md:col-span-8 lg:col-span-6 space-y-4">
        <CreatePost />

        {/* Sort Bar */}
        <div className="flex items-center gap-1 py-1">
          <div className="flex-1 h-px bg-border" />
          <p className="text-[12px] text-muted-foreground px-2">
            Sort by: <span className="font-bold text-primary cursor-pointer uppercase">Recent</span>
          </p>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {feedItems.map(item => {
            if (item.type === "post") return <PostItem key={item.id} {...(item as any)} />;
            if (item.type === "article") return <FeedArticleCard key={item.id} item={item} onUpdate={updateItem} />;
            if (item.type === "event") return <FeedEventCard key={item.id} item={item} />;
            return null;
          })}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:block lg:col-span-3">
        <NewsSidebar />
      </aside>
    </div>
  );
}
