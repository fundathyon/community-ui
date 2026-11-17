import type { HTMLAttributes, ReactNode } from "react";
export interface SettingsRowProps extends HTMLAttributes<HTMLDivElement> {
    /** The setting name. */
    label: ReactNode;
    /** A line explaining what the setting does or affects. */
    description?: ReactNode;
    /** The control on the right — a Switch, Select or segmented control (§25). */
    control: ReactNode;
    /** id of the control, to associate the label with it for assistive tech. */
    htmlFor?: string;
}
/**
 * SettingsRow — one settings entry (§25): label and description on the left, the
 * control on the right, separated from its neighbours by a hairline. Switches
 * apply instantly; the ones that change org-wide security defer to a SaveBar
 * instead of a page-level "Save".
 *
 * Server-component safe.
 */
export declare function SettingsRow({ label, description, control, htmlFor, className, ...props }: SettingsRowProps): import("react").JSX.Element;
