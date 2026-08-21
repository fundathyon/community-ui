import { jsx as _jsx } from "react/jsx-runtime";
import { CommandBlock } from "./command-block";
/**
 * Build a pretty multi-line curl command with `\` continuations: method,
 * one `-H` per header, `-d` body, URL last — the §20 docs format.
 */
export function buildCurl({ method, url, headers, body }) {
    const parts = [];
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
    if (parts.length <= 2)
        return parts.join(" ");
    return parts.join(" \\\n  ");
}
/**
 * CurlBlock — CommandBlock preset that formats a curl request from structured
 * props (method, url, headers, body) instead of a hand-written string, so
 * every curl example in the docs wraps identically (§20).
 */
export function CurlBlock({ method, url, headers, body, ...props }) {
    return _jsx(CommandBlock, { command: buildCurl({ method, url, headers, body }), ...props });
}
