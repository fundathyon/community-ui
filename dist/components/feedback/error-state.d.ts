import type { HTMLAttributes, ReactNode } from "react";
/** The four mandatory technical facts of every API error (§25). */
export interface ErrorStateDetails {
    /** HTTP status ("409 Conflict" or 409). */
    status?: number | string;
    requestId?: string;
    traceId?: string;
    /** UTC timestamp, already formatted. */
    timestamp?: string;
}
export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Human language — NEVER a raw code in the headline (§17, §25). */
    title: ReactNode;
    /** What happened, whose fault it is, what to do now (§11). */
    description?: ReactNode;
    /** The exit — retry, edit or contact (§17). Rendered as a secondary Button. */
    retry?: {
        label: string;
        onClick: () => void;
    };
    /** Technical detail shown in mono on a second line and copied verbatim. */
    details?: ErrorStateDetails;
    /** Copy-button label. Overridable product copy. @default "Copy details" */
    copyLabel?: string;
    /** Label while the copy confirmation lasts. @default "Copied" */
    copiedLabel?: string;
}
/**
 * ErrorState (§11) — what happened, whose fault it is and what to do now.
 * The headline is human language; the technical detail (status, request id,
 * trace id, timestamp) goes in mono behind "Copy details", never in the title
 * (§25). Announces with `role="alert"` and always offers an exit.
 */
export declare function ErrorState({ title, description, retry, details, copyLabel, copiedLabel, className, ...props }: ErrorStateProps): import("react").JSX.Element;
