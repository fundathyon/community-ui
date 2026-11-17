import type { Locale } from "date-fns";
import type { HTMLAttributes } from "react";
import { type DateInput } from "../../lib/format";
export interface RelativeTimeProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    value: DateInput;
    /** date-fns locale for the relative text. Defaults to English; pass `es` (or
     * any locale) for a localized product. */
    locale?: Locale;
}
/**
 * Internal: relative time with the absolute value in the tooltip (§17). Relative
 * up to 7 days, absolute afterwards. Not exported from the barrel — the security
 * rows share it. Defaults to English so the system's defaults stay English.
 */
export declare function RelativeTime({ value, locale, className, ...props }: RelativeTimeProps): import("react").JSX.Element;
