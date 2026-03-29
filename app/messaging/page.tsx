"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Plus, Image, Paperclip, Smile, Send as SendIcon, 
  MoreHorizontal, ChevronDown, Video, Phone, Mic, 
  Search, SlidersHorizontal, SquarePen, ShieldCheck, 
  Sparkles, Star, CheckCircle2, MoreVertical
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const CONVERSATIONS = [
  {
    id: "c1",
    name: "Dr. Catherine Namubiru",
    lastMessage: "Let's chat about potential MTN collaborations.",
    time: "3:42 PM",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    unread: true,
    isOnline: true,
    isPremium: true,
    headline: "CIO at MTN Uganda | Tech Leader"
  },
  {
    id: "c2",
    name: "Recruiter @ Chipper Cash",
    lastMessage: "Is your InMail working? We have an opening.",
    time: "1:20 PM",
    avatar: "CC",
    unread: false,
    isOnline: false,
    isInMail: true,
    headline: "International Talent Acquisition"
  },
  {
    id: "c3",
    name: "Isaac Kato",
    lastMessage: "Documentation sent. Check your email.",
    time: "Yesterday",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    unread: false,
    isOnline: true,
    headline: "Backend Architect"
  }
];

const INITIAL_MESSAGES = [
  {
    id: "m1",
    sender: "them",
    name: "Catherine Namubiru",
    text: "Hi Marvin! I've been following your work on Connect+ particularly your recent post on AI scalability. I'd love to chat about potential collaborations at MTN.",
    time: "3:42 PM",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
  },
  {
    id: "m2",
    sender: "me",
    name: "Marvin Muwereza (You)",
    text: "Hi Catherine! Thank you for reaching out. I'm a big fan of MTN's recent infrastructure upgrades. I'd be happy to discuss how AI can play a role. When would be a good time to connect?",
    time: "3:45 PM",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
  }
];

// ─── Sub-Components ────────────────────────────────────────────────────────────

