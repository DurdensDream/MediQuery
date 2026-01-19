export type Chunk = {
  id: string;
  text: string;
  embedding: number[];
  source: string;
  page: number;
  image?: string;
};

export type RetrievalResult = Chunk & { score: number };

export type QueryResponse = {
  answer: string;
  citations: { id: string; snippet: string; source: string; image?: string }[];
  disclaimer: string;
  refinedQuery?: string;
};
