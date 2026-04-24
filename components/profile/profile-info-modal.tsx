"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Calendar, Globe, UserCheck } from "lucide-react"

interface ProfileInfoModalProps {
  user: {
    firstName: string
    lastName: string
    username: string
    createdAt?: string | Date
    verified?: boolean
  }
  isOpen: boolean
  onClose: () => void
}

export function ProfileInfoModal({ user, isOpen, onClose }: ProfileInfoModalProps) {
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  }) : "Recent"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">About this profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-slate-500 font-medium">@{user.username}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Joined Connect+</div>
                <div className="text-xs text-slate-500 font-medium">{joinDate}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Identity Verified</div>
                <div className="text-xs text-slate-500 font-medium">This profile has been verified as authentic by Connect+ Security.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Public Visibility</div>
                <div className="text-xs text-slate-500 font-medium">Profile is accessible to all professionals on the platform.</div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={onClose}
            className="w-full rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 font-bold border-none"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
