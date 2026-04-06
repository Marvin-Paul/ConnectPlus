"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ProfileCard } from "@/components/feed/profile-card";
import { CreatePost } from "@/components/feed/create-post";
import { PostItem } from "@/components/feed/post-item";
import { NewsSidebar } from "@/components/feed/news-sidebar";
import Link from "next/link";
import {
  ThumbsUp, ThumbsDown, MessageSquare, Repeat2, Clock,
  Calendar, MapPin, Users, BookOpen, Send, Globe
} from "lucide-react";

import { useUser } from "@/components/providers/user-provider";

// ─── Types ───────────────────────────────────────────────────────────────────
type FeedItemType = "post" | "article" | "event";

interface FeedItem {
  id: string;
  type: FeedItemType;
  timestamp: number;
  author?: { name: string; headline: string; avatar: string; isFollowed: boolean };
  time?: string;
  content?: string;
  image?: string;
  stats?: { likes: number; comments: number; reposts: number };
  title?: string;
  coverImage?: string | null;
  tags?: string[];
  likes?: number;
  dislikes?: number;
  reposts?: number;
  articleComments?: { id: string; author: string; text: string; time: string }[];
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

const SEED_POSTS: FeedItem[] = [
  {
    id: "p1", type: "post", timestamp: Date.now() - 2 * 3600000,
    author: { name: "Dr. Catherine Namubiru", headline: "CIO at MTN Uganda | Tech Leader | Women in STEM", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", isFollowed: false },
    time: "2h", content: "Excited to share that I've been promoted to CIO at MTN Uganda! 🚀 I'm incredibly grateful for the team and looking forward to driving our digital transformation initiatives.",
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
    content: "Artificial intelligence is rapidly transforming how businesses operate across East Africa...",
    tags: ["AI", "Technology", "East Africa"],
    likes: 342, dislikes: 12, reposts: 78, articleComments: []
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
    description: "The premier annual gathering of East Africa's brightest tech minds.",
    tags: ["AI", "Fintech", "Innovation"]
  }
];

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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
      <div className="flex items-center gap-3 p-4 pb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100">
          <img src={item.author?.avatar} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-slate-900">{item.author?.name}</p>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> Published an Article · {Math.round((Date.now() - item.timestamp) / 3600000)}h ago
          </p>
        </div>
      </div>
      {item.coverImage && (
        <div className="h-44 overflow-hidden mx-4 rounded-lg mb-3">
          <img src={item.coverImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="px-4 pb-4">
        <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-1">{item.title}</h3>
        <p className="text-[14px] text-slate-600 line-clamp-2">{item.content}</p>
      </div>
      <div className="px-4 py-2 border-t border-slate-50 flex items-center gap-4">
         <button onClick={handleLike} className={`flex items-center gap-1.5 text-slate-500 font-bold text-[13px] ${reaction === 'liked' ? 'text-blue-600' : ''}`}><ThumbsUp className="w-4 h-4" /> {item.likes}</button>
         <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5 text-slate-500 font-bold text-[13px]"><MessageSquare className="w-4 h-4" /> {item.articleComments?.length || 0}</button>
      </div>
    </div>
  );
}

function FeedEventCard({ item }: { item: FeedItem }) {
  const [going, setGoing] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
      <div className="flex items-center gap-3 p-4 pb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100">
          <img src={item.organizerLogo} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-slate-900">{item.organizer}</p>
          <p className="text-[11px] text-slate-500">Upcoming Event</p>
        </div>
      </div>
      {item.image && (
        <div className="h-40 overflow-hidden mx-4 rounded-lg mb-3">
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="px-4 pb-4">
        <h3 className="text-[15px] font-bold text-slate-900 mb-1">{item.title}</h3>
        <p className="text-[13px] text-slate-500 line-clamp-2 mb-3">{item.description}</p>
        <button onClick={() => setGoing(!going)} className={`w-full py-2 rounded-full font-bold text-[13px] border ${going ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-900 text-white border-slate-900'}`}>
           {going ? "✓ Going" : "Join Event"}
        </button>
      </div>
    </div>
  );
}

import { FeedProvider, useFeed } from "@/components/providers/feed-provider";
import { PostSkeleton } from "@/components/feed/post-skeleton";


import { ArticleCard } from "@/components/feed/article-card";
import { EventCard } from "@/components/feed/event-card";

const MIXED_ARTICLES: any[] = [
  {
    id: "art1", type: "article", timestamp: Date.now() - 3600000 * 2,
    author: { name: "Dr. Catherine Namubiru", headline: "CIO at MTN Uganda", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", isFollowed: false },
    title: "AI Resilience in African Markets",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=450",
    content: "Building resilient AI systems requires a deep understanding of local infrastructure and data nuances...",
    tags: ["Tech", "AI", "Africa"], likes: 452, reposts: 124, comments_count: 56
  }
];

const MIXED_EVENTS: any[] = [
  {
    id: "eve1", type: "event", timestamp: Date.now() - 3600000 * 4,
    organizer: "Link Uganda", organizerLogo: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    title: "Link Summit 2026: The Digital Pivot",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800&h=450",
    date: "May 24, 2026", eventTime: "10:00 AM", location: "Serena Hotel, Kampala", isOnline: false,
    attendees: 520, category: "Tech", price: "Free", isFree: true, description: "Uniting the brightest minds in East African innovation."
  }
];

function FeedContent() {
  const { posts, loading, hasMore, fetchPosts } = useFeed();
  const [sortOrder, setSortOrder] = useState<'recent' | 'top'>('recent');
  const observer = useRef<IntersectionObserver | null>(null);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return (b._count.likes + b._count.comments + b._count.reposts) - (a._count.likes + a._count.comments + a._count.reposts);
    }
  });

  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        const nextPage = Math.floor(posts.length / 10) + 1;
        fetchPosts(nextPage);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, posts.length, fetchPosts]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        <aside className="hidden md:block md:col-span-4 lg:col-span-3 h-fit">
          <ProfileCard />
        </aside>

        <main className="md:col-span-8 lg:col-span-6 space-y-4">
          <CreatePost />

          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
              <button
                onClick={() => setSortOrder('top')}
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                  sortOrder === 'top'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Top
              </button>
              <button
                onClick={() => { setSortOrder('recent'); fetchPosts(1); }}
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                  sortOrder === 'recent'
                    ? 'bg-white text-[#0A66C2] shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Recent
              </button>
            </div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-4">
            {sortedPosts.map((post, index) => {
              const elements = [];
              
              if (index === 1 && MIXED_ARTICLES[0]) {
                elements.push(<ArticleCard key="mixed-art-1" item={MIXED_ARTICLES[0]} />);
              }
              if (index === 3 && MIXED_EVENTS[0]) {
                elements.push(<EventCard key="mixed-eve-1" item={MIXED_EVENTS[0]} />);
              }

              if (sortedPosts.length === index + 1) {
                elements.push(
                  <div key={post.id} ref={lastPostRef}>
                    <PostItem post={post} />
                  </div>
                );
              } else {
                elements.push(<PostItem key={post.id} post={post} />);
              }
              
              return elements;
            })}

            {loading && (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            )}

            {!loading && hasMore && (
              <div className="py-8 flex justify-center">
                 <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            )}

            {!loading && posts.length === 0 && (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-xl">
                 <Globe className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                 <h3 className="text-xl font-black text-slate-800">Your Feed is Empty</h3>
                 <p className="text-slate-400 font-medium italic mt-2">Start following people to see their updates!</p>
              </div>
            )}
          </div>
        </main>

        <aside className="hidden lg:block lg:col-span-3">
          <NewsSidebar />
        </aside>
      </div>
    </div>
  );
}

export default function FeedPage() {
  return (
    <FeedProvider>
      <FeedContent />
    </FeedProvider>
  );
}
