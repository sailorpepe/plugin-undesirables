/**
 * The Undesirables — ElizaOS Plugin
 * ==================================
 * Adds autonomous AI soul personalities and skills from
 * The Undesirables NFT collection to any ElizaOS agent.
 *
 * Features:
 * - Load any of 4,444 unique soul personalities
 * - Market analysis with personality-driven perspective
 * - Business Pilot — 23 AI-powered business modules
 * - Meme Machine — content creation & marketing
 * - Portfolio analysis with risk guardrails
 * - Persistent memory across sessions
 *
 * @see https://the-undesirables.com
 * @see https://github.com/sailorpepe/undesirables-mcp-server
 */

import type {
  Plugin,
  Action,
  Provider,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  ActionExample,
} from "@elizaos/core";

import * as fs from "fs";
import * as path from "path";

// ============================================================
// Types
// ============================================================

interface SoulWorkspace {
  soulMd: string;
  systemPrompt: string;
  memory: string;
  predictions: any[];
  skills: Record<string, string>;
  meta: Record<string, any>;
}

// ============================================================
// Workspace Loader
// ============================================================

function loadWorkspace(workspacePath: string): SoulWorkspace {
  const workspace: SoulWorkspace = {
    soulMd: "",
    systemPrompt: "",
    memory: "",
    predictions: [],
    skills: {},
    meta: {},
  };

  const soulPath = path.join(workspacePath, "SOUL.md");
  if (fs.existsSync(soulPath)) {
    workspace.soulMd = fs.readFileSync(soulPath, "utf-8");

    // Parse YAML frontmatter
    const fmMatch = workspace.soulMd.match(/^---\n([\s\S]*?)\n---/);
    if (fmMatch) {
      const lines = fmMatch[1].split("\n");
      for (const line of lines) {
        const kvMatch = line.match(/^(\w+):\s*(.+)$/);
        if (kvMatch) {
          let val: any = kvMatch[2].trim();
          if (val.startsWith("[") && val.endsWith("]")) {
            val = val
              .slice(1, -1)
              .split(",")
              .map((s: string) => s.trim().replace(/^["']|["']$/g, ""));
          } else if (val.startsWith('"')) {
            val = val.replace(/^"|"$/g, "");
          } else if (!isNaN(Number(val))) {
            val = Number(val);
          }
          workspace.meta[kvMatch[1]] = val;
        }
      }
    }
  }

  const systemPath = path.join(workspacePath, "SYSTEM_PROMPT.txt");
  if (fs.existsSync(systemPath)) {
    workspace.systemPrompt = fs.readFileSync(systemPath, "utf-8");
  }

  const memoryPath = path.join(workspacePath, "MEMORY.md");
  if (fs.existsSync(memoryPath)) {
    workspace.memory = fs.readFileSync(memoryPath, "utf-8");
  }

  const predictionsPath = path.join(workspacePath, "PREDICTIONS_LEDGER.json");
  if (fs.existsSync(predictionsPath)) {
    try {
      workspace.predictions = JSON.parse(
        fs.readFileSync(predictionsPath, "utf-8")
      );
    } catch {
      workspace.predictions = [];
    }
  }

  const skillsDir = path.join(workspacePath, "skills");
  if (fs.existsSync(skillsDir)) {
    for (const file of fs.readdirSync(skillsDir).filter((f) => f.endsWith(".md"))) {
      workspace.skills[file.replace(".md", "")] = fs.readFileSync(
        path.join(skillsDir, file),
        "utf-8"
      );
    }
  }

  return workspace;
}

// ============================================================
// Global workspace (loaded on init)
// ============================================================

let currentWorkspace: SoulWorkspace | null = null;

// ============================================================
// ACTIONS
// ============================================================

const marketAnalysisAction: Action = {
  name: "UNDESIRABLE_MARKET_ANALYSIS",
  description:
    "Analyze a market, token, or trading pair using the Undesirable agent's unique personality-driven perspective and risk guardrails.",
  similes: [
    "ANALYZE_MARKET",
    "MARKET_OUTLOOK",
    "PRICE_ANALYSIS",
    "TRADING_VIEW",
    "WHAT_DO_YOU_THINK_ABOUT",
  ],
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "What do you think about ETH right now?" },
      } as ActionExample,
      {
        user: "{{agentName}}",
        content: {
          text: "Let me run my market analysis skill on ETH...",
          action: "UNDESIRABLE_MARKET_ANALYSIS",
        },
      } as ActionExample,
    ],
  ],
  validate: async (_runtime: IAgentRuntime, _message: Memory) => {
    return currentWorkspace !== null;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    _options: Record<string, unknown> | undefined,
    callback?: HandlerCallback
  ) => {
    if (!currentWorkspace) {
      if (callback) callback({ text: "No soul workspace loaded." });
      return false;
    }

    const skill = currentWorkspace.skills["market_analysis"] || "";
    const context = `You are executing the Market Analysis skill.

${skill}

Your personality context:
${currentWorkspace.soulMd.slice(0, 2000)}

Recent predictions:
${JSON.stringify(currentWorkspace.predictions.slice(-3), null, 2)}

The user asks: ${message.content.text}

Respond in character using your archetype, risk tolerance, and guardrails.`;

    if (callback) {
      callback({ text: context });
    }
    return true;
  },
};

