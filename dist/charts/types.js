/**
 * Public data vocabulary for the charts entry (§22 Dashboard y visualización).
 *
 * These types are the ONLY contract consumers see — recharts is encapsulated
 * behind the chart components and never leaks into this surface (CONVENTIONS:
 * "charts encapsulate recharts; consumers never import recharts types").
 */
/** Default fixed heights (§22 rejilla): 200px for a card chart. Sparklines carry
 * their own much smaller default. Charts always fill their container's width. */
export const CHART_HEIGHT = 200;
/** Inline sparkline default height (§22 — tiny, no axes, no chrome). */
export const SPARKLINE_HEIGHT = 32;
