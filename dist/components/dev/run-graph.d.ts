import { type HTMLAttributes, type ReactNode } from "react";
import { type PipelineStatus, type RunJob } from "./run-status";
export interface RunGraphProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
    jobs: RunJob[];
    /** Pipeline file shown in the header; only its basename is drawn. @default "pipeline" */
    file?: string;
    /** What started the run, e.g. "push · v1.4.2". */
    trigger?: ReactNode;
    /** Name of the selected job (controlled). */
    selected?: string | null;
    /** Click on a job card. Without it the cards are not interactive. */
    onSelect?: (name: string) => void;
    /** Copy overrides per status (i18n); they name each card's marker. */
    statusLabels?: Partial<Record<PipelineStatus, string>>;
    /** Text on the right of each card. Defaults to the elapsed time of finished jobs. */
    durationLabel?: (job: RunJob) => string;
}
/**
 * RunGraph — the jobs of a CI run as GitHub Actions draws them: one column per
 * stage, one card per job with its status and duration, and a curve for every
 * `needs` edge (highlighted around the selected job). Use it on run detail
 * pages; for a flat list of runs use a Table with RunStatusBadge.
 *
 * The edges are measured in the DOM, so this is a client component.
 */
export declare function RunGraph({ jobs, file, trigger, selected, onSelect, statusLabels, durationLabel, className, ...props }: RunGraphProps): import("react").JSX.Element | null;
