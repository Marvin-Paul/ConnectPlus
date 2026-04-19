"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Upload, 
  ShieldCheck, 
  Briefcase, 
  User, 
  Globe,
  Loader2,
  Zap
} from "lucide-react";
import { useUser } from "../providers/user-provider";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface EasyApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    title: string;
    company: string;
    logo: string;
  };
}

type Step = 'contact' | 'resume' | 'screening' | 'review' | 'success';

export function EasyApplyModal({ isOpen, onClose, job }: EasyApplyModalProps) {
  const { user } = useUser();
  const [step, setStep] = useState<Step>('contact');
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<string | null>(null);
  
  // Mock Screening Questions
  const [screeningAnswers, setScreeningAnswers] = useState({
    visa: '',
    experience: '',
    startDate: ''
  });

  // Reset step on open
  useEffect(() => {
    if (isOpen) setStep('contact');
  }, [isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileSnapshot: user,
          screeningAnswers,
          resumeUrl: resume || 'default-resume.pdf'
        })
      });

      if (response.ok) {
        setStep('success');
      } else {
        const error = await response.json();
        alert(error.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'contact':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-[13px] text-blue-800 font-medium leading-relaxed">
                Connect+ verified: We've pre-filled your application using your professional profile. Please ensure your contact details are current.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                  <div className="h-11 px-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center text-slate-900 font-semibold">{user?.firstName}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                  <div className="h-11 px-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center text-slate-900 font-semibold">{user?.lastName}</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="h-11 px-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center text-slate-900 font-semibold">{user?.email}</div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Professional Headline</label>
                <div className="h-11 px-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center text-slate-400 font-medium truncate">{user?.headline || "Add headline across profile"}</div>
              </div>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
             <div className="space-y-2">
                <h3 className="text-[15px] font-bold text-slate-900">Your professional resume</h3>
                <p className="text-[13px] text-slate-500 font-medium">Employers use resumes to gauge technical depth beyond profile summaries.</p>
             </div>

             <div className="p-8 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50 flex flex-col items-center gap-4 text-center group hover:border-[#1B5E20]/20 transition-all cursor-pointer" onClick={() => setResume('latest-cv-2026.pdf')}>
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                   <Upload className="w-6 h-6 text-[#1B5E20]" />
                </div>
                <div>
                   <p className="text-[14px] font-bold text-slate-900">Upload Resume</p>
                   <p className="text-[12px] text-slate-400 font-medium mt-1">PDF, DOCX up to 10MB</p>
                </div>
             </div>

             <div className="p-5 rounded-2xl border border-[#1B5E20]/10 bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                      <FileText className="w-5 h-5" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-slate-900">latest-cv-2026.pdf</span>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Previously used on MTN application</span>
                   </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                   <CheckCircle2 className="w-4 h-4" />
                </div>
             </div>
          </div>
        );

      case 'screening':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
             <div className="space-y-6">
                <div className="space-y-3">
                   <p className="text-[14px] font-bold text-slate-800">Do you require visa sponsorship to work in Uganda?</p>
                   <div className="flex gap-3">
                      {['Yes', 'No'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setScreeningAnswers(p => ({...p, visa: opt}))}
                          className={`flex-1 py-3 rounded-xl border font-bold text-[13px] transition-all ${screeningAnswers.visa === opt ? 'bg-[#1B5E20] text-white border-transparent shadow-lg' : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'}`}
                        >
                          {opt}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-3">
                   <p className="text-[14px] font-bold text-slate-800">How many years of experience do you have with Next.js?</p>
                   <input 
                     type="number"
                     placeholder="Years of experience"
                     className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
                     onChange={(e) => setScreeningAnswers(p => ({...p, experience: e.target.value}))}
                   />
                </div>
             </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
             <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <User className="w-3.5 h-3.5" /> Identity Snapshot
                </h4>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300">
                      <User className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[15px] font-bold text-slate-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-[12px] text-slate-500 font-medium truncate max-w-[200px]">{user?.email}</p>
                   </div>
                </div>
             </div>

             <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <CheckCircle2 className="w-3.5 h-3.5" /> Qualifications
                </h4>
                <div className="space-y-2">
                   <p className="text-[12px] text-slate-600 font-semibold flex items-center justify-between">
                      Next.js Experience: <span className="text-slate-900">{screeningAnswers.experience} Years</span>
                   </p>
                   <p className="text-[12px] text-slate-600 font-semibold flex items-center justify-between">
                      Visa Required: <span className="text-slate-900">{screeningAnswers.visa}</span>
                   </p>
                </div>
             </div>

             <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                <p className="text-[10px] text-blue-800 font-bold uppercase tracking-wider leading-relaxed">
                   By submitting, you agree to share your Connect+ profile and resume with {job.company}.
                </p>
             </div>
          </div>
        );

      case 'success':
        return (
          <div className="py-12 flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-500">
             <div className="w-24 h-24 rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-100/50">
                <CheckCircle2 className="w-12 h-12" />
             </div>
             <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Application Sent!</h2>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                   Your Fast Apply payload has been successfully routed to the {job.company} recruitment system.
                </p>
             </div>
             <div className="w-full h-px bg-slate-100" />
             <div className="flex flex-col gap-3 w-full">
                <button 
                   onClick={onClose}
                   className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all"
                >
                   Close Market Portal
                </button>
             </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.1)]">
        <DialogHeader className="p-8 pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white p-2">
                <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
             </div>
             <div>
                <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">{job.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.company}</span>
                   <span className="w-1 h-1 bg-slate-200 rounded-full" />
                   <span className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-widest flex items-center gap-1"><Zap className="w-3 h-3 fill-current" /> Fast Apply</span>
                </div>
             </div>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Close fast apply modal"
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="p-8">
           {renderStepContent()}
        </div>

        {step !== 'success' && (
          <div className="p-8 pt-0 flex gap-4">
            {step !== 'contact' && (
              <button 
                aria-label="Previous step"
                onClick={() => {
                  if (step === 'resume') setStep('contact');
                  if (step === 'screening') setStep('resume');
                  if (step === 'review') setStep('screening');
                }}
                className="w-14 h-14 rounded-xl border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            
            <button 
              disabled={loading}
              onClick={() => {
                if (step === 'contact') setStep('resume');
                else if (step === 'resume') setStep('screening');
                else if (step === 'screening') setStep('review');
                else if (step === 'review') handleSubmit();
              }}
              className={`flex-1 h-14 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${loading ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20'}`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : step === 'review' ? (
                <>Submit Fast Application <ChevronRight className="w-4 h-4" /></>
              ) : (
                <>Continue to {step === 'contact' ? 'Resume' : step === 'resume' ? 'Screening' : 'Review'} <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}

        <div className="px-8 pb-8 flex items-center justify-center gap-6 opacity-40">
           {['contact', 'resume', 'screening', 'review'].map((s, i) => (
             <div key={s} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full border-2 transition-all ${step === s ? 'bg-[#1B5E20] border-[#1B5E20] scale-125' : 'border-slate-300'} ${(i < ['contact', 'resume', 'screening', 'review'].indexOf(step)) ? 'bg-emerald-500 border-emerald-500' : ''}`} />
             </div>
           ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
