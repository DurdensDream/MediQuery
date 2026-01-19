import Image from "next/image";
import { JungleCard } from "./jungle-card";
import { Markdown } from "./markdown";

type Response = {
  answer?: string;
  citations?: { id: string; snippet: string; source: string; image?: string }[];
  disclaimer?: string;
  refinedQuery?: string;
};

export function ResponseDisplay({ response, loading }: { response: Response | null; loading: boolean }) {
  if (loading) {
    return (
      <JungleCard className="mt-6 p-6">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span className="text-emerald-700 dark:text-emerald-100">Searching the jungle canopy...</span>
        </div>
      </JungleCard>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <JungleCard className="mt-6 p-6">
      <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-100">Answer</h3>

      {response.refinedQuery && (
        <p className="mt-2 text-xs text-emerald-600/70 dark:text-emerald-300/70">
          Refined query: <em>{response.refinedQuery}</em>
        </p>
      )}

      <div className="mt-3">
        <Markdown content={response.answer ?? "No answer found."} />
      </div>

      {response.citations && response.citations.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="font-semibold text-emerald-700 dark:text-emerald-100">Sources</h4>
          {response.citations.map((cite) => (
            <div key={cite.id} className="rounded-xl border border-emerald-200/40 bg-emerald-50/50 dark:bg-emerald-900/20 p-4">
              <p className="text-sm text-emerald-900/80 dark:text-emerald-50/80">{cite.snippet}</p>
              <p className="mt-1 text-xs font-medium text-emerald-700/70 dark:text-emerald-300/70">{cite.source}</p>
              {cite.image && (
                <Image
                  src={cite.image}
                  alt="Medical diagram"
                  width={640}
                  height={360}
                  className="mt-3 w-full rounded-lg"
                  unoptimized
                />
              )}
            </div>
          ))}
        </div>
      )}

      {response.disclaimer && (
        <div className="mt-6 rounded-lg border border-amber-300/50 bg-amber-50/50 dark:bg-amber-900/20 px-4 py-3">
          <p className="text-sm text-amber-700 dark:text-amber-300">⚠️ {response.disclaimer}</p>
        </div>
      )}
    </JungleCard>
  );
}
