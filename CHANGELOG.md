# Changelog

All notable changes to this project will be documented in this file.

## [2.0.3] - 2026-05-10

### Changed
- Optimized npm description for search result truncation (130-char limit)
- Expanded Related Projects into full Ecosystem section (14 links across 4 categories)
- Fixed MCP server tool count reference (36 → 34)
- Fixed skill count consistency (23 → 24 to match actual source code)
- Added npm download, ElizaOS, MCP Server, and x402 badges to README
- Added `funding` field to package.json
- Added 8 new discovery keywords (x402, trading-cards, tcg, coinbase, base, usdc, content-creation, business-automation)
- Synced `plugin.json` version with `package.json` (was drifted at 2.0.0)

### Fixed
- License updated from MIT to BUSL-1.1 across all files (v2.0.1)

## [2.0.2] - 2026-04-24

### Added
- Vitest test suite (`src/index.test.ts`)
- `plugin.json` registry metadata for ElizaOS submission
- `MemeTrendService` background service scaffold

### Fixed
- 21 TypeScript compilation errors against real `@elizaos/core` v2 API
- `ActionExample` uses `name` field (was `user`) per v2 protobuf schema
- `Handler` returns `Promise<ActionResult>` (was `Promise<boolean>`)
- `Provider` has required `name` field and returns `ProviderResult`

## [2.0.1] - 2026-04-24

### Fixed
- **CRITICAL**: Action handlers were leaking raw prompt instructions to end users via `callback()`. Now routes through `runtime.generateText()`
- **CRITICAL**: Global state collision — second agent overwrote first agent's personality. Now uses `Map<string, SoulWorkspace>` keyed by `runtime.agentId`
- Replaced hand-written `elizaos-core.d.ts` type stubs with real `@elizaos/core@2.0.0-alpha.77`
- All `fs.readFileSync` calls replaced with `await fs.promises.readFile()`
- Replaced regex YAML parser with `js-yaml` using `JSON_SCHEMA` (no custom types)
- LICENSE file corrected from MIT to BUSL-1.1

## [2.0.0] - 2026-04-24

### Added
- Full ElizaOS v2 API compatibility
- 4 actions: `UNDESIRABLE_MARKET_ANALYSIS`, `UNDESIRABLE_BUSINESS_PILOT`, `UNDESIRABLE_MEME_MACHINE`, `UNDESIRABLE_LOAD_SKILL`
- `soulProvider` — injects personality context into every agent response
- 24-skill keyword matcher with trigger word routing
- Path traversal protection via `getSafePath()`
- Prototype pollution blocking in YAML parser
- ESM module format with `tsup` bundler

### Changed
- Complete rewrite from v1.x Python G.A.M.E. SDK architecture to native TypeScript
