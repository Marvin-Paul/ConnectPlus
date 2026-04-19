"use client";

import * as React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => {
    const indicatorRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (indicatorRef.current) {
        indicatorRef.current.style.transform = `translateX(-${100 - (value || 0)}%)`;
      }
    }, [value]);

    return (
      <div
        ref={ref}
        className={`relative h-4 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}
        {...props}
      >
        <div
          ref={indicatorRef}
          className="h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out"
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
