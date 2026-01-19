export const config = {
  ragTopK: Number(process.env.RAG_TOP_K ?? 5),
  chunkTokens: Number(process.env.RAG_CHUNK_TOKENS ?? 512),
  bm25Weight: Number(process.env.RAG_HYBRID_BM25_WEIGHT ?? 0.35),
  vectorWeight: Number(process.env.RAG_VECTOR_WEIGHT ?? 0.65),
  textModel: process.env.HF_MODEL_TEXT ?? "sentence-transformers/all-MiniLM-L6-v2",
  imageModel: process.env.HF_MODEL_IMAGE ?? "openai/clip-vit-base-patch32"
};
