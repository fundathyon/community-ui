import { jsx as _jsx } from "react/jsx-runtime";
import { enUS } from "date-fns/locale";
import { cn } from "../../lib/cn";
import { formatRelativeDate } from "../../lib/format";
/**
 * Internal: relative time with the absolute value in the tooltip (§17). Relative
 * up to 7 days, absolute afterwards. Not exported from the barrel — the security
 * rows share it. Defaults to English so the system's defaults stay English.
 */
export function RelativeTime({ value, locale = enUS, className, ...props }) {
    const { display, absolute } = formatRelativeDate(value, locale);
    return (_jsx("time", { title: absolute, className: cn(className), ...props, children: display }));
}
