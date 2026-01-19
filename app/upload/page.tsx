"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { JungleHeader } from "@/components/jungle-header";
import { JungleFooter } from "@/components/jungle-footer";
import { JungleCard } from "@/components/jungle-card";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const uploadFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${apiBase}/api/ingest`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setStatus(data.message ?? "Upload complete.");
      toast.success("PDF ingested successfully!");
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      setStatus("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await uploadFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) await uploadFile(file);
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

          <div
            className={`mt-6 rounded-xl border-2 border-dashed p-8 transition-colors ${
              dragActive
                ? "border-emerald-400 bg-emerald-500/20"
                : "border-emerald-300/50 hover:border-emerald-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <p className="text-emerald-100">
              {dragActive ? "Drop your PDF here..." : "Drag & drop a PDF or click to browse"}
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              aria-label="Upload PDF"
              className="hidden"
            />
          </div>

          <Button className="mt-6" disabled={loading}>
            {loading ? "Exploring the jungle..." : "Upload"}
          </Button>

          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-200 border-t-transparent" />
              <span className="text-emerald-100">Processing document...</span>
            </div>
          )}

          {status && <p className="mt-4 text-emerald-100">{status}</p>}
        </JungleCard>
      </section>
      <JungleFooter />
    </main>
  );
}
