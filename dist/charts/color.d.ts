import type { ChartColor, ChartSeries } from "./types";
/**
 * The accent hue faded to a given fraction (0–1), kept as a token reference so
 * it tracks the mounted product's accent. Used for the categorical ramp and the
 * Heatmap intensity ramp (§22 single-hue).
 */
export declare function accentAtOpacity(fraction: number): string;
/**
 * Resolve a `ChartColor` to a CSS colour string usable as `stroke`/`fill`.
 * Defaults to the solid accent. Categorical indices wrap around the 5-step
 * opacity ladder, so an unbounded set of categories stays within one hue (§22).
 */
export declare function resolveSeriesColor(color?: ChartColor): string;
/**
 * Resolve colours for a whole series list: an explicit `color` wins; otherwise
 * the series falls onto the categorical accent ramp by position. This is why a
 * single uncoloured series renders as the solid accent and a group descends in
 * opacity, satisfying the §22 categorical rule without any caller effort.
 */
export declare function resolveSeriesColors(series: ChartSeries[]): string[];
