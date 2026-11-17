import type { ReactNode } from "react";
export interface RecoveryCodesProps {
    /** The one-time recovery codes. Shown once, at generation (§20). */
    codes: string[];
    /** Codes already spent — rendered dimmed with a "used" badge, NEVER struck
     * through (§M-01, §19: line-through isn't read by screen readers). */
    markUsed?: string[];
    /** Warning copy above the grid. */
    warningSlot?: ReactNode;
    /** Fires after the codes are copied (they're copied to the clipboard here). */
    onCopyAll?: (text: string) => void;
    /** The app builds the download (file writing is app-land). */
    onDownload?: () => void;
    copyAllLabel?: string;
    copiedLabel?: string;
    downloadLabel?: string;
    /** Badge text on a spent code. */
    usedLabel?: string;
}
/**
 * RecoveryCodes — the grid of one-time backup codes shown once at generation
 * (§20, §23). Mono, tabular, two columns inside a Card, with copy-all and an
 * app-provided download. Spent codes (`markUsed`) dim to 60% and get a "used"
 * badge — never a strike-through, which screen readers skip (§M-01).
 */
export declare function RecoveryCodes({ codes, markUsed, warningSlot, onCopyAll, onDownload, copyAllLabel, copiedLabel, downloadLabel, usedLabel, }: RecoveryCodesProps): import("react").JSX.Element;
