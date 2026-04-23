"use client";

import { useState } from "react";
import { ChevronRight, CheckCircle2, XCircle, Loader2, Link2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/components/providers/user-provider";

/**
 * Custom GitLab Icon SVG for professional branding.
 */
const GitlabIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.65 14.39L20.31 7.24C20.21 6.94 19.92 6.74 19.61 6.74H19.59C19.28 6.74 18.99 6.94 18.89 7.24L16.55 14.39H7.45L5.11 7.24C5.01 6.94 4.72 6.74 4.41 6.74H4.39C4.08 6.74 3.79 6.94 3.69 7.24L1.35 14.39C1.26 14.66 1.34 14.97 1.56 15.16L11.56 22.43C11.69 22.52 11.84 22.57 12 22.57C12.16 22.57 12.31 22.52 12.44 22.43L22.44 15.16C22.66 14.97 22.74 14.66 22.65 14.39Z" />
  </svg>
);

/**
 * Professional GitLab Connection section.
 * Manages the link between the Connect+ profile and professional repositories.
 */
export function GitLabConnectionSection() {
  const { user, refreshUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Type safe access to gitlabUsername
  const [gitlabUsername, setGitlabUsername] = useState(user?.gitlabUsername || "");

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gitlabUsername }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to link GitLab account");
      }

      await refreshUser();
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isConnected = !!user?.gitlabUsername;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 group cursor-pointer flex items-center justify-between ${
          isConnected 
            ? "bg-orange-50/30 dark:bg-orange-950/10 border-orange-100 dark:border-orange-900/30 hover:shadow-2xl hover:shadow-orange-100 dark:hover:shadow-orange-900/20" 
            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:shadow-2xl"
        }`}>
          <div className="flex items-center gap-5">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              isConnected 
                ? "bg-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/20" 
                : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-200"
            }`}>
              <GitlabIcon size={28} />
            </div>
            <div className="space-y-1">
              <h4 className={`text-lg font-black tracking-tight transition-colors ${
                isConnected ? "text-orange-900 dark:text-orange-200" : "text-slate-800 dark:text-slate-200 group-hover:text-orange-600"
              }`}>
                GitLab Connection
              </h4>
              <p className={`text-xs font-medium italic opacity-80 ${
                isConnected ? "text-orange-700/60 dark:text-orange-400/60" : "text-slate-500 dark:text-slate-400"
              }`}>
                {isConnected ? `Linked to @${user.gitlabUsername}` : "Manage your linked professional GitLab repositories"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isConnected && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-200 dark:border-orange-800">
                <CheckCircle2 size={12} /> Connected
              </span>
            )}
            <button 
              aria-label="Manage GitLab Connection"
              className={`p-2.5 rounded-full border transition-all ${
              isConnected 
                ? "border-orange-200 text-orange-400 group-hover:bg-orange-500 group-hover:text-white" 
                : "border-slate-100 text-slate-400 group-hover:text-orange-500 group-hover:bg-orange-50"
            }`}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-orange-600" />
        
        <DialogHeader className="pt-6">
          <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <GitlabIcon className="text-orange-500" /> Professional Source Control
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium">
            Link your GitLab account to showcase your contributions and technical projects on your professional identity.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConnect} className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              GitLab Username
            </label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-orange-500 transition-colors">@</span>
              <input
                type="text"
                value={gitlabUsername}
                onChange={(e) => setGitlabUsername(e.target.value)}
                className="w-full pl-10 pr-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 transition-all font-bold text-slate-700 dark:text-slate-200"
                placeholder="marvin_muwereza"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex gap-3">
             <Link2 className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
             <p className="text-[11px] font-medium text-blue-700 dark:text-blue-300 leading-relaxed">
               By connecting, you allow Connect+ to display your public profile and contribution graph to your professional network.
             </p>
          </div>

          {error && (
            <p className="text-sm font-bold text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-2">
              <XCircle size={16} /> {error}
            </p>
          )}

          <DialogFooter className="pt-2 gap-3 sm:gap-0">
            {isConnected && (
              <button
                type="button"
                onClick={async () => {
                  setGitlabUsername("");
                  // Logic to clear the username in the backend would go here
                }}
                className="px-6 py-3.5 text-xs font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                Disconnect
              </button>
            )}
            <div className="flex-1" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-orange-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isConnected ? "Update Link" : "Connect Account"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
