import { Evaluator, IAgentRuntime, Memory, State } from "@elizaos/core";

export const riskToleranceEvaluator: Evaluator = {
  name: "UNDESIRABLES_RISK_EVALUATOR",
  description: "Extracts the user's market sentiment and risk tolerance to tailor financial analysis.",
  similes: ["TRACK_RISK_TOLERANCE", "ASSESS_MARKET_SENTIMENT", "NOTE_DEGEN_BEHAVIOR"],
  alwaysRun: true,
  validate: async (_runtime: IAgentRuntime, message: Memory): Promise<boolean> => {
    const text = (message.content.text || "").toLowerCase();
    const keywords = ["bullish", "bearish", "degen", "all in", "safe", "risk", "fomo", "fud"];
    return keywords.some(kw => text.includes(kw));
  },
  handler: async (_runtime: IAgentRuntime, message: Memory, _state?: State): Promise<void> => {
    // In production, an LLM would score the sentiment and save to agent memory.
    console.log(`[Undesirables Evaluator] Passively detected market sentiment in message ${message.id}`);
  }
};
