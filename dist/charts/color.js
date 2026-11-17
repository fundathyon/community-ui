/**
 * Series colour resolution (§02 accent-vs-semantic, §22 single-hue rule).
 *
 * Every colour resolves to a CSS `var()` string so themes and per-product accents
 * "just work" — recharts accepts these strings directly in `stroke`/`fill`. We
 * never hardcode a hue: semantic series read their semantic token, and the
 * categorical ramp is the accent token faded with `color-mix`, so it tracks
 * `--fdn-accent-*` for whichever product mounts the chart.
 */
/** Semantic + neutral colours → their token. Semantic series use the `-text`
 * calibration (AA on surface, brighter in dark) so lines read on the canvas;
 * the accent uses its solid token — it is the neutral volume series (§22). */
const SEMANTIC_TOKENS = {
    accent: "var(--fdn-accent-solid)",
    success: "var(--fdn-success-text)",
    warning: "var(--fdn-warning-text)",
    danger: "var(--fdn-danger-text)",
    info: "var(--fdn-info-text)",
    // A truly non-branded, non-state series (baselines, comparisons).
    neutral: "var(--fdn-text-secondary)",
};
/** The §22 opacity ladder: same hue, descending opacity — never N colours for N
 * meaningless categories. Index 0 is the full-strength accent. */
const CATEGORICAL_OPACITY = [1, 0.75, 0.55, 0.4, 0.28];
/**
 * The accent hue faded to a given fraction (0–1), kept as a token reference so
 * it tracks the mounted product's accent. Used for the categorical ramp and the
 * Heatmap intensity ramp (§22 single-hue).
 */
export function accentAtOpacity(fraction) {
    if (fraction >= 1)
        return "var(--fdn-accent-solid)";
    const pct = Math.round(Math.max(0, fraction) * 100);
    return `color-mix(in oklab, var(--fdn-accent-solid) ${pct}%, transparent)`;
}
/**
 * Resolve a `ChartColor` to a CSS colour string usable as `stroke`/`fill`.
 * Defaults to the solid accent. Categorical indices wrap around the 5-step
 * opacity ladder, so an unbounded set of categories stays within one hue (§22).
 */
export function resolveSeriesColor(color = "accent") {
    if (typeof color === "object") {
        const step = CATEGORICAL_OPACITY[color.categorical % CATEGORICAL_OPACITY.length] ?? 1;
        return accentAtOpacity(step);
    }
    return SEMANTIC_TOKENS[color];
}
/**
 * Resolve colours for a whole series list: an explicit `color` wins; otherwise
 * the series falls onto the categorical accent ramp by position. This is why a
 * single uncoloured series renders as the solid accent and a group descends in
 * opacity, satisfying the §22 categorical rule without any caller effort.
 */
export function resolveSeriesColors(series) {
    return series.map((s, i) => resolveSeriesColor(s.color ?? { categorical: i }));
}
