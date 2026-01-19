"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { QueryInput } from "@/components/query-input";
import { ResponseDisplay } from "@/components/response-display";
import { ChatComponent } from "@/components/chat-component";
import { JungleHeader } from "@/components/jungle-header";
import { JungleFooter } from "@/components/jungle-footer";
import { Button } from "@/components/ui/button";

type ViewMode = "simple" | "chat";

export default function QueryPage() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("simple");
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const handleSubmit = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResponse(data);
      if (data.disclaimer) {
        toast.warning(data.disclaimer);
      }
      toast.success("Answer retrieved from the jungle!");
    } catch (error) {
      toast.error("Failed to fetch answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-jungle-gradient dark:bg-jungle-night text-slate-50">
      <JungleHeader />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-emerald-100">
            <Image src="/assets/parrot.svg" alt="Parrot icon" width={40} height={40} className="animate-float" />
            <p>Ask the canopy. We will return with cited answers and visuals.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "simple" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("simple")}
            >
              Simple
            </Button>
            <Button
              variant={viewMode === "chat" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("chat")}
            >
              Chat
            </Button>
          </div>
        </div>

        {viewMode === "simple" ? (
          <>
            <QueryInput onSubmit={handleSubmit} loading={loading} />
            <ResponseDisplay response={response} loading={loading} />
          </>
        ) : (
          <ChatComponent apiBase={apiBase} />
        )}
      </section>
      <JungleFooter />
    </main>
  );
}
