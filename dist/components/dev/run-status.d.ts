import type { ReactNode } from "react";
import { type StatusKey } from "../../lib/status";
/** Status of a CI run (Foundathyon Pipelines). */
export type RunStatus = "pending" | "scheduled" | "provisioning" | "running" | "succeeded" | "failed" | "cancelled" | "timed_out" | "rejected";
/** Status of a job or step inside a run. */
export type JobStatus = "pending" | "running" | "succeeded" | "failed" | "cancelled" | "skipped";
/** Any run or job status. */
export type PipelineStatus = RunStatus | JobStatus;
/** One step of a job. Dates are ISO strings. */
export interface RunStep {
    index: number;
    name: string;
    status: JobStatus;
    exitCode?: number;
    startedAt?: string;
    finishedAt?: string;
}
/** One job of a run: its stage is its column; `needs` draws the edges. */
export interface RunJob {
    name: string;
    stage: number;
    needs?: string[];
    image?: string;
    status: JobStatus;
    exitCode?: number;
    startedAt?: string;
    finishedAt?: string;
    steps?: RunStep[];
}
/** Default English copy per status; products pass their own via `labels`. */
export declare const RUN_STATUS_LABELS: Record<PipelineStatus, string>;
/** The §19 state a pipeline status renders as. */
export declare function runStatusKey(status: PipelineStatus): StatusKey;
export interface RunStatusBadgeProps {
    status: PipelineStatus;
    /** Copy overrides per status (i18n). */
    labels?: Partial<Record<PipelineStatus, ReactNode>>;
    className?: string;
}
/**
 * RunStatusBadge — the status of a CI run or job as a badge. It is StatusBadge
 * (§19) with the pipeline vocabulary mapped onto the suite states, so only the
 * copy differs. For the bare marker inside a job card, RunGraph draws it.
 *
 * Server-component safe.
 */
export declare function RunStatusBadge({ status, labels, className }: RunStatusBadgeProps): import("react").JSX.Element;
/** The state's marker alone (icon, spinner or dot), labelled. Not exported. */
export declare function RunStatusGlyph({ status, label }: {
    status: PipelineStatus;
    label: string;
}): import("react").JSX.Element;
