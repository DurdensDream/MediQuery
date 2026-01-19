export function bm25Score(query: string, text: string) {
  const queryTerms = query.toLowerCase().split(/\s+/);
  const docTerms = text.toLowerCase().split(/\s+/);
  let score = 0;
  for (const term of queryTerms) {
    const freq = docTerms.filter((t) => t === term).length;
    score += freq;
  }
  return score / Math.max(docTerms.length, 1);
}
