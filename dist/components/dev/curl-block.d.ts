import type { CommandBlockProps } from "./command-block";
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
export declare function buildCurl({ method, url, headers, body }: BuildCurlOptions): string;
export interface CurlBlockProps extends Omit<CommandBlockProps, "command">, BuildCurlOptions {
}
/**
 * CurlBlock — CommandBlock preset that formats a curl request from structured
 * props (method, url, headers, body) instead of a hand-written string, so
 * every curl example in the docs wraps identically (§20).
 */
export declare function CurlBlock({ method, url, headers, body, ...props }: CurlBlockProps): import("react").JSX.Element;
