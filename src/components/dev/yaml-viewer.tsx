import type { CodeBlockProps } from "./code-block";
import { CodeBlock } from "./code-block";

export interface YamlViewerProps
  extends Omit<CodeBlockProps, "children" | "code" | "language" | "variant"> {
  /** The YAML source. */
  yaml: string;
  /**
   * Keys (case-insensitive) whose scalar values are replaced with "••••••••••••"
   * BEFORE rendering — the masked text is also what gets copied, so a secret
   * never leaves through the clipboard (§20).
   */
  secretKeys?: string[];
}

function maskYamlSecrets(yaml: string, secretKeys?: string[]): string {
  if (!secretKeys || secretKeys.length === 0) return yaml;
  const secret = new Set(secretKeys.map((k) => k.toLowerCase()));
  return yaml
    .split("\n")
    .map((line) => {
      const m = line.match(/^(\s*(?:- )?)([\w.$/-]+)(\s*:\s+)(.+)$/);
      if (!m) return line;
      const key = m[2];
      const value = m[4];
      if (key === undefined || value === undefined) return line;
      if (!secret.has(key.toLowerCase())) return line;
      if (!value.trim() || value.trim().startsWith("#")) return line;
      return `${m[1] ?? ""}${key}${m[3] ?? ""}••••••••••••`;
    })
    .join("\n");
}

/**
 * YamlViewer — highlighted YAML view (§20): a CodeBlock preset (keys accent,
 * strings success, comments muted) with optional line-wise secret masking.
 * Masking is applied before highlighting, so display AND copy see only
 * "key: ••••••••••••" for every key in `secretKeys`.
 */
export function YamlViewer({ yaml, secretKeys, ...props }: YamlViewerProps) {
  return <CodeBlock language="yaml" code={maskYamlSecrets(yaml, secretKeys)} {...props} />;
}
