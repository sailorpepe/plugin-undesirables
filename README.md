# plugin-undesirables

![The Undesirables Banner](./images/banner.jpg)

[![npm version](https://img.shields.io/npm/v/plugin-undesirables.svg)](https://www.npmjs.org/package/plugin-undesirables)
[![npm downloads](https://img.shields.io/npm/dw/plugin-undesirables.svg)](https://www.npmjs.org/package/plugin-undesirables)
[![License: BUSL-1.1](https://img.shields.io/badge/License-BUSL--1.1-blue.svg)](LICENSE)
[![ElizaOS](https://img.shields.io/badge/ElizaOS-v2_Compatible-purple.svg)](https://elizaos.ai)
[![MCP Server](https://img.shields.io/badge/MCP_Server-35+_Tools-green.svg)](https://github.com/sailorpepe/undesirables-mcp-server)
[![x402](https://img.shields.io/badge/x402-Oracle_API-orange.svg)](https://oracle.the-undesirables.com)

> Personality-as-Code for ElizaOS agents. Live market data from 446K+ indexed products. Zero config required.

---

## 📑 Table of Contents

- [What This Does](#what-this-does)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [What's Included](#whats-included)
- [Data Sources](#data-sources)
- [Access Model](#access-model)
- [How Personality Works](#how-personality-works)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Ecosystem](#ecosystem)
- [Disclaimer](#disclaimer)
- [License & Commercial Use](#-license--commercial-use)

---

## What This Does

`plugin-undesirables` gives any ElizaOS agent a structured personality, live market data from multiple free APIs, and 16 specialized skills — with zero configuration required.

Install the plugin, and your agent immediately gets:

- **A working personality** — a demo soul loads automatically. NFT holders get their unique AI identity.
- **Live market data** — real product prices from 446K+ indexed TCG products, DeFi yields from DeFiLlama, on-chain balances from Etherscan.
- **16 live-data skills** — market analysis, portfolio checks, entry signals, exit strategies, risk assessment, yield farming, content creation, and more. All financial skills fetch real data.
- **Passive market intelligence** — an evaluator that detects card/market topics and enriches the agent's context with live pricing data automatically.

---

## Architecture

The Undesirables ecosystem has three tiers. The plugin is the free entry point.

```
┌─────────────────────────────────────────────────────────┐
│  PLUGIN (npm install plugin-undesirables)                │
│  Free — no keys, no wallets, no payments                 │
│                                                          │
│  ✓ Demo soul (loads automatically, zero config)          │
│  ✓ All 16 live-data skills (DeFiLlama + Etherscan)    │
│  ✓ 9 personality-driven actions                          │
│  ✓ Live Oracle data (search + daily market snapshot)     │
│  ✓ Passive market intelligence evaluator                 │
│  ✓ NFT holder souls (unique personality + memory)        │
├──────────────────────────────────────────────────────────┤
│  ORACLE API (oracle.the-undesirables.com)                │
│  Paid — x402 micropayments, USDC on Base                 │
│                                                          │
│  $0.10  AI card grading (PSA/Beckett via vision model)   │
│  $0.015 Conformal risk forecast + card grades           │
│  $0.05  NFT floor price oracle + forecast                │
│  $0.05  Token price simulation (CoinGecko + Monte Carlo) │
│  $1.00  Cross-platform prediction market arbitrage       │
│  $0.50  Multi-outcome basket arbitrage                   │
│  $0.25  Weather derivatives edge scanning                │
├──────────────────────────────────────────────────────────┤
│  MCP SERVER (pip install undesirables-mcp-server)        │
│  Local — runs on your machine, 35+ tools                 │
│                                                          │
│  Full tool suite for Claude, Cursor, or any MCP client.  │
│  All processing happens locally. Nothing leaves your     │
│  machine unless you configure external API access.       │
└─────────────────────────────────────────────────────────┘
```

The plugin provides free personality and data. The Oracle API provides paid computational intelligence. The MCP server provides local tool access. Each tier works independently.

---

## Quick Start

### Option A: Zero Config (Demo Soul)

```bash
npm install plugin-undesirables
```

Add to your ElizaOS `character.json`:

```json
{
  "plugins": ["plugin-undesirables"]
}
```

That's it. Your agent loads a demo personality with all 16 skills and live Oracle data. No wallet, no API key, no workspace download needed.

For enhanced on-chain data (portfolio checks, whale tracking), set an optional Etherscan API key:

```json
{
  "plugins": ["plugin-undesirables"],
  "settings": {
    "ETHERSCAN_API_KEY": "your-free-etherscan-key"
  }
}
```

### Option B: NFT Holder (Unique Soul)

If you own an Undesirable NFT, download your soul workspace from [the-undesirables.com](https://the-undesirables.com) and point the plugin to it:

```json
{
  "plugins": ["plugin-undesirables"],
  "settings": {
    "UNDESIRABLES_WORKSPACE": "/path/to/your/soul_workspace"
  }
}
```

Your agent gets a unique personality derived from your NFT's visual traits — Big Five psychology scores, an archetype, a strategy style, persistent memory, and a predictions ledger. No two souls are alike.

---

## What's Included

### Providers (2)

| Provider | What It Does |
|----------|-------------|
| `undesirables-oracle` | Fetches live product prices from 446K+ indexed TCG products and daily market snapshots. Triggers automatically when the conversation mentions cards, prices, or market topics. |
| `undesirables-soul` | Injects the agent's personality context into every response. Loads demo soul by default or the NFT holder's unique soul when configured. |

### Evaluators (1)

| Evaluator | What It Does |
|-----------|-------------|
| `UNDESIRABLE_MARKET_INTELLIGENCE` | Runs passively on every message. When the conversation touches TCG card topics, it auto-enriches the agent's context with live pricing from the Oracle API. The agent becomes market-aware without anyone explicitly asking. |

### Actions (9)

| Action | What It Does |
|--------|-------------|
| `UNDESIRABLE_MARKET_ANALYSIS` | Personality-driven market analysis with conviction scoring and risk guardrails |
| `UNDESIRABLE_BUSINESS_PILOT` | AI business automation — phone answering, SMS, invoicing, scheduling |
| `UNDESIRABLE_MEME_MACHINE` | Content creation — meme concepts, brand voice, content calendars |
| `UNDESIRABLE_LOAD_SKILL` | Routes user messages to the best-matching skill from the 16 available |
| `UNDESIRABLE_WHALE_TRACKER` | Whale wallet movement analysis via live Etherscan data |
| `UNDESIRABLE_ENTRY_SIGNAL` | Entry evaluation — GO / WAIT / NO-GO with live DeFiLlama prices |
| `UNDESIRABLE_PORTFOLIO_CHECK` | Portfolio health via on-chain Etherscan balance data |
| `UNDESIRABLE_EXIT_STRATEGY` | Exit planning — TP1/TP2/TP3 levels using live prices |
| `UNDESIRABLE_RISK_ASSESSMENT` | Risk rating 1–10 using live DeFiLlama protocol TVL data |

### Skills (16)

All 16 skills are available to every user — demo and NFT holder alike. Financial skills fetch live data from free APIs.

| Category | Skills | Data Source |
|----------|--------|------------|
| **Market** | Market Analysis, Entry Signal, Exit Strategy, Conviction Score | Oracle API, DeFiLlama prices |
| **Portfolio** | Portfolio Check, Rebalance Check | Etherscan V2 (on-chain) |
| **DeFi** | Farm Yield, Compound Strategy, Risk Assessment | DeFiLlama yields + protocol TVL |
| **On-Chain** | Whale Tracker | Etherscan V2 (transactions) |
| **Content** | Content Creation, Image Generation, Music Generation, Meme Machine | LLM + MCP tools |
| **Business** | Business Pilot | 23-module setup system |
| **Logging** | Prediction Log | Local JSON ledger |

---

## Data Sources

| API | Auth | What It Provides | Skills Powered |
|-----|------|-----------------|----------------|
| **Oracle API** | None (free) | 446K+ TCG product prices, daily market snapshots | Market Analysis |
| **DeFiLlama** | None (free) | Yield pool APYs, protocol TVL, token prices | Entry Signal, Exit Strategy, Farm Yield, Risk Assessment, Conviction Score, Compound Strategy |
| **Etherscan V2** | Free API key | On-chain wallet balances, transaction history | Portfolio Check, Whale Tracker, Rebalance Check |

> **No user data is stored.** All API calls are stateless — data is fetched, displayed, and discarded. No wallets, addresses, or personal information is saved to disk or transmitted to third parties.

---

## Access Model

| Feature | Demo (Free) | NFT Holder |
|---------|:-----------:|:----------:|
| All 16 skills | ✓ | ✓ |
| Live Oracle data | ✓ | ✓ |
| Live DeFiLlama + Etherscan data | ✓ | ✓ |
| Market intelligence evaluator | ✓ | ✓ |
| All 9 actions | ✓ | ✓ |
| **Unique personality** | — | ✓ |
| **Persistent memory** | — | ✓ |
| **Predictions ledger** | — | ✓ |
| **Custom voice & archetype** | — | ✓ |

Skills are the distribution. Personality is the NFT value.

- **4,444** total souls on Ethereum
- **273** minted
- **4,171** unclaimed at [scatter.art/the-undesirables](https://scatter.art/the-undesirables)

---

## How Personality Works

Each soul workspace contains a `SOUL.md` with structured personality data:

```yaml
name: "Doña Crypto"
archetype: "The Oracle"
strategy: "Long-term accumulation with high conviction"
adjectives: ["analytical", "patient", "contrarian"]
openness: 82
conscientiousness: 91
extraversion: 34
agreeableness: 45
neuroticism: 28
```

The `undesirables-soul` provider injects this context into **every** agent response. Two different Undesirable agents will give completely different takes on the same question, filtered through their individual psychology.

Workspaces are keyed by `runtime.agentId`. Multiple Undesirable agents can run in the same ElizaOS instance without personality collision.

---

## Security

| Measure | Implementation |
|---------|---------------|
| Path traversal protection | `getSafePath()` validates boundaries + resolves symlinks via `fs.realpathSync` |
| YAML injection | Parsed with `js-yaml` `JSON_SCHEMA` (no function execution). `__proto__`, `constructor`, `prototype` keys stripped. |
| Prompt isolation | Skill content wrapped with security warning — treated as inert reference material |
| Oracle fetch | 8-second timeout via `AbortSignal`, `redirect: "error"` prevents SSRF |
| Error handling | LLM failures return safe user-facing message — no prompt context leaked |
| Multi-agent safety | Workspace state keyed by `agentId` — no cross-agent state leakage |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Workspace /path/ does not exist` | Check the path in your `character.json`. Must be an absolute path. Windows: use double backslashes `\\`. |
| No personality detected | If no `UNDESIRABLES_WORKSPACE` is set, the demo soul loads automatically. Check the console for `🐸` log messages. |
| Oracle data not appearing | The Oracle provider triggers on TCG-related keywords. Try asking about a specific card by name. |

---

## Ecosystem

### Plugins & SDKs
- **[plugin-undesirables](https://www.npmjs.com/package/plugin-undesirables)** — ElizaOS personality + market data (this package)
- **[undesirables-mcp-server](https://pypi.org/project/undesirables-mcp-server/)** — 35+ tool MCP server ([GitHub](https://github.com/sailorpepe/undesirables-mcp-server) · [Glama](https://glama.ai/mcp/servers/sailorpepe/undesirables-mcp-server) · [Official MCP Registry](https://registry.modelcontextprotocol.io))
- **[tcg-oracle-tools](https://pypi.org/project/tcg-oracle-tools/)** — Python SDK for the Oracle API

### APIs
- **[Oracle API](https://oracle.the-undesirables.com)** — x402 pay-per-request intelligence ([Swagger Docs](https://oracle.the-undesirables.com/docs))

### Apps
- **[TCG Oracle Desktop](https://github.com/sailorpepe/undesirables-desktop/releases)** — macOS, Linux, Windows installer with AI card grading UI

### Data & Research
- **[Kaggle Dataset](https://www.kaggle.com/datasets/sailorpepe/tcg-market-intelligence)** — 446K+ TCG products across 25+ games
- **[Dev.to Tutorial](https://dev.to/sailor_pepe_7920f552c5b9a/build-an-autonomous-pokemon-card-trading-agent-with-ai-grading-monte-carlo-pricing-2b86)** — Build guide

### Collection
- **[The Undesirables](https://the-undesirables.com)** — 4,444 AI agents on Ethereum
- **[Scatter.art](https://scatter.art/the-undesirables)** — Mint page
- **[Etherscan](https://etherscan.io/address/0xa893648a701c03b14bf2fb767b72b2c55ed5c17a)** — Contract

## Disclaimer

⚠️ **This plugin provides AI-generated analysis using live market data. It is NOT financial, investment, or trading advice.** The developers of this plugin assume NO liability for any financial decisions or losses resulting from the use of this software. Users are solely responsible for their own research and investment decisions. Past performance does not guarantee future results. All financial skills include automated disclaimers in their output.

---


## 📝 License & Commercial Use

This project is licensed under the **[Business Source License 1.1 (BUSL-1.1)](LICENSE)**.

We build in public and support the developer ecosystem — but we also protect the infrastructure and IP of **The Undesirables LLC**.

### ✅ What You CAN Do (Free)

- **Personal & Educational Use** — Download, modify, and run locally for learning, research, or personal projects.
- **Non-Competing Applications** — Integrate our packages into your app, provided your app does not offer TCG market intelligence, pricing aggregation, AI card grading, or on-chain price oracle services as its primary function.
- **MCP / Agent Integration** — Connect your AI agent to our tools for non-commercial use.
- **Community Contributions** — Security audits, bug fixes, and PRs are always welcome.

### 🚫 What You CANNOT Do (Use Limitation)

- **Competing Service** — You may not use this code to operate a competing TCG market intelligence, pricing aggregation, AI card grading, or on-chain price oracle service.
- **Commercial Resale** — You may not wrap our API, data pipelines, or AI models into a paid service without a commercial license.
- **Hosted SaaS** — You may not host this software as a service for third parties without written permission.

### 🔓 Open-Source Conversion

On **June 1, 2030** (or 4 years after the first public release of each version), this code automatically converts to the **MIT License** — fully open source, forever.

### 🤝 Commercial Licensing

Building a commercial product? Want guaranteed API access or white-label integration? Contact us:

📧 **theundesirables7@gmail.com** · 🐦 **[@undesirables_ai](https://x.com/undesirables_ai)**

© 2026 The Undesirables LLC

---

<div align="center">

⭐ **If this project helped you, please star this repo** — it helps others find it.

[Report Bug](../../issues) · [Request Feature](../../issues)

</div>
