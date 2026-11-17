"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Ellipsis, Play } from "lucide-react";
import { cn } from "../../lib/cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../actions/dropdown-menu";
import { IconButton } from "../actions/icon-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../data-table/table";
import { Badge } from "../feedback/badge";
import { EmptyState } from "../feedback/empty-state";
import { ErrorState } from "../feedback/error-state";
import { Skeleton } from "../feedback/skeleton";
import { Switch } from "../forms/switch";
import { CRON_PRESETS, describeSchedule } from "./schedule";
const DEFAULT_LABELS = {
    name: "Name",
    schedule: "Schedule",
    target: "Target",
    enabled: "Enabled",
    actions: "Actions",
    manual: "Manual",
    on: "On",
    off: "Off",
    enable: "Enable {name}",
    run: "Run now",
    more: "More actions",
    emptyTitle: "No jobs yet",
    emptyDescription: "Create one so Cronify calls a URL of your API as often as you choose.",
    errorTitle: "Jobs could not be loaded",
    errorDescription: "Cronify did not answer. Try again in a moment.",
    presets: CRON_PRESETS,
};
/**
 * CronJobsTable — a Cronify app's jobs: name, schedule (preset name or raw
 * expression), target, enabled switch and actions. Presentational: data and
 * actions come in through props, so the admin loads them and a landing can
 * pass sample jobs. For the history of runs use CronExecutionsTable.
 */
export function CronJobsTable({ jobs, state = "ready", onToggle, onRun, busyId = null, rowActions, emptyAction, labels, className, ...props }) {
    const t = { ...DEFAULT_LABELS, ...labels };
    const hasActions = Boolean(onRun || rowActions);
    if (state === "error") {
        return _jsx(ErrorState, { title: t.errorTitle, description: t.errorDescription, className: className, ...props });
    }
    if (state === "loading") {
        return (_jsx("div", { "aria-busy": "true", className: cn("flex flex-col gap-2", className), ...props, children: Array.from({ length: 3 }, (_, i) => (_jsx(Skeleton, { className: "h-12 w-full rounded-md" }, i))) }));
    }
    if (jobs.length === 0) {
        return (_jsx(EmptyState, { title: t.emptyTitle, description: t.emptyDescription, action: emptyAction, className: className, ...props }));
    }
    return (_jsx("div", { className: className, ...props, children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: t.name }), _jsx(TableHead, { children: t.schedule }), _jsx(TableHead, { children: t.target }), _jsx(TableHead, { className: "w-20", children: t.enabled }), hasActions && (_jsx(TableHead, { align: "right", className: "w-24", children: t.actions }))] }) }), _jsx(TableBody, { children: jobs.map((job) => {
                        const described = describeSchedule(job.schedule, { presets: t.presets, manualLabel: t.manual });
                        const named = Boolean(job.schedule) && described !== job.schedule;
                        const busy = busyId === job.id;
                        return (_jsxs(TableRow, { "data-job-id": job.id, children: [_jsxs(TableCell, { children: [_jsx("div", { className: "font-medium text-text", children: job.name }), job.description && _jsx("div", { className: "text-body-sm text-text-muted", children: job.description })] }), _jsx(TableCell, { children: named ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-body", children: described }), _jsx("code", { className: "font-mono text-code text-text-muted", children: job.schedule })] })) : job.schedule ? (_jsx("code", { className: "font-mono text-code", children: job.schedule })) : (_jsx("span", { className: "text-body text-text-muted", children: described })) }), _jsx(TableCell, { className: "max-w-80", children: job.http ? (_jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [_jsx(Badge, { variant: "outline", className: "font-mono", children: job.http.method || "GET" }), _jsx("span", { className: "truncate font-mono text-code", children: job.http.url })] })) : (_jsx(Badge, { variant: "tonal", children: job.type })) }), _jsx(TableCell, { children: onToggle ? (_jsx(Switch, { checked: job.enabled, disabled: busy, onCheckedChange: (v) => onToggle(job, v), label: _jsx("span", { className: "sr-only", children: t.enable.replace("{name}", job.name) }) })) : (_jsx(Badge, { variant: job.enabled ? "tonal" : "outline", tone: job.enabled ? "success" : undefined, children: job.enabled ? t.on : t.off })) }), hasActions && (_jsx(TableCell, { align: "right", children: _jsxs("div", { className: "flex justify-end gap-1", children: [onRun && (_jsx(IconButton, { icon: Play, label: t.run, variant: "ghost", size: "sm", loading: busy, onClick: () => onRun(job) })), rowActions && (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { render: _jsx(IconButton, { icon: Ellipsis, label: t.more, variant: "ghost", size: "sm" }) }), _jsx(DropdownMenuContent, { align: "end", children: rowActions(job) })] }))] }) }))] }, job.id));
                    }) })] }) }));
}
