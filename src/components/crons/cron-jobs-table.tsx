"use client";

import { Ellipsis, Play } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../actions/dropdown-menu";
import { IconButton } from "../actions/icon-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../data-table/table";
import { Badge } from "../feedback/badge";
import { EmptyState } from "../feedback/empty-state";
import { ErrorState } from "../feedback/error-state";
import { Skeleton } from "../feedback/skeleton";
import { Switch } from "../forms/switch";
import { CRON_PRESETS, describeSchedule, type CronPreset } from "./schedule";
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

const DEFAULT_LABELS: CronJobsTableLabels = {
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
export function CronJobsTable({
  jobs,
  state = "ready",
  onToggle,
  onRun,
  busyId = null,
  rowActions,
  emptyAction,
  labels,
  className,
  ...props
}: CronJobsTableProps) {
  const t = { ...DEFAULT_LABELS, ...labels };
  const hasActions = Boolean(onRun || rowActions);

  if (state === "error") {
    return <ErrorState title={t.errorTitle} description={t.errorDescription} className={className} {...props} />;
  }
  if (state === "loading") {
    return (
      <div aria-busy="true" className={cn("flex flex-col gap-2", className)} {...props}>
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }
  if (jobs.length === 0) {
    return (
      <EmptyState
        title={t.emptyTitle}
        description={t.emptyDescription}
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
            <TableHead>{t.name}</TableHead>
            <TableHead>{t.schedule}</TableHead>
            <TableHead>{t.target}</TableHead>
            <TableHead className="w-20">{t.enabled}</TableHead>
            {hasActions && (
              <TableHead align="right" className="w-24">
                {t.actions}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => {
            const described = describeSchedule(job.schedule, { presets: t.presets, manualLabel: t.manual });
            const named = Boolean(job.schedule) && described !== job.schedule;
            const busy = busyId === job.id;
            return (
              <TableRow key={job.id} data-job-id={job.id}>
                <TableCell>
                  <div className="font-medium text-text">{job.name}</div>
                  {job.description && <div className="text-body-sm text-text-muted">{job.description}</div>}
                </TableCell>
                <TableCell>
                  {named ? (
                    <>
                      <div className="text-body">{described}</div>
                      <code className="font-mono text-code text-text-muted">{job.schedule}</code>
                    </>
                  ) : job.schedule ? (
                    <code className="font-mono text-code">{job.schedule}</code>
                  ) : (
                    <span className="text-body text-text-muted">{described}</span>
                  )}
                </TableCell>
                <TableCell className="max-w-80">
                  {job.http ? (
                    <div className="flex min-w-0 items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {job.http.method || "GET"}
                      </Badge>
                      <span className="truncate font-mono text-code">{job.http.url}</span>
                    </div>
                  ) : (
                    <Badge variant="tonal">{job.type}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {onToggle ? (
                    <Switch
                      checked={job.enabled}
                      disabled={busy}
                      onCheckedChange={(v) => onToggle(job, v)}
                      label={<span className="sr-only">{t.enable.replace("{name}", job.name)}</span>}
                    />
                  ) : (
                    <Badge variant={job.enabled ? "tonal" : "outline"} tone={job.enabled ? "success" : undefined}>
                      {job.enabled ? t.on : t.off}
                    </Badge>
                  )}
                </TableCell>
                {hasActions && (
                  <TableCell align="right">
                    <div className="flex justify-end gap-1">
                      {onRun && (
                        <IconButton
                          icon={Play}
                          label={t.run}
                          variant="ghost"
                          size="sm"
                          loading={busy}
                          onClick={() => onRun(job)}
                        />
                      )}
                      {rowActions && (
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<IconButton icon={Ellipsis} label={t.more} variant="ghost" size="sm" />} />
                          <DropdownMenuContent align="end">{rowActions(job)}</DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
