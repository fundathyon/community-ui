import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
const tone = {
    up: "bg-success-solid",
    degraded: "bg-warning-solid",
    down: "bg-danger-solid",
    nodata: "bg-border",
};
const dayFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
function defaultDayTitle({ day, status, uptime, down }) {
    const date = dayFormat.format(new Date(`${day}T00:00:00Z`));
    if (status === "nodata" || uptime == null)
        return `${date} · no data`;
    return `${date} · ${uptime}% uptime${down ? ` · ${down} failed checks` : ""}`;
}
/**
 * UptimeBars — the status-page strip: one bar per day, coloured by that day's
 * worst state, with the day's summary as a native tooltip (§22). Use it for
 * daily availability history (status pages, service cards). For arbitrary
 * time slices with chart states (loading, error, retry), use TimelineChart
 * from `/charts` instead.
 *
 * Server-component safe: no hooks, no recharts.
 */
export function UptimeBars({ days, label, dayTitle = defaultDayTitle, daysAgoLabel = (n) => `${n} days ago`, todayLabel = "Today", mobileDays = 30, className, ...props }) {
    const hiddenOnMobile = Math.max(0, days.length - mobileDays);
    return (_jsxs("div", { className: cn("flex flex-col gap-1.5", className), ...props, children: [_jsx("div", { className: "flex h-8 items-stretch gap-px sm:gap-0.5", role: "img", "aria-label": label, children: days.map((d, i) => (_jsx("span", { title: dayTitle(d), className: cn("flex-1 rounded-sm transition-opacity duration-[var(--fdn-dur-fast)] hover:opacity-70", tone[d.status], i < hiddenOnMobile && "hidden sm:block") }, d.day))) }), _jsxs("div", { className: "flex items-center justify-between text-caption text-text-disabled", children: [_jsx("span", { className: "sm:hidden", children: daysAgoLabel(Math.min(days.length, mobileDays)) }), _jsx("span", { className: "hidden sm:inline", children: daysAgoLabel(days.length) }), _jsx("span", { children: todayLabel })] })] }));
}
