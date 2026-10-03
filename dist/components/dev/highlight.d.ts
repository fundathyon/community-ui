/**
 * Internal line-based tokenizer for CodeBlock (§20).
 *
 * The design system mandates THREE semantic colors for code — accent for the
 * verb/keyword, success for strings, normal text for the rest (text-muted for
 * comments/punctuation) — not a full syntax palette that would compete with
 * the UI. That rule is why this module exists instead of an external
 * highlighter: a tiny per-line scanner is all the fidelity §20 allows.
 *
 * Not exported from the domain barrel — only `CodeLanguage` leaves this file
 * (re-exported through code-block.tsx).
 */
/** Languages the §20 tokenizer understands. Unknown values render as plain text. */
export type CodeLanguage = "bash" | "json" | "yaml" | "toml" | "http" | "text" | (string & {});
export type TokenKind = "plain" | "keyword" | "string" | "comment" | "muted" | "number";
export interface CodeToken {
    text: string;
    kind: TokenKind;
}
/**
 * Kind → token-mapped utility class (§20): keyword=accent, string=success,
 * comment/punctuation=text-muted, primitives/vars=info. No italics (§03).
 */
export declare const TOKEN_CLASS: Record<TokenKind, string>;
/**
 * Tokenize `code` into per-line token arrays. One entry per line; empty lines
 * yield an empty array. State across lines is minimal by design: bash `\`
 * continuations (the next line is not a new command) and the blank line that
 * separates HTTP headers from the body (tokenized as JSON afterwards).
 */
export declare function tokenize(code: string, language?: CodeLanguage): CodeToken[][];
