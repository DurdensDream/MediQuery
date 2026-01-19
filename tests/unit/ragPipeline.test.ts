import { runRag } from "@/lib/ragPipeline";

describe("RAG pipeline", () => {
  it("returns a response with disclaimer", async () => {
    const result = await runRag("What are malaria symptoms?");
    expect(result.disclaimer).toContain("not professional medical advice");
  });
});
