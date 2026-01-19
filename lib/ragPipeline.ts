import { embedText } from "@/lib/embeddings";
import { hybridRetrieve } from "@/lib/retrieval";
import { refineQuery } from "@/lib/agent";
import { QueryResponse } from "@/lib/types";

export async function runRag(query: string): Promise<QueryResponse> {
  const refined = await refineQuery(query);
  const embedding = await embedText(refined);
  const results = hybridRetrieve(refined, embedding);

  const answer = buildAnswer(refined, results.map((r) => r.text));

  return {
    answer,
    citations: results.map((r) => ({
      id: r.id,
      snippet: r.text.slice(0, 220) + "...",
      source: r.source,
      image: r.image
    })),
    disclaimer: "This is not professional medical advice; consult a doctor.",
    refinedQuery: refined
  };
}

function buildAnswer(query: string, context: string[]) {
  return `Based on the retrieved medical context, here is a concise answer to "${query}":\n\n${context.join("\n\n")}`;
}
