# Plugin Interface Audit (v2.4.0 — Verified via Dynamic Import)

## Actions (9)
1. UNDESIRABLE_MARKET_ANALYSIS — Personality-driven market analysis with conviction scoring
2. UNDESIRABLE_BUSINESS_PILOT — AI business automation modules (phone, SMS, invoicing)
3. UNDESIRABLE_MEME_MACHINE — Meme concepts, content calendars, viral assets
4. UNDESIRABLE_LOAD_SKILL — Generic router matching user intent to 24 skills via keywords
5. UNDESIRABLE_WHALE_TRACKER — Whale wallet movements and smart money flows
6. UNDESIRABLE_ENTRY_SIGNAL — GO/WAIT/NO-GO entry verdict with price levels
7. UNDESIRABLE_PORTFOLIO_CHECK — Portfolio health with A-F rating
8. UNDESIRABLE_EXIT_STRATEGY — Take-profit levels, stop losses, time-based exits
9. UNDESIRABLE_RISK_ASSESSMENT — Risk 1-10 with SAFE/CAUTION/DANGER verdict

## Providers (2)
1. undesirables-oracle — Live TCG market data from 2 free endpoints (search + market snapshot)
2. undesirables-soul — Personality injection with demo/holder mode detection

## Evaluators (1)
1. UNDESIRABLE_MARKET_INTELLIGENCE — Passive, alwaysRun:true, enriches context with live Oracle data when TCG topics detected

## Services (1)
1. MEME_TREND_MONITOR — No-op scaffold (registered to reserve service type)

## Key Architecture Decisions
- generateResponse() catch block returns success:false with safe message (P1 prompt leak fixed)
- oracleFetch() shared helper with 8s AbortSignal timeout
- Demo soul loads automatically when no UNDESIRABLES_WORKSPACE is set
- All 24 skills available to demo users (skills = distribution, personality = NFT value)
- Workspace state keyed by runtime.agentId (multi-agent safe)
- Path traversal protection via getSafePath()
- YAML parsed with js-yaml JSON_SCHEMA (no prototype pollution)
- Skill content wrapped in <untrusted_skill_data> tags in LLM prompts

## What the Plugin Does NOT Do (Yet)
- Does not call paid x402 endpoints (grade, simulate, crypto-oracle, arb-*)
- Does not execute on-chain transactions
- Does not verify NFT ownership on-chain
- Actions generate LLM text responses — they don't fetch external data themselves
  (only the Oracle provider and evaluator fetch live data)
- No WebSocket or streaming support
- No multi-game support (Oracle defaults to Pokemon)
