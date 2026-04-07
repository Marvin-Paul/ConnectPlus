"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "../providers/user-provider";
import { Sparkles, X, ChevronRight, ChevronLeft, Zap, Rocket } from "lucide-react";

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
  }
];

export function PulseGuide() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Layout refinement: Hide on Auth pages
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname?.startsWith("/onboarding");
  if (isAuthPage) return null;

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
      window.addEventListener('scroll', updateTargetRect, true);
    }
    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect, true);
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
           className="fixed bottom-[72px] right-6 md:bottom-10 md:right-10 w-14 h-14 rounded-full bg-[#1F2937] shadow-premium flex items-center justify-center text-white z-[90] hover:scale-110 active:scale-95 transition-all group overflow-hidden border border-[#374151]"
        >
           <Zap className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
           <div className="absolute inset-0 bg-gradient-to-tr from-[#0A66C2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
     );
  }

  if (showNotification && !isActive) {
    return (
        <div className="fixed bottom-[72px] right-6 md:bottom-10 md:right-10 z-[150] animate-fade-in max-w-[calc(100vw-3rem)]">
           <div className="bg-white p-5 rounded-[24px] shadow-dropdown border border-[#E5E7EB] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center shrink-0">
                 <Sparkles className="w-5 h-5 text-[#0A66C2] animate-pulse" />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                 <h4 className="text-[11px] font-bold text-[#1F2937] uppercase tracking-widest leading-none">AI Insight</h4>
                 <p className="text-[12px] text-[#6B7280] font-medium mt-1.5 leading-tight truncate">System scan complete. Sync nodes?</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                 <button onClick={startGuide} className="px-4 py-1.5 rounded-full bg-[#1F2937] text-white text-[11px] font-bold hover:bg-[#0A66C2] transition-colors">Start</button>
                 <button onClick={() => setShowNotification(false)} className="p-1 rounded-full text-[#9CA3AF] hover:text-[#EF4444] transition-colors"><X className="w-4 h-4" /></button>
              </div>
           </div>
        </div>
    );
  }

  const currentStep = currentStepIndex >= 0 ? GUIDE_STEPS[currentStepIndex] : null;

  return (
    <div className="fixed inset-0 z-[400] pointer-events-none overflow-hidden">
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

       {isActive && targetRect && (
         <div 
           className="absolute inset-0 bg-[#1F2937]/40 backdrop-blur-[2px] pointer-events-auto transition-all duration-700 animate-fade-in pulse-spotlight"
           style={{
             '--mask-w': `${targetRect.width + 24}px`,
             '--mask-h': `${targetRect.height + 24}px`,
             '--mask-x': `${targetRect.left + targetRect.width/2}px`,
             '--mask-y': `${targetRect.top + targetRect.height/2}px`,
           } as React.CSSProperties}
         >
             <div onClick={closeGuide} className="absolute inset-0" />
         </div>
       )}

       {isActive && targetRect && (
          <div 
            className="absolute z-[500] pointer-events-auto transition-all duration-500 animate-fade-in pulse-tooltip max-w-[min(400px,calc(100vw-2rem))]"
            style={{
              '--tip-x': `${targetRect.left + targetRect.width / 2}px`,
              '--tip-y': currentStep.position === 'bottom' ? `${targetRect.bottom + 16}px` : `${targetRect.top - 16}px`,
              '--tip-transform': `translateX(-50%) ${currentStep.position === 'top' ? 'translateY(-100%)' : ''}`,
            } as React.CSSProperties}
          >
             <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-dropdown border border-[#E5E7EB] relative">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                       <Rocket className="w-5 h-5 text-[#0A66C2]" />
                       <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Guide Node {currentStepIndex + 1} / {GUIDE_STEPS.length}</span>
                   </div>
                   <button onClick={closeGuide} aria-label="Close guide" className="p-1.5 hover:bg-[#F3F6F8] rounded-full transition-colors"><X className="w-4 h-4 text-[#9CA3AF]" /></button>
                </div>

                <h3 className="text-[20px] md:text-[24px] font-bold text-[#1F2937] leading-tight mb-3">{currentStep.title}</h3>
                <p className="text-[14px] text-[#6B7280] font-medium leading-relaxed mb-8">{currentStep.content}</p>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-1.5">
                       {GUIDE_STEPS.map((_, i) => (
                         <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentStepIndex ? 'w-6 bg-[#0A66C2]' : 'w-1.5 bg-[#E5E7EB]'}`} />
                       ))}
                    </div>
                    <div className="flex items-center gap-3">
                       {currentStepIndex > 0 && (
                         <button onClick={prevStep} className="p-3 rounded-full border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F6F8] transition-all">
                            <ChevronLeft className="w-4 h-4" />
                         </button>
                       )}
                       <button 
                          onClick={nextStep}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1F2937] text-white font-bold text-[13px] hover:bg-[#0A66C2] transition-all"
                       >
                          {currentStepIndex === GUIDE_STEPS.length - 1 ? "Finish" : "Next"}
                          <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0A66C2]/5 rounded-full blur-[40px] -z-10" />
             </div>
          </div>
       )}
    </div>
  );
}
