import { Children, isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { CopyButton } from "./copy-button";

export type TerminalLineKind = "input" | "output" | "comment";

export interface TerminalLineProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: ReactNode;
  /** input (typed command, gets the prompt) · output · comment. */
  kind?: TerminalLineKind;
  /** Prompt glyph for input lines — select-none, excluded from copy. */
  prompt?: string;
}

const kindClass: Record<TerminalLineKind, string> = {
  input: "text-text",
  output: "text-text-secondary",
  comment: "text-text-muted",
};

/**
 * TerminalLine — one line inside a Terminal. Input lines render their prompt
 * as a non-selectable span so a manual text selection never drags a "$" along.
 */
export function TerminalLine({ kind = "input", prompt = "$", className, children, ...props }: TerminalLineProps) {
  return (
    <div className={cn("flex", kindClass[kind], className)} {...props}>
      {kind === "input" && (
        <span aria-hidden className="select-none pr-2 text-text-muted">
          {prompt}
        </span>
      )}
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
  /** Header title, mono caption ("~/project"). */
  title?: string;
  /** Copies the INPUT lines only — never prompts, never output (§20). */
  copy?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
}

function collectInputLines(children: ReactNode): string {
  const lines: string[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement<TerminalLineProps>(child) || child.type !== TerminalLine) return;
    const { kind = "input", children: content } = child.props;
    if (kind !== "input") return;
    if (typeof content === "string" || typeof content === "number") lines.push(String(content));
  });
  return lines.join("\n");
}

/**
 * Terminal — a session frame (§20): three muted dots, a mono title and a
 * darker body of TerminalLine children. Use it to show an interaction —
 * commands AND their output. For a copy-pasteable command on its own, use
 * CommandBlock. The copy button reproduces only what the user would type.
 */
export function Terminal({
  title,
  copy = true,
  copyLabel = "Copy commands",
  copiedLabel = "Copied",
  className,
  children,
  ...props
}: TerminalProps) {
  const input = collectInputLines(children);
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-bg", className)} {...props}>
      <div className="flex min-h-7 items-center gap-2 border-b border-border bg-bg-subtle px-3 py-1">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
        </span>
        {title && <span className="font-mono text-caption text-text-muted">{title}</span>}
        {copy && input && (
          <CopyButton value={input} label={copyLabel} copiedLabel={copiedLabel} size={14} className="ml-auto" />
        )}
      </div>
      <div className="overflow-x-auto p-3 font-mono text-code">
        <div className="w-max min-w-full">{children}</div>
      </div>
    </div>
  );
}
