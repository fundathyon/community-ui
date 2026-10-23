"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { formatDateTime, formatDuration } from "../../lib/format";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../data-table/table";
import { EmptyState } from "../feedback/empty-state";
import { ErrorState } from "../feedback/error-state";
import { Skeleton } from "../feedback/skeleton";
import { ExecutionStatusBadge } from "./execution-status-badge";
import {
  formatExecutionDuration,
  type CronExecution,
  type CronExecutionStatus,
  type CronExecutionTrigger,
  type CronTableState,
} from "./types";

/** Every string the executions table draws. */
export interface CronExecutionsTableLabels {
  job: string;
  status: string;
  trigger: string;
  started: string;
  duration: string;
  triggers: Record<CronExecutionTrigger, string>;
  statuses: Partial<Record<CronExecutionStatus, string>>;
  emptyTitle: string;
  emptyDescription: string;
  noResultsTitle: string;
  errorTitle: string;
  errorDescription: string;
}

const DEFAULT_LABELS: CronExecutionsTableLabels = {
  job: "Job",
  status: "Status",
  trigger: "Trigger",
  started: "Started",
  duration: "Duration",
  triggers: { scheduled: "Scheduled", manual: "Manual", task: "Task" },
  statuses: {},
  emptyTitle: "No executions yet",
  emptyDescription: "Runs appear here as soon as a job fires.",
  noResultsTitle: "No executions match these filters",
  errorTitle: "Executions could not be loaded",
  errorDescription: "Cronify did not answer. Try again in a moment.",
};

export interface CronExecutionsTableProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
  executions: CronExecution[];
  /** @default "ready" */
  state?: CronTableState;
  /** Open an execution (e.g. its logs). Rows become clickable with it. */
  onSelect?: (execution: CronExecution) => void;
  /** Filters are applied: an empty list is "no results", not "nothing yet" (§11). */
  filtered?: boolean;
  /** Exit of the empty / no-results state (§11): "Run a job", "Clear filters"… */
  emptyAction?: ReactNode;
  /** Start time of each row. Defaults to the library's date-time format. */
  formatDate?: (iso: string) => string;
  /** Copy overrides (i18n). Defaults are English. */
  labels?: Partial<CronExecutionsTableLabels>;
}

/**
 * CronExecutionsTable — the run history of a Cronify app: job, status,
 * trigger, start and duration, newest first as given. Presentational: the
 * consumer loads, filters and paginates. Pair it with ExecutionLogsDialog
 * through `onSelect`.
 */
export function CronExecutionsTable({
  executions,
  state = "ready",
  onSelect,
  filtered = false,
  emptyAction,
  formatDate = (iso) => formatDateTime(iso),
  labels,
  className,
  ...props
}: CronExecutionsTableProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  if (state === "error") {
    return <ErrorState title={t.errorTitle} description={t.errorDescription} className={className} {...props} />;
  }
  if (state === "loading") {
    return (
      <div aria-busy="true" className={cn("flex flex-col gap-2", className)} {...props}>
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    );
  }
  if (executions.length === 0) {
    return (
      <EmptyState
        kind={filtered ? "no-results" : "empty"}
        title={filtered ? t.noResultsTitle : t.emptyTitle}
        description={filtered ? undefined : t.emptyDescription}
        action={emptyAction}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div className={className} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.job}</TableHead>
            <TableHead>{t.status}</TableHead>
            <TableHead>{t.trigger}</TableHead>
            <TableHead>{t.started}</TableHead>
            <TableHead align="right">{t.duration}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {executions.map((ex) => (
            <TableRow
              key={ex.id}
              data-execution-id={ex.id}
              interactive={Boolean(onSelect)}
              onClick={onSelect ? () => onSelect(ex) : undefined}
            >
              <TableCell className="font-medium text-text">
                {onSelect ? (
                  // The row is the mouse target; this button is the keyboard one.
                  <button
                    type="button"
                    className="text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(ex);
                    }}
                  >
                    {ex.jobName}
                  </button>
                ) : (
                  ex.jobName
                )}
              </TableCell>
              <TableCell>
                <ExecutionStatusBadge status={ex.status} labels={t.statuses} />
              </TableCell>
              <TableCell className="text-text-muted">{t.triggers[ex.trigger] ?? ex.trigger}</TableCell>
              <TableCell className="tabular-nums">{formatDate(ex.startedAt ?? ex.createdAt)}</TableCell>
              <TableCell align="right" className="tabular-nums">
                {formatExecutionDuration(ex.durationMs, formatDuration)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
