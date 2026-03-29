import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TopNav } from "../components/layout/top-nav";
import { QueryProvider } from "../components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connect+",
  description: "Professional identity, networking, and opportunity platform.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <TopNav />
          <main className="mx-auto w-full max-w-6xl px-4 py-5">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
