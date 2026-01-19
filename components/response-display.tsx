import Image from "next/image";
import { JungleCard } from "./jungle-card";

type Response = {
  answer?: string;
  citations?: { id: string; snippet: string; source: string; image?: string }[];
  disclaimer?: string;
};

export function ResponseDisplay({ response, loading }: { response: Response | null; loading: boolean }) {
  if (loading) {
    return null;
  }

  if (!response) {
    return null;
  }

  return (
    <JungleCard className="mt-6 p-6">
      <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-100">Answer</h3>
      <p className="mt-3 text-emerald-900 dark:text-emerald-50">{response.answer}</p>
      {response.citations && response.citations.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-emerald-700 dark:text-emerald-100">Sources</h4>
          {response.citations.map((cite) => (
            <div key={cite.id} className="rounded-xl border border-emerald-200/40 p-4">
              <p className="text-sm text-emerald-900/80 dark:text-emerald-50/80">{cite.snippet}</p>
              <p className="text-xs text-emerald-700/70">{cite.source}</p>
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
        <p className="mt-6 text-sm text-red-500">{response.disclaimer}</p>
      )}
    </JungleCard>
  );
}
