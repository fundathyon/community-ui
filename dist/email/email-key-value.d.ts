/** One row of technical detail. */
export interface EmailKeyValueItem {
    label: string;
    value: string;
}
export interface EmailKeyValueProps {
    items: EmailKeyValueItem[];
}
/**
 * Renders request/event details (device, IP, time) as compact rows. Auth and
 * security emails must include origin details (§27) — this is how. Values
 * stay selectable text so the user can compare them character by character.
 */
export declare function EmailKeyValue({ items }: EmailKeyValueProps): import("react").JSX.Element | null;
