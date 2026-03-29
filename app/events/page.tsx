"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Clock, ExternalLink, ChevronRight, Search, Filter, CheckCircle2, Ticket, Star, Sparkles, Map as MapIcon, Globe, History } from "lucide-react";
import Link from "next/link";

const UPCOMING_EVENTS = [
  {
    id: "e1",
    title: "East Africa Tech Summit 2024",
    organizer: "Uganda Tech Association",
    organizerLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=64&h=64&q=80",
    date: "April 15, 2026",
    time: "9:00 AM – 5:00 PM EAT",
    location: "Kampala Serena Hotel, Uganda",
    isOnline: false,
    attendees: 1240,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&h=400&q=80",
    description: "The premier annual gathering of East Africa's brightest tech minds. Featuring keynotes on AI, fintech, and the future of digital infrastructure across the continent.",
    tags: ["AI", "Fintech", "Innovation"],
    isFree: false,
    price: "UGX 150,000",
  },
  {
    id: "e2",
    title: "Women in Leadership Forum",
    organizer: "MTN Uganda Foundation",
    organizerLogo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=64&h=64&q=80",
    date: "April 22, 2026",
    time: "10:00 AM – 3:00 PM EAT",
    location: "Online (Zoom)",
    isOnline: true,
    attendees: 3800,
    category: "Leadership",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&h=400&q=80",
    description: "Empowering women across East Africa to break barriers in leadership. Featuring top executives, panel discussions, and networking opportunities.",
    tags: ["Women", "Leadership", "Networking"],
    isFree: true,
    price: "Free",
  },
  {
    id: "e3",
    title: "Nairobi Startup Pitch Night",
    organizer: "Savannah Fund",
    organizerLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=64&h=64&q=80",
    date: "May 3, 2026",
    time: "6:00 PM – 9:00 PM EAT",
    location: "iHub, Nairobi, Kenya",
    isOnline: false,
    attendees: 420,
    category: "Startups",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&h=400&q=80",
    description: "Watch 10 early-stage African startups pitch to top investors live. Networking dinner follows the event. A key night for the East African startup ecosystem.",
    tags: ["Startups", "Investment", "Pitching"],
    isFree: false,
    price: "KES 3,000",
  }
];

const PAST_EVENTS = [
  {
    id: "pe1",
    title: "Cybersecurity Summit 2023",
    organizer: "Centenary Bank",
    organizerLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=64&h=64&q=80",
    date: "December 12, 2025",
    time: "9:00 AM – 2:00 PM EAT",
    location: "Online",
    isOnline: true,
    attendees: 5200,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&h=400&q=80",
    description: "A comprehensive look into the evolving threat landscape in African financial institutions.",
    tags: ["Security", "Finance", "Webinar"],
    isFree: true,
    price: "Attended",
  }
];

