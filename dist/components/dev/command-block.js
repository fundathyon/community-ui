import { jsx as _jsx } from "react/jsx-runtime";
import { CodeBlock } from "./code-block";
/**
 * CommandBlock — CodeBlock preset for shell commands (§20): `variant="command"`,
 * bash highlighting, the "$" prompt rendered select-none and excluded from
 * copy. Use it wherever docs say "run this".
 */
export function CommandBlock({ command, ...props }) {
    return (_jsx(CodeBlock, { variant: "command", language: "bash", code: Array.isArray(command) ? command.join("\n") : command, ...props }));
}
