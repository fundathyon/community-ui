import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
function splitLines(text) {
    return text.replace(/\n$/, "").split("\n");
}
/** Line-level LCS diff — fine at the file sizes docs and audit views use (§20). */
function computeDiff(before, after) {
    const a = splitLines(before);
    const b = splitLines(after);
    const n = a.length;
    const m = b.length;
    const width = m + 1;
    // dp[i][j] = LCS length of a[i..] / b[j..]
    const dp = new Uint32Array((n + 1) * (m + 1));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            dp[i * width + j] =
                a[i] === b[j]
                    ? (dp[(i + 1) * width + j + 1] ?? 0) + 1
                    : Math.max(dp[(i + 1) * width + j] ?? 0, dp[i * width + j + 1] ?? 0);
        }
    }
    const lines = [];
    let i = 0;
    let j = 0;
    let oldLine = 1;
    let newLine = 1;
    while (i < n && j < m) {
        if (a[i] === b[j]) {
            lines.push({ type: "context", text: a[i] ?? "", oldLine: oldLine++, newLine: newLine++ });
            i++;
            j++;
        }
        else if ((dp[(i + 1) * width + j] ?? 0) >= (dp[i * width + j + 1] ?? 0)) {
            lines.push({ type: "removed", text: a[i] ?? "", oldLine: oldLine++ });
            i++;
        }
        else {
            lines.push({ type: "added", text: b[j] ?? "", newLine: newLine++ });
            j++;
        }
    }
    while (i < n) {
        lines.push({ type: "removed", text: a[i] ?? "", oldLine: oldLine++ });
        i++;
    }
    while (j < m) {
        lines.push({ type: "added", text: b[j] ?? "", newLine: newLine++ });
        j++;
    }
    return lines;
}
function parseUnifiedDiff(diff) {
    const lines = [];
    let oldLine = 1;
    let newLine = 1;
    for (const raw of splitLines(diff)) {
        if (raw.startsWith("diff ") ||
            raw.startsWith("index ") ||
            raw.startsWith("+++") ||
            raw.startsWith("---") ||
            raw.startsWith("\\")) {
            continue;
        }
        const hunk = raw.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
        if (hunk) {
            oldLine = Number(hunk[1]);
            newLine = Number(hunk[2]);
            lines.push({ type: "hunk", text: raw });
            continue;
        }
        if (raw.startsWith("+")) {
            lines.push({ type: "added", text: raw.slice(1), newLine: newLine++ });
            continue;
        }
        if (raw.startsWith("-")) {
            lines.push({ type: "removed", text: raw.slice(1), oldLine: oldLine++ });
            continue;
        }
        lines.push({
            type: "context",
            text: raw.startsWith(" ") ? raw.slice(1) : raw,
            oldLine: oldLine++,
            newLine: newLine++,
        });
    }
    return lines;
}
/**
 * DiffViewer — what changed between two versions (§20, §24): removed lines on
 * danger-bg with a "−" gutter, added on success-bg with "+", context plain.
 * Color never carries the meaning alone — the gutter sign and an sr-only
 * prefix say it too (§M-01). Accepts a unified diff or before/after strings.
 * Line-level only: the DS needs shape, not word-level noise.
 */
export const DiffViewer = forwardRef(function DiffViewer({ diff, before, after, filename, versionFrom, versionTo, lineNumbers = false, className, ...props }, ref) {
    const lines = diff !== undefined
        ? parseUnifiedDiff(diff)
        : before !== undefined && after !== undefined
            ? computeDiff(before, after)
            : [];
    const hasVersions = Boolean(versionFrom || versionTo);
    return (_jsxs("div", { ref: ref, className: cn("overflow-hidden rounded-lg border border-border bg-bg-subtle", className), ...props, children: [(filename || hasVersions) && (_jsxs("div", { className: "flex items-center gap-2 border-b border-border px-3 py-1.5 font-mono text-caption", children: [filename && _jsx("span", { className: "text-text-secondary", children: filename }), hasVersions && (_jsxs("span", { className: "text-text-muted", children: [filename ? "· " : "", versionFrom, versionFrom && versionTo ? " → " : "", versionTo] }))] })), _jsx("div", { className: "overflow-x-auto", children: _jsx("div", { className: "w-max min-w-full py-2 font-mono text-code text-text", children: lines.map((line, index) => line.type === "hunk" ? (_jsx("div", { "data-diff": "hunk", className: "whitespace-pre px-3 py-px text-text-muted", children: line.text }, index)) : (_jsxs("div", { "data-diff": line.type, className: cn("flex", line.type === "added" && "bg-success-bg", line.type === "removed" && "bg-danger-bg"), children: [lineNumbers && (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": true, className: "w-8 shrink-0 select-none pr-2 text-right text-text-muted tabular-nums", children: line.oldLine ?? "" }), _jsx("span", { "aria-hidden": true, className: "w-8 shrink-0 select-none pr-2 text-right text-text-muted tabular-nums", children: line.newLine ?? "" })] })), _jsx("span", { "aria-hidden": true, className: cn("w-6 shrink-0 select-none text-center", line.type === "added" && "text-success", line.type === "removed" && "text-danger"), children: line.type === "added" ? "+" : line.type === "removed" ? "−" : "" }), _jsx("span", { className: "sr-only", children: line.type === "added" ? "Added: " : line.type === "removed" ? "Removed: " : "" }), _jsx("span", { className: "whitespace-pre pr-3", children: line.text || " " })] }, index))) }) })] }));
});
