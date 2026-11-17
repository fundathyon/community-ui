// @foundathyon/community-ui/charts — the Dashboard & visualization entry (§22).
//
// A SEPARATE package entry from the core so recharts never weighs on the core
// bundle. recharts is fully encapsulated: nothing below re-exports a recharts
// type, and consumers describe data with ChartSeries/ChartPoint/ChartColor only.
// Explicit exports — no accidental API.
export { CHART_HEIGHT, SPARKLINE_HEIGHT } from "./types";
// Colour resolution (§02 accent-vs-semantic, §22 single-hue ramp).
export { resolveSeriesColor, resolveSeriesColors, accentAtOpacity } from "./color";
// Cartesian charts.
export { LineChart } from "./line-chart";
export { AreaChart } from "./area-chart";
export { BarChart, StackedBarChart, } from "./bar-chart";
// Distribution, inline & specialised charts.
export { DonutChart } from "./donut-chart";
export { Sparkline } from "./sparkline";
export { ProgressChart, } from "./progress-chart";
export { Heatmap } from "./heatmap";
export { TimelineChart, } from "./timeline-chart";
// Composition & shared building blocks.
export { MetricChart } from "./metric-chart";
export { ChartTooltip } from "./chart-tooltip";
export { ChartLegend } from "./chart-legend";
export { TimeRangePicker, } from "./time-range-picker";
export { ChartToolbar } from "./chart-toolbar";
export { ChartCard } from "./chart-card";
