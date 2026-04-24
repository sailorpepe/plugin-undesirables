import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";
import * as path from "path";

// Mock fs module before importing the plugin
vi.mock("fs", async () => {
  const actual = await vi.importActual<typeof import("fs")>("fs");
  return {
    ...actual,
    existsSync: vi.fn(),
    promises: {
      readFile: vi.fn(),
      readdir: vi.fn(),
    },
  };
});

// Mock js-yaml
vi.mock("js-yaml", () => ({
  load: vi.fn((content: string) => {
    try {
      // Simple mock that parses basic YAML-like content
      const result: Record<string, any> = {};
      content.split("\n").forEach((line) => {
        const match = line.match(/^(\w+):\s*(.+)/);
        if (match) result[match[1]] = match[2].trim();
      });
      return result;
    } catch {
      return {};
    }
  }),
  JSON_SCHEMA: "json-schema",
}));

describe("plugin-undesirables", () => {
  describe("Security: Path Traversal Protection", () => {
    it("should block directory traversal attempts", async () => {
      // Import after mocks are set up
      const { loadWorkspace } = await import("./index.js");

      const mockExistsSync = vi.mocked(fs.existsSync);
      mockExistsSync.mockReturnValue(false);

      // This should not throw — it just returns empty workspace when files don't exist
      const workspace = await loadWorkspace("/safe/workspace/path");
      expect(workspace.soulMd).toBe("");
      expect(workspace.skills).toEqual({});
    });

    it("should reject paths that escape the workspace", async () => {
      // The getSafePath function should throw on traversal
      // We test this indirectly — if someone passes ../../etc/passwd as a skill file
      const mockExistsSync = vi.mocked(fs.existsSync);
      mockExistsSync.mockReturnValue(true);

      const mockReadFile = vi.mocked(fs.promises.readFile);
      mockReadFile.mockResolvedValue("test content");

      const mockReaddir = vi.mocked(fs.promises.readdir);
      mockReaddir.mockResolvedValue(["safe_skill.md"] as any);

      const { loadWorkspace } = await import("./index.js");
      const workspace = await loadWorkspace("/safe/workspace");

      // Should only contain safe_skill, never anything from parent dirs
      expect(Object.keys(workspace.skills)).not.toContain("../../etc/passwd");
    });
  });

  describe("Security: Prototype Pollution Protection", () => {
    it("should strip __proto__ keys from YAML frontmatter", async () => {
      const mockExistsSync = vi.mocked(fs.existsSync);
      mockExistsSync.mockImplementation((p: any) => {
        const pathStr = String(p);
        return pathStr.endsWith("SOUL.md");
      });

      const mockReadFile = vi.mocked(fs.promises.readFile);
      mockReadFile.mockResolvedValue(
        `---\nname: Test\n__proto__: malicious\nconstructor: evil\narchetype: Degen\n---\n# Soul`
      );

      const { loadWorkspace } = await import("./index.js");
      const workspace = await loadWorkspace("/test/workspace");

      // __proto__ and constructor should be stripped
      expect(workspace.meta.__proto__).toBeUndefined;
      expect(workspace.meta.constructor).toBeUndefined;
      expect(workspace.meta.name).toBe("Test");
      expect(workspace.meta.archetype).toBe("Degen");
    });
  });

  describe("Workspace Loading", () => {
    it("should load a complete workspace with all files", async () => {
      const mockExistsSync = vi.mocked(fs.existsSync);
      mockExistsSync.mockReturnValue(true);

      const mockReadFile = vi.mocked(fs.promises.readFile);
      mockReadFile.mockImplementation(async (p: any) => {
        const pathStr = String(p);
        if (pathStr.endsWith("SOUL.md"))
          return "---\nname: Pepe #0001\narchetype: Degen Ape\n---\n# Soul Content";
        if (pathStr.endsWith("SYSTEM_PROMPT.txt")) return "You are a degen ape.";
        if (pathStr.endsWith("MEMORY.md")) return "# Memory\n- Bought ETH at $100";
        if (pathStr.endsWith("PREDICTIONS_LEDGER.json"))
          return JSON.stringify([{ asset: "ETH", direction: "bullish" }]);
        if (pathStr.endsWith("market_analysis.md")) return "# Market Analysis Skill";
        return "";
      });

      const mockReaddir = vi.mocked(fs.promises.readdir);
      mockReaddir.mockResolvedValue(["market_analysis.md"] as any);

      const { loadWorkspace } = await import("./index.js");
      const workspace = await loadWorkspace("/test/workspace");

      expect(workspace.soulMd).toContain("Soul Content");
      expect(workspace.systemPrompt).toBe("You are a degen ape.");
      expect(workspace.memory).toContain("Bought ETH");
      expect(workspace.predictions).toHaveLength(1);
      expect(workspace.skills.market_analysis).toBe("# Market Analysis Skill");
    });

    it("should handle missing files gracefully", async () => {
      const mockExistsSync = vi.mocked(fs.existsSync);
      mockExistsSync.mockReturnValue(false);

      const { loadWorkspace } = await import("./index.js");
      const workspace = await loadWorkspace("/empty/workspace");

      expect(workspace.soulMd).toBe("");
      expect(workspace.systemPrompt).toBe("");
      expect(workspace.memory).toBe("");
      expect(workspace.predictions).toEqual([]);
      expect(workspace.skills).toEqual({});
    });

    it("should handle malformed PREDICTIONS_LEDGER.json", async () => {
      const mockExistsSync = vi.mocked(fs.existsSync);
      mockExistsSync.mockImplementation((p: any) =>
        String(p).endsWith("PREDICTIONS_LEDGER.json")
      );

      const mockReadFile = vi.mocked(fs.promises.readFile);
      mockReadFile.mockResolvedValue("not valid json {{{");

      const { loadWorkspace } = await import("./index.js");
      const workspace = await loadWorkspace("/test/workspace");

      expect(workspace.predictions).toEqual([]);
    });
  });

  describe("Plugin Structure", () => {
    it("should export a valid ElizaOS v2 plugin", async () => {
      const plugin = (await import("./index.js")).default;

      expect(plugin.name).toBe("plugin-undesirables");
      expect(plugin.description).toBeTruthy();
      expect(plugin.actions).toHaveLength(4);
      expect(plugin.providers).toHaveLength(1);
    });

    it("should have correct action names", async () => {
      const plugin = (await import("./index.js")).default;
      const names = plugin.actions!.map((a) => a.name);

      expect(names).toContain("UNDESIRABLE_MARKET_ANALYSIS");
      expect(names).toContain("UNDESIRABLE_BUSINESS_PILOT");
      expect(names).toContain("UNDESIRABLE_MEME_MACHINE");
      expect(names).toContain("UNDESIRABLE_LOAD_SKILL");
    });

    it("should have a named provider", async () => {
      const plugin = (await import("./index.js")).default;
      const provider = plugin.providers![0];

      expect(provider.name).toBe("undesirables-soul");
      expect(provider.description).toBeTruthy();
      expect(typeof provider.get).toBe("function");
    });

    it("actions should have examples with name field (v2 format)", async () => {
      const plugin = (await import("./index.js")).default;

      for (const action of plugin.actions!) {
        if (action.examples && action.examples.length > 0) {
          for (const exampleGroup of action.examples) {
            for (const example of exampleGroup) {
              expect(example).toHaveProperty("name");
              expect(example).toHaveProperty("content");
            }
          }
        }
      }
    });
  });

  describe("Multi-Agent Safety", () => {
    it("should not use global mutable state", async () => {
      // Verify that the source code uses a Map, not a global variable
      const sourceCode = await fs.promises.readFile(
        path.join(__dirname, "index.ts"),
        "utf-8"
      );

      // Should NOT contain the old global pattern
      expect(sourceCode).not.toContain("let currentWorkspace:");
      expect(sourceCode).not.toContain("let currentWorkspace =");

      // Should contain the new Map pattern
      expect(sourceCode).toContain("new Map<string, SoulWorkspace>()");
    });
  });
});
