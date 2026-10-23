import type { ReactNode } from "react";
/** Bordered, rounded table shell — matches the app's table chrome (§21). */
export declare const apiTableWrapper = "my-4 overflow-x-auto rounded-lg border border-border";
export declare const apiTable = "w-full border-collapse text-body-sm";
export declare const apiHeadCell = "border-b border-border bg-bg-subtle px-3 py-2 text-left align-bottom text-overline uppercase font-medium text-text-muted";
export declare const apiCell = "px-3 py-2 align-top";
/** Row divider — put on the tbody so only inter-row borders render (the first
 * row sits flush under the header, so its top border is removed). */
export declare const apiRowDivider = "[&>tr]:border-t [&>tr]:border-border [&>tr:first-child]:border-t-0";
/** Monospace symbol name; struck through and muted when deprecated (§26). */
export declare function ApiName({ children, deprecated }: {
    children: ReactNode;
    deprecated?: boolean;
}): import("react").JSX.Element;
/** Muted monospace type annotation. */
export declare function ApiType({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
/** The "required" marker — a danger outline Badge, label overridable (§26). */
export declare function RequiredBadge({ label }: {
    label: string;
}): import("react").JSX.Element;
