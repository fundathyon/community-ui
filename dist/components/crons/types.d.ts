/** What a job runs. Only `http` has a target to draw. */
export type CronJobType = "http" | "shell" | "script";
/** A Cronify job as the tables draw it. Dates are ISO strings. */
export interface CronJob {
    id: string;
    name: string;
    description?: string;
    enabled: boolean;
    type: CronJobType;
    /** 5-field cron expression or @descriptor. Empty → manual only. */
    schedule?: string;
    /** Target of an `http` job. */
    http?: {
        method: string;
        url: string;
    };
}
/** Status of one execution of a job. */
export type CronExecutionStatus = "pending" | "running" | "success" | "failed" | "timeout" | "interrupted";
/** What started an execution. */
export type CronExecutionTrigger = "scheduled" | "manual" | "task";
/** One execution of a job. */
export interface CronExecution {
    id: string;
    jobName: string;
    status: CronExecutionStatus;
    trigger: CronExecutionTrigger;
    startedAt?: string;
    createdAt: string;
    durationMs?: number;
    errorMessage?: string;
}
/** One line of an execution's output. */
export interface CronLogEntry {
    id: string;
    stream: "stdout" | "stderr" | "system";
    message: string;
    timestamp?: string;
}
/** Shared state vocabulary of the crons tables. */
export type CronTableState = "ready" | "loading" | "error";
/** Duration of an execution: ms under a second, like HttpResponse. */
export declare function formatExecutionDuration(ms: number | undefined, format: (ms: number) => string): string;
