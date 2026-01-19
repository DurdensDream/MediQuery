"use client";

import { useEffect, useRef } from "react";
import { MessageBox } from "./message-box";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MessagesProps {
  messages: Message[];
}

export function Messages({ messages }: MessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-emerald-300/60">
        <p>Ask anything about medical topics...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBox key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
