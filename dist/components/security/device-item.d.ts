import type { Locale } from "date-fns";
import type { HTMLAttributes, ReactNode } from "react";
import type { DateInput } from "../../lib/format";
export interface DeviceItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onReject"> {
    /** Device label — "New device · Firefox on Linux". */
    device: ReactNode;
    browser?: ReactNode;
    /** Verifiable data → mono (§23). */
    ip: string;
    location?: string;
    /** Copy when the location is unknown; overridable. */
    unknownLocationLabel?: ReactNode;
    time: DateInput;
    locale?: Locale;
    /**
     * Whether this device is already trusted. An UNRECOGNIZED device gets a
     * warning treatment (not danger — we don't yet know it's an attack, §23) plus
     * two actions.
     */
    recognized?: boolean;
    /** "Not me" — destructive-subtle. Only shown when unrecognized. */
    onReject?: () => void;
    rejectLabel?: string;
    /** "Recognize" — secondary. Only shown when unrecognized. */
    onRecognize?: () => void;
    recognizeLabel?: string;
}
/**
 * DeviceItem — a sign-in from a device pending review (§23). When unrecognized
 * it carries a WARNING treatment (warning-bg + warning-border, never danger:
 * an unfamiliar device isn't proof of an attack) and offers two actions —
 * "Not me" (destructive-subtle) and "Recognize" (secondary). A recognized
 * device renders as a plain bordered row.
 */
export declare function DeviceItem({ device, browser, ip, location, unknownLocationLabel, time, locale, recognized, onReject, rejectLabel, onRecognize, recognizeLabel, className, ...props }: DeviceItemProps): import("react").JSX.Element;
export interface DeviceListProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
/** DeviceList — stacks DeviceItems (each is a self-contained boxed row). */
export declare function DeviceList({ children, className, ...props }: DeviceListProps): import("react").JSX.Element;
