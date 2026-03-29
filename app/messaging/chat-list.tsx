import { 
  SquarePen, 
  Search, 
  MoreHorizontal, 
  SlidersHorizontal 
} from "lucide-react";

const conversations = [
  {
    id: "c1",
    name: "Dr. Catherine Namubiru",
    lastMessage: "Hi Marvin! I've been following your work on Connect+. Let's chat about potential MTN collaborations.",
    time: "3:42 PM",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    unread: true,
    isOnline: true
  },
  {
    id: "c2",
    name: "Sarah M.",
    lastMessage: "The project looks great! I've shared it with the design team.",
    time: "1:20 PM",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    unread: false,
    isOnline: false
  },
  {
    id: "c3",
    name: "Alex Okello",
    lastMessage: "I've sent you the API documentation. Let me know if you need any adjustments.",
    time: "Yesterday",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    unread: false,
    isOnline: true
  }
];

export function ChatList() {
  return (
    <div className="flex flex-col h-full bg-white border-r border-[#e0e0e0]">
      {/* Header */}
      <div className="p-4 border-b border-[#e0e0e0] flex items-center justify-between">
         <h2 className="text-base font-bold text-slate-800">Messaging</h2>
         <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
               <MoreHorizontal className="h-5 w-5 text-[#666666]" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
               <SquarePen className="h-5 w-5 text-[#666666]" />
            </button>
         </div>
      </div>
      
      {/* Search */}
      <div className="p-2 px-4">
         <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
            <input 
              type="text" 
              placeholder="Search messages"
              className="w-full h-8 pl-10 bg-[#edf3f8] border-none rounded text-xs focus:ring-1 focus:ring-[#0a66c2]"
            />
         </div>
      </div>
      
      <div className="flex items-center justify-center py-2 border-b border-[#e0e0e0]">
         <button className="p-1 px-3 text-xs font-bold text-[#666666] hover:bg-slate-100 transition-colors flex items-center gap-1 opacity-60">
           Focused <SlidersHorizontal className="h-3 w-3" />
         </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#f3f3f3]">
         {conversations.map((chat) => (
           <div 
             key={chat.id} 
             className={`p-4 flex gap-3 cursor-pointer transition-colors relative ${chat.unread ? 'bg-[#edf3f8]/50' : 'hover:bg-[#f3f3f3]'}`}
           >
              {chat.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0a66c2]" />}
              
              <div className="relative shrink-0">
                 <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-[#e0e0e0]" />
                 {chat.isOnline && (
                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                 )}
              </div>
              
              <div className="flex-1 min-w-0">
                 <div className="flex items-start justify-between">
                    <h3 className={`text-sm leading-tight truncate ${chat.unread ? 'font-bold text-black' : 'font-medium text-slate-700'}`}>
                      {chat.name}
                    </h3>
                    <span className="text-[10px] text-[#666666] shrink-0 ml-2">{chat.time}</span>
                 </div>
                 <p className={`text-[12px] leading-relaxed mt-0.5 line-clamp-2 ${chat.unread ? 'font-bold text-black' : 'text-[#666666]'}`}>
                   {chat.lastMessage}
                 </p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
