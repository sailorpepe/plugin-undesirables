/**
 * Local type declarations for @elizaos/core
 * These are the minimal types needed for the plugin to compile.
 * At runtime, the actual ElizaOS core provides the real implementations.
 */

declare module "@elizaos/core" {
  export interface Plugin {
    name: string;
    description: string;
    actions: Action[];
    providers: Provider[];
    evaluators: Evaluator[];
  }

  export interface Action {
    name: string;
    description: string;
    similes: string[];
    examples: ActionExample[][];
    validate: (runtime: IAgentRuntime, message: Memory) => Promise<boolean>;
    handler: (
      runtime: IAgentRuntime,
      message: Memory,
      state?: State,
      options?: Record<string, unknown>,
      callback?: HandlerCallback
    ) => Promise<boolean>;
  }

  export interface ActionExample {
    user: string;
    content: {
      text: string;
      action?: string;
    };
  }

  export interface Provider {
    get: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<string>;
  }

  export interface Evaluator {
    name: string;
    description: string;
    similes: string[];
    examples: ActionExample[][];
    validate: (runtime: IAgentRuntime, message: Memory) => Promise<boolean>;
    handler: (runtime: IAgentRuntime, message: Memory) => Promise<any>;
  }

  export interface IAgentRuntime {
    getSetting?: (key: string) => string | undefined;
    [key: string]: any;
  }

  export interface Memory {
    content: {
      text?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }

  export interface State {
    [key: string]: any;
  }

  export type HandlerCallback = (response: { text: string; [key: string]: any }) => void;
}
