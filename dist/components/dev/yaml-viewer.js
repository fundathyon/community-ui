import { jsx as _jsx } from "react/jsx-runtime";
import { CodeBlock } from "./code-block";
function maskYamlSecrets(yaml, secretKeys) {
    if (!secretKeys || secretKeys.length === 0)
        return yaml;
    const secret = new Set(secretKeys.map((k) => k.toLowerCase()));
    return yaml
        .split("\n")
        .map((line) => {
        const m = line.match(/^(\s*(?:- )?)([\w.$/-]+)(\s*:\s+)(.+)$/);
        if (!m)
            return line;
        const key = m[2];
        const value = m[4];
        if (key === undefined || value === undefined)
            return line;
        if (!secret.has(key.toLowerCase()))
            return line;
        if (!value.trim() || value.trim().startsWith("#"))
            return line;
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
export function YamlViewer({ yaml, secretKeys, ...props }) {
    return _jsx(CodeBlock, { language: "yaml", code: maskYamlSecrets(yaml, secretKeys), ...props });
}
