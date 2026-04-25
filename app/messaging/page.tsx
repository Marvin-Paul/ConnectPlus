"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus, Smile, Send as SendIcon,
  Video, Phone, Mic,
  Search, SlidersHorizontal, SquarePen, ShieldCheck,
  Star, MoreVertical, Loader2, MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-provider";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Conversation {
  id: string;
  name: string;
  headline: string;
  avatar: string | null;
  isPremium: boolean;
  lastMessage: string;
  time: string;
  unread: boolean;
  isOnline: boolean;
  isInMail?: boolean;
  otherUserId?: string | null;
}

interface Message {
  id: string;
  text: string;
  time: string;
  sender: "me" | "them";
  name: string;
  avatar: string;
}

// ─── Mock Fallback Data ───────────────────────────────────────────────────────

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "Dr. Catherine Namubiru",
    lastMessage: "Let's chat about potential MTN collaborations.",
    time: "3:42 PM",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    unread: true,
    isOnline: true,
    isPremium: true,
    headline: "CIO at MTN Uganda | Tech Leader",
  },
  {
    id: "c2",
    name: "Recruiter @ Chipper Cash",
    lastMessage: "Is your InMail working? We have an opening.",
    time: "1:20 PM",
    avatar: null,
    unread: false,
    isOnline: false,
    isInMail: true,
    isPremium: false,
    headline: "International Talent Acquisition",
  },
  {
    id: "c3",
    name: "Isaac Kato",
    lastMessage: "Documentation sent. Check your email.",
    time: "Yesterday",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    unread: false,
    isOnline: true,
    isPremium: false,
    headline: "Backend Architect",
  },
];

// Per-conversation mock message histories — each chat has its own isolated thread
const MOCK_MESSAGES: Record<string, Message[]> = {
  // each key is a conversation id; each value is its isolated message thread
  c1: [
    {
      id: "m1",
      sender: "them",
      name: "Catherine Namubiru",
      text: "Hi Marvin! I've been following your work on Connect+. I'd love to chat about potential collaborations at MTN.",
      time: "3:42 PM",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    },
    {
      id: "m2",
      sender: "me",
      name: "Marvin Muwereza (You)",
      text: "Hi Catherine! Thank you for reaching out. I'd be happy to discuss how AI can play a role. When would be a good time to connect?",
      time: "3:45 PM",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    },
    {
      id: "m3",
      sender: "them",
      name: "Catherine Namubiru",
      text: "How about Thursday at 3PM EAT? I'll send a calendar invite.",
      time: "3:50 PM",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    },
  ],
  c2: [
    {
      id: "m4",
      sender: "them",
      name: "Recruiter @ Chipper Cash",
      text: "Hi! We have an exciting Senior Engineer opening at Chipper Cash. Your profile is a strong match. Is your InMail working?",
      time: "1:20 PM",
      avatar: "",
    },
  ],
  c3: [
    {
      id: "m5",
      sender: "me",
      name: "Marvin Muwereza (You)",
      text: "Isaac, can you send over the API docs for the payment module?",
      time: "Yesterday 2:10 PM",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    },
    {
      id: "m6",
      sender: "them",
      name: "Isaac Kato",
      text: "Documentation sent. Check your email — I included the auth flow diagrams too.",
      time: "Yesterday 2:45 PM",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    },
  ],
};

// ─── Sub-Components ────────────────────────────────────────────────────────────

function AvatarDisplay({ avatar, name, size = "md" }: { avatar: string | null; name: string; size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "w-10 h-10", md: "w-14 h-14", lg: "w-24 h-24" };
  const cls = sizeMap[size];

  if (avatar && avatar.startsWith("http")) {
    return <img src={avatar} className={`${cls} rounded-xl object-cover border border-slate-100`} alt={name} />;
  }
  const initials = name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
  return (
    <div className={`${cls} rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm border border-slate-200`}>
      {initials}
    </div>
  );
}

