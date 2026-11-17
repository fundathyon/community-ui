import type { HTMLAttributes, ReactNode } from "react";
import { type CronPreset } from "./schedule";
import type { CronJob, CronTableState } from "./types";
/** Every string the jobs table draws. `{name}` is the job's name. */
export interface CronJobsTableLabels {
    name: string;
    schedule: string;
    target: string;
    enabled: string;
    actions: string;
    manual: string;
    on: string;
    off: string;
    enable: string;
    run: string;
    more: string;
    emptyTitle: string;
    emptyDescription: string;
    errorTitle: string;
    errorDescription: string;
    /** Translated preset names for `describeSchedule`. */
    presets: CronPreset[];
}
export interface CronJobsTableProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onToggle"> {
    jobs: CronJob[];
    /** @default "ready" */
    state?: CronTableState;
    /** Enable/disable switch. Without it the column shows a static badge. */
    onToggle?: (job: CronJob, enabled: boolean) => void;
    /** "Run now" button. Hidden without it. */
    onRun?: (job: CronJob) => void;
    /** Job whose action is in flight: its switch disables and its run button spins. */
    busyId?: string | null;
    /** Extra actions per job, as DropdownMenuItems (edit, history, delete…). */
    rowActions?: (job: CronJob) => ReactNode;
    /** Exit of the empty state (§11), e.g. a "New job" Button. */
    emptyAction?: ReactNode;
    /** Copy overrides (i18n). Defaults are English. */
    labels?: Partial<CronJobsTableLabels>;
}
/**
 * CronJobsTable — a Cronify app's jobs: name, schedule (preset name or raw
 * expression), target, enabled switch and actions. Presentational: data and
 * actions come in through props, so the admin loads them and a landing can
 * pass sample jobs. For the history of runs use CronExecutionsTable.
 */
export declare function CronJobsTable({ jobs, state, onToggle, onRun, busyId, rowActions, emptyAction, labels, className, ...props }: CronJobsTableProps): import("react").JSX.Element;
