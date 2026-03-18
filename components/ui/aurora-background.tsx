"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn("relative flex flex-col transition-bg", className)}
      {...props}
    >
      {/* Aurora layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            /*
             * Koenig aurora — tuned for light #E8F4FA background:
             *  • stripe layer uses the bg colour itself so gaps are invisible
             *  • aurora uses Koenig blue → cyan → accent palette
             *  • no `invert` filter (that's for dark-mode)
             *  • mix-blend-multiply on ::after blends into the light bg naturally
             *  • opacity 0.55 — visible but not overpowering on a pastel bg
             */
            `[--stripe:repeating-linear-gradient(100deg,#E8F4FA_0%,#E8F4FA_7%,transparent_10%,transparent_12%,#E8F4FA_16%)]
            [--aurora:repeating-linear-gradient(100deg,#0694d1_10%,#38bdf8_16%,#00b4d8_22%,#4DBFEF_28%,#076d9d_34%,#0694d1_40%)]
            [background-image:var(--stripe),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[14px]
            after:content-[""] after:absolute after:inset-0
            after:[background-image:var(--stripe),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-multiply
            pointer-events-none
            absolute -inset-[10px] opacity-55 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_50%_0%,black_20%,transparent_72%)]`
          )}
        />
      </div>
      {children}
    </div>
  );
};
