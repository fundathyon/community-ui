import type { HTMLAttributes, ReactNode } from "react";
import { type CronExecution, type CronExecutionStatus, type CronExecutionTrigger, type CronTableState } from "./types";
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
export declare function CronExecutionsTable({ executions, state, onSelect, filtered, emptyAction, formatDate, labels, className, ...props }: CronExecutionsTableProps): import("react").JSX.Element;
