"use client";

import { useState } from "react";
import { User, ChevronRight, Loader2 } from "lucide-react";
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
 * Professional Profile Information section.
 * Integrates with the backend to update core identity fields.
 */
export function ProfileInfoSection() {
  const { user, refreshUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    headline: user?.headline || "",
    location: user?.location || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update profile");
      }

      await refreshUser();
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group cursor-pointer flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <User size={28} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-800 dark:text-slate-200 tracking-tight group-hover:text-primary transition-colors">
                Profile Information
              </h4>
              <p className="text-xs text-slate-500 font-medium italic opacity-80">
                Name, Headline, and Location settings
              </p>
            </div>
          </div>
          <button 
            aria-label="Edit profile info"
            className="p-2.5 rounded-full border border-slate-100 dark:border-slate-800 text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl bg-white dark:bg-slate-950">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Edit Professional Identity
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium">
            Update your core profile details to maintain a professional digital presence.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700 dark:text-slate-200"
                placeholder="e.g. Marvin"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700 dark:text-slate-200"
                placeholder="e.g. Paul"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Professional Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700 dark:text-slate-200"
              placeholder="e.g. Senior Software Architect"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700 dark:text-slate-200"
              placeholder="e.g. Kampala, Uganda"
            />
          </div>

          {error && (
            <p className="text-sm font-bold text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <DialogFooter className="pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3.5 text-sm font-black text-slate-500 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-primary text-white rounded-2xl font-black text-sm shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
