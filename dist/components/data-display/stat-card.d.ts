import type { HTMLAttributes, ReactNode } from "react";
/** Direction of a stat's change — drives the arrow glyph, never the color. */
export type StatDeltaDirection = "up" | "down" | "flat";
export interface StatDelta {
    /**
     * The change WITH sign and period, composed by the app — "+6 esta semana",
     * not "+6" (§14): a bare number without a period says nothing.
     */
    value: ReactNode;
    /** Arrow shown before the copy: up · down · flat. */
    direction: StatDeltaDirection;
    /**
     * Whether "more" is objectively good. Color is semantic ONLY when this is set
     * (§14): true → success, false → danger, undefined → muted (neutral change).
     */
    positive?: boolean;
}
export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
    /** Overline label above the figure (§14). */
    label: ReactNode;
    /** The big figure — rendered `text-h2` with tabular figures. */
    value: ReactNode;
    /** Optional change indicator (§14). */
    delta?: StatDelta;
    /** A muted line of context under the figure — "media de 7 días". */
    context?: ReactNode;
}
/**
 * StatCard — a single headline figure (§14): overline label on top, big figure
 * in the middle, change or context below. The delta always carries its sign and
 * period; its color is semantic only when "more" is objectively good. For a stat
 * paired with a sparkline, use MetricCard.
 */
export declare function StatCard({ label, value, delta, context, className, ...props }: StatCardProps): import("react").JSX.Element;
export interface MetricCardProps extends StatCardProps {
    /**
     * Visual slot — a Sparkline or small chart (provided by the app / charts
     * package; this component never imports charts). Sits beside the figure.
     */
    visual?: ReactNode;
}
/**
 * MetricCard — StatCard plus a `visual` slot for a sparkline or micro-chart
 * (§14). The figure keeps its meaning without the chart; the chart is context,
 * never the headline. Pass the chart element via `visual`.
 */
export declare function MetricCard({ label, value, delta, context, visual, className, ...props }: MetricCardProps): import("react").JSX.Element;