const CATEGORIES = ["All", "Technology", "Leadership", "Startups", "Marketing", "Healthcare", "Finance"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const currentList = activeTab === "upcoming" ? UPCOMING_EVENTS : PAST_EVENTS;

  const filteredEvents = currentList.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegister = (id: string) => {
    if (registeredIds.includes(id)) {
       setRegisteredIds(registeredIds.filter(rid => rid !== id));
    } else {
       setRegisteredIds([...registeredIds, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-[#1B5E20]/5 text-[#1B5E20] w-fit rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#1B5E20]/10">
              <Sparkles className="w-3 h-3" /> professional community
           </div>
           <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
              Explore <span className="text-[#1B5E20]">Events</span>
           </h1>
           <div className="flex gap-6 mt-8">
              <button 
                onClick={() => setActiveTab("upcoming")}
                className={`flex items-center gap-2 pb-3 text-sm font-black border-b-2 transition-all ${activeTab === "upcoming" ? "border-[#1B5E20] text-[#1B5E20]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
              >
                 <Calendar className="w-4 h-4" /> Upcoming
              </button>
              <button 
                onClick={() => setActiveTab("past")}
                className={`flex items-center gap-2 pb-3 text-sm font-black border-b-2 transition-all ${activeTab === "past" ? "border-[#1B5E20] text-[#1B5E20]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
              >
                 <History className="w-4 h-4" /> Past Events
              </button>
           </div>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1B5E20] text-white font-black text-sm hover:scale-105 transition-all shadow-2xl shadow-green-900/20 tracking-wider">
           <Ticket className="w-5 h-5" /> Host an Event
        </button>
      </div>

      {/* Search & Navigation */}
      <div className="bg-white rounded-[2.5rem] border border-[#e0e0e0] p-4 flex flex-col md:flex-row items-center gap-4 shadow-xl shadow-slate-200/50 mb-16 relative z-10">
         <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#1B5E20] transition-colors" />
            <input 
              type="text" 
              placeholder="Search summits, locations, or organizers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-[2rem] border-none bg-slate-50 text-sm font-bold text-slate-800 focus:ring-4 focus:ring-[#1B5E20]/10 outline-none transition-all"
            />
         </div>
         <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide px-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#1B5E20] text-white shadow-lg shadow-green-900/20' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Featured Spotight - First filtered item for Upcoming only */}
         {filteredEvents.length > 0 && activeCategory === "All" && activeTab === "upcoming" && (
           <div className="lg:col-span-12">
              <div className="group relative rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-100 bg-white">
                 <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-[480px] overflow-hidden">
                       <img src={filteredEvents[0].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt="" />
                       <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                       <div className="absolute top-8 left-8 flex gap-3">
                          <span className="bg-yellow-400 text-slate-900 font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-xl">
                            <Star className="w-3 h-3 fill-current" /> Spotlight
                          </span>
                       </div>
                    </div>
                    <div className="p-12 flex flex-col justify-center space-y-8 bg-slate-50/20">
                       <div>
                          <p className="text-[#1B5E20] font-black text-[11px] uppercase tracking-[0.3em] mb-3">{filteredEvents[0].category}</p>
                          <h2 className="text-4xl font-black text-slate-800 tracking-tighter leading-tight mb-4">{filteredEvents[0].title}</h2>
                          <p className="text-slate-500 font-medium leading-relaxed italic">{filteredEvents[0].description}</p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-6">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-[#1B5E20]" />
                             </div>
                             <div>
                                <p className="text-[10px] font-black uppercase text-slate-400">Date</p>
                                <p className="text-xs font-bold text-slate-800">{filteredEvents[0].date}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                                <MapIcon className="w-5 h-5 text-[#1B5E20]" />
                             </div>
                             <div>
                                <p className="text-[10px] font-black uppercase text-slate-400">Location</p>
                                <p className="text-xs font-bold text-slate-800 truncate max-w-[140px]">{filteredEvents[0].location}</p>
                             </div>
                          </div>
                       </div>

                       <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <img src={filteredEvents[0].organizerLogo} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                             <p className="text-xs font-bold text-slate-600">Hosted by <span className="text-slate-800">{filteredEvents[0].organizer}</span></p>
                          </div>
                          <button 
                            onClick={() => handleRegister(filteredEvents[0].id)}
                            className={`px-10 py-3 rounded-full font-black text-sm transition-all tracking-widest ${registeredIds.includes(filteredEvents[0].id) ? 'bg-green-600 text-white shadow-green-100' : 'bg-[#1B5E20] text-white hover:bg-[#004182] hover:scale-105 shadow-green-900/20'}`}
                          >
                             {registeredIds.includes(filteredEvents[0].id) ? "Registered ✨" : "Secure Ticket"}
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
         )}

         {/* Grid of Results */}
         <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
            {(activeTab === "upcoming" && activeCategory === "All" ? filteredEvents.slice(1) : filteredEvents).map(event => (
              <div key={event.id} className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:border-[#1B5E20]/20 transition-all duration-500 flex flex-col">
                 <div className="relative h-48 overflow-hidden">
                    <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                       <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${event.isOnline ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-slate-800 shadow-lg'}`}>
                          {event.isOnline ? '🌐 virtual' : '📍 In-Person'}
                       </span>
                    </div>
                 </div>
                 
                 <div className="p-8 flex-1 flex flex-col">
                    <div className="flex-1 space-y-4">
                       <div className="flex items-center justify-between">
                          <p className="text-[10px] font-black text-[#1B5E20] uppercase tracking-widest">{event.category}</p>
                          <p className="text-[10px] font-black text-slate-400 italic">{event.attendees.toLocaleString()} attending</p>
                       </div>
                       <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-[#1B5E20] transition-colors">{event.title}</h3>
                       <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                             <Calendar className="w-3.5 h-3.5 text-[#1B5E20]" /> {event.date}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                             <MapPin className="w-3.5 h-3.5 text-[#1B5E20]" /> {event.location}
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                       <span className="text-sm font-black text-slate-800">{event.price}</span>
                       {activeTab === "upcoming" ? (
                         <button 
                           onClick={() => handleRegister(event.id)}
                           className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${registeredIds.includes(event.id) ? 'bg-green-100 text-green-700' : 'bg-[#1B5E20] text-white hover:bg-[#004182]'}`}
                         >
                            {registeredIds.includes(event.id) ? 'Reserved' : 'Register'}
                         </button>
                       ) : (
                         <button className="px-6 py-2 rounded-full bg-slate-100 text-[#666666] font-black text-[10px] uppercase tracking-widest cursor-default">
                            Watched
                         </button>
                       )}
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
