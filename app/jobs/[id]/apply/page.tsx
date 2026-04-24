"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  X, 
  CheckCircle2, 
  ChevronDown, 
  Upload, 
  Loader2,
  Check,
  Zap,
  Globe,
  Info
} from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { toast } from "sonner";
import Link from "next/link";

export default function FastApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [resume, setResume] = useState<{ name: string; size: string; date: string } | null>({
    name: "marvin.pdf",
    size: "234.7 kB",
    date: "3/24/2026"
  });
  
  const [formData, setFormData] = useState({
    email: "",
    countryCode: "Uganda (+256)",
    phone: "0781384004",
    followCompany: true
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  useEffect(() => {
    const mockJobs: any = {
      "j1": { id: "j1", title: "Senior AI Solutions Engineer", company: "Sunda International", logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=128&h=128", match: "98% Match" },
      "j2": { id: "j2", title: "Lead Frontend Architect", company: "SafeBoda", logo: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=128&h=128", match: "92% Match" },
      "default": { id: id, title: "Software Engineer", company: "Sunda International", logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128&h=128", match: "85% Match" }
    };
    
    const foundJob = mockJobs[id as string] || mockJobs.default;
    setJob(foundJob);
    setLoading(false);
  }, [id]);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    
    try {
      const res = await fetch(`/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileSnapshot: user,
          screeningAnswers: {
            phone: formData.phone,
            countryCode: formData.countryCode,
            followCompany: formData.followCompany
          },
          resumeUrl: resume ? resume.name : null
        })
      });

      if (res.ok) {
        toast.success("Application Sent!");
        router.push('/jobs');
      } else {
        const error = await res.json();
        toast.error(error.message || "Submission failed");
      }
    } catch (error) {
      toast.error("Network Error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A66C2]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0A66C2]/10">
      {/* High-Fidelity Glassmorphism Header */}
      <header className="sticky top-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-100/50 px-6 h-20 flex items-center shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-2xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => router.back()}
              aria-label="Go back"
              className="group p-2.5 -ml-2 rounded-2xl bg-slate-50/50 hover:bg-slate-100 transition-all active:scale-90 border border-slate-100 shadow-sm"
            >
              <X className="w-5 h-5 text-slate-500 group-hover:text-slate-900 transition-colors" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm hidden sm:block">
                 <img src={job?.logo} alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-[17px] font-black text-slate-900 tracking-tight leading-none">
                  Apply to {job?.company}
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rapid Routing Active</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Match Score</span>
                <span className="text-[14px] font-bold text-emerald-600">{job?.match || "98%"}</span>
             </div>
             <div className="w-10 h-10 rounded-full border-2 border-emerald-100 flex items-center justify-center bg-emerald-50 text-emerald-600">
                <Zap className="w-5 h-5 fill-current" />
             </div>
          </div>
        </div>
        
        {/* Progress Line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-50">
           <div className="h-full bg-emerald-500 w-[75%] shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto pb-40">
        <main className="p-6 md:p-10 space-y-12">
          {/* Profile Header */}
          <section className="flex items-center gap-5 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-0.5 border-2 border-emerald-500">
                <img 
                  src={user?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} 
                  alt={user?.name} 
                  className="w-full h-full rounded-full object-cover border-2 border-white" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-[20px] font-bold text-slate-900 leading-none">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-[14px] text-slate-500 font-medium">—</p>
            </div>
          </section>

          {/* Form Section */}
          <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-3">
              <label htmlFor="email-select" className="text-[14px] font-bold text-slate-600">
                Email*
              </label>
              <div className="relative">
                <select 
                  id="email-select"
                  className="w-full h-10 bg-transparent border-b border-slate-300 text-[16px] font-medium appearance-none focus:border-[#0A66C2] focus:border-b-2 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                >
                  <option value={user?.email}>{user?.email}</option>
                  <option value="alternate@gmail.com">alternate@gmail.com</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="country-code-select" className="text-[14px] font-bold text-slate-600">
                Phone country code*
              </label>
              <div className="relative">
                <select 
                  id="country-code-select"
                  className="w-full h-10 bg-transparent border-b border-slate-300 text-[16px] font-medium appearance-none focus:border-[#0A66C2] focus:border-b-2 transition-all outline-none"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                >
                  <option value="Uganda (+256)">Uganda (+256)</option>
                  <option value="Kenya (+254)">Kenya (+254)</option>
                  <option value="United States (+1)">United States (+1)</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[14px] font-bold text-slate-600">
                Phone*
              </label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full h-10 bg-transparent border-b border-slate-300 text-[16px] font-medium focus:border-[#0A66C2] focus:border-b-2 transition-all outline-none"
                placeholder="0781384004"
              />
            </div>
          </section>

          {/* Resume Section */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className="space-y-1">
              <h3 className="text-[20px] font-bold text-slate-900 tracking-tight">Resume</h3>
              <p className="text-[14px] text-slate-500 font-medium">Be sure to include an updated resume</p>
            </div>

            {resume ? (
              <div className="p-1 rounded-2xl border-2 border-[#0A66C2] bg-white flex items-center group transition-all shadow-sm">
                <div className="w-16 h-16 bg-[#D32F2F] flex flex-col items-center justify-center text-white shrink-0 rounded-l-xl">
                   <span className="text-[10px] font-black tracking-tighter uppercase leading-none mb-1">PDF</span>
                   <div className="w-6 h-px bg-white/30" />
                </div>
                <div className="flex-1 px-4 py-3 min-w-0">
                   <p className="text-[15px] font-bold text-slate-900 truncate">{resume.name}</p>
                   <p className="text-[12px] text-slate-400 font-medium mt-0.5">{resume.size} • Last used on {resume.date}</p>
                </div>
                <button 
                  onClick={() => setResume(null)}
                  className="px-6 h-full text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest hover:bg-slate-50 transition-colors border-l border-slate-100 h-[64px]"
                >
                  UNSELECT
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setResume({ name: "uploaded_resume.pdf", size: "1.2 MB", date: new Date().toLocaleDateString() })}
                className="w-full py-10 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center gap-3 hover:border-[#0A66C2]/40 hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#0A66C2]" />
                </div>
                <p className="text-[14px] font-bold text-slate-600">Upload resume</p>
              </button>
            )}
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">DOC, DOCX, AND PDF (5.2 MB)</p>
          </section>

          {/* Follow Section */}
          <section className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
             <button 
               onClick={() => setFormData({...formData, followCompany: !formData.followCompany})}
               aria-label={formData.followCompany ? "Unfollow company" : "Follow company"}
               className={`w-7 h-7 rounded-lg border transition-all flex items-center justify-center shrink-0 ${formData.followCompany ? 'bg-[#0073B1] border-transparent' : 'bg-white border-slate-300'}`}
             >
                {formData.followCompany && <Check className="w-4 h-4 text-white stroke-[3px]" />}
             </button>
             <p className="text-[15px] text-slate-700 font-medium leading-tight">
               Follow <span className="font-bold">{job?.company}</span> to stay up to date with their page
             </p>
          </section>

          {/* Legal Footnote */}
          <section className="space-y-6 pt-10 text-slate-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
             <p className="text-[12px] leading-relaxed font-medium">
               We automatically save your answers and resume to make future applications easier, personalize your experience and help improve Connect+. You can turn off saving of your data or adjust your preferences in settings at any time <span className="text-[#0A66C2] font-bold hover:underline cursor-pointer">Application Settings</span>.
             </p>
             
             <div className="flex flex-col gap-4 pt-2">
               <Link href="/learn-more" className="text-[13px] font-bold text-[#0A66C2] hover:underline">Learn more.</Link>
               <Link href="/employment-rights" className="text-[13px] font-bold text-[#0A66C2] hover:underline">Notice of Employment Rights.</Link>
             </div>
          </section>
        </main>
      </div>

      {/* Fixed Footer with Submit */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex justify-end z-[110]">
         <button 
           disabled={submitting}
           onClick={handleSubmit}
           className={`h-12 px-10 rounded-full bg-[#0A66C2] text-white font-bold text-[16px] hover:bg-[#004182] transition-all flex items-center justify-center gap-3 shadow-md active:scale-95 ${submitting ? 'opacity-80' : ''}`}
         >
           {submitting ? (
             <>
               <Loader2 className="w-5 h-5 animate-spin" />
               <span>Sending...</span>
             </>
           ) : (
             <span>Submit</span>
           )}
         </button>
      </footer>
    </div>
  );
}
