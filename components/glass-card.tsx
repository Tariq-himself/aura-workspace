import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-6 backdrop-blur-md transition-colors hover:bg-[rgba(255,255,255,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
