"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { formatDuration } from "../../lib/format";
import { RUN_STATUS_LABELS, RunStatusGlyph } from "./run-status";
/** The plan's stages in order: each one is a column. */
function columns(jobs) {
    const byStage = new Map();
    for (const job of jobs) {
        const list = byStage.get(job.stage) ?? [];
        list.push(job);
        byStage.set(job.stage, list);
    }
    return [...byStage.entries()].sort(([a], [b]) => a - b).map(([, list]) => list);
}
// Only finished jobs: a running job's elapsed time depends on "now", which
// differs between server and client render. Pass `durationLabel` for it.
function defaultDuration(job) {
    if (!job.startedAt || !job.finishedAt)
        return "—";
    return formatDuration(Date.parse(job.finishedAt) - Date.parse(job.startedAt));
}
/**
 * RunGraph — the jobs of a CI run as GitHub Actions draws them: one column per
 * stage, one card per job with its status and duration, and a curve for every
 * `needs` edge (highlighted around the selected job). Use it on run detail
 * pages; for a flat list of runs use a Table with RunStatusBadge.
 *
 * The edges are measured in the DOM, so this is a client component.
 */
export function RunGraph({ jobs, file, trigger, selected = null, onSelect, statusLabels, durationLabel = defaultDuration, className, ...props }) {
    const container = useRef(null);
    const cards = useRef(new Map());
    const [paths, setPaths] = useState([]);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const cols = useMemo(() => columns(jobs), [jobs]);
    const edges = useMemo(() => {
        const names = new Set(jobs.map((j) => j.name));
        return jobs.flatMap((j) => (j.needs ?? []).filter((n) => names.has(n)).map((n) => ({ from: n, to: j.name })));
    }, [jobs]);
    // Cards change height with their text and the graph with the page width,
    // so the curves are measured rather than computed.
    const measure = useCallback(() => {
        const root = container.current;
        if (!root)
            return;
        const box = root.getBoundingClientRect();
        setSize({ width: root.scrollWidth, height: root.scrollHeight });
        const next = [];
        for (const e of edges) {
            const a = cards.current.get(e.from)?.getBoundingClientRect();
            const b = cards.current.get(e.to)?.getBoundingClientRect();
            if (!a || !b)
                continue;
            const x1 = a.right - box.left + root.scrollLeft;
            const y1 = a.top + a.height / 2 - box.top;
            const x2 = b.left - box.left + root.scrollLeft;
            const y2 = b.top + b.height / 2 - box.top;
            const mid = (x1 + x2) / 2;
            next.push({
                key: `${e.from}->${e.to}`,
                d: `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`,
                x1,
                y1,
                x2,
                y2,
                active: selected === e.from || selected === e.to,
            });
        }
        setPaths(next);
    }, [edges, selected]);
    useLayoutEffect(() => {
        measure();
        const root = container.current;
        if (!root || typeof ResizeObserver === "undefined")
            return;
        const observer = new ResizeObserver(() => measure());
        observer.observe(root);
        return () => observer.disconnect();
    }, [measure, jobs]);
    if (jobs.length === 0)
        return null;
    const label = (status) => statusLabels?.[status] ?? RUN_STATUS_LABELS[status];
    return (_jsxs("div", { className: cn("rounded-xl border border-border bg-surface", className), ...props, children: [_jsxs("div", { className: "flex flex-wrap items-baseline gap-x-2 border-b border-border px-4 py-3", children: [_jsx("span", { className: "font-mono text-code font-medium text-text", children: file?.split("/").pop() ?? "pipeline" }), trigger && _jsx("span", { className: "text-body-sm text-text-muted", children: trigger })] }), _jsxs("div", { ref: container, className: "relative overflow-x-auto px-4 py-6", children: [_jsx("svg", { "aria-hidden": true, className: "pointer-events-none absolute left-0 top-0 text-border-strong", width: size.width, height: size.height, children: paths.map((p) => (_jsxs("g", { className: p.active ? "text-accent" : undefined, children: [_jsx("path", { d: p.d, fill: "none", stroke: "currentColor", strokeWidth: p.active ? 2 : 1.5 }), _jsx("circle", { cx: p.x1, cy: p.y1, r: 3, fill: "currentColor" }), _jsx("circle", { cx: p.x2, cy: p.y2, r: 3, fill: "currentColor" })] }, p.key))) }), _jsx("div", { className: "relative flex w-max items-start gap-16", children: cols.map((col, i) => (_jsx("div", { className: "flex flex-col gap-3", children: col.map((job) => {
                                const isSelected = selected === job.name;
                                const body = (_jsxs(_Fragment, { children: [_jsx(RunStatusGlyph, { status: job.status, label: label(job.status) }), _jsx("span", { className: "min-w-0 flex-1 truncate font-medium", children: job.name }), _jsx("span", { className: "shrink-0 text-body-sm tabular-nums text-text-muted", children: durationLabel(job) })] }));
                                const card = cn("flex w-56 items-center gap-2 rounded-md border border-border bg-bg px-3 py-2.5 text-left text-body text-text shadow-xs", isSelected && "border-accent-solid ring-1 ring-accent-solid");
                                const ref = (el) => {
                                    if (el)
                                        cards.current.set(job.name, el);
                                    else
                                        cards.current.delete(job.name);
                                };
                                return onSelect ? (_jsx("button", { ref: ref, type: "button", onClick: () => onSelect(job.name), "aria-pressed": isSelected, className: cn(card, "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover"), children: body }, job.name)) : (_jsx("div", { ref: ref, className: card, children: body }, job.name));
                            }) }, i))) })] })] }));
}