const businessPilotAction: Action = {
  name: "UNDESIRABLE_BUSINESS_PILOT",
  description:
    "Use the Business Pilot skill to recommend and set up AI-powered business tools — phone answering, SMS, invoicing, scheduling, and 23+ modules.",
  similes: [
    "SETUP_BUSINESS",
    "PHONE_ANSWERING",
    "BUSINESS_AUTOMATION",
    "SMS_AUTORESPONDER",
    "INVOICE_CHASER",
  ],
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "I run a barbershop. Help me set up phone answering.",
        },
      } as ActionExample,
      {
        user: "{{agentName}}",
        content: {
          text: "Loading Business Pilot skill for your barbershop...",
          action: "UNDESIRABLE_BUSINESS_PILOT",
        },
      } as ActionExample,
    ],
  ],
  validate: async (_runtime: IAgentRuntime, _message: Memory) => {
    return currentWorkspace !== null && "business_pilot" in (currentWorkspace?.skills || {});
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    _options: Record<string, unknown> | undefined,
    callback?: HandlerCallback
  ) => {
    if (!currentWorkspace) {
      if (callback) callback({ text: "No soul workspace loaded." });
      return false;
    }

    const skill = currentWorkspace.skills["business_pilot"] || "";
    const context = `You are executing the Business Pilot skill.

${skill}

The user asks: ${message.content.text}

Recommend the top 3-5 modules they should set up first with exact commands.`;

    if (callback) {
      callback({ text: context });
    }
    return true;
  },
};

const memeMachineAction: Action = {
  name: "UNDESIRABLE_MEME_MACHINE",
  description:
    "Generate memes, marketing content, content calendars, and viral social media assets using the Meme Machine skill.",
  similes: [
    "CREATE_MEME",
    "MEME_MARKETING",
    "CONTENT_CALENDAR",
    "VIRAL_CONTENT",
    "BRAND_VOICE",
  ],
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Create some memes for my barbershop" },
      } as ActionExample,
      {
        user: "{{agentName}}",
        content: {
          text: "Firing up the Meme Machine for barbershop content...",
          action: "UNDESIRABLE_MEME_MACHINE",
        },
      } as ActionExample,
    ],
  ],
  validate: async (_runtime: IAgentRuntime, _message: Memory) => {
    return currentWorkspace !== null && "meme_machine" in (currentWorkspace?.skills || {});
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    _options: Record<string, unknown> | undefined,
    callback?: HandlerCallback
  ) => {
    if (!currentWorkspace) {
      if (callback) callback({ text: "No soul workspace loaded." });
      return false;
    }

    const skill = currentWorkspace.skills["meme_machine"] || "";
    const context = `You are executing the Meme Machine skill.

${skill}

The user asks: ${message.content.text}

Create 3 meme concepts with template, text, caption, and export size.`;

    if (callback) {
      callback({ text: context });
    }
    return true;
  },
};

