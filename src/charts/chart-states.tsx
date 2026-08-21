"use client";

import { CircleX } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "../lib/cn";
import { Button } from "../components/actions/button";
import { Skeleton } from "../components/feedback/skeleton";
import { Icon } from "../components/typography/icon";

/**
 * The three non-happy chart states (§22), rendered COMPACT so they fit a strip
 * as small as a sparkline without overflowing. They share the design language of
 * feedback/EmptyState & feedback/ErrorState (tokens, `role`, retry Button) but
 * drop the page-scale padding those carry — a chart body is not a page region.
 *
 * These are internal to the charts entry: ChartFrame and ChartCard both render
 * them, so state behaviour is defined once (anti-duplication).
 */

/** Default copy — English, overridable by the owning chart's props (CONVENTIONS
 * language rule; §22 wording for the no-data case). */
export const DEFAULT_EMPTY_LABEL = "Sin datos en este intervalo";
export const DEFAULT_ERROR_TITLE = "No se pudo cargar el gráfico";
export const DEFAULT_RETRY_LABEL = "Reintentar";

/** Loading — a Skeleton block the exact height of the chart (§22). The Skeleton
 * is decorative (`aria-hidden`), so a `role="status"` wrapper announces the wait
 * once (the SkeletonGroup pattern), not the bone itself. */
export function ChartLoading({ height, label = "Cargando…" }: { height: number; label?: string }) {
  return (
    <div role="status" aria-busy="true" aria-label={label} className="w-full" style={{ height }}>
      <Skeleton className="h-full w-full" />
    </div>
  );
}

/**
 * No data — a plain muted line, CENTERED in the chart box. Never a flat zero
 * line: that would lie about the metric (§22). Not tabular, not a fake series.
 */
export function ChartEmpty({
  height,
  label = DEFAULT_EMPTY_LABEL,
  style,
}: {
  height: number;
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className="flex w-full items-center justify-center px-4 text-center text-caption text-text-muted"
      style={{ minHeight: height, ...style }}
    >
      {label}
    </div>
  );
}

/**
 * Error — compact, `role="alert"`, always offers the retry exit (§11, §22).
 * The technical detail belongs in the app's ErrorState behind "Copy details";
 * inside a chart body we keep only the human line and the retry.
 */
export function ChartError({
  height,
  title = DEFAULT_ERROR_TITLE,
  description,
  retryLabel = DEFAULT_RETRY_LABEL,
  onRetry,
}: {
  height: number;
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 px-4 text-center",
      )}
      style={{ minHeight: height }}
    >
      <span className="grid size-8 place-items-center rounded-full bg-danger-bg text-danger">
        <Icon icon={CircleX} size={16} />
      </span>
      <p className="text-caption text-text-secondary">{title}</p>
      {description && <p className="text-caption text-text-muted">{description}</p>}
      {onRetry && (
        <Button variant="secondary" size="xs" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
