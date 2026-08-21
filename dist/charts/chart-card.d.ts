import type { ReactNode } from "react";
import { type ChartState } from "./types";
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
export declare function ChartCard({ title, toolbar, children, state, onRetry, errorTitle, errorDescription, retryLabel, emptyLabel, height, className, }: ChartCardProps): import("react").JSX.Element;
