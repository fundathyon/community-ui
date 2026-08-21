// @foundathyon/community-ui/charts — the Dashboard & visualization entry (§22).
//
// A SEPARATE package entry from the core so recharts never weighs on the core
// bundle. recharts is fully encapsulated: nothing below re-exports a recharts
// type, and consumers describe data with ChartSeries/ChartPoint/ChartColor only.
// Explicit exports — no accidental API.

// Data vocabulary & shared config.
export type {
  ChartColor,
  ChartPoint,
  ChartSeries,
  ChartState,
  ChartCurve,
  BaseCartesianChartProps,
} from "./types";
export { CHART_HEIGHT, SPARKLINE_HEIGHT } from "./types";

// Colour resolution (§02 accent-vs-semantic, §22 single-hue ramp).
export { resolveSeriesColor, resolveSeriesColors, accentAtOpacity } from "./color";

// Cartesian charts.
export { LineChart, type LineChartProps } from "./line-chart";
export { AreaChart, type AreaChartProps } from "./area-chart";
export {
  BarChart,
  StackedBarChart,
  type BarChartProps,
  type StackedBarChartProps,
} from "./bar-chart";

// Distribution, inline & specialised charts.
export { DonutChart, type DonutChartProps, type DonutSegment } from "./donut-chart";
export { Sparkline, type SparklineProps } from "./sparkline";
export {
  ProgressChart,
  type ProgressChartProps,
  type ProgressThreshold,
} from "./progress-chart";
export { Heatmap, type HeatmapProps, type HeatmapCell } from "./heatmap";
export {
  TimelineChart,
  type TimelineChartProps,
  type TimelineSegment,
  type TimelineStatus,
} from "./timeline-chart";

// Composition & shared building blocks.
export { MetricChart, type MetricChartProps } from "./metric-chart";
export { ChartTooltip, type ChartTooltipProps, type ChartTooltipItem } from "./chart-tooltip";
export { ChartLegend, type ChartLegendProps, type ChartLegendItem } from "./chart-legend";
export {
  TimeRangePicker,
  type TimeRangePickerProps,
  type TimeRangeOption,
} from "./time-range-picker";
export { ChartToolbar, type ChartToolbarProps } from "./chart-toolbar";
export { ChartCard, type ChartCardProps } from "./chart-card";
