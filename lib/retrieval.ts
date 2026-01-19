import { bm25Score } from "@/lib/bm25";
import { config } from "@/lib/config";
import { similaritySearch } from "@/lib/vectorStore";
import { RetrievalResult } from "@/lib/types";

export function hybridRetrieve(query: string, queryEmbedding: number[]) {
  const vectorResults = similaritySearch(queryEmbedding, config.ragTopK);
  const scored = vectorResults.map((result) => {
    const bm25 = bm25Score(query, result.text);
    const hybridScore = config.vectorWeight * result.score + config.bm25Weight * bm25;
    return { ...result, score: hybridScore };
  });
  const sorted = scored.sort((a, b) => b.score - a.score).slice(0, config.ragTopK);
  return sorted as RetrievalResult[];
}
