"use client";

import { useState } from "react";
import Image from "next/image";
import { JungleHeader } from "@/components/jungle-header";
import { JungleFooter } from "@/components/jungle-footer";
import { JungleCard } from "@/components/jungle-card";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${apiBase}/api/ingest`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setStatus(data.message ?? "Upload complete.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-jungle-gradient dark:bg-jungle-night text-slate-50">
      <JungleHeader />
      <section className="mx-auto max-w-3xl px-6 py-12">
        <JungleCard className="p-8 text-center">
          <h2 className="text-2xl font-adventure">Upload Scrolls (PDFs)</h2>
          <p className="mt-2 text-emerald-100">Drop medical PDFs to explore the jungle of knowledge.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Image src="/assets/monkey.svg" alt="Monkey icon" width={48} height={48} className="animate-float" />
            <Image src="/assets/tiger.svg" alt="Tiger icon" width={48} height={48} className="animate-float" />
          </div>
          <div className="mt-6">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              aria-label="Upload PDF"
              className="block w-full text-sm text-emerald-100"
            />
          </div>
          <Button className="mt-6" disabled={loading}>
            {loading ? "Exploring..." : "Upload"}
          </Button>
          {status && <p className="mt-4 text-emerald-100">{status}</p>}
        </JungleCard>
      </section>
      <JungleFooter />
    </main>
  );
}
