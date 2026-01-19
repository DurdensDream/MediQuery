import { cn } from "@/lib/utils";

export function JungleCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("jungle-card", className)}>{children}</div>;
}
