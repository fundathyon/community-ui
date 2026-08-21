import type { CodeBlockProps } from "./code-block";
export interface YamlViewerProps extends Omit<CodeBlockProps, "children" | "code" | "language" | "variant"> {
    /** The YAML source. */
    yaml: string;
    /**
     * Keys (case-insensitive) whose scalar values are replaced with "••••••••••••"
     * BEFORE rendering — the masked text is also what gets copied, so a secret
     * never leaves through the clipboard (§20).
     */
    secretKeys?: string[];
}
/**
 * YamlViewer — highlighted YAML view (§20): a CodeBlock preset (keys accent,
 * strings success, comments muted) with optional line-wise secret masking.
 * Masking is applied before highlighting, so display AND copy see only
 * "key: ••••••••••••" for every key in `secretKeys`.
 */
export declare function YamlViewer({ yaml, secretKeys, ...props }: YamlViewerProps): import("react").JSX.Element;
