import type { CommandBlockProps } from "./command-block";
import { CommandBlock } from "./command-block";

export interface BuildCurlOptions {
  /** HTTP method; `-X` is emitted only when it differs from GET. */
  method?: string;
  url: string;
  headers?: Record<string, string>;
  /** Request body — strings pass through, anything else is JSON-stringified. */
  body?: unknown;
}

/**
 * Build a pretty multi-line curl command with `\` continuations: method,
 * one `-H` per header, `-d` body, URL last — the §20 docs format.
 */
export function buildCurl({ method, url, headers, body }: BuildCurlOptions): string {
  const parts: string[] = [];
  const verb = method?.toUpperCase();
  parts.push(verb && verb !== "GET" ? `curl -X ${verb}` : "curl");
  for (const [name, value] of Object.entries(headers ?? {})) {
    parts.push(`-H "${name}: ${value}"`);
  }
  if (body !== undefined) {
    const raw = typeof body === "string" ? body : JSON.stringify(body);
    parts.push(`-d '${(raw ?? "").replace(/'/g, `'\\''`)}'`);
  }
  parts.push(url);
  if (parts.length <= 2) return parts.join(" ");
  return parts.join(" \\\n  ");
}

export interface CurlBlockProps extends Omit<CommandBlockProps, "command">, BuildCurlOptions {}

/**
 * CurlBlock — CommandBlock preset that formats a curl request from structured
 * props (method, url, headers, body) instead of a hand-written string, so
 * every curl example in the docs wraps identically (§20).
 */
export function CurlBlock({ method, url, headers, body, ...props }: CurlBlockProps) {
  return <CommandBlock command={buildCurl({ method, url, headers, body })} {...props} />;
}
