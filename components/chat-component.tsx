"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { Messages } from "./messages";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { JungleCard } from "./jungle-card";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatComponentProps {
  apiBase?: string;
}

export function ChatComponent({ apiBase = "http://localhost:4000" }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async () => {
    const query = input.trim();
    if (!query) return;

    const userMessage: Message = {
      id: uuid(),
      role: "user",
      content: query,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });

      if (!res.ok) {
        throw new Error("Query failed");
      }

      const data = await res.json();

      const assistantMessage: Message = {
        id: uuid(),
        role: "assistant",
        content: data.answer || "No answer found in the knowledge base.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.disclaimer) {
        toast.warning(data.disclaimer);
      }
    } catch (error) {
      toast.error("Failed to get response. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [input, apiBase]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <JungleCard className="flex h-[600px] flex-col">
      <div className="border-b border-emerald-200/30 px-4 py-3">
        <h2 className="font-adventure text-lg text-emerald-800 dark:text-emerald-100">
          Medical Knowledge Explorer
        </h2>
        <p className="text-xs text-emerald-600/70 dark:text-emerald-300/70">
          Ask questions about symptoms, treatments, and medical conditions
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Messages messages={messages} />
      </div>

      <div className="border-t border-emerald-200/30 p-4">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your medical question..."
            disabled={loading}
            aria-label="Chat input"
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            {loading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </JungleCard>
  );
}
