import { type CronExecution, type CronExecutionStatus, type CronExecutionTrigger, type CronLogEntry } from "./types";
/** Every string the logs dialog draws. */
export interface ExecutionLogsDialogLabels {
    triggers: Record<CronExecutionTrigger, string>;
    statuses: Partial<Record<CronExecutionStatus, string>>;
    loading: string;
    empty: string;
}
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
/**
 * ExecutionLogsDialog — one execution's header (job, status, trigger, start,
 * duration), its error message and its output. The consumer loads the logs
 * and passes them; lines are tinted by their text, not their stream (stderr
 * is normal progress for most CLIs).
 */
export declare function ExecutionLogsDialog({ execution, onOpenChange, logs, error, formatDate, labels, }: ExecutionLogsDialogProps): import("react").JSX.Element;
