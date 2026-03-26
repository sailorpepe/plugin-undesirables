# plugin-undesirables

> ElizaOS plugin for **The Undesirables** — 4,444 autonomous AI agents on Ethereum.

## What It Does

Adds soul personality, market analysis, Business Pilot (23 modules), Meme Machine, and 15+ skills to any ElizaOS agent.

### Actions

| Action | Trigger | Description |
|--------|---------|-------------|
| `UNDESIRABLE_MARKET_ANALYSIS` | "What do you think about ETH?" | Personality-driven market analysis with risk guardrails |
| `UNDESIRABLE_BUSINESS_PILOT` | "Set up phone answering for my business" | 23 AI-powered business automation modules |
| `UNDESIRABLE_MEME_MACHINE` | "Create memes for my barbershop" | Content creation, meme templates, industry packs |
| `UNDESIRABLE_LOAD_SKILL` | "Check my portfolio" | Auto-matches and loads any of 15+ skills |

### Provider

The `soulProvider` automatically injects the agent's personality context (archetype, strategy, adjectives, guardrails) into every conversation.

## Setup

### 1. Install the plugin

```bash
elizaos plugins add plugin-undesirables
```

_Or manually:_
```bash
npm install plugin-undesirables
```

### 2. Get your soul workspace

1. Mint an Undesirable: [scatter.art/the-undesirables](https://scatter.art/the-undesirables)
2. Download your workspace: [the-undesirables.com/soul](https://the-undesirables.com/soul)
3. Unzip the folder

### 3. Configure

Set the workspace path in your `.env`:
```bash
UNDESIRABLES_WORKSPACE=/path/to/your/unzipped/soul/folder
```

Or in your `character.json`:
```json
{
  "settings": {
    "UNDESIRABLES_WORKSPACE": "/path/to/soul/0420"
  },
  "plugins": ["plugin-undesirables"]
}
```

### 4. Run

```bash
elizaos start --character your-character.json
```

## Converting Souls to character.json

Use the companion converter script:
```bash
# From the MCP server repo
node soul-to-eliza.js --token 420
```

This converts any `SOUL.md` into a full ElizaOS `character.json` with personality, style, bio, lore, and message examples.

→ [undesirables-mcp-server](https://github.com/sailorpepe/undesirables-mcp-server)

## Architecture

```
ElizaOS Agent
  ├── plugin-undesirables
  │   ├── Provider: soulProvider (injects personality context)
  │   ├── Action: MARKET_ANALYSIS
  │   ├── Action: BUSINESS_PILOT
  │   ├── Action: MEME_MACHINE
  │   └── Action: LOAD_SKILL (15+ skills)
  │
  └── Soul Workspace (token-gated download)
      ├── SOUL.md (personality profile)
      ├── SYSTEM_PROMPT.txt
      ├── MEMORY.md (persistent)
      ├── PREDICTIONS_LEDGER.json
      └── skills/ (15 skill files)
```

## The Undesirables

4,444 autonomous AI agents on Ethereum. Each one has a unique personality derived from its visual traits.

- **Website**: [the-undesirables.com](https://the-undesirables.com)
- **Mint**: [scatter.art/the-undesirables](https://scatter.art/the-undesirables)
- **MCP Server**: [github.com/sailorpepe/undesirables-mcp-server](https://github.com/sailorpepe/undesirables-mcp-server)
- **Docs**: [the-undesirables.com/docs](https://the-undesirables.com/docs)

EST. 2026 🐸

## License

MIT
