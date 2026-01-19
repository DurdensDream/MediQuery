"use client";

import { useState } from "react";
import Image from "next/image";
import { QueryInput } from "@/components/query-input";
import { ResponseDisplay } from "@/components/response-display";
import { JungleHeader } from "@/components/jungle-header";
import { JungleFooter } from "@/components/jungle-footer";

export default function QueryPage() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const handleSubmit = async (query: string) => {
    setLoading(true);
    const res = await fetch(`${apiBase}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-jungle-gradient dark:bg-jungle-night text-slate-50">
      <JungleHeader />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center gap-3 text-emerald-100">
          <Image src="/assets/parrot.svg" alt="Parrot icon" width={40} height={40} className="animate-float" />
          <p>Ask the canopy. We will return with cited answers and visuals.</p>
        </div>
        <QueryInput onSubmit={handleSubmit} loading={loading} />
        <ResponseDisplay response={response} loading={loading} />
      </section>
      <JungleFooter />
    </main>
  );
}
