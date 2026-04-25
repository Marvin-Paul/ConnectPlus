"use client";

import { useState, useRef, useCallback } from "react";
import { ProfileCard } from "@/components/feed/profile-card";
import { CreatePost } from "@/components/feed/create-post";
import { PostItem } from "@/components/feed/post-item";
import { NewsSidebar } from "@/components/feed/news-sidebar";
import { Globe } from "lucide-react";

import { FeedProvider, useFeed } from "@/components/providers/feed-provider";
import { PostSkeleton } from "@/components/feed/post-skeleton";
import { PostModal } from "@/components/feed/post-modal";
import { useUser } from "@/components/providers/user-provider";

import { ArticleCard } from "@/components/feed/article-card";
import { Plus } from "lucide-react";
import { EventCard } from "@/components/feed/event-card";

const MIXED_ARTICLES: any[] = [
  {
    id: "art1", type: "article", timestamp: 1735689600000, // Jan 1, 2025
    author: { name: "Dr. Catherine Namubiru", headline: "CIO at MTN Uganda", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", isFollowed: false },
    title: "AI Resilience in African Markets",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=450",
    content: "Building resilient AI systems requires a deep understanding of local infrastructure and data nuances...",
    tags: ["Tech", "AI", "Africa"], likes: 452, reposts: 124, comments_count: 56
  }
];

const MIXED_EVENTS: any[] = [
  {
    id: "eve1", type: "event", timestamp: 1735603200000, // Dec 31, 2024
    organizer: "Link Uganda", organizerLogo: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    title: "Link Summit 2026: The Digital Pivot",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800&h=450",
    date: "May 24, 2026", eventTime: "10:00 AM", location: "Serena Hotel, Kampala", isOnline: false,
    attendees: 520, category: "Tech", price: "Free", isFree: true, description: "Uniting the brightest minds in East African innovation."
  }
];

function FeedContent() {
  const { posts, loading, hasMore, fetchPosts } = useFeed();
  const { user: contextUser } = useUser();
  const [sortOrder, setSortOrder] = useState<'recent' | 'top'>('recent');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
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
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-[1152px] mx-auto py-8 px-4 flex flex-col md:grid md:grid-cols-12 gap-8 relative">
        
        <aside className="w-full md:col-span-4 lg:col-span-3 h-fit order-1 md:order-none">
          <ProfileCard />
        </aside>

        <main className="w-full md:col-span-8 lg:col-span-6 space-y-4 order-2 md:order-none">
          <div className="animate-fade-in">
             <CreatePost />
          </div>

          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-[#E5E7EB] dark:bg-slate-800" />
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 p-1 rounded-full shadow-sm">
              <button
                onClick={() => setSortOrder('top')}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
                  sortOrder === 'top'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'text-[#6B7280] dark:text-slate-400 hover:text-[#1F2937] dark:hover:text-slate-200 hover:bg-[#F3F6F8] dark:hover:bg-slate-800'
                }`}
              >
                Top
              </button>
              <button
                onClick={() => setSortOrder('recent')}
                aria-label="Sort by recent posts"
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
                  sortOrder === 'recent'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'text-[#6B7280] dark:text-slate-400 hover:text-[#1F2937] dark:hover:text-slate-200 hover:bg-[#F3F6F8] dark:hover:bg-slate-800'
                }`}
              >
                Recent
              </button>
            </div>
            <div className="flex-1 h-px bg-[#E5E7EB] dark:bg-slate-800" />
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

              elements.push(
                <div key={post.id} ref={sortedPosts.length === index + 1 ? lastPostRef : null} className="animate-fade-in">
                  <PostItem post={post} />
                </div>
              );
              
              return elements;
            })}

            {loading && <PostSkeleton />}

            {!loading && hasMore && (
              <div className="py-12 flex justify-center">
                 <div className="w-8 h-8 border-[3px] border-[#0A66C2]/10 border-t-[#0A66C2] rounded-full animate-spin" />
              </div>
            )}

            {!loading && posts.length === 0 && (
              <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-[16px] border border-[#E5E7EB] dark:border-slate-800 shadow-soft dark:shadow-none mt-8 animate-fade-in">
                 <Globe className="w-12 h-12 text-[#E5E7EB] dark:text-slate-800 mx-auto mb-4" />
                 <h2 className="text-[20px] font-bold text-[#1F2937] dark:text-slate-100">Discover Insights</h2>
                 <p className="text-[#6B7280] dark:text-slate-400 font-medium mt-2 leading-relaxed">System is scanning for potential connections. Begin by exploring trends.</p>
                  <button 
                    onClick={() => { setSortOrder('recent'); fetchPosts(1); }}
                    aria-label="Explore trending topics"
                    className="mt-6 px-8 py-2.5 bg-[#1B5E20] text-white font-bold rounded-[8px] hover:bg-green-700 transition-all active:scale-95 shadow-sm"
                  >
                     Explore Trends
                  </button>
              </div>
            )}
          </div>
        </main>

        <aside className="w-full lg:col-span-3 h-fit md:sticky md:top-[72px] order-3 md:order-none">
          <NewsSidebar />
        </aside>
      </div>

      {/* Mobile Floating Post Button removed since it is now in the bottom nav */}

      <PostModal 
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        user={{
          name: contextUser ? `${contextUser.firstName} ${contextUser.lastName}` : "Professional User",
          avatar: contextUser?.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=U"
        }}
      />
    </div>
  );
}

export default function FeedPage() {
  return <FeedContent />;
}