function ChatItem({ chat, active, onClick }: { chat: any; active: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 flex gap-4 cursor-pointer transition-all duration-300 relative group ${active ? 'bg-blue-50/40 border-l-[3px] border-[#0a66c2]' : 'hover:bg-slate-50 border-l-[3px] border-transparent'}`}
    >
      <div className="relative shrink-0">
         <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center font-black text-slate-400 overflow-hidden shadow-lg border-2 ${active ? 'border-white' : 'border-slate-50'} group-hover:scale-110 transition-transform`}>
            {chat.avatar.startsWith('http') ? <img src={chat.avatar} className="w-full h-full object-cover" alt="" /> : chat.avatar}
         </div>
         {chat.isOnline && (
           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-xl" />
         )}
      </div>

      <div className="flex-1 min-w-0">
         <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
               <h3 className={`text-sm tracking-tight truncate ${chat.unread || active ? 'font-black text-slate-800' : 'font-bold text-slate-600'}`}>
                 {chat.name}
               </h3>
               {chat.isPremium && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
               {chat.isInMail && <span className="bg-[#0a66c2]/5 text-[#0a66c2] text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-blue-100">InMail</span>}
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0 ml-2">{chat.time}</span>
         </div>
         <p className={`text-[12px] leading-snug line-clamp-1 italic ${chat.unread ? 'font-black text-slate-700' : 'text-slate-400 font-medium'}`}>
           {chat.lastMessage}
         </p>
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function MessagingPage() {
  const [activeChatId, setActiveChatId] = useState("c1");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = CONVERSATIONS.find(c => c.id === activeChatId) || CONVERSATIONS[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
       id: `m_${Date.now()}`,
       sender: "me" as const,
       name: "Marvin Muwereza (You)",
       text: inputText,
       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] mt-8 bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50 flex">
      
      {/* Sidebar: Chat List */}
      <aside className="w-[380px] h-full border-r border-slate-50 flex flex-col bg-white">
         <div className="p-8 pb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-800 tracking-tighter">Messaging</h2>
            <div className="flex items-center gap-1">
               <button className="p-2.5 rounded-full hover:bg-slate-50 transition-colors text-slate-400">
                  <SlidersHorizontal className="w-5 h-5" />
               </button>
               <button className="p-2.5 rounded-full hover:bg-slate-50 transition-colors text-slate-400">
                  <SquarePen className="w-5 h-5" />
               </button>
            </div>
         </div>

         <div className="px-8 mb-6">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0a66c2] transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search links..."
                 className="w-full h-11 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-[13px] font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
               />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto divide-y divide-slate-50 scrollbar-hide">
            {CONVERSATIONS.map(chat => (
              <ChatItem 
                key={chat.id} 
                chat={chat} 
                active={activeChatId === chat.id} 
                onClick={() => setActiveChatId(chat.id)} 
              />
            ))}
         </div>
      </aside>

      {/* Main Window */}
      <main className="flex-1 flex flex-col h-full bg-slate-50/20 relative">
         
         {/* Chat Header */}
         <div className="px-10 py-6 border-b border-slate-50 bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-5">
               <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-50 shadow-xl">
                     {activeChat.avatar.startsWith('http') ? <img src={activeChat.avatar} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full bg-slate-100 flex items-center justify-center font-black text-slate-400">{activeChat.avatar}</div>}
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-xl" />
               </div>
               <div>
                  <div className="flex items-center gap-2">
                     <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none">{activeChat.name}</h3>
                     {activeChat.isPremium && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-80">{activeChat.headline}</p>
               </div>
            </div>

            <div className="flex items-center gap-2">
               <button className="p-3.5 rounded-full hover:bg-slate-50 transition-all text-slate-400 hover:text-[#0a66c2] hover:scale-110 active:scale-95 shadow-sm">
                  <Video className="w-5.5 h-5.5" />
               </button>
               <button className="p-3.5 rounded-full hover:bg-slate-50 transition-all text-slate-400 hover:text-[#0a66c2] hover:scale-110 active:scale-95 shadow-sm">
                  <Phone className="w-5.5 h-5.5" />
               </button>
               <button className="p-3.5 rounded-full hover:bg-slate-50 transition-all text-slate-400 hover:text-[#0a66c2] hover:scale-110 active:scale-95 shadow-sm">
                  <MoreVertical className="w-5.5 h-5.5" />
               </button>
            </div>
         </div>

         {/* Message Feed */}
         <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
            <div className="flex flex-col items-center text-center p-12 bg-white/40 rounded-[3rem] border border-slate-100 mb-12 shadow-sm">
               <div className="w-24 h-24 rounded-[2rem] overflow-hidden mb-6 shadow-2xl border-4 border-white rotate-3">
                  {activeChat.avatar.startsWith('http') ? <img src={activeChat.avatar} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full bg-slate-100 flex items-center justify-center font-black text-slate-400">{activeChat.avatar}</div>}
               </div>
               <h4 className="text-2xl font-black text-slate-800 tracking-tighter leading-none">{activeChat.name}</h4>
               <p className="text-sm text-slate-400 font-medium max-w-sm mt-3 italic leading-relaxed opacity-80">{activeChat.headline}</p>
               <button className="mt-8 px-10 py-3 rounded-full border border-slate-100 text-[#0a66c2] font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-sm">
                  View full professional profile
               </button>
            </div>

            <div className="space-y-12">
               {messages.map((msg, idx) => {
                 const isPrevSame = idx > 0 && messages[idx-1].sender === msg.sender;
                 return (
                   <div key={msg.id} className={`flex gap-5 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                     {!isPrevSame ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                           <img src={msg.avatar} className="w-full h-full object-cover shadow-inner" alt="" />
                        </div>
                     ) : (
                        <div className="w-10 h-10 opacity-0 shrink-0" />
                     )}
                     <div className={`space-y-1.5 max-w-[65%] ${msg.sender === "me" ? "items-end" : "items-start"}`}>
                        {!isPrevSame && (
                           <div className={`flex items-baseline gap-3 mb-1 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                              <span className="text-[11px] font-black text-slate-800 tracking-tight uppercase tracking-widest opacity-80">{msg.name}</span>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-40">{msg.time}</span>
                           </div>
                        )}
                        <div className={`px-8 py-5 rounded-[2.5rem] shadow-xl text-[14px] leading-relaxed font-medium transition-all duration-500 hover:scale-[1.02] ${
                          msg.sender === "me" 
                          ? "bg-slate-900 text-white rounded-tr-none shadow-slate-900/10" 
                          : "bg-white text-slate-700 rounded-tl-none border border-slate-50 shadow-slate-200/20"
                        }`}>
                           <p className="italic">{msg.text}</p>
                        </div>
                     </div>
                   </div>
                 );
               })}
               <div ref={messagesEndRef} />
            </div>
         </div>

         {/* Message Input */}
         <div className="px-10 py-8 bg-white border-t border-slate-50">
            <div className="relative flex items-end gap-4 p-4 border border-slate-100 rounded-[2.5rem] bg-slate-50/40 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-blue-900/5 focus-within:border-blue-200 transition-all duration-700 group">
               <div className="flex items-center self-center gap-1.5 pl-2 opacity-40 group-focus-within:opacity-100 transition-opacity">
                  <button className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400"><Plus className="w-5 h-5" /></button>
                  <button className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400"><Mic className="w-5 h-5" /></button>
               </div>
               <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                  placeholder="Speak your professional mind..."
                  className="flex-1 min-h-[56px] py-4 border-none focus:ring-0 text-[14px] resize-none bg-transparent placeholder:text-slate-300 font-medium text-slate-800 leading-relaxed"
               />
               <div className="flex items-center gap-1.5 pr-2">
                  <button className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 opacity-0 group-focus-within:opacity-100 transition-opacity"><Smile className="w-5 h-5" /></button>
                  <button 
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className="p-4 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all hover:scale-110 active:scale-90 disabled:opacity-20 shadow-2xl shadow-slate-900/20"
                  >
                     <SendIcon className="w-5 h-5" />
                  </button>
               </div>
            </div>
            
            <div className="flex items-center justify-between px-6 mt-4">
               <div className="flex items-center gap-6">
                  {['Image', 'Document', 'Video', 'Article'].map(label => (
                    <button key={label} className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-[#0a66c2] transition-colors">{label}</button>
                  ))}
               </div>
               <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#1B5E20] opacity-40">
                  <ShieldCheck className="w-3.5 h-3.5" /> End-to-end professional integrity
               </div>
            </div>
         </div>

      </main>

    </div>
  );
}
