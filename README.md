# plugin-undesirables

![The Undesirables Banner](./images/banner.jpg)

[![npm version](https://img.shields.io/npm/v/plugin-undesirables.svg)](https://www.npmjs.org/package/plugin-undesirables)
[![License: BUSL-1.1](https://img.shields.io/badge/License-BUSL--1.1-blue.svg)](LICENSE)

> Give any ElizaOS agent a persistent personality, market analysis skills, business automation, and content creation — all driven by a downloadable "soul workspace."

---

## What This Does

Most AI agents are blank slates. They answer questions but have no personality, no memory, no conviction. This plugin changes that.

When you install `plugin-undesirables`, your ElizaOS agent gets:

- **A real personality** — not a system prompt hack, but a structured workspace with Big Five psychology scores, an archetype, a strategy style, adjectives, guardrails, and a backstory. The personality persists across sessions and colors every response.
- **Market analysis with conviction** — your agent doesn't just parrot data. It filters through its own risk tolerance and strategy to give you opinionated takes with conviction scores.
- **23 built-in skills** — portfolio checks, entry signals, exit strategies, whale tracking, meme creation, video production, music generation, and more. The agent auto-matches the right skill to your message.
- **Business Pilot** — 23 AI-powered business automation modules: phone answering, SMS autoresponders, invoice chasers, appointment scheduling. Your agent becomes a business operations assistant.
- **Meme Machine** — content creation, brand voice setup, content calendars, and industry-specific meme packs. Your agent becomes a social media manager.

---

## Quick Start

### 1. Install

```bash
npm install plugin-undesirables
```

### 2. Get a Soul Workspace

Go to [the-undesirables.com/soul](https://the-undesirables.com/soul), connect your wallet, and download your workspace. Unzip it somewhere on your machine.

Each workspace contains:
- `SOUL.md` — personality profile (Big Five scores, archetype, strategy, backstory)
- `SYSTEM_PROMPT.txt` — the full instruction set
- `MEMORY.md` — persistent memory file
- `PREDICTIONS_LEDGER.json` — track record of market calls
- `skills/` — 10-23 skill files depending on the agent's traits

### 3. Configure

Add to your ElizaOS `character.json`:

**macOS / Linux:**
```json
{
  "plugins": ["plugin-undesirables"],
  "settings": {
    "UNDESIRABLES_WORKSPACE": "/Users/YourName/Desktop/soul_0420"
  }
}
```

**Windows:**
```json
{
  "plugins": ["plugin-undesirables"],
  "settings": {
    "UNDESIRABLES_WORKSPACE": "C:\\Users\\YourName\\Desktop\\soul_0420"
  }
}
```

### 4. Run

```bash
elizaos start --character your-character.json
```

Your agent now has a persistent personality that influences every conversation.

---

## Actions

| Action | Trigger Examples | What Happens |
|--------|-----------------|--------------|
| `UNDESIRABLE_MARKET_ANALYSIS` | "What do you think about ETH?" | Personality-driven market analysis with risk guardrails and conviction scoring |
| `UNDESIRABLE_BUSINESS_PILOT` | "Set up phone answering for my barbershop" | Loads the Business Pilot skill, recommends top modules with setup steps |
| `UNDESIRABLE_MEME_MACHINE` | "Create memes for my coffee shop" | Generates meme concepts, captions, content calendars, brand voice |
| `UNDESIRABLE_LOAD_SKILL` | "Check my portfolio" / "Should I ape?" | Auto-matches your message to one of 23 skills and executes it |

### All 23 Skills

| Skill | Trigger Words |
|-------|--------------|
| Portfolio Check | "portfolio", "balance", "holdings" |
| Content Creation | "tweet", "write", "promote", "thread" |
| Entry Signal | "should I buy", "buy signal", "good time to buy" |
| Exit Strategy | "sell", "take profit", "stop loss" |
| Risk Assessment | "risk", "downside", "worst case", "is this safe" |
| Whale Tracker | "whale", "smart money", "what are whales buying" |
| Conviction Score | "conviction", "confidence", "how sure" |
| Snipe Launch | "snipe", "new launch", "just launched" |
| Memecoin Scanner | "memecoin", "find me a gem", "degen scan" |
| Ape Checklist | "should I ape", "ape check" |
| Position Sizing | "position size", "how much should I buy" |
| Volatility Scan | "volatile", "what's moving" |
| Liquidation Watch | "liquidation levels", "longs", "shorts" |
| MEV Detection | "mev", "sandwich", "front-running" |
| Farm Yield | "yield farming", "liquidity", "best yield" |
| Compound Strategy | "compound", "auto-compound", "apy" |
| Copy Trade | "copy trade", "mirror this wallet" |
| Rebalance Check | "rebalance", "allocation", "portfolio drift" |
| Diversification | "diversify", "spread", "concentrate" |
| Sector Rotation | "sector", "rotation", "cycle" |
| Image Generation | "image", "picture", "generate art" |
| Music Generation | "music", "song", "beat" |
| Video Production | "video", "promo", "render video" |

---

## How Personality Works

Each soul workspace has a `SOUL.md` file with structured personality data:

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

The `soulProvider` injects this context into **every** agent response automatically. Your agent doesn't just have personality on request — it's always in character.

This means two different Undesirable agents will give you completely different takes on the same market question, filtered through their individual psychology.

---

## Multi-Agent Safety

Workspaces are keyed by `runtime.agentId`. You can run multiple Undesirable agents in the same ElizaOS instance without personality collision. Agent #420 won't leak into Agent #69's responses.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Workspace /path/ does not exist` | Check the path in your `character.json`. It must be the **absolute** path to the unzipped workspace. Windows users: use double backslashes `\\`. |
| `Invalid JSON Error` | Your `character.json` has a syntax error. Open it in VS Code or Cursor and fix the formatting. |
| `No soul workspace loaded` | The `UNDESIRABLES_WORKSPACE` setting is missing or the path doesn't exist. |

---

## What's New in v2.0

- Action handlers route through `runtime.generateText()` instead of leaking raw prompt instructions
- Multi-agent state isolation — workspaces keyed by `agentId`
- Real `@elizaos/core` v2 types (no more hand-written stubs)
- Async filesystem (`fs.promises`)
- Secure YAML parsing (`js-yaml` with `JSON_SCHEMA`)
- ESM module format

---

## Related Projects

- [@undesirables/plugin-tcg-oracle](https://github.com/sailorpepe/elizaos-tcg-oracle-plugin) — Trading card market intelligence (search, grade, simulate)
- [undesirables-mcp-server](https://github.com/sailorpepe/undesirables-mcp-server) — 36-tool MCP server (Glama Registry, PyPI)
- [the-undesirables.com](https://the-undesirables.com) — The Undesirables NFT collection

---

## License

[BUSL-1.1](LICENSE) — Business Source License 1.1. Copyright © 2026 The Undesirables LLC.