function ChatItem({ chat, active, onClick }: { chat: Conversation; active: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`p-6 flex gap-4 cursor-pointer transition-all duration-300 relative group ${active ? "bg-blue-50/40 border-l-[3px] border-[#0a66c2]" : "hover:bg-slate-50 border-l-[3px] border-transparent"}`}
    >
      <div className="relative shrink-0">
        <div className={`w-14 h-14 rounded-[1.5rem] overflow-hidden shadow-lg border-2 ${active ? "border-white" : "border-slate-50"} group-hover:scale-105 transition-transform`}>
          <AvatarDisplay avatar={chat.avatar} name={chat.name} />
        </div>
        {chat.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-xl" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className={`text-sm tracking-tight truncate ${chat.unread || active ? "font-black text-slate-800" : "font-bold text-slate-600"}`}>
              {chat.name}
            </h3>
            {chat.isPremium && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0" />}
            {chat.isInMail && (
              <span className="bg-[#0a66c2]/5 text-[#0a66c2] text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-blue-100 shrink-0">
                InMail
              </span>
            )}
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0 ml-2">{chat.time}</span>
        </div>
        <p className={`text-[12px] leading-snug line-clamp-1 italic ${chat.unread ? "font-black text-slate-700" : "text-slate-400 font-medium"}`}>
          {chat.lastMessage}
        </p>
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function MessagingPage() {
  const { user, loading: userLoading } = useUser();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filterUnread, setFilterUnread] = useState(false);
  const [filterInMail, setFilterInMail] = useState(false);
  const [loadingConvos, setLoadingConvos] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userAvatar = user?.avatarUrl ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80";
  const userName = user ? `${user.firstName} ${user.lastName}` : "Marvin Muwereza";

  // ── Fetch conversations ─────────────────────────────────────────────────────
  const fetchConversations = useCallback(async () => {
    setLoadingConvos(true);
    try {
      const res = await fetch("/api/messaging/conversations");
      if (res.ok) {
        const data = await res.json();
        if (data.conversations?.length > 0) {
          setConversations(data.conversations);
          setUsingMockData(false);
        } else {
          // No real conversations yet — use mock data
          setConversations(MOCK_CONVERSATIONS);
          setUsingMockData(true);
        }
      } else {
        setConversations(MOCK_CONVERSATIONS);
        setUsingMockData(true);
      }
    } catch {
      setConversations(MOCK_CONVERSATIONS);
      setUsingMockData(true);
    } finally {
      setLoadingConvos(false);
    }
  }, []);

  // ── Fetch messages — always clears first to prevent bleed-through ────────────
  const fetchMessages = useCallback(async (chatId: string) => {
    // Immediately clear: ensures previous conversation's messages never linger
    setMessages([]);
    setInputText("");

    if (usingMockData) {
      // Load the specific conversation's mock history (keyed by chatId)
      setMessages(MOCK_MESSAGES[chatId] ?? []);
      return;
    }

    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/messaging/conversations/${chatId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages ?? []);
      }
    } catch {
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }, [usingMockData]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (activeChatId) {
      fetchMessages(activeChatId);
    }
  }, [activeChatId, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Send message ────────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!inputText.trim() || !activeChatId) return;
    const text = inputText.trim();
    setInputText("");

    const optimistic: Message = {
      id: `opt_${Date.now()}`,
      sender: "me",
      name: `${userName} (You)`,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: userAvatar,
    };
    setMessages((prev) => [...prev, optimistic]);

    if (usingMockData) {
      // In mock mode, persist optimistic message into the mock store so it
      // stays when you come back to this conversation
      MOCK_MESSAGES[activeChatId] = [
        ...(MOCK_MESSAGES[activeChatId] ?? []),
        optimistic,
      ];
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`/api/messaging/conversations/${activeChatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (res.ok) {
        const saved = await res.json();
        // Replace optimistic with real saved message
        setMessages((prev) =>
          prev.map((m) => (m.id === optimistic.id ? { ...optimistic, id: saved.id } : m))
        );
        // Refresh conversation list to update last message
        fetchConversations();
      }
    } catch {
      // Keep optimistic message visible even on error
    } finally {
      setSending(false);
    }
  };

  // ── Derived state ───────────────────────────────────────────────────────────
  const filteredConversations = conversations.filter((chat) => {
    if (filterUnread && !chat.unread) return false;
    if (filterInMail && !chat.isInMail) return false;
    return true;
  });

  const activeChat = activeChatId ? conversations.find((c) => c.id === activeChatId) : null;

  // ── Loading state ────────────────────────────────────────────────────────────
  if (userLoading || loadingConvos) {
    return (
      <div className="h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#0a66c2] animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-80px)] md:h-[calc(100vh-140px)] mt-2 md:mt-8 bg-white md:rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">

      {/* ── Sidebar: Chat List ─────────────────────────────────────────────── */}
      <aside className={`w-full md:w-[320px] md:h-full border-b md:border-b-0 md:border-r border-slate-200 flex-col bg-white shrink-0 ${activeChatId ? 'hidden md:flex' : 'flex h-full'}`}>
        <div className="p-6 pb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Messaging</h2>
          <div className="flex items-center gap-1 relative">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`p-2.5 rounded-full transition-colors ${isFiltersOpen ? "bg-slate-100 text-[#0a66c2] shadow-inner" : "hover:bg-slate-50 text-slate-400"}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-full hover:bg-slate-50 transition-colors text-slate-400">
              <SquarePen className="w-5 h-5" />
            </button>

            {isFiltersOpen && (
              <div className="absolute top-12 right-10 w-48 bg-white rounded-2xl border border-slate-100 shadow-2xl p-4 flex flex-col gap-2 z-50">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Filter Chats</h4>
                <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                  <span className="text-xs font-bold text-slate-700">Unread Only</span>
                  <input type="checkbox" checked={filterUnread} onChange={(e) => setFilterUnread(e.target.checked)} className="rounded text-[#0a66c2] focus:ring-[#0a66c2] w-4 h-4 border-slate-200" />
                </label>
                <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                  <span className="text-xs font-bold text-slate-700">InMail Only</span>
                  <input type="checkbox" checked={filterInMail} onChange={(e) => setFilterInMail(e.target.checked)} className="rounded text-[#0a66c2] focus:ring-[#0a66c2] w-4 h-4 border-slate-200" />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="px-8 mb-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0a66c2] transition-colors" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full h-11 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-[13px] font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-50 scrollbar-hide">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                active={activeChatId === chat.id}
                onClick={() => setActiveChatId(chat.id)}
              />
            ))
          ) : (
            <div className="p-10 text-center flex flex-col items-center opacity-60">
              <MessageSquare className="w-8 h-8 text-slate-300 mb-3" />
              <p className="text-xs font-bold text-slate-500">No chats match your filters.</p>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Chat Window ───────────────────────────────────────────────── */}
      <main className={`flex-1 flex flex-col h-full bg-slate-50/20 relative ${activeChatId ? 'flex' : 'hidden md:flex'}`}>
        {!activeChat ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60 hidden md:flex">
             <MessageSquare className="w-16 h-16 text-slate-300 mb-4" />
             <h3 className="text-lg font-bold text-slate-800">Your Messages</h3>
             <p className="text-sm text-slate-500 font-medium max-w-[250px] mt-2">Select a conversation from the list to start messaging.</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="px-4 md:px-6 py-3 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveChatId(null)} 
                  className="md:hidden p-1.5 -ml-1 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div className="relative hidden md:block">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 shadow-sm">
                    <AvatarDisplay avatar={activeChat.avatar} name={activeChat.name} size="sm" />
                  </div>
                  {activeChat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[15px] font-bold text-slate-900 tracking-tight leading-none">{activeChat.name}</h3>
                    {activeChat.isPremium && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-none line-clamp-1">{activeChat.headline}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="hidden md:flex p-2 rounded-full hover:bg-slate-100 transition-all text-slate-500 hover:text-[#0a66c2]">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 transition-all text-slate-500 hover:text-[#0a66c2]">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 transition-all text-slate-500">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6 scrollbar-hide">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 mb-6 shadow-sm">
                <div className="w-16 h-16 rounded-[1rem] overflow-hidden mb-3 border border-slate-100 shadow-sm">
                  <AvatarDisplay avatar={activeChat.avatar} name={activeChat.name} size="lg" />
                </div>
                <h4 className="text-[16px] font-bold text-slate-900 tracking-tight leading-none">{activeChat.name}</h4>
                <p className="text-[12px] text-slate-500 font-medium max-w-sm mt-1.5 leading-relaxed">{activeChat.headline}</p>
                 <Link href={`/profile/${activeChatId ? activeChatId : 'demo-user'}`} className="mt-4 px-4 py-1.5 rounded-full border border-slate-200 text-[#0A66C2] font-semibold text-[12px] hover:bg-blue-50 transition-all">
                  View Profile
                </Link>
              </div>

              {loadingMessages ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-5 h-5 text-[#0a66c2] animate-spin" />
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, idx) => {
                    const isPrevSame = idx > 0 && messages[idx - 1].sender === msg.sender;
                    return (
                      <div key={msg.id} className={`flex gap-3 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                        {!isPrevSame ? (
                          <div className="shrink-0 shadow-sm border border-slate-100 rounded-[1rem] overflow-hidden w-8 h-8">
                            <AvatarDisplay avatar={msg.avatar} name={msg.name} size="sm" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 opacity-0 shrink-0" />
                        )}
                        <div className={`space-y-1 max-w-[75%] flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}>
                          {!isPrevSame && (
                            <div className={`flex items-baseline gap-2 mb-0.5 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                              <span className="text-[11px] font-bold text-slate-800">{msg.name.replace(" (You)", "")}</span>
                              <span className="text-[9px] font-semibold text-slate-400">{msg.time}</span>
                            </div>
                          )}
                          <div className={`px-4 py-2.5 rounded-[1.2rem] shadow-sm text-[13px] leading-relaxed font-medium transition-all ${
                            msg.sender === "me"
                              ? "bg-[#0a66c2] text-white rounded-tr-sm"
                              : "bg-white text-slate-700 rounded-tl-sm border border-slate-100"
                          }`}>
                            <p>{msg.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </>
        )}

        {/* Message Input */}
        <div className="px-3 md:px-6 py-3 bg-white border-t border-slate-100">
          <div className="relative flex items-end gap-2 p-1.5 border border-slate-200 rounded-[1.5rem] bg-slate-50 focus-within:bg-white focus-within:shadow-md focus-within:border-blue-300 transition-all group">
            <div className="flex items-center self-center gap-0.5 pl-1 opacity-60 group-focus-within:opacity-100 transition-opacity">
              <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"><Plus className="w-4 h-4 stroke-[2.5px]" /></button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Write a message..."
              className="flex-1 min-h-[40px] max-h-[120px] py-2.5 px-2 border-none focus:ring-0 text-[13px] resize-none bg-transparent placeholder:text-slate-400 font-medium text-slate-800 leading-relaxed"
            />
            <div className="flex items-center gap-1 pr-1 self-end mb-1">
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || sending}
                className="p-2.5 rounded-full bg-[#0a66c2] text-white hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-30 shadow-sm"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
