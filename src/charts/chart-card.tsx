"use client";

import type { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "../components/layout/card";
import { ChartEmpty, ChartError, ChartLoading } from "./chart-states";
import { CHART_HEIGHT, type ChartState } from "./types";

export interface ChartCardProps {
  /** Card title (text-h5). */
  title: ReactNode;
  /** Right-aligned header slot — a TimeRangePicker, a menu, refresh meta. */
  toolbar?: ReactNode;
  /** The chart. Rendered when `state` is `ready`/omitted. */
  children: ReactNode;
  /**
   * Optional card-level lifecycle. When set to loading/empty/error the card
   * renders the shared state block in its body instead of `children`, so a whole
   * card can show one skeleton/error without threading state into the chart.
   */
  state?: ChartState;
  onRetry?: () => void;
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
  emptyLabel?: string;
  /** Body height used for the shared state block. @default 200 */
  height?: number;
  className?: string;
}

/**
 * ChartCard — a Card preset for a dashboard chart (§15 + §22): header (title +
 * toolbar slot) over a body, with the four states handled in ONE place. Pass a
 * chart as `children` and let it self-manage, or drive the whole card with
 * `state`/`onRetry` for a shared skeleton/error. Composes layout/Card (which is
 * borderless-elevation by design — a card floats via border, not shadow, §15).
 *
 * When to use: the standard framed dashboard chart. For a bare chart with no card
 * chrome, render the chart directly.
 */
export function ChartCard({
  title,
  toolbar,
  children,
  state = "ready",
  onRetry,
  errorTitle,
  errorDescription,
  retryLabel,
  emptyLabel,
  height = CHART_HEIGHT,
  className,
}: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader actions={toolbar}>{title}</CardHeader>
      <CardBody>
        {state === "loading" && <ChartLoading height={height} />}
        {state === "empty" && <ChartEmpty height={height} label={emptyLabel} />}
        {state === "error" && (
          <ChartError
            height={height}
            title={errorTitle}
            description={errorDescription}
            retryLabel={retryLabel}
            onRetry={onRetry}
          />
        )}
        {state === "ready" && children}
      </CardBody>
    </Card>
  );
}
