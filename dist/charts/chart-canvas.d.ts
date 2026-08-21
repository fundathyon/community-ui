import { type ReactElement } from "react";
/**
 * The two pieces every recharts wrapper shares — kept here so recharts imports
 * stay confined and the wrappers read as pure data → props.
 */
/** Default plot margin. Tight: axes carry their own tick spacing (§22 grid). */
export declare const CARTESIAN_MARGIN: {
    readonly top: 6;
    readonly right: 8;
    readonly bottom: 0;
    readonly left: 0;
};
/** Axis tick text: caption size, muted (§22 typography). */
export declare const AXIS_TICK: {
    readonly fontSize: 11;
    readonly fill: "var(--fdn-text-muted)";
};
/** Shared props for a bare, quiet axis (no line, small tick gap). */
export declare const AXIS_PROPS: {
    readonly tick: {
        readonly fontSize: 11;
        readonly fill: "var(--fdn-text-muted)";
    };
    readonly tickLine: false;
    readonly axisLine: false;
    readonly tickMargin: 8;
    readonly stroke: "var(--fdn-border)";
};
/**
 * Size a recharts chart element. With an explicit `width` the chart renders at a
 * fixed size (used by tests, since jsdom's ResponsiveContainer measures 0×0);
 * otherwise it fills its container's width at the given height (§22 responsive).
 */
export declare function ChartCanvas({ width, height, children, }: {
    width?: number;
    height: number;
    children: ReactElement;
}): import("react").JSX.Element;
/** The subset of recharts' tooltip render props we read — declared locally (and
 * deliberately loose: `readonly`, `unknown` fields) so recharts' own
 * `TooltipContentProps` is assignable to it without any recharts type leaking. */
interface TooltipRenderProps {
    active?: boolean;
    label?: unknown;
    payload?: ReadonlyArray<{
        name?: unknown;
        value?: unknown;
        dataKey?: unknown;
    }>;
}
/**
 * Build the `content` function recharts calls for its tooltip, wired to render
 * our own {@link ChartTooltip}. Colours come from a name→colour map we control
 * (not recharts payload), and the x label is formatted from the original x.
 */
export declare function makeCartesianTooltip(opts: {
    colorByName: Record<string, string>;
    originals: Map<string, string | number | Date>;
    xFormat: (x: string | number | Date) => string;
    yFormat: (y: number) => string;
}): (props: TooltipRenderProps) => import("react").JSX.Element | null;
/** Tooltip `content` for a single-value chart (donut/pie): one row, the hovered
 * segment. Colours come from our name→colour map, not recharts payload. */
export declare function makePieTooltip(opts: {
    colorByName: Record<string, string>;
    valueFormat: (v: number) => string;
}): (props: TooltipRenderProps) => import("react").JSX.Element | null;
export {};
