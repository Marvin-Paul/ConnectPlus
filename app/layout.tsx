import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { TopNav } from "../components/layout/top-nav";
import { MobileBottomNav } from "../components/layout/mobile-bottom-nav";
import { QueryProvider } from "../components/providers/query-provider";
import { UserProvider } from "../components/providers/user-provider";
import { PulseGuide } from "../components/features/pulse-guide";
import { Inter } from "next/font/google"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Connect+ | Professional Networking for Africa",
  description: "The premier professional identity, networking, and opportunity platform for the modern African workforce. Build your digital trust.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-[#F8FAFC] text-slate-900">
        <QueryProvider>
          <UserProvider>
            <TopNav />
            <main className="md:pt-[72px] min-h-screen">
               {children}
            </main>
            <MobileBottomNav />
            <PulseGuide />
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
