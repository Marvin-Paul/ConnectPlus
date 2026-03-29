"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Clock, ThumbsUp, ThumbsDown, 
  Repeat2, MessageSquare, Send, BookOpen 
} from "lucide-react";

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

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a mockup; in a real app, we would fetch from Prisma via an API
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    const found = stored.find((a: any) => a.id === params.id);
    
    if (found) {
      setArticle(found);
    } else {
      // Fallback to sample data for demo purposes
      const SAMPLES = [
        {
          id: "sample_1",
          title: "The Future of AI in East African Business: Opportunities and Challenges",
          content: "<p>Artificial intelligence is rapidly transforming how businesses operate across East Africa. From fintech to agriculture, AI-driven tools are unlocking efficiencies previously unimaginable for small and medium enterprises in the region...</p><p>Key sectors like agriculture are seeing drone-based pest monitoring systems that can cover 100 acres in minutes—a task that previously took days. Similarly, in fintech, micro-lending platforms are using alternative data points for credit scoring, reaching the unbanked millions.</p>",
          coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&h=400&q=80",
          tags: ["AI", "Technology", "East Africa"],
          author: {
            name: "Dr. Catherine Namubiru",
            headline: "CIO at MTN Uganda | Tech Leadership",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
          },
          publishedAt: "2h ago",
          likes: 342, dislikes: 12, reposts: 78,
          comments: []
        }
      ];
      setArticle(SAMPLES.find(s => s.id === params.id) || null);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) return <div className="p-8 text-center text-[#435348]">Loading article...</div>;
  if (!article) return <div className="p-8 text-center text-[#435348]">Article not found. <Link href="/articles" className="text-[#1B5E20] font-bold underline">Go back</Link></div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link href="/articles" className="inline-flex items-center gap-2 text-[#435348] hover:text-[#1B5E20] mb-6 font-bold transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      <article className="bg-white rounded-3xl border border-[#D1D9D4] shadow-sm overflow-hidden">
        {article.coverImage && (
          <div className="h-72 lg:h-96 w-full">
            <img src={article.coverImage} className="w-full h-full object-cover" alt="" />
          </div>
        )}

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map(t => (
              <span key={t} className="px-3 py-1 bg-[#F1F8F4] text-[#1B5E20] text-xs font-bold rounded-full border border-[#4CAF50]/30 shadow-sm">
                #{t}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 p-4 bg-[#F1F8F4]/50 rounded-2xl border border-[#D1D9D4]">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1B5E20]/20">
              <img src={article.author.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-[#1B5E20]">{article.author.name}</p>
              <p className="text-xs text-[#435348]">{article.author.headline}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-[#435348] mt-0.5 font-medium">
                <Clock className="h-3 w-3" /> {article.publishedAt}
                <span className="text-[#D1D9D4]">·</span>
                <BookOpen className="h-3 w-3" /> 5 min read
              </div>
            </div>
          </div>

          <div 
            className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-lg whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 pt-6 border-t border-[#D1D9D4] flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F1F8F4] rounded-xl text-sm font-bold text-[#435348] transition-all">
                <ThumbsUp className="h-5 w-5" /> {article.likes}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-xl text-sm font-bold text-[#435348] transition-all">
                <ThumbsDown className="h-5 w-5" /> {article.dislikes}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F1F8F4] rounded-xl text-sm font-bold text-[#435348] transition-all">
                <Repeat2 className="h-5 w-5" /> {article.reposts}
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F1F8F4] rounded-xl text-sm font-bold text-[#1B5E20] transition-all">
              <MessageSquare className="h-5 w-5" /> {article.comments?.length || 0}
            </button>
          </div>
        </div>
      </article>

      {/* Share Section Mockup */}
      <div className="mt-8 bg-[#1B5E20] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-[#1B5E20]/20">
        <div>
          <h3 className="text-xl font-bold mb-1">Liked this article?</h3>
          <p className="text-white/80 text-sm">Spread the word with your network or leave a comment.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white text-[#1B5E20] font-black rounded-xl hover:bg-white/90 transition-all text-sm uppercase tracking-wide">
            Share Article
          </button>
          <button className="px-6 py-2.5 border border-white/40 bg-white/10 hover:bg-white/20 font-black rounded-xl transition-all text-sm uppercase tracking-wide">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
