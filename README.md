# Ragdoll AI MCP Server

A Model Context Protocol (MCP) server for Ragdoll AI knowledge base queries.

## Overview

This MCP server provides a simple interface to query Ragdoll AI knowledge bases through the Model Context Protocol. It allows seamless integration with various LLM client applications including Cursor, Windsurf, and Cline.

## Prerequisites

- [Bun](https://bun.sh) runtime (v1.2.1 or later)
- Ragdoll AI API key
- Ragdoll AI knowledge base ID

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd mcp-ragdoll-server
bun install
```

## Configuration

Set up your environment variables:

```bash
export RAGDOLL_API_KEY="your-ragdoll-api-key"
export RAGDOLL_KNOWLEDGE_BASE_ID="your-knowledge-base-id"
```

For persistent configuration, add these to your `.bashrc`, `.zshrc`, or create a `.env` file in the project root.

## Running the Server

Start the server:

```bash
bun run index.ts
```

## Client Setup

### NPX Installation (Recommended)

The simplest way to use this server is via NPX:

```bash
npx -y ragdoll-mcp-server
```

### Cursor

To install the Ragdoll MCP server in Cursor IDE:

1. Open Cursor IDE
2. Go to Settings > Extensions > AI Settings
3. Create a file named `mcp.json` with the following configuration:

```json
{
  "mcpServers": {
    "ragdoll-mcp-server": {
      "command": "npx",
      "args": ["-y", "ragdoll-mcp-server"],
      "env": {
        "RAGDOLL_API_KEY": "your-ragdoll-api-key",
        "RAGDOLL_KNOWLEDGE_BASE_ID": "your-knowledge-base-id"
      }
    }
  }
}
```

Alternatively, you can run the server locally:

```json
{
  "mcpServers": {
    "ragdoll-mcp-server": {
      "command": "bun",
      "args": ["run", "/path/to/mcp-ragdoll-server/index.ts"],
      "env": {
        "RAGDOLL_API_KEY": "your-ragdoll-api-key",
        "RAGDOLL_KNOWLEDGE_BASE_ID": "your-knowledge-base-id"
      }
    }
  }
}
```

### Windsurf

To install the Ragdoll MCP server in Windsurf IDE:

Create or edit your `mcp_config.json` file with the following configuration:

```json
{
  "mcpServers": {
    "ragdoll-mcp-server": {
      "command": "npx",
      "args": ["-y", "ragdoll-mcp-server"],
      "env": {
        "RAGDOLL_API_KEY": "your-ragdoll-api-key",
        "RAGDOLL_KNOWLEDGE_BASE_ID": "your-knowledge-base-id"
      }
    }
  }
}
```

### Cline

To install the Ragdoll MCP server in Cline:

Create or edit your `cline_mcp_settings.json` file with the following configuration:

```json
{
  "mcpServers": {
    "ragdoll-mcp-server": {
      "command": "npx",
      "args": ["-y", "ragdoll-mcp-server"],
      "env": {
        "RAGDOLL_API_KEY": "your-ragdoll-api-key",
        "RAGDOLL_KNOWLEDGE_BASE_ID": "your-knowledge-base-id"
      }
    }
  }
}
```

## Usage

Once connected, you can query your Ragdoll knowledge base with the following parameters:

- `query` (string, required): The search query to find relevant information
- `topK` (number, optional): Number of results to return (1-10)
- `rerank` (boolean, optional): Whether to rerank results

Example usage in your LLM client:

```
You can ask questions about your knowledge base content.
```

## Development

This project uses the Model Context Protocol SDK. For more information, refer to the [MCP documentation](https://modelcontext.protocol.ai/).

## Support

For issues or questions about this MCP server, please submit an issue on GitHub.

## License

[MIT](LICENSE)
