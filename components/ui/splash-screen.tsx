"use client";

import { useEffect, useState } from "react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 700); // Wait for the fade out animation to finish
    }, 800); // Show splash screen for 0.8 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${
        isAnimatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <style jsx>{`
        @keyframes logoScale {
          0% { transform: scale(0.8); opacity: 0; }
          40% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes lineExpand {
          0% { width: 0; }
          100% { width: 100px; }
        }
        @keyframes textSlideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .logo-box {
          animation: logoScale 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .separator {
          animation: lineExpand 1s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards;
          background: hsl(263, 82%, 57%);
          height: 2px;
          margin: 20px 0;
          width: 0;
        }
        .brand-text {
          animation: textSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards;
          opacity: 0;
        }
        .loading-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(to right, hsl(263, 82%, 57%), hsl(77, 100%, 60%));
          animation: progress 2.5s ease-in-out forwards;
          width: 0;
        }
        @keyframes progress {
          0% { width: 0; }
          80% { width: 100%; }
          100% { width: 100%; }
        }
      `}</style>

      <div className="flex flex-col items-center">
        {/* Logo Icon */}
        <div className="logo-box inline-grid h-[80px] w-[80px] place-items-center rounded-2xl bg-primary text-white shadow-[0_20px_50px_rgba(124,58,237,0.3)]">
          <span className="text-4xl font-black leading-none tracking-tighter">c+</span>
        </div>

        {/* Separator Line */}
        <div className="separator" />

        {/* Brand Name */}
        <div className="brand-text text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Connect<span className="text-primary">+</span>
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
            Professional Identity
          </p>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10" />
      
      {/* Loading Progress Bar */}
      <div className="loading-bar" />
    </div>
  );
}
