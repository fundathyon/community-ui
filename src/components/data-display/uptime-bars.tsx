import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

/** Status of one day on the strip. `nodata` = the day had no checks. */
export type UptimeDayStatus = "up" | "degraded" | "down" | "nodata";

/** One day on the strip: a UTC date plus that day's summary. */
export interface UptimeDay {
  /** UTC calendar day, `YYYY-MM-DD`. */
  day: string;
  status: UptimeDayStatus;
  /** Availability that day, 0–100. `null`/omitted when there were no checks. */
  uptime?: number | null;
  /** Failed checks that day. */
  down?: number;
}

export interface UptimeBarsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Days from oldest to newest; the last one is today. */
  days: UptimeDay[];
  /** Required accessible summary of the whole strip (§22), e.g. "99.98% uptime over 90 days". */
  label: string;
  /** Native tooltip of each bar (i18n). Defaults to "Oct 22, 2026 · 99.9% uptime · 2 failed checks". */
  dayTitle?: (day: UptimeDay) => string;
  /** Left caption (i18n). @default (n) => `${n} days ago` */
  daysAgoLabel?: (count: number) => string;
  /** Right caption (i18n). @default "Today" */
  todayLabel?: string;
  /** Bars kept below the `sm` breakpoint; older ones hide. @default 30 */
  mobileDays?: number;
}

const tone: Record<UptimeDayStatus, string> = {
  up: "bg-success-solid",
  degraded: "bg-warning-solid",
  down: "bg-danger-solid",
  nodata: "bg-border",
};

const dayFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function defaultDayTitle({ day, status, uptime, down }: UptimeDay): string {
  const date = dayFormat.format(new Date(`${day}T00:00:00Z`));
  if (status === "nodata" || uptime == null) return `${date} · no data`;
  return `${date} · ${uptime}% uptime${down ? ` · ${down} failed checks` : ""}`;
}

/**
 * UptimeBars — the status-page strip: one bar per day, coloured by that day's
 * worst state, with the day's summary as a native tooltip (§22). Use it for
 * daily availability history (status pages, service cards). For arbitrary
 * time slices with chart states (loading, error, retry), use TimelineChart
 * from `/charts` instead.
 *
 * Server-component safe: no hooks, no recharts.
 */
export function UptimeBars({
  days,
  label,
  dayTitle = defaultDayTitle,
  daysAgoLabel = (n) => `${n} days ago`,
  todayLabel = "Today",
  mobileDays = 30,
  className,
  ...props
}: UptimeBarsProps) {
  const hiddenOnMobile = Math.max(0, days.length - mobileDays);

  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <div className="flex h-8 items-stretch gap-px sm:gap-0.5" role="img" aria-label={label}>
        {days.map((d, i) => (
          <span
            key={d.day}
            title={dayTitle(d)}
            className={cn(
              "flex-1 rounded-sm transition-opacity duration-[var(--fdn-dur-fast)] hover:opacity-70",
              tone[d.status],
              i < hiddenOnMobile && "hidden sm:block",
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-caption text-text-disabled">
        <span className="sm:hidden">{daysAgoLabel(Math.min(days.length, mobileDays))}</span>
        <span className="hidden sm:inline">{daysAgoLabel(days.length)}</span>
        <span>{todayLabel}</span>
      </div>
    </div>
  );
}
