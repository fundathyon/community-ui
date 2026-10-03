import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../components/feedback/badge";
import { Admonition } from "./admonition";
const STATE_STYLE = {
    new: { tone: "info", variant: "tonal" },
    beta: { tone: "info", variant: "outline" },
    // Matches the treatment the endpoint's old boolean `deprecated` flag used.
    deprecated: { tone: "warning", variant: "outline" },
};
function defaultLabel(state, version) {
    switch (state) {
        case "new":
            return version ? `New in ${version}` : "New";
        case "beta":
            return "Beta";
        case "deprecated":
            return "Deprecated";
    }
}
/**
 * VersionBadge — the small "New in 2.4 / Beta / Deprecated" chip that sits by
 * an API endpoint's heading (§26). A thin preset over the product Badge, not
 * a new visual — reach for it instead of hand-rolling a Badge each time an
 * endpoint needs a lifecycle marker. Server-component safe.
 */
export function VersionBadge({ state, version, label, className, ...props }) {
    const { tone, variant } = STATE_STYLE[state];
    return (_jsx(Badge, { variant: variant, tone: tone, className: className, ...props, children: label ?? defaultLabel(state, version) }));
}
/**
 * DeprecationNotice — the explanatory block under a deprecated endpoint's
 * heading (§26): what's deprecated, since which version, when it's removed,
 * and the alternative. §26 places this "immediately below" the heading,
 * never at the page's end — compose it right after the endpoint's method/path
 * row (see ApiEndpoint), never as a page footer.
 *
 * Reuses the warning-toned Admonition for its visuals (2px bar, wash, icon)
 * rather than a bespoke callout (§26 reuse-over-duplication). One of these
 * renders per deprecated endpoint, so — unlike a prose admonition — it does
 * NOT count against the docs "max two admonitions per page" budget: that
 * rule is about prose asides, this is a structured API-reference block.
 * Pass `children` to fully replace the generated sentence with custom copy.
 */
export function DeprecationNotice({ version, removedIn, removedInEta, alternative, title = "Deprecated", className, children, ...props }) {
    return (_jsx(Admonition, { kind: "warning", title: title, className: className, ...props, children: children ?? (_jsxs("p", { children: ["Deprecated in ", version, ". Removed in ", removedIn, removedInEta ? ` (expected ${removedInEta})` : "", ". Use ", alternative, " instead."] })) }));
}
