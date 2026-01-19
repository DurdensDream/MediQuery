"use client";

import { cn } from "@/lib/utils";
import { Markdown } from "./markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MessageBoxProps {
  message: Message;
}

export function MessageBox({ message }: MessageBoxProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-emerald-600 text-white"
            : "bg-white/90 dark:bg-canopy-500/70 text-emerald-900 dark:text-emerald-50 border border-emerald-200/40"
        )}
      >
        {isUser ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <Markdown content={message.content} />
        )}
        <p
          className={cn(
            "mt-2 text-xs",
            isUser ? "text-emerald-100" : "text-emerald-600/70 dark:text-emerald-300/70"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