const loadSkillAction: Action = {
  name: "UNDESIRABLE_LOAD_SKILL",
  description:
    "Load and execute any of the 15+ skills from the Undesirable soul workspace — market analysis, content creation, portfolio check, entry signals, exit strategy, and more.",
  similes: [
    "USE_SKILL",
    "RUN_SKILL",
    "EXECUTE_SKILL",
    "CHECK_PORTFOLIO",
    "CONTENT_CREATION",
    "ENTRY_SIGNAL",
    "EXIT_STRATEGY",
  ],
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Check my portfolio" },
      } as ActionExample,
      {
        user: "{{agentName}}",
        content: {
          text: "Loading portfolio check skill...",
          action: "UNDESIRABLE_LOAD_SKILL",
        },
      } as ActionExample,
    ],
  ],
  validate: async (_runtime: IAgentRuntime, _message: Memory) => {
    return currentWorkspace !== null;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    _options: Record<string, unknown> | undefined,
    callback?: HandlerCallback
  ) => {
    if (!currentWorkspace) {
      if (callback) callback({ text: "No soul workspace loaded." });
      return false;
    }

    // Try to match the best skill based on the user's message
    const text = message.content.text?.toLowerCase() || "";
    let matchedSkill = "";
    let matchedName = "";

    const skillMatches: Record<string, string[]> = {
      check_portfolio: ["portfolio", "balance", "holdings", "how am i doing"],
      content_creation: ["tweet", "write", "promote", "content", "thread"],
      entry_signal: ["entry", "should i buy", "good time to buy", "dip"],
      exit_strategy: ["exit", "sell", "take profit", "stop loss"],
      conviction_score: ["conviction", "confidence", "how sure"],
      rebalance_check: ["rebalance", "allocation"],
      prediction_log: ["predict", "forecast", "call"],
      risk_assessment: ["risk", "downside", "worst case"],
      image_generation: ["image", "picture", "generate art"],
      music_generation: ["music", "song", "beat", "audio"],
    };

    for (const [skillName, triggers] of Object.entries(skillMatches)) {
      if (triggers.some((t) => text.includes(t)) && currentWorkspace.skills[skillName]) {
        matchedSkill = currentWorkspace.skills[skillName];
        matchedName = skillName;
        break;
      }
    }

    if (!matchedSkill) {
      // Return available skills list
      const available = Object.keys(currentWorkspace.skills)
        .filter((k) => k !== "_index")
        .join(", ");
      if (callback) {
        callback({
          text: `Available skills: ${available}. Tell me what you need and I'll load the right one.`,
        });
      }
      return true;
    }

    const context = `You are executing the ${matchedName.replace(/_/g, " ")} skill.

${matchedSkill}

Your personality context:
${currentWorkspace.soulMd.slice(0, 1500)}

The user asks: ${message.content.text}

Respond in character using your archetype and guardrails.`;

    if (callback) {
      callback({ text: context });
    }
    return true;
  },
};

// ============================================================
// PROVIDERS
// ============================================================

const soulProvider: Provider = {
  get: async (runtime: IAgentRuntime, _message: Memory) => {
    // Load workspace from runtime settings if not already loaded
    if (!currentWorkspace) {
      const workspacePath =
        (runtime.getSetting?.("UNDESIRABLES_WORKSPACE") as string) ||
        process.env.UNDESIRABLES_WORKSPACE ||
        "";

      if (workspacePath && fs.existsSync(workspacePath)) {
        currentWorkspace = loadWorkspace(workspacePath);
        console.log(
          `🐸 Loaded Undesirable soul: ${currentWorkspace.meta.name || "Unknown"}`
        );
      }
    }

    if (!currentWorkspace) {
      return "No Undesirable soul workspace loaded. Set UNDESIRABLES_WORKSPACE env var to your downloaded workspace path.";
    }

    return `[SOUL CONTEXT]
Name: ${currentWorkspace.meta.name || "Unknown Undesirable"}
Archetype: ${currentWorkspace.meta.archetype || "Unknown"}
Strategy: ${currentWorkspace.meta.strategy || "Unknown"}
Token ID: ${currentWorkspace.meta.token_id || "?"}
Skills loaded: ${Object.keys(currentWorkspace.skills).filter((k) => k !== "_index").length}
Memory entries: ${currentWorkspace.memory.split("\n").filter((l) => l.trim()).length}
Predictions: ${currentWorkspace.predictions.length}

Personality: ${(currentWorkspace.meta.adjectives || []).join(", ")}

The agent should respond using the personality and style defined in its soul.
Collection: The Undesirables — 4,444 autonomous AI agents on Ethereum.
Website: https://the-undesirables.com`;
  },
};

// ============================================================
// PLUGIN EXPORT
// ============================================================

const undesirablePlugin: Plugin = {
  name: "plugin-undesirables",
  description:
    "The Undesirables — 4,444 autonomous AI agents on Ethereum. " +
    "Adds soul personality, market analysis, Business Pilot (23 modules), " +
    "Meme Machine, and 15+ skills to any ElizaOS agent.",
  actions: [
    marketAnalysisAction,
    businessPilotAction,
    memeMachineAction,
    loadSkillAction,
  ],
  providers: [soulProvider],
  evaluators: [],
};

export default undesirablePlugin;
export { loadWorkspace, SoulWorkspace };
