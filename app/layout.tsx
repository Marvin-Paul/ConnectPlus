import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { TopNav } from "../components/layout/top-nav";
import { MobileBottomNav } from "../components/layout/mobile-bottom-nav";
import { QueryProvider } from "../components/providers/query-provider";
import { UserProvider } from "../components/providers/user-provider";
import { FeedProvider } from "../components/providers/feed-provider";
import { NotificationProvider } from "../components/providers/notification-provider";
import { PulseGuide } from "../components/features/pulse-guide";
import { Inter } from "next/font/google"; 
import { SplashScreen } from "../components/ui/splash-screen";
import { ThemeProvider } from "../components/providers/theme-provider";
import { LanguageProvider } from "../components/providers/language-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Connect Plus | Professional Networking for Africa",
  description: "The premier professional identity, networking, and opportunity platform for the modern African workforce. Build your digital trust.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="antialiased selection:bg-primary/10 selection:text-primary">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <SplashScreen />
            <QueryProvider>
              <UserProvider>
                <FeedProvider>
                  <NotificationProvider>
                    <TopNav />
                    <main className="md:pt-[56px] min-h-screen">
                       {children}
                    </main>
                    <MobileBottomNav />
                    <PulseGuide />
                  </NotificationProvider>
                </FeedProvider>
              </UserProvider>
            </QueryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
