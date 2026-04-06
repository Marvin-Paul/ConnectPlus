"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "../providers/user-provider";
import { Sparkles, X, ChevronRight, ChevronLeft, Lightbulb, Zap, Rocket } from "lucide-react";

interface GuideStep {
  id: string;
  targetId: string;
  title: string;
  content: string;
  position: "bottom" | "top" | "left" | "right";
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: "welcome",
    targetId: "global-search",
    title: "Welcome to Connect+ Elite",
    content: "Greetings, professional. I am your Pulse AI Assistant. Let's optimize your presence across the alliance.",
    position: "bottom"
  },
  {
    id: "search",
    targetId: "global-search",
    title: "Global Intelligence Search",
    content: "Access the entire professional universe. Find elite talent, industry tech, and regional opportunities with a single command.",
    position: "bottom"
  },
  {
    id: "post",
    targetId: "engagement-node",
    title: "Engagement Node",
    content: "This is your broadcast center. Share industry-shifting articles or media-rich updates to scale your professional aura.",
    position: "top"
  },
  {
    id: "identity",
    targetId: "identity-card",
    title: "Professional Persona",
    content: "Your digital identity. Ensure your data reflects your elite achievements for the best networking matches.",
    position: "right"
  }
];

export function PulseGuide() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Hide on Auth/Onboarding pages
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname?.startsWith("/onboarding");
  if (isAuthPage) return null;

  // Show a "New feature" notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('pulse_guide_seen')) {
        setShowNotification(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const updateTargetRect = useCallback(() => {
    if (currentStepIndex >= 0) {
      const step = GUIDE_STEPS[currentStepIndex];
      const element = document.getElementById(step.targetId);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStepIndex]);

  useEffect(() => {
    if (isActive) {
      updateTargetRect();
      window.addEventListener('resize', updateTargetRect);
      window.addEventListener('scroll', updateTargetRect);
    }
    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect);
    };
  }, [isActive, updateTargetRect]);

  const startGuide = () => {
    setIsActive(true);
    setCurrentStepIndex(0);
    setShowNotification(false);
    localStorage.setItem('pulse_guide_seen', 'true');
  };

  const nextStep = () => {
    if (currentStepIndex < GUIDE_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsActive(false);
      setCurrentStepIndex(-1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const closeGuide = () => {
    setIsActive(false);
    setCurrentStepIndex(-1);
  };

  if (!isActive && !showNotification) {
     return (
        <button 
           onClick={startGuide}
           aria-label="Start AI Guide"
           className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex items-center justify-center text-white z-[300] hover:scale-110 active:scale-95 transition-all group overflow-hidden border border-slate-700"
        >
           <Zap className="w-6 h-6 group-hover:text-accent transition-colors" />
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
     );
  }

  if (showNotification && !isActive) {
    return (
        <div className="fixed bottom-10 right-10 z-[300] animate-in slide-in-from-bottom-10 fade-in duration-700">
           <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-slate-100 flex items-center gap-6 max-w-[400px]">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                 <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="flex-1">
                 <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Pulse AI Guide</h4>
                 <p className="text-[11px] text-slate-500 font-medium italic mt-2 leading-relaxed">System scan complete. Optimization nodes discovered. Run tour?</p>
              </div>
              <div className="flex flex-col gap-2">
                 <button onClick={startGuide} className="px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors">Launch</button>
                 <button onClick={() => setShowNotification(false)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center hover:text-red-500 transition-colors">Dismiss</button>
              </div>
           </div>
        </div>
    );
  }

  const currentStep = GUIDE_STEPS[currentStepIndex];

  // Dynamic values for the spotlight and tooltip
  const spotlightStyle = isActive && targetRect ? {
    '--mask-w': `${targetRect.width/1.5 + 40}px`,
    '--mask-h': `${targetRect.height/1.5 + 40}px`,
    '--mask-x': `${targetRect.left + targetRect.width/2}px`,
    '--mask-y': `${targetRect.top + targetRect.height/2}px`,
  } : {};

  const tooltipStyle = isActive && targetRect ? {
    '--tip-x': `${targetRect.left + targetRect.width / 2}px`,
    '--tip-y': currentStep.position === 'bottom' ? `${targetRect.bottom + 20}px` : `${targetRect.top - 20}px`,
    '--tip-transform': `translateX(-50%) ${currentStep.position === 'top' ? 'translateY(-100%)' : ''}`,
  } : {};

  return (
    <div className="fixed inset-0 z-[400] pointer-events-none overflow-hidden">
       {/* Use a style block to avoid direct inline style attribute warnings for highly dynamic values */}
       <style>{`
          .pulse-spotlight {
            mask-image: radial-gradient(ellipse var(--mask-w) var(--mask-h) at var(--mask-x) var(--mask-y), transparent 100%, black 100%);
            -webkit-mask-image: radial-gradient(ellipse var(--mask-w) var(--mask-h) at var(--mask-x) var(--mask-y), transparent 100%, black 100%);
          }
          .pulse-tooltip {
            left: var(--tip-x);
            top: var(--tip-y);
            transform: var(--tip-transform);
          }
       `}</style>

       {/* Background Dimmer with Highlight Hole */}
       {isActive && targetRect && (
         <div 
           className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] pointer-events-auto transition-all duration-700 animate-in fade-in pulse-spotlight"
           style={spotlightStyle as React.CSSProperties}
         >
             <div onClick={closeGuide} className="absolute inset-0" />
         </div>
       )}

       {/* Guide Tooltip */}
       {isActive && targetRect && (
          <div 
            className="absolute z-[500] pointer-events-auto transition-all duration-500 animate-in zoom-in-95 fade-in ease-out pulse-tooltip"
            style={tooltipStyle as React.CSSProperties}
          >
             <div className="bg-white p-10 rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,0.3)] border border-slate-100 w-[420px] relative">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                         <Rocket className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] opacity-60">Step {currentStepIndex + 1} of {GUIDE_STEPS.length}</span>
                   </div>
                   <button onClick={closeGuide} aria-label="Close guide" className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-5 h-5 text-slate-300 hover:text-red-500" /></button>
                </div>

                <h3 className="text-3xl font-black text-slate-800 tracking-tighter leading-none mb-4 italic">{currentStep.title}</h3>
                <p className="text-[14px] text-slate-500 font-medium italic leading-relaxed mb-10 opacity-80">{currentStep.content}</p>

                <div className="flex items-center justify-between mt-auto">
                   <div className="flex gap-2">
                      {GUIDE_STEPS.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentStepIndex ? 'w-8 bg-slate-900' : 'w-2 bg-slate-100'}`} />
                      ))}
                   </div>
                   <div className="flex gap-4">
                      {currentStepIndex > 0 && (
                        <button 
                          onClick={prevStep}
                          aria-label="Previous step"
                          className="p-4 rounded-full border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all active:scale-95"
                        >
                           <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}
                      <button 
                         onClick={nextStep}
                         aria-label="Next step"
                         className="flex items-center gap-4 px-10 py-4 rounded-full bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-2xl shadow-slate-900/20"
                      >
                         {currentStepIndex === GUIDE_STEPS.length - 1 ? "Finish Sync" : "Deploy Insight"}
                         <ChevronRight className="w-5 h-5" />
                      </button>
                   </div>
                </div>

                {/* Aesthetic Backdrop Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px] -z-10" />
             </div>
          </div>
       )}
    </div>
  );
}
