import Link from "next/link";
import { JungleCard } from "@/components/jungle-card";
import { JungleHeader } from "@/components/jungle-header";
import { JungleFooter } from "@/components/jungle-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-jungle-gradient dark:bg-jungle-night text-slate-50">
      <JungleHeader />
      <section className="relative overflow-hidden parallax" style={{ backgroundImage: "url('/assets/jungle-bg.svg')" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center justify-between gap-6">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-adventure tracking-wide">
                Embark on a jungle quest for medical wisdom!
              </h1>
              <p className="text-lg text-emerald-100">
                Explore trusted medical knowledge with a multimodal RAG assistant that blends text and imagery for deeper clarity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/query">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Begin the Quest
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button size="lg" variant="outline" className="border-emerald-200 text-emerald-50">
                    Upload Scrolls
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
              <ThemeToggle />
              <JungleCard className="animate-float">
                <p className="text-emerald-100">&ldquo;Find answers in the canopy of evidence.&rdquo;</p>
              </JungleCard>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Multimodal knowledge grounding",
            "Hybrid retrieval + citations",
            "Agentic query refinement"
          ].map((item) => (
            <JungleCard key={item} className="p-6">
              <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-100">{item}</h3>
              <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70">
                Built for clarity, speed, and exploration.
              </p>
            </JungleCard>
          ))}
        </div>
      </section>
      <JungleFooter />
    </main>
  );
}
