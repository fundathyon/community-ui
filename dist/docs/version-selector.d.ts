export interface DocsVersion {
    /** Shown in the trigger and menu ("v2.4"). */
    label: string;
    /** Stable value reported to `onChange`. */
    value: string;
    /** Optional destination — followed on select when no `onChange` is given. */
    href?: string;
}
export interface VersionSelectorProps {
    versions: DocsVersion[];
    /** Currently selected version value. */
    current: string;
    /** Fires with the chosen version value. When omitted, a version's `href` is
     * navigated to instead. */
    onChange?: (value: string) => void;
    /** Accessible name of the control. Overridable (products ship Spanish copy). */
    label?: string;
    className?: string;
}
/**
 * VersionSelector — a compact docs version switcher (§26 "Vault v2.4"). A small,
 * ghost-ish preset of the forms Select showing "v2.4" in the trigger. Reports
 * the chosen value via `onChange`, or follows the version's `href` when no
 * handler is provided.
 */
export declare function VersionSelector({ versions, current, onChange, label, className }: VersionSelectorProps): import("react").JSX.Element;
