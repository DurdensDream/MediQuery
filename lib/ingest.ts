import { v4 as uuid } from "uuid";
import { chunkText } from "@/lib/chunking";
import { embedText } from "@/lib/embeddings";
import { addToStore } from "@/lib/vectorStore";
import { config } from "@/lib/config";
import { Chunk } from "@/lib/types";

export async function ingestText(text: string, source: string) {
  const chunks = chunkText(text, config.chunkTokens);
  const embeddings = await Promise.all(chunks.map((chunk) => embedText(chunk)));

  const enriched: Chunk[] = chunks.map((chunk, index) => ({
    id: uuid(),
    text: chunk,
    embedding: embeddings[index],
    source,
    page: index + 1
  }));

  addToStore(enriched);
  return enriched.length;
}
