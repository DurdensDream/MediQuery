"use client";

import { useEffect, useState } from "react";
import { JungleHeader } from "@/components/jungle-header";
import { JungleFooter } from "@/components/jungle-footer";
import { JungleCard } from "@/components/jungle-card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  useEffect(() => {
    fetch(`${apiBase}/api/eval/summary`)
      .then((res) => res.json())
      .then((data) => setMetrics(data.metrics ?? []));
  }, [apiBase]);

  return (
    <main className="min-h-screen bg-jungle-gradient dark:bg-jungle-night text-slate-50">
      <JungleHeader />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <JungleCard className="p-8">
          <h2 className="text-2xl font-adventure mb-4">Evaluation Dashboard</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={metrics}>
              <XAxis dataKey="name" stroke="#d2f7d2" />
              <YAxis stroke="#d2f7d2" />
              <Tooltip />
              <Bar dataKey="value" fill="#45be45" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </JungleCard>
      </section>
      <JungleFooter />
    </main>
  );
}
