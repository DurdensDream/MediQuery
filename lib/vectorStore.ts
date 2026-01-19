import { Chunk, RetrievalResult } from "@/lib/types";

const memoryStore: Chunk[] = [];

export function addToStore(chunks: Chunk[]) {
  memoryStore.push(...chunks);
}

export function similaritySearch(queryEmbedding: number[], topK: number): RetrievalResult[] {
  const scored = memoryStore.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-9);
}
