"use client";

import { 
  Plus, 
  Image, 
  Paperclip, 
  Smile, 
  Send as SendIcon,
  MoreHorizontal,
  ChevronDown
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/components/providers/user-provider";

interface Message {
  id: string;
  sender: "me" | "them";
  name: string;
  text: string;
  time: string;
  avatar: string;
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
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
  ]);

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `m_${Date.now()}`,
      sender: "me",
      name: "Marvin Muwereza (You)",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="p-4 border-b border-[#e0e0e0] flex items-center justify-between shadow-sm sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
         <div className="flex items-center gap-3">
            <div className="relative">
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-10 h-10 rounded-full border border-[#e0e0e0]" alt="" />
               <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
               <h3 className="text-sm font-bold text-slate-800 leading-tight">Dr. Catherine Namubiru</h3>
               <p className="text-[10px] text-[#666666] flex items-center gap-0.5">
                  Chief Information Officer at MTN Uganda <ChevronDown className="h-3 w-3" />
               </p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
               <Plus className="h-5 w-5 text-[#666666]" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
               <MoreHorizontal className="h-5 w-5 text-[#666666]" />
            </button>
         </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
         <div className="flex flex-col items-center text-center p-8 bg-[#edf3f8]/30 rounded-xl mb-8">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-20 h-20 rounded-full border border-[#e0e0e0] mb-4" alt="" />
            <h4 className="text-lg font-bold text-slate-800">Dr. Catherine Namubiru</h4>
            <p className="text-sm text-[#666666] max-w-xs mt-1">
               Chief Information Officer at MTN Uganda | Tech Leader | Advocate for Women in STEM
            </p>
            <button className="mt-4 text-sm font-bold text-[#0a66c2] hover:underline">
               View Profile
            </button>
         </div>

         {/* Individual Bubbles */}
         <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === "me" ? "justify-end flex-row-reverse" : ""}`}>
                <img src={msg.avatar} className="w-8 h-8 rounded-full border border-slate-100" alt="" />
                <div className={`space-y-1 max-w-[75%] ${msg.sender === "me" ? "text-right" : ""}`}>
                  <div className={`flex items-baseline gap-2 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                    <span className="text-[11px] font-bold text-slate-800">{msg.name}</span>
                    <span className="text-[9px] text-slate-400">{msg.time}</span>
                  </div>
                  <div className={`p-4 rounded-3xl shadow-sm text-[13px] leading-relaxed font-medium transition-all ${
                    msg.sender === "me" 
                    ? "bg-[#0a66c2] text-white rounded-tr-none" 
                    : "bg-[#f3f6f8] text-slate-700 rounded-tl-none border border-slate-100"
                  }`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
         </div>
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-[#e0e0e0] bg-white relative">
         <div className="relative group p-4 border border-[#e0e0e0] rounded-2xl focus-within:ring-2 focus-within:ring-[#0a66c2]/20 focus-within:border-[#0a66c2]/40 transition-all duration-300 shadow-sm bg-slate-50/30">
            <textarea 
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Write a message..."
               className="w-full min-h-[80px] border-none focus:ring-0 text-[13px] resize-none bg-transparent placeholder:text-slate-400 font-medium text-slate-800"
            />
            <div className="flex items-center justify-between pt-3 mt-1">
               <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                     <Image className="h-4 w-4 text-[#666666]" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                     <Paperclip className="h-4 w-4 text-[#666666]" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                     <Smile className="h-4 w-4 text-[#666666]" />
                  </button>
               </div>
               <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="px-6 py-2 rounded-full bg-[#0a66c2] text-white font-black text-xs hover:bg-[#004182] transition-colors shadow-blue-100 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
               >
                 Send <SendIcon className="h-3 w-3" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
