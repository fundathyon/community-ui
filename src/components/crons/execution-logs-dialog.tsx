"use client";

import { cn } from "../../lib/cn";
import { formatDateTime, formatDuration } from "../../lib/format";
import { Spinner } from "../feedback/spinner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../overlays/dialog";
import { ExecutionStatusBadge } from "./execution-status-badge";
import { logLineTone } from "./log-lines";
import {
  formatExecutionDuration,
  type CronExecution,
  type CronExecutionStatus,
  type CronExecutionTrigger,
  type CronLogEntry,
} from "./types";

/** Every string the logs dialog draws. */
export interface ExecutionLogsDialogLabels {
  triggers: Record<CronExecutionTrigger, string>;
  statuses: Partial<Record<CronExecutionStatus, string>>;
  loading: string;
  empty: string;
}

const DEFAULT_LABELS: ExecutionLogsDialogLabels = {
  triggers: { scheduled: "Scheduled run", manual: "Manual run", task: "Task run" },
  statuses: {},
  loading: "Loading output…",
  empty: "This execution left no output.",
};

export interface ExecutionLogsDialogProps {
  /** The execution to show; `null` closes the dialog. */
  execution: CronExecution | null;
  onOpenChange: (open: boolean) => void;
  /** Output lines; `null` while they load. */
  logs: CronLogEntry[] | null;
  /** Load error, shown in place of the output. */
  error?: string | null;
  formatDate?: (iso: string) => string;
  /** Copy overrides (i18n). Defaults are English. */
  labels?: Partial<ExecutionLogsDialogLabels>;
}

const TONE_CLASS = { default: "", warning: "text-warning", danger: "text-danger" } as const;

/**
 * ExecutionLogsDialog — one execution's header (job, status, trigger, start,
 * duration), its error message and its output. The consumer loads the logs
 * and passes them; lines are tinted by their text, not their stream (stderr
 * is normal progress for most CLIs).
 */
export function ExecutionLogsDialog({
  execution,
  onOpenChange,
  logs,
  error = null,
  formatDate = (iso) => formatDateTime(iso),
  labels,
}: ExecutionLogsDialogProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  return (
    <Dialog open={execution !== null} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        {execution && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {execution.jobName}
                <ExecutionStatusBadge status={execution.status} labels={t.statuses} />
              </DialogTitle>
              <DialogDescription>
                {t.triggers[execution.trigger] ?? execution.trigger} · {formatDate(execution.startedAt ?? execution.createdAt)} ·{" "}
                {formatExecutionDuration(execution.durationMs, formatDuration)}
              </DialogDescription>
            </DialogHeader>

            {execution.errorMessage && (
              <p role="alert" className="rounded-md border border-danger-border bg-danger-bg p-3 text-body text-danger">
                {execution.errorMessage}
              </p>
            )}

            <div
              aria-busy={logs === null && !error}
              className="max-h-[50vh] overflow-auto rounded-lg border border-border bg-bg-subtle p-3 font-mono text-code"
            >
              {error ? (
                <p role="alert" className="text-danger">
                  {error}
                </p>
              ) : logs === null ? (
                <div role="status" className="flex items-center gap-2 text-text-muted">
                  <Spinner size={14} label={null} /> {t.loading}
                </div>
              ) : logs.length === 0 ? (
                <p className="text-text-muted">{t.empty}</p>
              ) : (
                logs.map((l) => (
                  <pre
                    key={l.id}
                    className={cn(
                      "whitespace-pre-wrap break-words",
                      l.stream === "system" ? "text-text-muted" : TONE_CLASS[logLineTone(l.message)],
                    )}
                  >
                    {l.message}
                  </pre>
                ))
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
