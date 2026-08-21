import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * Container — max width + lateral page padding (§15). Two widths only:
 * content 1360 and prose 720 (§04). Content stops and centers at 2xl (§08).
 * Page padding is 24px on desktop, 16px under `md`.
 *
 * Server-component safe.
 */
export function Container({ width = "content", className, ...props }) {
    return (_jsx("div", { className: cn("mx-auto w-full px-4 md:px-6", width === "content" ? "max-w-container-max" : "max-w-prose-max", className), ...props }));
}
