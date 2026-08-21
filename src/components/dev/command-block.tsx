import type { CodeBlockProps } from "./code-block";
import { CodeBlock } from "./code-block";

export interface CommandBlockProps
  extends Omit<
    CodeBlockProps,
    "children" | "code" | "language" | "variant" | "tabs" | "activeTab" | "defaultActiveTab" | "onActiveTabChange" | "tabsLabel"
  > {
  /** One command, or several — one per line. Written WITHOUT the "$" prompt. */
  command: string | string[];
}

/**
 * CommandBlock — CodeBlock preset for shell commands (§20): `variant="command"`,
 * bash highlighting, the "$" prompt rendered select-none and excluded from
 * copy. Use it wherever docs say "run this".
 */
export function CommandBlock({ command, ...props }: CommandBlockProps) {
  return (
    <CodeBlock
      variant="command"
      language="bash"
      code={Array.isArray(command) ? command.join("\n") : command}
      {...props}
    />
  );
}
