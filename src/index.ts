import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const knowledgeBaseId = process.env.RAGDOLL_KNOWLEDGE_BASE_ID;
const apiKey = process.env.RAGDOLL_API_KEY;

if (!knowledgeBaseId || !apiKey) {
  throw new Error("RAGDOLL_KNOWLEDGE_BASE_ID and RAGDOLL_API_KEY must be set");
}

const server = new McpServer({
  name: "Ragdoll AI MCP Server",
  version: "1.0.5",
});

server.tool(
  "query-knowledge-base",
  {
    query: z.string(),
    topK: z.number().min(1).max(10).optional(),
    rerank: z.boolean().optional(),
  },
  async ({ query, topK, rerank }) => {
    const response = await fetch(
      `https://api.ragdoll.ai/v1/knowledge-bases/${knowledgeBaseId}/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          query,
          topK,
          rerank,
        }),
      },
    );

    const contextList = (await response.json()) as {
      content: string;
      similarity?: number;
      score?: number;
      metadata: Record<string, unknown>;
    }[];

    return {
      content: contextList.map(({ content, similarity, score, metadata }) => ({
        type: "text",
        text: content,
        _meta: {
          ...metadata,
          similarity,
          score,
        },
      })),
    };
  },
);

const transport = new StdioServerTransport(process.stdin, process.stdout);
await server.connect(transport);

console.log("Ragdoll AI MCP Server started");
