export async function refineQuery(query: string) {
  try {
    const { AgentExecutor } = await import("langchain/agents");
    const agent = {
      allowedTools: [],
      returnValues: ["output"],
      plan: async () => ({ tool: "final", toolInput: query })
    } as any;

    const executor = AgentExecutor.fromAgentAndTools({ agent, tools: [] as any[] });
    const result = await executor.invoke({ input: query });
    return String(result.output ?? query);
  } catch {
    return query;
  }
}
